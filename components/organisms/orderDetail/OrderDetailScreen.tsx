import Breadcrumb from "@/components/atoms/Breadcrumb";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import * as React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function OrderDetailScreen() {
  return (
    <ThemedContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Breadcrumb
          items={[
            { label: "سفارش‌های من", href: "/order" },
            { label: "سفارش‌های جاری", href: "/order" },
            { label: "تعمیر و سرویس کولر آبی" },
          ]}
        />
        <ThemedText fontType="bold" style={{ marginTop: 4 }}>
          سرمایش و گرمایش (تعمیر و سرویس کولر آبی)
        </ThemedText>
        <View style={styles.label}>
          <ThemedText type="text">ثبت شده</ThemedText>
        </View>
        <View style={styles.rowView}>
          <ThemedText fontType="bold" style={{ color: Colors.hint500 }}>
            1,200,000 تومان
          </ThemedText>
          <ThemedText fontType="bold" style={{ color: Colors.gray500 }}>
            هزینه
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          <ThemedText type="text" style={{ color: Colors.hint500 }}>
            1404/03/15 چهارشنبه ساعت 17:00
          </ThemedText>
          <ThemedText fontType="bold" style={{ color: Colors.gray500 }}>
            زمان
          </ThemedText>
        </View>
        <View style={styles.rowView2}>
          <ThemedText style={{ color: Colors.darkError }}>لغو سفارش</ThemedText>
          <ThemedText fontType="bold" style={{ color: "black" }}>
            در انتظار تایید متخصص...
          </ThemedText>
        </View>
        <ThemedText fontType="bold" style={{ color: "black" }}>
          جزئیات
        </ThemedText>
        <View style={styles.rowView}>
          <ThemedText type="text" style={{ color: Colors.label }}>
            سرویس دوره ای
          </ThemedText>
          <ThemedText type="text" style={{ color: Colors.gray500 }}>
            خدمت درخواستی
          </ThemedText>
        </View>
        <View style={[styles.rowView, {}]}>
          <ThemedText type="text" style={styles.address} numberOfLines={2}>
            تهران، خیابان ولیعصر، نرسیده به اسفندیاری، بعد از کوچه ناصری، برج
            کیان، طبقه ۸
          </ThemedText>
          <ThemedText type="text" style={{ color: Colors.gray500 }}>
            آدرس
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          <ThemedText type="text" style={{ color: Colors.label }}>
            1
          </ThemedText>
          <ThemedText type="text" style={{ color: Colors.gray500 }}>
            تعداد سرویس
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginVertical: 12,
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: Colors.grayMedium,
    borderBottomWidth: 1,
  },

  rowView2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 14,
  },

  address: { color: Colors.label, width: "80%" },
});
