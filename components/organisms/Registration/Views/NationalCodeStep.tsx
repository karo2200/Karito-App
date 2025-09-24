import React from "react";

import KeyboardAutoHide from "@/components/atoms/KeyboardAutoHide";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedInput from "@/components/atoms/ThemedInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import useExpertHook from "../hooks/Expert.hook";

const schema = yup.object().shape({
  phone: yup
    .string()
    .length(11, "شماره موبایل بدرستی وارد نشده است")
    .required("لطفا شماره موبایل خود را وارد کنید"),
  code: yup
    .string()
    .matches(/^[0-9]+$/, "لطفا فقط اعداد انگلیسی وارد کنید")
    .length(4, "کد چهار رقمی را وارد کنید")
    .length(10, "کد ملی بدرستی وارد نشده است")
    .required("لطفا کد ملی خود را وارد کنید"),
});

const NationalCodeStep = ({
  onNextPress,
  onPrevPress,
}: {
  onNextPress: () => void;
  onPrevPress: () => void;
}) => {
  const { phoneNumber, onRegistrationPress, nationalCode } = useExpertHook();

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: { phone: phoneNumber, code: nationalCode },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onPress = (formData: any) => {
    onRegistrationPress(formData, onNextPress);
  };

  return (
    <KeyboardAutoHide>
      <FormProvider {...methods}>
        <ScreenNameWithBack title="ثبت‌نام" onBackPress={onPrevPress} />
        <View style={styles.form}>
          <ThemedInput
            label="شماره همراه *"
            {...register("phone")}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            keyboardType="numeric"
            maxLength={11}
            readOnly={true}
            forcePersianNumbers
          />
          <ThemedInput
            label="کد ملی *"
            {...register("code")}
            placeholder="0000000000"
            keyboardType="numeric"
            maxLength={10}
            forcePersianNumbers
            style={styles.margin}
          />
        </View>

        <ThemedButton
          title="ثبت و ادامه"
          style={styles.button}
          onPress={handleSubmit(onPress)}
        />
      </FormProvider>
    </KeyboardAutoHide>
  );
};

export default NationalCodeStep;

const styles = StyleSheet.create({
  button: { position: "relative", bottom: "8%" },

  form: {
    width: "100%",
    flex: 1,
  },

  margin: { marginTop: 16 },
});
