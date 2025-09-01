import React from "react";

import { ThemedContainer } from "@/components";
import VerificationStep from "@/components/organisms/Registration/Views/VerificationStep";
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
