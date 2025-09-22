import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import ThemedText from "../atoms/ThemedText";
import ThemedView from "../atoms/ThemedView";

export default function SubServiceItem({ item, index }) {
  const router = useRouter();
  console.log(JSON.stringify({ item }));
  return (
    <ThemedView style={styles.container}>
      <ThemedText
        style={styles.label}
        onPress={() =>
          router.push(
            `/CreateOrderPage/CreateOrderPage?sub=${item?.id}&name=${item?.name}&price=${item?.basePrice}`
          )
        }
      >
        {item?.name}
      </ThemedText>
    </ThemedView>
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
