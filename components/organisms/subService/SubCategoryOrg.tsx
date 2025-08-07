import {
  CustomFlatList,
  CustomImage,
  Divider,
  ThemedContainer,
  ThemedText,
  ThemedView,
} from "@/components";
import { Colors } from "@/constants/Colors";
import { InfoCircle } from "iconsax-react-native";
import { StyleSheet } from "react-native";

export default function SubCategoryOrg() {
  return (
    <ThemedContainer>
      <ThemedText style={{ color: Colors.title }}>
        کاریتو / همه خدمات / <ThemedText fontType="bold">نظافت</ThemedText>
      </ThemedText>
      <ThemedView style={styles.rowView}>
        <CustomImage
          src="https://abzarghafouri.com/wp-content/uploads/2023/02/house-cleaning-product-on-wood-table-blue.jpg"
          style={styles.image}
          resizeMode="cover"
        />
        <ThemedView style={styles.margin}>
          <ThemedText fontType="bold">نظافت</ThemedText>
          <ThemedText>خدمات مربوط به تمیزکاری</ThemedText>
        </ThemedView>
      </ThemedView>
      <Divider height={16} />
      <ThemedView
        style={{
          borderWidth: 1,
          borderRadius: 6,
          backgroundColor: Colors.info50,
          borderColor: Colors.info200,
          alignItems: "center",
          flexDirection: "row-reverse",
          paddingVertical: 8,
          paddingHorizontal: 20,
        }}
      >
        <InfoCircle color={Colors.info700} size={17} />
        <ThemedText
          style={{ color: Colors.info900, marginRight: 16, fontWeight: "400" }}
        >
          محاسبه قیمت بعد از انتخاب خدمت
        </ThemedText>
      </ThemedView>
      <Divider height={16} />
      <CustomFlatList
        data={[1, 2, 3]}
        ItemSeparatorComponent={() => <Divider height={16} />}
        renderItem={({ item, index }) => (
          <ThemedView
            style={{
              borderWidth: 1,
              borderRadius: 6,
              borderColor: Colors.grayMedium,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 8,
              paddingHorizontal: 20,
            }}
          >
            <ThemedText
              style={{
                color: Colors.gray900,
                marginRight: 16,
                fontSize: 14,
                fontWeight: "400",
              }}
            >
              محاسبه قیمت بعد از انتخاب خدمت
            </ThemedText>
          </ThemedView>
        )}
      />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  image: { width: 44, height: 44, borderRadius: 4, overflow: "hidden" },
  rowView: { flexDirection: "row-reverse", marginTop: 6 },
  margin: { marginRight: 8, justifyContent: "space-between" },
});
