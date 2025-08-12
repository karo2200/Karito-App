import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceHeight } from "@/constants/Dimension";
import { StyleSheet } from "react-native";

export default function AuthHeader() {
  return (
    <ThemedView style={styles.margin}>
      <ThemedText type="header" style={styles.font} fontType="bold">
        کاریتو
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  font: {
    color: Colors.hint500,
  },

  margin: { marginTop: DeviceHeight * 0.27 },
});
