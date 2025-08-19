import React, { useEffect, useRef, useState } from "react";

import { ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet } from "react-native";
import useOtpHook from "../hooks/otp.hook";

const Timer = () => {
  const { onSendOtp, isSendingCode } = useOtpHook();
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(60);

  const intervalRef = useRef<any>();

  const onStartTimer = () => {
    clearInterval(intervalRef.current);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    intervalRef.current = interval;
  };

  useEffect(() => {
    onStartTimer();
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) setIsTimerActive(false);
    else setIsTimerActive(true);
  }, [secondsLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const onRetryPress = () => {
    clearInterval(intervalRef.current);
    onSendOtp?.(onStartTimer);
  };

  return (
    <>
      {isSendingCode ? (
        <ActivityIndicator />
      ) : isTimerActive ? (
        <ThemedText
          style={styles.timerTxt}
        >{`${formatTime(secondsLeft)}`}</ThemedText>
      ) : (
        <ThemedText style={styles.retryTxt} onPress={onRetryPress}>
          تلاش مجدد
        </ThemedText>
      )}
    </>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timerTxt: { color: Colors.darkGray, textAlign: "center" },

  retryTxt: {
    color: Colors.hint500,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
