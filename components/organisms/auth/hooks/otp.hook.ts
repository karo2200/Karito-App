import { UserType, useAuth_VerifyOtpMutation } from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import useUserStore from "@/stores/loginStore";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";

export default function useOtpHook() {
  const { mutate } = useAuth_VerifyOtpMutation();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

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

  return {
    isVerifying,
    phoneNumber,

    onDoLogin,
  };
}
