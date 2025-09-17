import { FlatList, FlatListProps } from "react-native";

export type CustomFlatListProps = FlatListProps<any> & {
  isLoading?: boolean;
  ref?: any;
};

export default function CustomFlatList({
  isLoading = false,
  ref,
  ...rest
}: CustomFlatListProps) {
  return <FlatList {...rest} ref={ref} />;
}
