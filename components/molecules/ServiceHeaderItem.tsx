import { CustomImage, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity } from "react-native";

export type HeaderItemProps = {
  Icon?: any;
  title?: string;
  imagePath?: string;
  height?: number;
  onItemPress?: () => void;
  selectedItem?: any;
  id?: number;
};

export default function HeaderItem({
  Icon,
  title,
  imagePath,
  height = 64,
  selectedItem,
  onItemPress,
  id,
}: HeaderItemProps) {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <ThemedView style={styles.container}>
        <ThemedView style={[styles.imgContainer, { height, width: height }]}>
          {imagePath ? (
            <CustomImage src={imagePath} resizeMode="cover" />
          ) : Icon ? (
            <Icon color={Colors.hint500} size={24} />
          ) : (
            <></>
          )}
        </ThemedView>
        <ThemedText>{title}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray50,
    overflow: "hidden",
    marginBottom: 12,
  },
  selectedImgContainer: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray50,
    overflow: "hidden",
    marginBottom: 12,
  },

  container: { alignItems: "center", marginLeft: 34 },
});
