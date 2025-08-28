import { useSpecialist_UpdateIdCardMutation } from "@/generated/graphql";
import useUserStore from "@/stores/loginStore";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function usePersonalInfoHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { setIsLoggedIn } = useUserStore();

  const { mutate: uploadcardMutate, isPending: uploadCardPending } =
    useSpecialist_UpdateIdCardMutation();

  const onRegistrationPress = (formData: any) => {
    console.log("fffffff", formData);
    setIsLoggedIn(true);
  };

  return {
    router,
    onRegistrationPress,
    uploadCardPending,
  };
}
