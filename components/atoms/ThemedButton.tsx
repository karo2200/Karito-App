import { Colors } from "@/constants/Colors";
import { JSX } from "react";
import {
  ButtonProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedText } from "..";

type ThemedButtonProps = ButtonProps & {
  type?: "outline" | "filled";
  style?: StyleProp<ViewStyle>;
  fontType?: "bold" | "regular" | "medium";
  rightIcon?: JSX.Element;
  LeftIcon?: JSX.Element;
};

export default function ThemedButton({
  type,
  title,
  onPress,
  style,
  fontType,
  disabled,
  rightIcon,
  LeftIcon,
  ...rest
}: ThemedButtonProps) {
  return (
    <View
      style={[
        disabled
          ? styles.disabled
          : type === "outline"
          ? styles.outline
          : styles.filled,
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={styles.flex1}
        disabled={disabled}
      >
        <ThemedText
          style={
            disabled
              ? styles.textFilledColor
              : type == "outline"
              ? styles.textColor
              : styles.textFilledColor
          }
          fontType={fontType}
        >
          {title}
        </ThemedText>
        {rightIcon}
      </TouchableOpacity>
      {LeftIcon && LeftIcon}
    </View>
  );
}

const styles = StyleSheet.create({
  outline: {
    borderColor: Colors.hint500,
    backgroundColor: Colors.background,
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    flexDirection: "row",
  },

  textColor: { color: Colors.hint500 },
  textFilledColor: { color: Colors.white },

  filled: {
    borderColor: Colors.hint500,
    backgroundColor: Colors.hint500,
    borderWidth: 1,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    flexDirection: "row",
  },

  disabled: {
    backgroundColor: Colors.gray300,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    flexDirection: "row",
  },

  flex1: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
