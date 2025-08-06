import { Image, StyleSheet, View } from "react-native";

export default function Banner() {
  return (
    <View>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/Home-Banner.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 223,
    marginTop: 4,
  },
});
