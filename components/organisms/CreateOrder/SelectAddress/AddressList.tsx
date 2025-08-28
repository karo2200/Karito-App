import { ThemedButton, ThemedView } from "@/components";
import CustomRadioGroup from "@/components/atoms/CustomRadioGroup";
import { Colors } from "@/constants/Colors";
import { Edit } from "iconsax-react-native";

import { useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useGetUserAddressesQuery } from "../../address/hooks/Address.query";

export default function AddressList({
  onChange,
  setValue,
}: {
  onChange?: any;
  setValue?: any;
}) {
  const router = useRouter();

  const { data } = useGetUserAddressesQuery();

  const myAddresses = useMemo(() => {
    if (data?.pages?.[0]) {
      setValue("addressId", data?.pages?.[0]?.id);
      setValue("addressLabel", data?.pages?.[0]?.text);
    }
    return data?.pages?.[0]
      ? data?.pages?.map?.((item, index) => {
          return { label: item?.text, value: item?.id };
        })
      : [];
  }, [data]);

  const onPress = () => {
    router.push("/CreateAddress");
  };

  return (
    <ThemedView style={styles.container}>
      <CustomRadioGroup
        label="آدرس سفارش خود را انتخاب کنید:"
        data={myAddresses}
        name={"addressId"}
        onChange={(item) => onChange?.(item)}
        RightIcon={
          <Edit
            size={24}
            color={Colors.gray500}
            style={{ backgroundColor: Colors.background }}
          />
        }
      />
      <ThemedButton
        title="افزودن آدرس جدید"
        fontType={"bold"}
        style={styles.btn}
        type="outline"
        onPress={onPress}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  btn: { width: "100%", marginTop: 70 },

  container: { width: "100%" },
});
