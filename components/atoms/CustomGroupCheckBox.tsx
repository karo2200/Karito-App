import { Divider, ThemedText, ThemedView } from "@/components";
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
  (
    { name, data, label, dividerHeight = 24, onChange }: CheckboxGroupProps,
    ref: any
  ) => {
    const { field } = useController({ name });

    const onToggleItem = (item: any) => {
      let newValues: any[];
      const selectedValues = [...field?.value];
      if (selectedValues.includes(item?.value)) {
        newValues = selectedValues.filter((v) => v !== item?.value);
      } else {
        newValues = [...selectedValues, item?.value];
      }

      field.onChange(newValues);
      onChange?.(newValues);
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
            const isChecked = field?.value.includes(item?.value);
            return (
              <ThemedView key={`${index}_${item?.value}`}>
                <ThemedView style={styles.groupView}>
                  <CustomCheckbox
                    checked={isChecked}
                    label={item?.label}
                    onPress={() => onToggleItem(item)}
                  />
                </ThemedView>
                {index !== data?.length - 1 && (
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
