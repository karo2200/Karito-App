import { useSpecialist_UpdateSpecializedDocumentsMutation } from "@/generated/graphql";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function useCertificateInfoHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { mutate: documentsMutate, isPending: documentPending } =
    useSpecialist_UpdateSpecializedDocumentsMutation();

  const onRegistrationPress = (formData: any) => {
    console.log("fffffff", formData);
  };

  return {
    router,
    onRegistrationPress,
    documentPending,
  };
}
