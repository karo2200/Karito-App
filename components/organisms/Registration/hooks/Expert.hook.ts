import {
  useSpecialist_GetMyProfileQuery,
  useUser_UpdateProfileMutation,
} from "@/generated/graphql";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function useExpertHook() {
  const router = useRouter();

  const { params } = useRoute();

  const [page, setPage] = useState<number>(1);
  const [exitVisible, setExitVisible] = useState<boolean>(false);

  const { mutate, isPending } = useUser_UpdateProfileMutation();

  const { data: expertData } = useSpecialist_GetMyProfileQuery();
  console.log("........", expertData);

  const onRegistrationPress = (formData: any) => {
    console.log("fffffff", formData);
  };

  return {
    router,
    page,
    setPage,
    exitVisible,
    setExitVisible,
    phoneNumber: params?.phone,
    onRegistrationPress,
    isPending,
  };
}
