import { useState } from "react";

const configDatas = [
  { type: "address" },
  { type: "selectDate" },
  { type: "gender" },
  { type: "question" },
  { type: "previewOrder" },
  { type: "orderSubmitting" },
];

export default function useCreateOrder() {
  const steps = configDatas.length - 1;
  const [stage, setStage] = useState<number>(0);

  const nextDisabled = stage === steps;

  const onNextPress = () => setStage((prev) => prev + 1);
  const onBackPress = () => {
    if (stage > 0) setStage((prev) => prev - 1);
  };

  return {
    progressPersent: ((stage + 1) / (steps + 1)) * 100,
    setStage,
    stage,
    nextDisabled,

    configDatas,

    onNextPress,
    onBackPress,
  };
}
