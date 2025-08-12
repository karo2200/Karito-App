import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import ThemedInput from "@/components/atoms/ThemedInput";
import { DeviceWidth } from "@/constants/Dimension";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import Footer from "./views/Footer";
import AuthHeader from "./views/Header";

const schema = yup.object().shape({
  phone: yup
    .string()
    .length(11, "شماره موبایل بدرستی وارد نشده است")
    .required("لطفا شماره موبایل خود را وارد کنید"),
});

const LoginSection = () => {
  const router = useRouter();
  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = methods;

  const onPress = (formData: any) => {
    router.push(`/OTPScreen?phone=${formData?.phone}`);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.form}>
        <AuthHeader />
        <ThemedInput
          label="لطفا شماره موبایل خود را وارد کنید."
          {...register("phone")}
          placeholder="09123456789"
          keyboardType="numeric"
          maxLength={11}
        />
      </View>
      <Footer
        onPress={handleSubmit(onPress)}
        hasError={
          errors?.["phone"]?.message?.length > 0 ||
          getValues("phone")?.length < 1
            ? true
            : false
        }
      />
    </FormProvider>
  );
};

export default LoginSection;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 100,
    width: DeviceWidth - 40,
    alignSelf: "center",
    zIndex: 1,
  },

  form: {
    width: "100%",
    flex: 1,
  },
});
