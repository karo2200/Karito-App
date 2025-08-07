import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
  height?: number;
};

export default function Divider({ style }: ThemedViewProps) {
  return <View style={{ height: 20 }} />;
}
