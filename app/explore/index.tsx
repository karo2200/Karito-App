import ServiceOrg from "@/components/organisms/service/ServiceOrg";
import { StyleSheet, View } from "react-native";

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ServiceOrg />
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
