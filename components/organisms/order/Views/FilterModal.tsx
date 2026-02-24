import CustomCheckbox from "@/components/atoms/CustomCheckBox";
import RangeSlider from "@/components/atoms/RangeSlider";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { maxWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import {
  Calendar2,
  Category,
  Money,
  MoreSquare,
  SearchNormal,
} from "iconsax-react-native";
import * as React from "react";
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FilterOption = {
  label: string;
  checked: boolean;
};

const initialCategories: FilterOption[] = [
  { label: "سرویس نظافت", checked: false },
  { label: "سرویس طراحی و گرافیک دیزاین", checked: true },
  { label: "سرویس تعمیرات منزل", checked: false },
];

const initialStatuses: FilterOption[] = [
  { label: "سفارش ثبت شده", checked: false },
  { label: "سفارش تایید شده", checked: true },
  { label: "سفارش لغو شده", checked: false },
  { label: "سفارش انجام شده", checked: false },
  { label: "در انتظار پرداخت سفارش", checked: false },
];

export default function OrderFilterModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [searchValue, setSearchValue] = React.useState("");
  const [categories, setCategories] = React.useState(initialCategories);
  const [statuses, setStatuses] = React.useState(initialStatuses);

  const filters = [
    { title: "دسته بندی سفارشات", Icon: Category, type: "checkbox" },
    { title: "فیلتر تاریخ", Icon: Calendar2, type: "date" },
    { title: "وضعیت سفارش", Icon: MoreSquare, type: "checkbox" },
    { title: "فیلتر قیمت", Icon: Money, type: "price" },
  ];

  const toggleCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleStatus = (index: number) => {
    setStatuses((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const onClearFilters = () => {
    setSearchValue("");
    setCategories((prev) => prev.map((item) => ({ ...item, checked: false })));
    setStatuses((prev) => prev.map((item) => ({ ...item, checked: false })));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={onClose} />
        <View style={styles.filterPanel}>
          <View style={styles.filterHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <ThemedText style={styles.closeText} fontType="bold">
                ✕
              </ThemedText>
            </TouchableOpacity>
            <ThemedText fontType="bold" style={styles.filterTitle}>
              فیلتر سفارش‌ها
            </ThemedText>
          </View>

          <View style={styles.filterSearchContainer}>
            <TextInput
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="جست و جو در سفارش‌ها"
              placeholderTextColor={Colors.gray["400"]}
              style={styles.filterSearchInput}
              textAlign="right"
            />
            <SearchNormal color={Colors.gray["500"]} size={17} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {filters?.map((item, index) => (
              <View style={styles.sectionCard} key={item.title}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <ThemedText style={styles.sectionTitle}>
                    {item.title}
                  </ThemedText>
                  {item.Icon && (
                    <item.Icon color={Colors.karito["600"]} size={20} />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    overflow: "hidden",
                    marginVertical: 10,
                  }}
                >
                  {Array.from({ length: 60 }).map((item) => (
                    <View
                      style={{
                        backgroundColor: Colors.gray["200"],
                        width: 3,
                        height: 1,
                        marginLeft: 3,
                      }}
                    />
                  ))}
                </View>
                {item.type === "checkbox" ? (
                  <View style={{ width: "100%", alignItems: "flex-end" }}>
                    {categories.map((category, index) => (
                      <CustomCheckbox
                        checked={category.checked}
                        label={category.label}
                        onPress={() => toggleCategory(index)}
                        labelStyle={{
                          fontSize: 12,
                          color: Colors.gray["600"],
                          fontFamily: FontType.YekanBakhRegular,
                        }}
                      />
                    ))}
                  </View>
                ) : item.type === "date" ? (
                  <View style={styles.dateRow}>
                    <View style={styles.dateBox}>
                      <Calendar2
                        variant="Bold"
                        size={16}
                        color={Colors.gray["500"]}
                      />
                      <ThemedText hasNumber style={styles.dateText}>
                        {" "}
                        ۱۴۰۴ / ۱۱ / ۳۰
                      </ThemedText>
                    </View>
                    <ThemedText
                      style={styles.dateDivider}
                    >{`  تا  `}</ThemedText>
                    <View style={[styles.dateBox, styles.dateBox]}>
                      <Calendar2
                        variant="Bold"
                        size={16}
                        color={Colors.gray["500"]}
                      />
                      <ThemedText hasNumber style={styles.dateText}>
                        {" "}
                        ۱۴۰۴ / ۱۱ / ۳۲
                      </ThemedText>
                    </View>
                  </View>
                ) : (
                  <>
                    <RangeSlider min={100} max={20000} step={10} />
                  </>
                )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.footerButtons}>
            <ThemedButton
              title="پاک کردن"
              fontType="medium"
              onPress={onClearFilters}
              style={styles.clearButton}
              textStyle={styles.clearButtonText}
            />
            <ThemedButton
              title="مشاهده ۳۶۰ سفارش"
              fontType="medium"
              onPress={onClose}
              style={styles.submitButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.35)",
    flexDirection: "row",
  },

  modalBackdrop: {
    flex: 1,
  },

  filterPanel: {
    width: "88%",
    maxWidth: Platform.OS === "web" ? 560 : maxWidth,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
  },

  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  closeButton: {
    height: 20,
    width: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.gray[500],
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: Colors.gray[500],
    lineHeight: 18,
    fontSize: 12,
  },

  filterTitle: {
    fontSize: 14,
  },

  filterSearchContainer: {
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
  },

  filterSearchInput: {
    flex: 1,
    color: Colors.gray[600],
    fontSize: 14,
    fontFamily: FontType.YekanBakhRegular,
  },

  sectionCard: {
    borderWidth: 1,
    borderColor: Colors.gray[100],
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 14,
    textAlign: "right",
    marginHorizontal: 6,
  },

  optionRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  optionLabel: {
    color: Colors.gray[600],
    fontSize: 16,
  },

  checkbox: {
    height: 26,
    width: 26,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxChecked: {
    backgroundColor: Colors.karito["500"],
    borderColor: Colors.karito["500"],
  },

  checkboxTick: {
    color: Colors.white,
    fontSize: 16,
  },

  dateRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },

  dateBox: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.gray[200],
    borderRadius: 4,
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    width: maxWidth * 0.27,
    paddingHorizontal: 7,
  },

  dateText: {
    color: Colors.gray[600],
    fontSize: 12,
  },

  dateDivider: {
    color: Colors.gray[600],
  },

  priceRow: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  priceSliderTrack: {
    height: 4,
    borderRadius: 3,
    backgroundColor: Colors.gray[200],
    position: "relative",
    marginHorizontal: 4,
    marginBottom: 6,
  },

  priceSliderSelected: {
    position: "absolute",
    right: "8%",
    left: "22%",
    height: 4,
    borderRadius: 3,
    backgroundColor: Colors.karito["500"],
  },

  priceHandleRight: {
    position: "absolute",
    right: "8%",
    top: -6,
    height: 16,
    width: 16,
    borderWidth: 4,
    borderColor: Colors.karito["500"],
    borderRadius: 5,
    backgroundColor: Colors.white,
  },

  priceHandleLeft: {
    position: "absolute",
    left: "22%",
    top: -6,
    height: 16,
    width: 16,
    borderWidth: 4,
    borderColor: Colors.karito["500"],
    borderRadius: 5,
    backgroundColor: Colors.white,
  },

  footerButtons: {
    flexDirection: "row-reverse",
    gap: 12,
    marginTop: 8,
  },

  clearButton: {
    flex: 1,
    backgroundColor: Colors.gray[500],
  },

  clearButtonText: {
    color: Colors.white,
  },

  submitButton: {
    flex: 2,
  },
});
