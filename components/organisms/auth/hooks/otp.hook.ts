import { useToast } from "@/components/atoms/Toast";
import {
  UserType,
  useAuth_RequestOtpMutation,
  useAuth_VerifyOtpMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useRef } from "react";

export default function useOtpHook() {
  const { mutate, isPending: isVerifying } = useAuth_VerifyOtpMutation();
  const { mutate: requestOtpMutate, isPending: isSendingCode } =
    useAuth_RequestOtpMutation();

  const timerRef = useRef<any>(null);

  const toast = useToast();
  const router = useRouter();

  const { setIsExpert, setIsLoggedIn } = authCacheStore();
  const { setAccessToken, setRefreshToken } = authCacheStore();

  const { params } = useRoute();

  const phoneNumber = params?.phone;

  const onDoLogin = (formData: any) => {
    mutate(
      {
        input: {
          phoneNumber,
          userType: UserType.Customer,
          otp: formData?.otpCode,
        },
      },
      {
        onSuccess: (data) => {
          console.log(JSON.stringify({ data }));
          if (data?.auth_verifyOtp.status?.code === 1) {
            setAccessToken(data?.auth_verifyOtp?.result?.accessToken ?? "");
            setRefreshToken(data?.auth_verifyOtp?.result?.refreshToken ?? "");
            setIsExpert(false);
            setIsLoggedIn(true);
            router?.replace("/(tabs)/home");
          } else {
            toast.showToast({ message: data?.auth_verifyOtp?.status?.message });
          }
        },
        onError: (error) => {
          console.log(JSON.stringify({ error }));
        },
      }
    );
  };

  const onDoExpertLogin = (formData: any) => {
    mutate(
      {
        input: {
          phoneNumber,
          userType: UserType.Specialist,
          otp: formData?.otpCode,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.auth_verifyOtp.status?.code === 1) {
            setAccessToken(data?.auth_verifyOtp?.result?.accessToken ?? "");
            setRefreshToken(data?.auth_verifyOtp?.result?.refreshToken ?? "");

            router.push(`/ExpertRegisterPage?phone=${phoneNumber}`);
            setIsExpert(true);
          } else {
            toast.showToast({ message: data?.auth_verifyOtp?.status?.message });
          }
        },
      }
    );
  };

  const onSendOtp = (continueFunc?: () => void) => {
    requestOtpMutate(
      { input: { phoneNumber, userType: UserType.Customer } },
      {
        onSuccess: (data) => {
          console.log(JSON.stringify({ data }));
          if (data?.auth_requestOtp?.status?.code === 1) {
            continueFunc?.();
          } else {
            toast.showToast({ message: data?.auth_requestOtp?.status?.value });
          }
        },
        onError: (errorData: any) => {
          console.log(JSON.stringify({ errorData }));
          toast.showToast({
            message: "خطایی پیش آمده است. لطفا بعدا تلاش کنید",
          });
        },
      }
    );
  };

  const onSendExpertOtp = (continueFunc?: () => void) => {
    requestOtpMutate(
      { input: { phoneNumber, userType: UserType.Specialist } },
      {
        onSuccess: (data) => {
          console.log(JSON.stringify({ data }), "***");
          if (data?.auth_requestOtp?.status?.code === 1) {
            continueFunc?.();
          } else {
            toast.showToast({ message: data?.auth_requestOtp?.status?.value });
          }
        },
        onError: (errorData: any) => {
          console.log("---", JSON.stringify({ errorData }));
          toast.showToast({
            message: "خطایی پیش آمده است. لطفا بعدا تلاش کنید",
          });
        },
      }
    );
  };

  const onEditNumber = () => {
    router?.back();
  };

  return {
    isVerifying,
    phoneNumber,
    isSendingCode,
    onDoExpertLogin,
    onDoLogin,
    onSendOtp,
    onSendExpertOtp,
    router,

    onEditNumber,
    timerRef,
  };
}
