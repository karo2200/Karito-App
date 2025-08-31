import { s3Config } from "@/constants/S3Client";
import { Platform } from "react-native";
// import { RNS3 } from "react-native-aws3";

export const fileUploader = async (param: any) => {
  const uri = param?.uri;
  const mime: string = param?.type;
  const name: string = param?.name ?? `image${Date.now()}`;

  //   return new Promise(async (resolve, reject) => {
  //     try {
  const options = {
    bucket: s3Config.bucket,
    region: "ir-thr-at1",
    accessKey: s3Config.accessKey,
    secretKey: s3Config.secretKey,
    host: `${s3Config.bucket}.s3.${s3Config.region}.arvanstorage.ir`,
  };
  const localUri = Platform.OS === "ios" ? uri?.replace("file://", "") : uri;
  const file = {
    uri: localUri,
    name: name,
    type: mime,
  };

  console.log("oooooooo", options);

  //   const upload = RNS3.put(file, options);

  //   console.log("iiiiiii", upload);

  //   upload.then((response) => {
  //     console.log(response);
  //     if (response.status !== 201) {
  //       //   reject({ message: "Failed to upload image to S3" });
  //     } else {
  //       return response?.body?.postResponse?.location;
  //     }
  //   });
  // } catch (error) {
  //   console.log(JSON.stringify(error));

  //   reject(error);
  // }
  //   });
};

//   if (Platform.OS === "web") {
//       const formData = new FormData();
//       formData.append("file", {
//         uri: file.uri,
//         name: file.name,
//         type: file.type,
//       } as any);

//       const response = await fetch(
//         `https://${s3Config.bucket}.s3.${s3Config.region}.arvanstorage.ir/`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) throw new Error("Upload failed on web");

//       return {
//         success: true,
//         url: `https://${s3Config.bucket}.s3.${s3Config.region}.arvanstorage.ir/${file.name}`,
//       };
//     }
