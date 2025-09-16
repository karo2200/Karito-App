import OrderSubmittingSvg from "@/assets/icons/OrderSubmitting";
import { Divider, ThemedText, ThemedView } from "@/components";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

export default function OrderSubmittingOrg() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router?.replace("/(tabs)/order");
    }, 2000);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <OrderSubmittingSvg />
      <Divider height={12} />
      <ThemedText type="title" fontType="bold" style={styles.text}>
        در حال ثبت سفارش...
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  text: { textAlign: "center", alignSelf: "center" },
});
