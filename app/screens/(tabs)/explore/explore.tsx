import { ServiceHeaderSection } from "@/components";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import { ScrollView, StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <ThemedContainer>
      <ScrollView style={{ flex: 1, marginTop: 100 }}>
        <ServiceHeaderSection />
      </ScrollView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
