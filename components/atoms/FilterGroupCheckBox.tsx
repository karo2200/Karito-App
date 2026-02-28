import { ThemedText, ThemedView } from "@/components";
import { FontType } from "@/constants/Fonts";
import React from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import CustomCheckbox from "./CustomCheckBox";

type CheckboxGroupProps = {
  name: string;
  data: any[];
  label?: string;
  dividerHeight?: number;
  onChange?: (items: any[]) => void;
};

export default React.forwardRef(
  ({ name, data, label, onChange }: CheckboxGroupProps, ref: any) => {
    const { field } = useController({ name });

    const onToggleItem = (item: any) => {
      let newValues: any[];
      const selectedValues = field?.value ? [...field?.value] : [];
      const exists = selectedValues.some((el) => el.value === item.value);
      if (exists) {
        newValues = selectedValues.filter((v) => v?.value !== item?.value);
      } else {
        newValues = [...selectedValues, item];
      }
      field.onChange(newValues);
      onChange?.(newValues);
    };

    return (
      <ThemedView>
        {label && (
          <ThemedText fontType="bold" style={styles.label}>
            {`${label}`}
          </ThemedText>
        )}
        <ThemedView>
          {data?.map((item: any, index: number) => {
            const isChecked = field?.value?.some(
              (el) => el.value === item.value
            );

            return (
              <ThemedView
                style={[styles.groupView]}
                key={`${index}_${item?.value}`}
              >
                <CustomCheckbox
                  checked={isChecked}
                  label={`${item?.text ?? item?.label}`}
                  onPress={() => onToggleItem(item)}
                  labelStyle={{
                    fontSize: 12,
                    fontFamily: FontType.YekanBakhRegular,
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
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: "flex-end",
  },

  label: { marginBottom: 16 },
});
