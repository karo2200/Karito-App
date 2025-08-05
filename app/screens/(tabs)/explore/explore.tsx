import { ScrollView, StyleSheet } from "react-native";

import HeaderSection from "./HeaderSection";

export default function TabTwoScreen() {
  return (
    <ScrollView style={{ flex: 1, marginTop: 100 }}>
      <HeaderSection />
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
