import { ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import { formatPrice } from "@/services/ParseData";
import createOrderStore from "@/stores/createOrder";
import React, { JSX } from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
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
  ({ name, data, onChange }: RadioGroupProps, ref: any) => {
    const { field } = useController({ name });
    const { prices, setPrices } = createOrderStore();

    const onChangeItem = async (item: any) => {
      console.log({ name });
      field.onChange(item);
      onChange?.(item);
      if (item?.price) {
        const tempPrices = [...prices];
        const index = tempPrices?.findIndex((item) => item?.id === name);
        if (index > -1) {
          tempPrices?.splice(index, 1);
        }
        tempPrices.push({ id: name, price: item?.price, text: item?.text });
        setPrices(tempPrices);
      }
    };
    console.log(JSON.stringify({ prices }));

    return (
      <ThemedView>
        {data?.map((item: any, index: number) => {
          const isChecked = field?.value?.text === item?.text;

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
              key={`${index}_${item?.text}`}
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
              <CustomRadioButton
                checked={isChecked}
                label={`${item?.text}`}
                onPress={() => {
                  onChangeItem(item);
                }}
              />
            </ThemedView>
          );
        })}
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

  label: { marginBottom: 16, color: Colors.black },
});
