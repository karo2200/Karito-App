import { View, type ViewProps } from "react-native";

import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = Colors.background;

  return (
    <View
      style={[{ backgroundColor, alignItems: "flex-end" }, style]}
      {...otherProps}
    />
  );
}
