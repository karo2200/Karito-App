import { Divider, ThemedText, ThemedView } from "@/components";
import { DeviceHeight } from "@/constants/Dimension";
import createOrderStore from "@/stores/createOrder";
import { forwardRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import ActionSheet, { SheetDefinition } from "react-native-actions-sheet";
import AddressList from "../../CreateOrder/SelectAddress/AddressList";
declare module "react-native-actions-sheet" {
  interface Sheets {
    "addresslist-sheet": SheetDefinition;
  }
}

const AddressActionSheet = forwardRef(
  (
    {
      closeActionSheet,
      onCityPress,
    }: { closeActionSheet?: any; onCityPress?: any },
    ref
  ) => {
    const { setAddressId, setAddress } = createOrderStore();
    const methods = useForm<Record<string, any>, object>({
      mode: "onChange",
    });
    const { setValue } = methods;

    const onItemPress = (item) => {
      setAddressId(item?.id);
      setAddress(item?.text);
      onCityPress(item);
      closeActionSheet?.();
    };

    return (
      <ActionSheet
        ref={ref}
        keyboardHandlerEnabled={false}
        id="addresslist-sheet"
        onClose={() => closeActionSheet?.()}
      >
        <ThemedView style={styles.contentView}>
          <ThemedText type="title" fontType="bold">
            لطفا آدرس خود را انتخاب کنید
          </ThemedText>
          <Divider height={24} />
          <FormProvider {...methods}>
            <AddressList
              setValue={setValue}
              onChange={onItemPress}
              onClose={closeActionSheet}
              setEmptyState
            />
          </FormProvider>
        </ThemedView>
      </ActionSheet>
    );
  }
);

export default AddressActionSheet;

const styles = StyleSheet.create({
  contentView: {
    minHeight: DeviceHeight * 0.7,
    maxHeight: DeviceHeight * 0.8,
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
  },
});
