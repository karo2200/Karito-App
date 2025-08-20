import Breadcrumb from "@/components/atoms/Breadcrumb";
import CustomRadioButton from "@/components/atoms/CustomRadioButton";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import ThemedView from "@/components/atoms/ThemedView";
import { Colors } from "@/constants/Colors";
import { FontStyle } from "@/constants/Fonts";
import { Edit } from "iconsax-react-native";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyAddressState from "../CreateOrder/Views/AddressEmpty";
import useAddressHook from "./hooks/Address.hook";

export default function AddressScreen() {
  const listRef = React.useRef<FlatList>(null);

  const { addressesData, refetch, hasNextPage, fetchNextPage } =
    useAddressHook();

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <AddressCard
        item={item}
        onChange={() => {}}
        key={item?.id}
        isChecked={true}
      />
    ),
    []
  );

  return (
    <ThemedContainer>
      <View>
        <Breadcrumb
          items={[
            { label: "پروفایل", href: "/profile" },
            { label: "مدیریت آدرس‌ها" },
          ]}
        />

        <FlatList
          ref={listRef}
          keyExtractor={(item) => item?.id}
          data={addressesData}
          refreshing={true}
          onRefresh={refetch}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={
            addressesData.length > 0 ? (
              <ThemedButton
                title="افزودن آدرس جدید"
                fontType={FontStyle.bold}
                //   style={styles.btn}
                type="outline"
              />
            ) : null
          }
          onEndReached={() => {
            if (hasNextPage) {
              fetchNextPage();
            }
          }}
          ListEmptyComponent={() => <EmptyAddressState />}
        />
      </View>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  groupView: {
    alignItems: "flex-start",
    overflow: "hidden",
    marginBottom: 24,
    flexDirection: "row",
    flexShrink: 1,
  },
});

const AddressCard = ({
  item,
  isChecked,
  onChange,
}: {
  item: any;
  isChecked: boolean;
  onChange: () => void;
}) => {
  return (
    <ThemedView style={styles.groupView}>
      <Edit size={24} color={Colors.gray500} />
      <CustomRadioButton
        checked={isChecked}
        label={
          "تهران، خیابان ولیعصر، نرسیده به اسفندیاری، بعد از کوچه ناصری، برج کیان، طبقه ۸ "
        }
        onPress={() => {
          onChange();
        }}
      />
    </ThemedView>
  );
};
