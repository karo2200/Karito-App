import Breadcrumb from "@/components/atoms/Breadcrumb";
import CustomRadioButton from "@/components/atoms/CustomRadioButton";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import ThemedView from "@/components/atoms/ThemedView";
import { Colors } from "@/constants/Colors";
import { FontStyle } from "@/constants/Fonts";
import { useRouter } from "expo-router";
import { Edit } from "iconsax-react-native";
import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EmptyAddressState from "../CreateOrder/Views/AddressEmpty";

export default function AddressScreen() {
  const router = useRouter();

  const listRef = React.useRef<FlatList>(null);

  const data = [];

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
          data={[]}
          refreshing={true}
          // onRefresh={refetch}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListFooterComponent={
            data.length > 0 ? (
              <ThemedButton
                title="افزودن آدرس جدید"
                fontType={FontStyle.bold}
                //   style={styles.btn}
                type="outline"
              />
            ) : null
          }
          onEndReached={() => {
            // if (hasNextPage) {
            //   fetchNextPage();
            // }
          }}
          ListEmptyComponent={() => <EmptyAddressState />}
        />
      </View>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },

  textBtn: {
    color: Colors.hint500,
    marginRight: 6,
  },

  payment: {
    borderColor: Colors.hint500,
    borderWidth: 1,
    paddingVertical: 8,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 4,
    flexDirection: "row",
    marginBottom: 44,
  },

  rowView: {
    flexDirection: "row-reverse",
    paddingVertical: 18,
  },

  listContainer: {
    flexDirection: "row-reverse",
    paddingVertical: 16,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Colors.grayMedium,
    borderBottomWidth: 1,
  },

  headerContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray50,
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },

  number: {
    color: Colors.semiBlack,
    fontWeight: "600",
    marginTop: 8,
  },

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
