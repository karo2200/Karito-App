import {
  CustomFlatList,
  CustomImage,
  Divider,
  SubServiceItem,
  ThemedText,
  ThemedView,
} from "@/components";
import { Colors } from "@/constants/Colors";
import { InfoCircle } from "iconsax-react-native";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import useServiceTypesHook from "./serviceTypes.hook";

export default function SubCategoryOrg() {
  const { item, items } = useServiceTypesHook();

  const renderITEM = useCallback(
    ({ item, index }) => <SubServiceItem {...{ item, index }} />,
    []
  );

  return (
    <ThemedView style={styles.flex1}>
      <ThemedText style={{ color: Colors.title }}>
        کاریتو / {item?.service} /{" "}
        <ThemedText fontType="bold">{item?.subService}</ThemedText>
      </ThemedText>
      <ThemedView style={styles.rowView}>
        <CustomImage src={item?.logo} style={styles.image} resizeMode="cover" />
        <ThemedView style={styles.margin}>
          <ThemedText fontType="bold">{item?.service}</ThemedText>
          <ThemedText>{`خدمات مربوط به ${item?.subService}`}</ThemedText>
        </ThemedView>
      </ThemedView>
      <Divider height={16} />
      <ThemedView style={styles.infoView}>
        <InfoCircle color={Colors.info700} size={17} />
        <ThemedText style={styles.infoText}>
          محاسبه قیمت بعد از انتخاب خدمت
        </ThemedText>
      </ThemedView>
      <Divider height={16} />
      <CustomFlatList
        data={items}
        ItemSeparatorComponent={() => <Divider height={16} />}
        renderItem={renderITEM}
        style={styles.flex1}
        keyExtractor={(item, index) => `${index}`}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  image: { width: 44, height: 44, borderRadius: 4, overflow: "hidden" },

  rowView: { flexDirection: "row-reverse", marginTop: 6 },

  margin: {
    marginRight: 8,
    justifyContent: "space-between",
  },

  infoView: {
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: Colors.info50,
    borderColor: Colors.info200,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row-reverse",
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: "100%",
  },

  infoText: { color: Colors.info900, marginRight: 16, fontWeight: "400" },

  flex1: { flex: 1, width: "100%" },
});
