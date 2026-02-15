import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import { formatPrice } from "@/services/ParseData";
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
              <ThemedView
                style={[
                  styles.groupView,
                  isChecked && {
                    borderWidth: 2,
                    borderColor: Colors.hint500,
                    backgroundColor: "#FBFAFF",
                  },
                ]}
                key={`${index}_${item?.value}`}
              >
                {item?.price && (
                  <ThemedText
                    hasNumber
                    fontType="semiBold"
                    style={{
                      fontSize: 10,
                      color: isChecked ? Colors.hint["800"] : Colors.gray900,
                    }}
                  >{`${formatPrice(item?.price)} تومان`}</ThemedText>
                )}
                <CustomCheckbox
                  checked={isChecked}
                  label={`${item?.text}`}
                  onPress={() => onToggleItem(item)}
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
    width: DeviceWidth * 0.9,
    borderColor: Colors.gray["200"],
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    marginBottom: 16,
    justifyContent: "space-between",
  },

  label: { marginBottom: 16 },
});
