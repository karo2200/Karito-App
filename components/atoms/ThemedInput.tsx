import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import { CloseCircle } from "iconsax-react-native";
import React, { JSX, useMemo } from "react";
import { useController } from "react-hook-form";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

const CustomInput = React.forwardRef(
  (
    {
      name,
      placeholder,
      keyboardType,
      label,
      required = false,
      color = Colors.black,
      textArea = false,
      disabled,
      width = "100%",
      maxLength,
      leftIcon,
      clearIcon,
      autoCapitalize = "none",
      onChangeText,
      onSetHeight,
      control,
      readOnly = false,
      style,
      labelStyle = "normal",
      forcePersianNumbers,
      rules,
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
      maxLength?: number;
      leftIcon?: JSX.Element;
      clearIcon?: boolean;
      style?: ViewStyle;
      readOnly?: boolean;
      autoCapitalize?:
        | "none"
        | "sentences"
        | "words"
        | "characters"
        | undefined;
      onChangeText?: (value?: string) => void;
      onSetHeight?: (value: number) => void;
      control?: any;
      labelStyle?: "normal" | "sm";
      forcePersianNumbers?: boolean;
      rules?: any;
    },

    ref: any
  ) => {
    const { field, fieldState } = useController({ name, control, rules });

    const onChange = (value: string) => {
      field?.onChange(value);
      onChangeText?.(value);
    };

    const onLayout = (event: LayoutChangeEvent) => {
      onSetHeight?.(
        event.nativeEvent.layout.height + event.nativeEvent.layout.y
      );
    };

    const isShabnamFont = useMemo(() => {
      if (
        keyboardType === "number-pad" ||
        keyboardType === "numeric" ||
        forcePersianNumbers
      )
        return true;
      else return false;
    }, [forcePersianNumbers, keyboardType]);

    return (
      <View
        onLayout={onSetHeight ? onLayout : undefined}
        style={[{ width }, style]}
      >
        {label && (
          <Text style={labelStyle === "normal" ? styles.label : styles.smLabel}>
            {label}
            {required && (
              <Text style={{ color: Colors.darkError }}>{" *"}</Text>
            )}
          </Text>
        )}
        <View style={[styles.inputView, textArea && { height: 100 }]}>
          {leftIcon && leftIcon}
          <TextInput
            editable={!disabled}
            ref={ref}
            maxLength={maxLength}
            numberOfLines={textArea ? 4 : 1}
            placeholder={placeholder}
            readOnly={readOnly}
            placeholderTextColor={Colors.mediumGray}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            multiline={textArea ? true : false}
            value={field.value?.toString()}
            onChangeText={onChange}
            // onBlur={field.onBlur}
            style={[
              styles.inputStyle,
              {
                textAlignVertical: textArea ? "top" : "center",
                color: color,
                textAlign: forcePersianNumbers ? "left" : "right",
                fontSize: labelStyle === "sm" ? 12 : 16,
                includeFontPadding: false,
                paddingVertical: 0,
                paddingHorizontal: 8,
                cursor: "text",
                fontFamily: isShabnamFont
                  ? FontType.Shabnam
                  : FontType.YekanBakhRegular,
              },
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

CustomInput.displayName = "ThemedText";

export default CustomInput;

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    fontSize: 16,
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
    borderWidth: 1,
    borderColor: Colors.strokeGray,
    backgroundColor: Colors.background,
  },

  label: {
    color: Colors.black,
    fontSize: 16,
    fontFamily: FontType.YekanBakhRegular,
    textAlign: "right",
    marginBottom: 4,
  },

  smLabel: {
    color: Colors.black,
    fontSize: 12,
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
