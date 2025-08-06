import ThemedContainer from "@/components/atoms/ThemedContainer";
import { ScrollView } from "react-native";
import ServiceBodySection from "./ServiceBodySection";
import ServiceHeaderSection from "./ServiceHeaderSection";

export default function ServiceOrg() {
  return (
    <ThemedContainer>
      <ScrollView style={{ flex: 1 }}>
        <ServiceHeaderSection />
        <ServiceBodySection />
      </ScrollView>
    </ThemedContainer>
  );
}
