import { ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { HambergerMenu } from "iconsax-react-native";

export default function TabTwoScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <ThemedText>خدمات</ThemedText>
      <ThemedView>
        <ThemedView>
          <HambergerMenu color="#f00" />
          <ThemedText>همه خدمات</ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
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
