import { ScrollView } from "react-native";

import { HambergerMenu } from "iconsax-react-native";
import { ThemedText } from "../../../../components/atoms/ThemedText";
import { ThemedView } from "../../../../components/atoms/ThemedView";

export function HeaderItem() {
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

export default function HeaderSection() {
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
