import { ThemedText, ThemedView } from "@/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function HelpText({ textList }: { textList: string[] }) {
  return (
    <View style={styles.marginTop}>
      {textList?.map((item, index) => (
        <ThemedView key={`${index}`} style={styles.rowView}>
          <ThemedText style={styles.flex1}>
            {index != textList?.length - 1 && <View style={styles.bullet} />}
            {`   ${item}`}
          </ThemedText>
        </ThemedView>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  marginTop: { marginTop: 25 },

  bullet: {
    width: 5,
    height: 5,
    backgroundColor: Colors.black,
    borderRadius: 2.5,
    marginRight: 4,
  },

  rowView: {
    flexDirection: "row",
  },

  flex1: { flex: 1 },
});
