import {
  Image,
  ImageProps,
  ImageResizeMode,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";

export type CustomImageProps = ImageProps & {
  src?: string;
  resizeMode?: ImageResizeMode | undefined;
  localSource?: ImageSourcePropType;
};

export default function CustomImage({
  src,
  style,
  resizeMode = "contain",
  localSource,
}: CustomImageProps) {
  return (
    <Image
      source={localSource ?? { uri: src }}
      style={[styles.fullView, style]}
      resizeMode={resizeMode}
    />
  );
}

const styles = StyleSheet.create({
  fullView: { width: "100%", height: "100%" },
});
