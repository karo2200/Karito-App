import { StyleSheet } from "react-native";

import { Home2 } from "iconsax-react-native";
import { ThemedText } from "../../../components/atoms/ThemedText";
import { ThemedView } from "../../../components/atoms/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">خدمات</ThemedText>
      <ThemedView style={{ alignItems: "center", justifyContent: "center" }}>
        <ThemedView style={{ backgroundColor: "#0f0", borderRadius: 10 }}>
          <Home2 color="#f00" size={22} />
        </ThemedView>
        <ThemedText>تمییزکاری و نظافت</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
