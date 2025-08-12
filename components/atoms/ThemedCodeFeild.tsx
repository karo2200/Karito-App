import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import React from "react";
import { useController } from "react-hook-form";
import { Platform, StyleSheet, Text, TextInputProps } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const autoComplete = Platform.select<TextInputProps["autoComplete"]>({
  android: "sms-otp",
  default: "one-time-code",
});

type ThemedCodeFeildProps = {
  name: string;
  length?: number;
};

export default function ThemedCodeFeild({
  name,
  length = 4,
}: ThemedCodeFeildProps) {
  const { field, fieldState } = useController({ name });

  const ref = useBlurOnFulfill({ value: field.value, cellCount: length });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: field.value,
    setValue: field.onChange,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      value={field.value}
      onChangeText={field.onChange}
      cellCount={length}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete={autoComplete}
      testID="my-code-input"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          key={index}
          style={[styles.cell, isFocused && styles.focusCell]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused && <Cursor />)}
        </Text>
      )}
    />
  );
}
const styles = StyleSheet.create({
  codeFieldRoot: { marginTop: 20 },

  cell: {
    width: 46,
    height: 46,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    textAlign: "center",
    color: "#000",
    borderRadius: 4,
    fontFamily: FontType.YekanBakhRegular,
    marginLeft: 4,
  },

  focusCell: {
    borderColor: Colors.hint500,
  },
});
