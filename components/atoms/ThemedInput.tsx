import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { CloseCircle } from "iconsax-react-native";
import React, { JSX } from "react";
import { useController } from "react-hook-form";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default React.forwardRef(
  (
    {
      name,
      placeholder,
      type,
      keyboardType,
      label,
      required = false,
      color = Colors.black,
      textArea = false,
      disabled,
      mode = "input",
      width = "100%",
      height,
      maxLength,
      leftIcon,
      clearIcon,
      autoCapitalize = "none",
      onChangeText,
      onSetHeight,
      control,
    }: {
      name: any;
      placeholder?: string;
      type?: string;
      keyboardType?:
        | "default"
        | "email-address"
        | "numeric"
        | "phone-pad"
        | "number-pad"
        | "decimal-pad"
        | "visible-password"
        | "ascii-capable"
        | "numbers-and-punctuation"
        | "url"
        | "name-phone-pad"
        | "twitter"
        | "web-search"
        | undefined;
      backgroundColor?: string;
      label?: string;
      required?: boolean;
      color?: string;
      textArea?: boolean;
      disabled?: boolean;
      mode?: "input" | "text";
      width?: DimensionValue | undefined;
      height?: string | number;
      maxLength?: number;
      leftIcon?: JSX.Element;
      clearIcon?: boolean;
      autoCapitalize?:
        | "none"
        | "sentences"
        | "words"
        | "characters"
        | undefined;
      onChangeText?: (value?: string) => void;
      onSetHeight?: (value: number) => void;
      control?: any;
    },
    ref: any
  ) => {
    const { field, fieldState } = useController({ name, control });

    const onChange = (value: string) => {
      field?.onChange(value);
      onChangeText?.(value);
    };
    const onLayout = (event: LayoutChangeEvent) => {
      onSetHeight?.(
        event.nativeEvent.layout.height + event.nativeEvent.layout.y
      );
    };

    return (
      <View onLayout={onSetHeight ? onLayout : undefined} style={{ width }}>
        {label && (
          <Text style={styles.label}>
            {label}
            {required && (
              <Text style={{ color: Colors.darkError }}>{" *"}</Text>
            )}
          </Text>
        )}
        <View style={styles.inputView}>
          {leftIcon && leftIcon}
          <TextInput
            editable={!disabled}
            ref={ref}
            maxLength={maxLength}
            numberOfLines={textArea ? 4 : 1}
            placeholder={placeholder}
            placeholderTextColor={Colors.mediumGray}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            multiline={textArea ? true : false}
            value={field.value?.toString()}
            onChangeText={onChange}
            onBlur={field.onBlur}
            style={[
              {
                textAlignVertical: textArea ? "top" : "center",
                color: color,
              },
              styles.inputStyle,
            ]}
          />
          {clearIcon && <CloseCircle color={Colors.gray300} variant="Bold" />}
        </View>
        {fieldState.error?.message && (
          <Text style={styles.errorTxt}>{fieldState.error?.message}</Text>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    fontSize: 16,
    height: "100%",
    textAlign: "left",
    width: "100%",
    fontFamily: FontType.YekanBakhRegular,
    color: Colors.black,
  },

  inputView: {
    width: "100%",
    height: 44,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.gray300,
    backgroundColor: Colors.background,
  },

  label: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: FontType.YekanBakhRegular,
    textAlign: "right",
    marginBottom: 4,
  },

  errorTxt: {
    color: Colors.darkError,
    fontSize: 12,
    fontFamily: FontType.YekanBakhRegular,
    textAlign: "right",
  },
});
