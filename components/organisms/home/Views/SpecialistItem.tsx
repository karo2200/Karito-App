import ThemedText from "@/components/atoms/ThemedText";
import { FontType } from "@/constants/Fonts";
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

export default function SpecialistItem({
  item,
  style,
  onItemPress,
}: {
  onItemPress: () => void;
  item: any;
  style?: ViewStyle | undefined;
}) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      activeOpacity={1}
      onPress={onItemPress}
    >
      <Image
        style={styles.image}
        source={require("../../../../assets/images/Home-Banner.png")}
      />
      <ThemedText style={styles.title} numberOfLines={2}>
        محمد مردانی (سلامت و زیبایی)
      </ThemedText>
    </TouchableOpacity>
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
    fontFamily: FontType.YekanBakhRegular,
  },

  image: {
    width: 76,
    height: 76,
    borderRadius: 100,
  },
});
