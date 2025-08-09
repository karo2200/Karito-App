import { StyleSheet, Text, type TextProps } from "react-native";

import { FontType } from "@/constants/Fonts";
import { useThemeColor } from "../../hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "text";
  fontType?: "bold" | "regular" | "medium";
};

export default function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  fontType = "regular",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "text" ? styles.text : undefined,
        style,
        {
          fontFamily:
            fontType === "bold"
              ? FontType.YekanBakhBold
              : fontType === "regular"
              ? FontType.YekanBakhRegular
              : FontType.YekanBakhMedium,
          fontWeight: fontType === "bold" ? "700" : "400",
          textAlign: "right",
        },
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: FontType.YekanBakhBold,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  text: {
    fontSize: 12,
    fontWeight: "400",
    color: "#000000",
    textAlign: "right",
  },
});
