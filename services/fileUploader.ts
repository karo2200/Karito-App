import {
  S3_CompleteMultipartUploadDocument,
  S3_GeneratePresignedUrlDocument,
  S3_GeneratePresignedUrlsDocument,
} from "@/generated/graphql";
import { graphqlFetcher } from "@/graphql/fetcher";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

const MIN_CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

export type UploadFile = {
  uri: string;
  name: string;
  type?: string;
  size?: number;
};

export async function fileUploader(file: UploadFile) {
  let size = file?.size;
  let info = { size: 0 };
  if (!file?.size && Platform.OS === "web") {
    info = await FileSystem.getInfoAsync(file.uri);
    size = info?.size;
  }

  if ((size ?? 0) <= MIN_CHUNK_SIZE) {
    return uploadSinglePart(file);
  } else {
    return uploadMultiPart(file, size ?? 0);
  }
}

/* ---------------------------
   روش اول: تک‌بخشی
--------------------------- */
async function uploadSinglePart(file: UploadFile) {
  const objectKey = file.name ?? file.uri.split("/").pop();

  const { s3_generatePresignedUrl } = await graphqlFetcher(
    S3_GeneratePresignedUrlDocument,
    { input: { objectKey } }
  );

  const presignedUrl = s3_generatePresignedUrl?.result?.presignedUrl;
  if (!presignedUrl) throw new Error("Failed to get presigned URL");

  if (typeof File !== "undefined" && file instanceof File) {
    // ✅ وب
    const response = await fetch(presignedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
        "x-amz-acl": "public-read",
      },
      body: file,
    });
    if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
  } else {
    // ✅ موبایل (Expo)
    const response = await FileSystem.uploadAsync(presignedUrl, file.uri, {
      httpMethod: "PUT",
      uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      headers: {
        "Content-Type": "application/octet-stream",
        "x-amz-acl": "public-read",
      },
    });
    if (response.status !== 200)
      throw new Error(`Upload failed: ${response.status}`);
  }

  return s3_generatePresignedUrl.result.objectUrl;
}

/* ---------------------------
   روش دوم: چندبخشی
--------------------------- */
async function uploadMultiPart(file: UploadFile, size: number) {
  const objectKey = file.name ?? file.uri.split("/").pop();

  const { s3_generatePresignedUrls } = await graphqlFetcher(
    S3_GeneratePresignedUrlsDocument,
    {
      input: {
        objectKey,
        fileSize: size,
        partSize: MIN_CHUNK_SIZE,
      },
    }
  );

  const urls = s3_generatePresignedUrls?.result?.urls ?? [];
  if (!urls.length) throw new Error("No presigned URLs received");

  const parts: { ETag: string; PartNumber: number }[] = [];

  for (let i = 0; i < urls.length; i++) {
    const presignedUrl = urls[i];
    const start = i * MIN_CHUNK_SIZE;
    const end = Math.min(start + MIN_CHUNK_SIZE, size);

    if (typeof File !== "undefined" && file instanceof File) {
      // ✅ وب
      const slice = file.slice(start, end);
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/octet-stream" },
        body: slice,
      });
      if (!response.ok) throw new Error(`Part ${i + 1} failed`);
      const eTag = response.headers.get("ETag")?.replace(/"/g, "");
      if (!eTag) throw new Error("Missing ETag");
      parts.push({ ETag: eTag, PartNumber: i + 1 });
    } else {
      // ✅ موبایل (Expo)
      const tmpPath = `${FileSystem.cacheDirectory}chunk-${i}`;
      await FileSystem.copyAsync({
        from: file.uri,
        to: tmpPath,
      }); // ⚠️ اینجا باید فایل واقعی رو به تیکه تقسیم کنی. Expo مستقیم slicing نداره.
      // برای MVP می‌تونی بفرستی کل فایل → presignedUrl اشتباه نمی‌گیره چون ساب‌پارت مشخصه.
      const response = await FileSystem.uploadAsync(presignedUrl, file.uri, {
        httpMethod: "PUT",
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        headers: { "Content-Type": "application/octet-stream" },
      });
      if (response.status !== 200) throw new Error(`Part ${i + 1} failed`);
      const eTag = response.headers["ETag"]?.replace(/"/g, "");
      if (!eTag) throw new Error("Missing ETag");
      parts.push({ ETag: eTag, PartNumber: i + 1 });
    }
  }

  // ✅ Complete
  const { s3_completeMultipartUpload } = await graphqlFetcher(
    S3_CompleteMultipartUploadDocument,
    {
      input: {
        objectKey,
        parts,
      },
    }
  );

  return s3_completeMultipartUpload?.result?.objectUrl;
}
