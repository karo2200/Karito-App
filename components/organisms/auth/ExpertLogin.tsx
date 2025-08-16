import React, { Fragment } from "react";

import ExpertIcon from "@/assets/icons/ExpertIcon";
import { ThemedText } from "@/components";
import KeyboardAutoHide from "@/components/atoms/KeyboardAutoHide";
import ThemedInput from "@/components/atoms/ThemedInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import Footer from "./views/Footer";

const schema = yup.object().shape({
  phone: yup
    .string()
    .length(11, "شماره موبایل بدرستی وارد نشده است")
    .required("لطفا شماره موبایل خود را وارد کنید"),
});

const ExpertLogin = () => {
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
    router.push(`/ExpertRegisterPage?phone=${formData?.phone}`);
  };

  return (
    <Fragment>
      <KeyboardAutoHide>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <ThemedText
              fontType="bold"
              type="defaultSemiBold"
              style={{ marginVertical: 17 }}
            >
              کسب درآمد از حرفه و تخصص!
            </ThemedText>
            <ThemedText>
              با ثبت‌نام در کاریتو برای تخصص خود مشتری پیدا کنید و به کسب درآمد
              روزانه بپردازید.
            </ThemedText>

            <ThemedText
              fontType="bold"
              type="defaultSemiBold"
              style={{ marginTop: "10%", marginBottom: 16 }}
            >
              تکمیل ثبت‌نام
            </ThemedText>
            <ThemedInput
              label="لطفا شماره موبایل خود را وارد کنید."
              {...register("phone")}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              keyboardType="numeric"
              maxLength={11}
            />
            <Footer
              title="ثبت نام"
              onPress={handleSubmit(onPress)}
              hasError={
                errors?.["phone"]?.message?.length > 0 ||
                getValues("phone")?.length < 1 ||
                !getValues("phone")
                  ? true
                  : false
              }
              style={styles.button}
            />
          </View>
        </FormProvider>
      </KeyboardAutoHide>
      <ExpertIcon style={styles.image} />
    </Fragment>
  );
};

export default ExpertLogin;

const styles = StyleSheet.create({
  button: { position: "relative", bottom: 0, marginTop: 16 },

  form: {
    width: "100%",
    flex: 1,
  },

  image: {
    alignSelf: "flex-start",
    zIndex: 1,
    left: "-5%",
  },
});
