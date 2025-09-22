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
  backgroundColor?: string;
  padding?: number;
};

export default function HeaderItem({
  Icon,
  title,
  imagePath,
  height = 64,
  selectedItem,
  onItemPress,
  id,
  backgroundColor,
  padding,
}: HeaderItemProps) {
  return (
    <TouchableOpacity onPress={onItemPress} disabled={!onItemPress}>
      <ThemedView style={styles.container}>
        <ThemedView
          style={[
            selectedItem && selectedItem?.id === id
              ? styles.selectedImgContainer
              : styles.imgContainer,
            { height, width: height },
            backgroundColor && {
              backgroundColor,
              padding,
            },
          ]}
        >
          {imagePath ? (
            <CustomImage src={imagePath} resizeMode="cover" />
          ) : Icon ? (
            <Icon color={Colors.hint500} size={24} />
          ) : (
            <></>
          )}
        </ThemedView>
        <ThemedText
          numberOfLines={2}
          style={{ width: height, textAlign: "center" }}
        >
          {title}
        </ThemedText>
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
    borderColor: Colors.gray50,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 2,
    padding: 15,
  },
  selectedImgContainer: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.hint50,
    borderColor: Colors.hint500,
    overflow: "hidden",
    marginBottom: 12,
    borderWidth: 2,
    padding: 15,
  },

  container: { alignItems: "center", marginLeft: 34 },
});
