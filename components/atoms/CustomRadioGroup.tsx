import { Divider, ThemedText, ThemedView } from "@/components";
import React, { JSX } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import CustomRadioButton from "./CustomRadioButton";

type RadioGroupProps = {
  name: string;
  data: any[];
  label?: string;
  RightIcon?: JSX.Element;
  dividerHeight?: number;
  onChange?: (item: any) => void;
  onRightIconPress?: (item: any) => void;
};

export default React.forwardRef(
  (
    {
      name,
      data,
      label,
      RightIcon,
      dividerHeight = 24,
      onChange,
      onRightIconPress,
    }: RadioGroupProps,
    ref: any
  ) => {
    const { field, fieldState } = useController({ name });
    const onChangeItem = async (item: any) => {
      field.onChange(item?.value);
      onChange?.(item);
    };

    return (
      <ThemedView>
        {label && (
          <ThemedText fontType="bold" style={styles.label}>
            {label}
          </ThemedText>
        )}
        <ThemedView>
          {data?.map((item: any, index: number) => {
            const isChecked = field?.value === item?.value;
            return (
              <ThemedView key={`${index}_${item?.value}`}>
                <ThemedView style={styles.groupView}>
                  {RightIcon && (
                    <TouchableOpacity
                      disabled={!onRightIconPress}
                      onPress={() => onRightIconPress?.(item)}
                    >
                      {RightIcon}
                    </TouchableOpacity>
                  )}
                  <CustomRadioButton
                    checked={isChecked}
                    label={item?.label}
                    onPress={() => {
                      onChangeItem(item);
                    }}
                  />
                </ThemedView>
                {index != data?.length - 1 && (
                  <Divider height={dividerHeight} />
                )}
              </ThemedView>
            );
          })}
        </ThemedView>
      </ThemedView>
    );
  }
);

const styles = StyleSheet.create({
  groupView: {
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 3,
    flexDirection: "row",
    flexShrink: 1,
    width: "100%",
    backgroundColor: "blue",
  },

  label: { marginBottom: 16 },
});
