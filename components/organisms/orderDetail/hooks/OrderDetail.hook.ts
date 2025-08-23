import useUserStore from "@/stores/loginStore";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform } from "react-native";
import { useGetServiceById } from "./OrderDetail.guery";

export default function useOrderDetailHook() {
  const router = useRouter();

  const { params } = useRoute();

  const [finishWorkVisible, setFinishWorkVisible] = useState(false);
  const [foundLocationVisible, setFoundLocationVisible] = useState(false);
  const [specialistFinishWorkVisible, setSpecialistFinishWorkVisible] =
    useState(false);

  const isDone = true;

  const { isExpert, setIsExpert } = useUserStore();

  const { data: serviceData, isLoading } = useGetServiceById({
    id: params?.id,
  });

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
    serviceData: serviceData?.serviceRequest_getById?.result,
  };
}
