import {
  CustomFlatList,
  Divider,
  SubServiceItem,
  ThemedView,
} from "@/components";
import { useCallback } from "react";
import { useController } from "react-hook-form";
import { StyleSheet } from "react-native";
import FlowInfo from "../CreateOrder/Views/FlowInfo";
import useServiceTypesHook from "./serviceTypes.hook";

export default function SubCategoryOrg(props) {
  const { field } = useController({ name: "serviceType" });
  const { items } = useServiceTypesHook(props);

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const checked = field?.value?.id == item?.id;
      return (
        <SubServiceItem
          {...{ item, index, onPress: () => field.onChange(item), checked }}
        />
      );
    },
    [field.value]
  );

  return (
    <ThemedView style={styles.flex1}>
      <Divider height={16} />
      <CustomFlatList
        data={items}
        ItemSeparatorComponent={() => <Divider height={16} />}
        renderItem={renderItem}
        style={styles.flex1}
        keyExtractor={(item, index) => `${index}`}
      />
      <FlowInfo text="محاسبه قیمت بعد از انتخاب سرویس" marginTop={24} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginRight: 8,
    justifyContent: "space-between",
  },

  flex1: { flex: 1, width: "100%" },
});
