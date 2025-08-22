import React from "react";

import { ThemedContainer } from "@/components";
import ExpertOTPSection from "@/components/organisms/auth/ExpertOTPSection";
import { StyleSheet } from "react-native";

const ExpertOtpPage = () => {
  return (
    <ThemedContainer style={styles.container}>
      <ExpertOTPSection />
    </ThemedContainer>
  );
};

export default ExpertOtpPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
