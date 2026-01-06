import { Divider, ThemedText, ThemedView } from "@/components";
import createOrderStore from "@/stores/createOrder";
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
    const { prices, setPrices } = createOrderStore();

    const onToggleItem = (item: any) => {
      let newValues: any[];
      const selectedValues = field?.value ? [...field?.value] : [];
      const exists = selectedValues.some((el) => el.text === item.text);

      const tempPrices = [...prices];
      const priceIndex = tempPrices?.findIndex((item) => item?.id === name);

      if (exists) {
        newValues = selectedValues.filter((v) => v?.text !== item?.text);
      } else {
        newValues = [...selectedValues, item];
      }
      if (priceIndex > -1) {
        tempPrices?.splice(priceIndex, 1);
      }
      let price = 0;
      newValues?.map((item, index) => (price += item?.price));

      tempPrices.push({ id: name, price });
      setPrices(tempPrices);
      field.onChange(newValues);
      onChange?.(newValues);
    };

    const totalPrice = field?.value?.reduce((sum, item) => sum + item.price, 0);

    return (
      <ThemedView>
        {label && (
          <ThemedText fontType="bold" style={styles.label}>
            {`${label} ${totalPrice > 0 ? `(${totalPrice} تومان) ` : ""}`}
          </ThemedText>
        )}
        <ThemedView>
          {data?.map((item: any, index: number) => {
            const isChecked = field?.value?.some((el) => el.text === item.text);

            return (
              <ThemedView key={`${index}_${item?.value}`}>
                <ThemedView style={styles.groupView}>
                  <CustomCheckbox
                    checked={isChecked}
                    label={`${item?.text}_${item?.price}`}
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
