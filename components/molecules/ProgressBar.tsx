import { Colors } from "@/constants/Colors";
import React, { JSX } from "react";
import { StyleSheet, View } from "react-native";

export function ProgressBar({
  percent,
  bg = Colors.hint50,
  color = Colors.hint500,
  height = 6,
}: {
  percent: number;
  bg?: string;
  color?: string;
  height?: number;
}): JSX.Element {
  return (
    <View
      style={[
        styles.progressContainer,
        { height, backgroundColor: bg, borderColor: bg },
      ]}
    >
      <View
        style={[
          styles.progress,
          { width: `${percent}%`, backgroundColor: color, borderColor: color },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 16,
    marginTop: 8,
    borderRadius: 200,
  },

  progress: {
    height: "100%",
    borderRadius: 200,
  },
});
