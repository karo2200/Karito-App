import { FlatList, FlatListProps } from "react-native";

export type CustomFlatListProps = FlatListProps<any> & {
  isLoading?: boolean;
};

export default function CustomFlatList({
  isLoading = false,
  ...rest
}: CustomFlatListProps) {
  return <FlatList {...rest} />;
}
