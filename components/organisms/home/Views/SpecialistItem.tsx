import CustomImage from "@/components/atoms/CustomImage";
import ThemedText from "@/components/atoms/ThemedText";
import { FontType } from "@/constants/Fonts";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

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
      <CustomImage style={styles.image} src={item?.profileImageUrl} />
      <ThemedText style={styles.title} numberOfLines={2}>
        {item?.firstName} {item?.lastName}
        {"\n"}({item?.serviceSubCategory?.name})
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
