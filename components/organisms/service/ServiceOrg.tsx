import ThemedContainer from "@/components/atoms/ThemedContainer";
import { ScrollView, StyleSheet } from "react-native";
import ServiceBodySection from "./ServiceBodySection";
import ServiceHeaderSection from "./ServiceHeaderSection";

export default function ServiceOrg() {
  return (
    <ThemedContainer>
      <ScrollView style={styles.flex1}>
        <ServiceHeaderSection />
        <ServiceBodySection />
      </ScrollView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
});
