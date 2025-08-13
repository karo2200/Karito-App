import { ThemedText, ThemedView } from "@/components";
import React, { JSX } from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import CustomRadioButton from "./CustomRadioButton";

type RadioGroupProps = {
  name: string;
  data: any[];
  label?: string;
  RightIcon?: JSX.Element;
};

export default React.forwardRef(
  ({ name, data, label, RightIcon }: RadioGroupProps, ref: any) => {
    const { field, fieldState } = useController({ name });
    const onChange = async (item: any) => {
      field.onChange(item?.value);
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
              <ThemedView key={index} style={styles.groupView}>
                {RightIcon && RightIcon}
                <CustomRadioButton
                  checked={isChecked}
                  label={item?.label}
                  onPress={() => {
                    onChange(item);
                  }}
                />
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
