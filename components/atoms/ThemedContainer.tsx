import { useThemeColor } from "@/hooks/useThemeColor";
import { useMemo } from "react";
import { Dimensions, Platform, View, type ViewProps } from "react-native";

const { width } = Dimensions.get("screen");

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export default function ThemedContainer({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const isWeb = Platform.OS === "web";
  const isLargeScreen = width > 600;

  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const containerStyle = useMemo(() => {
    return {
      flex: 1,
      backgroundColor,
    };
  }, []);

  return (
    <View
      style={[
        containerStyle,
        style,
        (isWeb || isLargeScreen) && {
          maxWidth: 480,
          alignSelf: "center",
          width: "100%",
        },
      ]}
      {...otherProps}
    />
  );
}
