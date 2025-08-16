import useUserStore from "@/stores/loginStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform } from "react-native";

export default function useOrderDetailHook() {
  const router = useRouter();

  const [finishWorkVisible, setFinishWorkVisible] = useState(false);
  const [foundLocationVisible, setFoundLocationVisible] = useState(false);
  const [specialistFinishWorkVisible, setSpecialistFinishWorkVisible] =
    useState(false);

  const isDone = true;

  const { isExpert, setIsExpert } = useUserStore();

  const onBillPress = () => {
    router.push("/order/payment");
  };

  const makeCall = (phoneNumber: string) => {
    if (Platform.OS === "web") {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      console.log("333", phoneNumber);

      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  return {
    finishWorkVisible,
    setFinishWorkVisible,
    onBillPress,
    isDone,
    isExpert,
    makeCall,
    setFoundLocationVisible,
    foundLocationVisible,
    specialistFinishWorkVisible,
    setSpecialistFinishWorkVisible,
  };
}
