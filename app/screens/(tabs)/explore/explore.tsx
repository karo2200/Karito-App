import { ScrollView, StyleSheet } from "react-native";

import { HambergerMenu } from "iconsax-react-native";
import { ThemedText } from "../../../../components/atoms/ThemedText";
import { ThemedView } from "../../../../components/atoms/ThemedView";

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
