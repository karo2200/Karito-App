import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { CustomImage, ThemedText, ThemedView } from "@/components";
import KeyboardAutoHide from "@/components/atoms/KeyboardAutoHide";
import ThemedCodeFeild from "@/components/atoms/ThemedCodeFeild";
import { Colors } from "@/constants/Colors";
import { DeviceHeight, DeviceWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { StyleSheet, View } from "react-native";
import useOtpHook from "./hooks/otp.hook";
import Footer from "./views/Footer";
import AuthHeader from "./views/Header";

const schema = yup.object().shape({
  otpCode: yup
    .string()
    .length(4, "کد چهار رقمی را وارد کنید")
    .required("لطفا کد دریافت شده را وارد کنید"),
});

const OTPSection = () => {
  const { isVerifying, onDoLogin, phoneNumber } = useOtpHook();

  const [isTimerActive, setIsTimerActive] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, secondsLeft]);

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = methods;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

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
            <ThemedCodeFeild length={4} name="otpCode" />
            {isTimerActive ? (
              <ThemedText
                style={{ color: Colors.hint500, textAlign: "center" }}
              >{`${formatTime(secondsLeft)} تا تلاش مجدد`}</ThemedText>
            ) : (
              <ThemedText
                style={{ color: Colors.hint500, textAlign: "center" }}
              >
                تلاش مجدد
              </ThemedText>
            )}
            <ThemedText
              fontType="bold"
              style={{ color: Colors.hint500, textAlign: "center" }}
            >
              ویرایش شماره تلفن همراه
            </ThemedText>
          </ThemedView>
        </View>
        <Footer
          onPress={handleSubmit(onDoLogin)}
          isNextLoading={isVerifying}
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
    width: DeviceWidth - 40,
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
});
