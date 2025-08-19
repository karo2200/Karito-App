import { useToast } from "@/components/atoms/Toast";
import {
  UserType,
  useAuth_RequestOtpMutation,
  useAuth_VerifyOtpMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import useUserStore from "@/stores/loginStore";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

export default function useOtpHook() {
  const { mutate } = useAuth_VerifyOtpMutation();
  const { mutate: requestOtpMutate } = useAuth_RequestOtpMutation();

  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);

  const toast = useToast();

  const { setIsExpert, setIsLoggedIn } = useUserStore();
  const { setAccessToken, setRefreshToken } = authCacheStore();

  const { params } = useRoute();

  const phoneNumber = params?.phone;

  const onDoLogin = (formData: any) => {
    setIsVerifying(true);
    mutate(
      { phoneNumber, userType: UserType.Customer, otp: formData?.otpCode },
      {
        onSuccess: (data) => {
          setIsVerifying(false);
          if (data?.auth_verifyOtp.status?.code === 1) {
            setAccessToken(data?.auth_verifyOtp?.result?.accessToken ?? "");
            setRefreshToken(data?.auth_verifyOtp?.result?.refreshToken ?? "");
            setIsExpert(false);
            setIsLoggedIn(true);
          }
        },
      }
    );
  };

  const onSendOtp = (continueFunc: () => void) => {
    setIsSendingCode(true);
    requestOtpMutate(
      { phoneNumber, userType: UserType.Customer },
      {
        onSuccess: (data) => {
          setIsSendingCode(false);
          if (data?.auth_requestOtp?.status?.code === 1) {
            setIsSendingCode(false);
            continueFunc?.();
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
    isVerifying,
    phoneNumber,
    isSendingCode,

    onDoLogin,
    onSendOtp,
  };
}
