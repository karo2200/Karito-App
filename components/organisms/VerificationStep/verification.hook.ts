import { useToast } from "@/components/atoms/Toast";
import { useSpecialist_UpdateIdentityVerificationVideoMutation } from "@/generated/graphql";
import { useUploadFile } from "@/graphql/upload";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

const textList = [
  "تمام رخ روبروی دوربین جلوی گوشی قرار بگیرید.",
  "کارت ملی خود را رو به دوربین در دست نگه دارید طوری که واضح دیده شود ولی صورت شما را نپوشاند.",
  "سپس دکمه ضبط ویديو را بزنید و وارد صفحه بعد شوید.",
  "متن زیر را به صورت شمرده بخوانید.",
  "من رضا یوسفی تمامی قوانین کاریتو را پذیرفته و تعهد کامل نسبت به انجام آن‌ها دارم.",
];

export default function useVerificationVideoHook() {
  const { mutate: upload, isPending } = useUploadFile();
  const [video, setVideo] = useState<any>();
  const [isSendingVideo, setIsSendingVideo] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState(false);

  const cameraRef = useRef<any>(null);
  const router = useRouter();
  const { showToast } = useToast();
  const { mutate } = useSpecialist_UpdateIdentityVerificationVideoMutation();

  function doVerification(url: string) {
    mutate(
      { input: { newVideoUrl: url } },
      {
        onSuccess: (data) => {
          setIsSendingVideo(false);
          if (
            data?.specialist_updateIdentityVerificationVideo?.status?.code === 1
          ) {
            router?.back();
          } else {
            showToast({
              message:
                data?.specialist_updateIdentityVerificationVideo?.status
                  ?.message,
              type: "error",
            });
          }
        },
        onError: (errorData) => {
          setIsSendingVideo(false);
          showToast({ message: "خطایی پیش آمده است", type: "error" });
        },
      }
    );
  }

  const sendVideo = async () => {
    setIsSendingVideo(true);
    const fileInfo = await FileSystem.getInfoAsync(video);
    upload(
      {
        uri: video,
        type: "video/mp4",
        name: `${Date.now()}-video.mp4`,
        size: fileInfo?.size,
      },
      {
        onSuccess: (url) => {
          console.log({ url });
          if (!url) {
            setIsSendingVideo(false);
            return;
          }
          doVerification(url);
        },
        onError: (error) => {
          setIsSendingVideo(false);
          showToast({ message: "لطفا دوباره تلاش کنید" });
        },
      }
    );
  };

  const recordVideo = async () => {
    setIsRecording(true);
    setVideo(undefined);
    if (cameraRef.current) {
      if (isRecording) {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } else {
        try {
          setIsRecording(true);
          const video = await cameraRef.current.recordAsync();
          console.log(JSON.stringify({ video }));
          setVideo(video.uri);
          setIsRecording(false);
        } catch (error) {
          console.error("Error al grabar video:", error);
        }
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  return {
    sendVideo,
    isSendingVideo,

    textList,
    cameraRef,
    video,
    isRecording,

    stopRecording,
    recordVideo,
  };
}
