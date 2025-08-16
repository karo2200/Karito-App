import React from "react";

import { ThemedContainer } from "@/components";
import ExpertLogin from "@/components/organisms/auth/ExpertLogin";
import { StyleSheet } from "react-native";

const ExpertLoginPage = () => {
  return (
    <ThemedContainer style={styles.container}>
      <ExpertLogin />
    </ThemedContainer>
  );
};

export default ExpertLoginPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
