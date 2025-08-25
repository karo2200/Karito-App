import { useToast } from "@/components/atoms/Toast";
import { UserType, useAuth_RequestOtpMutation } from "@/generated/graphql";
import { useRouter } from "expo-router";

export default function useLoginHook() {
  const { mutate, isPending } = useAuth_RequestOtpMutation();

  const router = useRouter();
  const toast = useToast();

  const onDoLogin = (formData: any) => {
    mutate(
      { input: { phoneNumber: formData?.phone, userType: UserType.Customer } },
      {
        onSuccess: (data) => {
          if (data?.auth_requestOtp?.status?.code === 1) {
            router.push(`/OTPScreen?phone=${formData?.phone}`);
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

  const onDoExpertLogin = (formData: any) => {
    router.push(`/ExpertOtpPage?phone=${formData?.phone}`);
    mutate(
      {
        input: { phoneNumber: formData?.phone, userType: UserType.Specialist },
      },
      {
        onSuccess: (data) => {
          if (data?.auth_requestOtp?.status?.code === 1) {
            router.push(`/ExpertOtpPage?phone=${formData?.phone}`);
          } else {
            toast.showToast({ message: data?.auth_requestOtp?.status?.value });
          }
        },
        onError: (errorData: any) => {
          toast.showToast({
            message: "خطایی پیش آمده است. لطفا بعدا تلاش کنید",
          });
        },
      }
    );
  };

  return {
    isSendingCode: isPending,
    onDoExpertLogin,
    onDoLogin,
  };
}
