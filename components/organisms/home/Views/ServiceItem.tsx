import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { Button, Image, StyleSheet, View } from "react-native";

export default function ServiceItem() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/Home-Banner.png")}
        resizeMode="cover"
      />
      <ThemedText type="default" style={styles.title} numberOfLines={1}>
        اثاث کشی با کامیون
      </ThemedText>
      <Button title="سفارش" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },

  title: {
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  image: {
    width: 186,
    height: 186,
    borderRadius: 4,
    margin: 4,
  },
});
