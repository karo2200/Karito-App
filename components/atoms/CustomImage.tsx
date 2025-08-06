import { Image, ImageProps, ImageResizeMode, StyleSheet } from "react-native";

export type CustomImageProps = ImageProps & {
  src: string;
  resizeMode?: ImageResizeMode | undefined;
};

export default function CustomImage({
  src,
  style,
  resizeMode = "contain",
}: CustomImageProps) {
  return (
    <Image
      source={{ uri: src }}
      style={[styles.fullView, style]}
      resizeMode={resizeMode}
    />
  );
}

const styles = StyleSheet.create({
  fullView: { width: "100%", height: "100%" },
});
