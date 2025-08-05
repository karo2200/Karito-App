import HomeScreen from "@/components/organisms/home/HomeScreen";
import { StyleSheet, View } from "react-native";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});
