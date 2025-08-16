import React from "react";

import { ThemedButton, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceHeight, DeviceWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { StyleSheet, Text, ViewStyle } from "react-native";

type FooterProps = {
  onPress: () => void;
  hasError?: boolean;
  title?: string;
  style?: ViewStyle;
};

const Footer = ({ onPress, hasError, title = "ورود", style }: FooterProps) => {
  return (
    <ThemedView style={[styles.button, style]}>
      <ThemedButton
        title={title}
        disabled={hasError}
        onPress={onPress}
        disabledColor={Colors.hint50}
        disabledTextColor={Colors.mediumGray}
      />
      <Text style={styles.txt}>
        ورود به منزله پذیرش
        <Text style={styles.color}> قوانین و مقررات</Text> کاریتو است.
      </Text>
    </ThemedView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: DeviceHeight * 0.15,
    width: DeviceWidth - 30,
    alignSelf: "center",
    zIndex: 1,
  },

  txt: {
    textAlign: "right",
    fontFamily: FontType.YekanBakhMedium,
    fontSize: 11,
    marginTop: 8,
  },

  color: { color: Colors.hint500 },
});
