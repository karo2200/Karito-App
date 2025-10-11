import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedText from "../atoms/ThemedText";

export default function SubServiceItem({ item, index }) {
  const router = useRouter();

  const onPress = () =>
    router.push(
      `/CreateOrderPage/CreateOrderPage?sub=${item?.id}&name=${item?.name}&price=${item?.basePrice}`
    );

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ThemedText style={styles.label}>{item?.name}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.gray900,
    marginRight: 16,
    fontSize: 14,
    fontWeight: "400",
  },

  container: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.grayMedium,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: "100%",
  },
});
