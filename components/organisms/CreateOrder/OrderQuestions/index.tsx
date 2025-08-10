import CustomRadioGroup from "@/components/atoms/CustomRadioGroup";
import { FormProvider, useForm } from "react-hook-form";

export default function OrderQuestions() {
  const { ...methods } = useForm<Record<string, any>, object>({
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <CustomRadioGroup
        label="فضای مد نظر شما برای دریافت سفارش چگونه است؟"
        data={[
          {
            label: "فضای مسکونی",
            value: 12,
            index: 0,
          },
          {
            label: "فضای تجاری",
            value: 124,
            index: 1,
          },
        ]}
        name={"mm"}
      />
    </FormProvider>
  );
}
