import { DimensionValue, View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  height?: number;
  width?: DimensionValue;
};

export default function Divider({
  height = 20,
  width = "100%",
}: ThemedViewProps) {
  return <View style={{ height, width }} />;
}
