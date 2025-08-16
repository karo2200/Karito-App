import React from "react";

import { ThemedContainer } from "@/components";
import BeComeExpert from "@/components/organisms/Registration/BeComeExpert";
import { StyleSheet } from "react-native";

const ExpertRegisterPage = () => {
  return (
    <ThemedContainer style={styles.container}>
      <BeComeExpert />
    </ThemedContainer>
  );
};

export default ExpertRegisterPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
