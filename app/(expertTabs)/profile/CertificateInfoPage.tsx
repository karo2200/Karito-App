import React from "react";

import { ThemedContainer } from "@/components";
import CertificateInfo from "@/components/organisms/CertificateInfo/CertificateInfo";
import { StyleSheet } from "react-native";

const CertificateInfoPage = () => {
  return (
    <ThemedContainer style={styles.container}>
      <CertificateInfo />
    </ThemedContainer>
  );
};

export default CertificateInfoPage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
