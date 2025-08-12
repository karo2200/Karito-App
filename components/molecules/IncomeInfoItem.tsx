import { Colors } from "@/constants/Colors";
import { ThemedText, ThemedView } from "..";

import { StyleSheet } from "react-native";

export default function IncomeInfoItem({ item, index }) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.rowView}>
        <ThemedText style={styles.dateTxt}>1404/08/02 - 13:11</ThemedText>
        <ThemedText style={styles.valueTxt}>۴٫۹۰۰٫۰۰۰+ ریال</ThemedText>
      </ThemedView>
      <ThemedText style={styles.customerTxt}>اسم مشتری</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 16,
    width: "100%",
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },

  dateTxt: { color: Colors.infoDark, fontSize: 12 },

  valueTxt: { color: Colors.successDark },

  customerTxt: { color: Colors.link25, lineHeight: 32 },
});
