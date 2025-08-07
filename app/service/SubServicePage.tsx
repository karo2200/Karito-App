import { SubServiceOrg } from "@/components";
import { StyleSheet, View } from "react-native";

export default function SubServicePage() {
  return (
    <View style={styles.container}>
      <SubServiceOrg />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
