import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export default function ServiceItem({
  style,
}: {
  style: ViewStyle | undefined;
}) {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={require("../../../../assets/images/Home-Banner.png")}
        resizeMode="cover"
        borderRadius={4}
      />
      <ThemedText type="default" style={styles.title} numberOfLines={1}>
        اثاث کشی با کامیون
      </ThemedText>
      <TouchableOpacity style={styles.btn}>
        <ThemedText style={styles.buttonText}>سفارش</ThemedText>
      </TouchableOpacity>
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
    paddingHorizontal: 4,
    paddingVertical: 8,
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
  },

  buttonText: {
    color: "white",
  },

  btn: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.hint500,
    height: 36,
    width: "100%",
    justifyContent: "center",
  },
});
