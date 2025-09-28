import React, { Fragment } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import ExpertIcon from "@/assets/icons/ExpertIcon";
import { ThemedText, ThemedView } from "@/components";
import KeyboardAutoHide from "@/components/atoms/KeyboardAutoHide";
import ThemedCodeFeild from "@/components/atoms/ThemedCodeFeild";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { StyleSheet, View } from "react-native";
import useOtpHook from "./hooks/otp.hook";
import Footer from "./views/Footer";
import Timer from "./views/Timer";

const schema = yup.object().shape({
  otpCode: yup
    .string()
    .matches(/^[0-9]+$/, "لطفا فقط اعداد انگلیسی وارد کنید")
    .length(4, "کد چهار رقمی را وارد کنید")
    .required("لطفا کد دریافت شده را وارد کنید"),
});

const ExpertOTPSection = () => {
  const {
    isVerifying,
    onDoExpertLogin,
    phoneNumber,
    isSendingCode,
    onSendExpertOtp,
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
    <Fragment>
      <KeyboardAutoHide>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <ThemedText style={styles.subtitle}>
              {`لطفا کد چهار رقمی ارسال شده به شماره ${phoneNumber} را وارد کنید`}
            </ThemedText>
            <ThemedView style={styles.codeContainer}>
              <ThemedView style={styles.otpContainer}>
                <ThemedCodeFeild length={4} name="otpCode" />
              </ThemedView>
              <ThemedView style={styles.absolute}>
                <Timer
                  onSendOtp={onSendExpertOtp}
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
            onPress={handleSubmit(onDoExpertLogin)}
            isNextLoading={isVerifying || isSendingCode}
            title="ثبت نام"
            style={{ bottom: 0 }}
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
      <ExpertIcon style={styles.image} />
    </Fragment>
  );
};

export default ExpertOTPSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    width: "100%",
    flex: 1,
    paddingTop: "15%",
  },

  subtitle: {
    fontSize: 16,
    fontFamily: FontType.YekanBakhRegular,
    color: Colors.black,
  },

  image: {
    alignSelf: "flex-start",
    zIndex: 1,
    left: "-5%",
  },

  codeContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },

  timerTxt: { color: Colors.darkGray, textAlign: "center" },

  retryTxt: {
    color: Colors.hint500,
    textAlign: "center",
    textDecorationLine: "underline",
  },

  absolute: {
    position: "absolute",
    top: 80,
    zIndex: 1,
    alignItems: "center",
  },

  editText: { color: Colors.hint500, textAlign: "center" },

  otpContainer: { height: 80 },
});
