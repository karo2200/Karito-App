import { Colors } from "@/constants/Colors";
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  StyleSheet,
  View,
} from "react-native";

export type CustomFlatListProps = FlatListProps<any> & {
  isLoading?: boolean;
  ref?: any;
};

export default function CustomFlatList({
  isLoading = false,
  ref,
  ...rest
}: CustomFlatListProps) {
  if (isLoading)
    return (
      <View style={styles.loadView}>
        <ActivityIndicator color={Colors.hint500} />
      </View>
    );
  return <FlatList {...rest} ref={ref} />;
}

const styles = StyleSheet.create({
  loadView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
