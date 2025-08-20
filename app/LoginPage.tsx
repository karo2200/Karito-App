import React from "react";

import { ThemedContainer } from "@/components";
import LoginSection from "@/components/organisms/auth/Login";
import { StyleSheet } from "react-native";

const LoginPage = () => {
  return (
    <ThemedContainer style={styles.container}>
      <LoginSection />
    </ThemedContainer>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
