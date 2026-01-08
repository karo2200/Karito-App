import { Colors } from "@/constants/Colors";
import { toPersianNumber } from "@/services/helper";
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { ThemedText } from "..";

type Props = {
  step: number; // 0 تا 4
  size?: number;
  strokeWidth?: number;
};

const TOTAL_STEPS = 3;

const CircularStepProgress: React.FC<Props> = ({
  step,
  size = 52,
  strokeWidth = 6,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(step / TOTAL_STEPS, 1);
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* background circle */}
        <Circle
          stroke={Colors.gray["200"]}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* progress circle */}
        <Circle
          stroke={Colors.hint["600"]}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* center text */}
      <View style={styles.centerContent}>
        <ThemedText fontType="regular" style={styles.text1}>
          مرحله
        </ThemedText>
        <ThemedText fontType="bold" style={styles.text2}>
          {toPersianNumber(`${step ?? 1}  از ۳`)}
        </ThemedText>
      </View>
    </View>
  );
};

export default CircularStepProgress;

const styles = StyleSheet.create({
  centerContent: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text1: {
    fontSize: 12,
    color: Colors.gray500,
    lineHeight: 14,
  },
  text2: {
    fontSize: 12,
    color: Colors.gray["950"],
    lineHeight: 14,
  },
});
