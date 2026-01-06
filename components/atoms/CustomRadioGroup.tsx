import { Divider, ThemedText, ThemedView } from "@/components";
import createOrderStore from "@/stores/createOrder";
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
    const { prices, setPrices } = createOrderStore();

    const onChangeItem = async (item: any) => {
      field.onChange(item);
      onChange?.(item);
      const tempPrices = [...prices];
      const index = tempPrices?.findIndex((item) => item?.id === name);
      if (index > -1) {
        tempPrices?.splice(index, 1);
      }
      tempPrices.push({ id: name, price: item?.price, text: item?.text });
      setPrices(tempPrices);
    };

    return (
      <ThemedView>
        {label && (
          <ThemedText fontType="bold" style={styles.label}>
            {`${label} ${field?.value?.price ? `(${field?.value?.price}) تومان` : ""}`}
          </ThemedText>
        )}
        <ThemedView>
          {data?.map((item: any, index: number) => {
            const isChecked = field?.value?.text === item?.text;

            return (
              <ThemedView key={`${index}_${item?.text}`}>
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
                    label={`${item?.text}_${item?.price}`}
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
  },

  label: { marginBottom: 16 },
});
