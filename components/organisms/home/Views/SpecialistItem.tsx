import ThemedText from "@/components/atoms/ThemedText";
import { Image, StyleSheet, View } from "react-native";

export default function SpecialistItem() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/Home-Banner.png")}
      />
      <ThemedText style={styles.title} numberOfLines={2}>
        محمد مردانی (سلامت و زیبایی)
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginLeft: 17, alignItems: "center", width: 77 },

  title: {
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 14,
    marginTop: 10,
  },

  image: {
    width: 76,
    height: 76,
    borderRadius: 100,
  },
});
