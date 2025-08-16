import React from "react";

import { ThemedContainer } from "@/components";
import PersonalInfo from "@/components/organisms/PersonalInfo/PersonalInfo";
import { StyleSheet } from "react-native";

const PersonalInfoPage = () => {
  return (
    <ThemedContainer style={styles.container}>
      <PersonalInfo />
    </ThemedContainer>
  );
};

export default PersonalInfoPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
