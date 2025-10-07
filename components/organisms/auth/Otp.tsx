import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { isWeb } from "@/app/_layout";
import { CustomImage, ThemedText, ThemedView } from "@/components";
import KeyboardAutoHide from "@/components/atoms/KeyboardAutoHide";
import ThemedCodeFeild from "@/components/atoms/ThemedCodeFeild";
import { Colors } from "@/constants/Colors";
import { DeviceHeight, DeviceWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { Platform, StyleSheet, View } from "react-native";
import useOtpHook from "./hooks/otp.hook";
import Footer from "./views/Footer";
import AuthHeader from "./views/Header";
import Timer from "./views/Timer";

const schema = yup.object().shape({
  otpCode: yup
    .string()
    .matches(/^[0-9]+$/, "لطفا فقط اعداد انگلیسی وارد کنید")
    .length(4, "کد چهار رقمی را وارد کنید")
    .required("لطفا کد دریافت شده را وارد کنید"),
});

const OTPSection = () => {
  const {
    isVerifying,
    onDoLogin,
    phoneNumber,
    onSendOtp,
    isSendingCode,
    onEditNumber,
  } = useOtpHook();

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = methods;

  return (
    <KeyboardAutoHide>
      <FormProvider {...methods}>
        <View style={styles.form}>
          <CustomImage
            localSource={require("@/assets/images/loginBg.png")}
            style={styles.image}
          />
          <AuthHeader />
          <ThemedText style={styles.subtitle}>
            {`لطفا کد چهار رقمی ارسال شده به شماره ${phoneNumber} را وارد کنید`}
          </ThemedText>
          <ThemedView style={styles.codeContainer}>
            <ThemedView style={styles.otpContainer}>
              <ThemedCodeFeild length={4} name="otpCode" />
            </ThemedView>
            <ThemedView style={styles.absolute}>
              <Timer
                onSendOtp={onSendOtp}
                isSendingCode={isSendingCode}
                continueFunc={() => setValue("otpCode", "")}
              />
              <ThemedText
                fontType="bold"
                onPress={onEditNumber}
                style={styles.editText}
              >
                ویرایش شماره تلفن همراه
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </View>
        <Footer
          onPress={handleSubmit(onDoLogin)}
          isNextLoading={isVerifying || isSendingCode}
          hasError={
            errors?.["otpCode"]?.message?.length > 0 ||
            !getValues("otpCode") ||
            getValues("otpCode")?.length < 4
              ? true
              : false
          }
        />
      </FormProvider>
    </KeyboardAutoHide>
  );
};

export default OTPSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    width: Platform.OS === "web" ? "100%" : DeviceWidth - 40,
    alignItems: "flex-end",
    alignSelf: "center",
  },

  subtitle: {
    fontSize: 16,
    fontFamily: FontType.YekanBakhRegular,
    color: Colors.black,
  },

  image: {
    alignSelf: "flex-end",
    width: DeviceWidth * 0.5,
    height: DeviceHeight * 0.6,
    position: "absolute",
    zIndex: 1,
  },

  codeContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  absolute: {
    marginVertical: isWeb ? 100 : 0,
    zIndex: 1,
    alignItems: "center",
    marginBottom: 40,
  },

  editText: { color: Colors.hint500, textAlign: "center" },

  otpContainer: { height: 80 },
});
