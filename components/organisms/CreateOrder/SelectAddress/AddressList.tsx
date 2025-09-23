import {
  CustomFlatList,
  Divider,
  ThemedButton,
  ThemedView,
} from "@/components";
import { Colors } from "@/constants/Colors";
import { Edit } from "iconsax-react-native";

import CustomRadioButton from "@/components/atoms/CustomRadioButton";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useController } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useGetUserAddressesQuery } from "../../address/hooks/Address.query";

export default function AddressList({
  onChange,
  setValue,
}: {
  onChange?: any;
  setValue?: any;
}) {
  const router = useRouter();
  const { field } = useController({ name: "addressId" });

  const { data, fetchNextPage, hasNextPage } = useGetUserAddressesQuery();

  useEffect(() => {
    if (data?.pages?.[0]) {
      const primaryAddress =
        data?.pages.find((addr) => addr.isPrimary) ?? data?.pages?.[0];
      setValue("addressId", primaryAddress?.id);
      setValue("addressLabel", primaryAddress?.text);
    }
  }, [data]);

  const onPress = () => {
    router.push("/CreateAddress");
  };

  const onEditPress = (item: any) => {
    router.push(
      `/CreateAddress?nid=${item?.neighborhood?.id}&txt=${item?.text}&lat=${item?.latitude}&lng=${item?.longitude}&id=${item?.id}`
    );
  };

  const renderItem = ({ item, index }) => {
    const isChecked = field?.value === item?.id;

    return (
      <ThemedView key={`${index}_${item?.id}`}>
        <ThemedView style={styles.groupView}>
          <TouchableOpacity onPress={() => onEditPress?.(item)}>
            <Edit size={24} color={Colors.gray500} style={styles.editIcon} />
          </TouchableOpacity>
          <CustomRadioButton
            checked={isChecked}
            label={item?.text}
            onPress={() => {
              onChange?.(item);
            }}
          />
        </ThemedView>
        {index != (data?.pages ? data?.pages?.length - 1 : 0) && (
          <Divider height={24} />
        )}
      </ThemedView>
    );
  };

  const onLoadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <ThemedView style={styles.container}>
      <CustomFlatList
        data={data?.pages ?? []}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}_${item?.value}`}
        onEndReached={onLoadMore}
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
  btn: { width: "100%", marginTop: 70, bottom: 20 },

  container: { width: "100%", flex: 1 },

  editIcon: { backgroundColor: Colors.background },

  groupView: {
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 3,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  label: { marginBottom: 16 },
});
