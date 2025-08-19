import { useToast } from "@/components/atoms/Toast";
import { UserType, useAuth_RequestOtpMutation } from "@/generated/graphql";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function useLoginHook() {
  const { mutate } = useAuth_RequestOtpMutation();
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();

  const onDoLogin = (formData: any) => {
    setIsSendingCode(true);
    mutate(
      { phoneNumber: formData?.phone, userType: UserType.Customer },
      {
        onSuccess: (data) => {
          setIsSendingCode(false);
          if (data?.auth_requestOtp?.status?.code === 1) {
            setIsSendingCode(false);
            router.push(`/OTPScreen?phone=${formData?.phone}`);
          } else {
            toast.showToast({ message: data?.auth_requestOtp?.status?.value });
          }
        },
        onError: (errorData: any) => {
          setIsSendingCode(false);
          toast.showToast({
            message: "خطایی پیش آمده است. لطفا بعدا تلاش کنید",
          });
        },
      }
    );
  };

  return {
    isSendingCode,

    onDoLogin,
  };
}
