import { StyleSheet, Text, type TextProps } from "react-native";

import { Colors } from "@/constants/Colors";
import { FontStyle, FontType } from "@/constants/Fonts";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "text"
    | "header";
  fontType?:
    | "bold"
    | "regular"
    | "medium"
    | "extraBold"
    | "thin"
    | "semiBold"
    | "light";
  hasNumber?: boolean;
};

export default function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  fontType = "regular",
  hasNumber = false,
  ...rest
}: ThemedTextProps) {
  const color = Colors.black;

  return (
    <Text
      style={[
        { color },
        {
          fontFamily: hasNumber
            ? FontType.Shabnam
            : FontStyle?.[fontType]
              ? FontStyle[fontType]
              : FontType.YekanBakhMedium,
          textAlign: "right",
        },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        type === "text" ? styles.text : undefined,
        type === "header" ? styles.header : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    fontWeight: "400",
  },
  title: {
    fontSize: 14,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 24,
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
  header: {
    fontSize: 48,
  },
});
