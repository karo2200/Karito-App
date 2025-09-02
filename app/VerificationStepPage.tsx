import React from "react";

import { ThemedContainer, VerificationStep } from "@/components";
import { StyleSheet } from "react-native";

const VerificationStepPage = () => {
  return (
    <ThemedContainer style={styles.container}>
      <VerificationStep />
    </ThemedContainer>
  );
};

export default VerificationStepPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
