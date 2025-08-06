import { Dimensions, SafeAreaView, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { useMemo } from "react";

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
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const containerStyle = useMemo(() => {
    return {
      flex: 1,
      backgroundColor,
      width: Dimensions.get("screen").width,
      padding: 20,
    };
  }, []);
  return <SafeAreaView style={[containerStyle, style]} {...otherProps} />;
}
