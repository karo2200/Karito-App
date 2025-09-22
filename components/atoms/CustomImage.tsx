import { ImageProps, ImageSourcePropType, StyleSheet } from "react-native";

import { Image, ImageContentFit } from "expo-image";

export type CustomImageProps = ImageProps & {
  src?: string;
  resizeMode?: ImageContentFit | undefined;
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
      contentFit={resizeMode}
    />
  );
}

const styles = StyleSheet.create({
  fullView: { width: "100%", height: "100%" },
});
