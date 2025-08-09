import { useRouter } from "expo-router";
import { useState } from "react";

export default function useOrderDetailHook() {
  const router = useRouter();

  const [finishWorkVisible, setFinishWorkVisible] = useState(false);

  const onBillPress = () => {
    // setFinishWorkVisible(true);
    router.push("/order/payment");
  };

  return {
    finishWorkVisible,
    setFinishWorkVisible,
    onBillPress,
  };
}
