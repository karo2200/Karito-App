import React from "react";

import { ThemedContainer } from "@/components";
import LoginSection from "@/components/organisms/auth/Login";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { StyleSheet } from "react-native";

const LoginScreen = () => {
  return (
    <ThemedContainer style={styles.container}>
      <LoginSection />
    </ThemedContainer>
  );
};

export default LoginScreen;

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

  font: {
    fontSize: 48,
    fontFamily: FontType.YekanBakhHeavy,
    color: Colors.hint500,
  },

  container: {
    paddingHorizontal: 15,
  },
});
