import { ThemedButton, ThemedView } from "@/components";
import CustomRadioGroup from "@/components/atoms/CustomRadioGroup";
import { Colors } from "@/constants/Colors";
import { Edit } from "iconsax-react-native";

import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";

export default function AddressList() {
  const { ...methods } = useForm<Record<string, any>, object>({
    mode: "onChange",
  });

  return (
    <ThemedView style={styles.container}>
      <FormProvider {...methods}>
        <CustomRadioGroup
          label="آدرس سفارش خود را انتخاب کنید:"
          data={[
            {
              label:
                "تهران، خیابان ولیعصر، نرسیده به اسفندیاری، بعد از کوچه ناصری، برج",
              value: 12,
              index: 0,
            },
            {
              label:
                "تهران، خیابان ولیعصر، نرسیده به اسفندیاری، بعد از کوچه ناصری، برج برج یمه بهث",
              value: 124,
              index: 1,
            },
          ]}
          name={"mm"}
          RightIcon={<Edit size={24} color={Colors.gray500} />}
        />
      </FormProvider>
      <ThemedButton
        title="افزودن آدرس جدید"
        fontType={"bold"}
        style={styles.btn}
        type="outline"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  btn: { width: "100%", marginTop: 70 },

  container: { width: "100%" },
});
