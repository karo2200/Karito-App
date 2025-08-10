import { Divider, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default function PreviewOrder() {
  const data = [
    { label: "هزینه برآورد شده", value: "۱۲۰۰۰ تومان" },
    { label: "زمان", value: "1404/03/15  چهارشنبه ساعت 17:00 " },
  ];
  const data2 = [
    { label: "خدمات درخواستی", value: "سرویس دوره‌ای" },
    {
      label: "آدرس",
      value:
        "تهران، خیابان ولیعصر، نرسیده به اسفندیاری، بعد از کوچه ناصری، برج کیان، طبقه ۸ ",
    },
    { label: "تعداد سرویس", value: "۱" },
  ];
  return (
    <ThemedView style={styles.flex1}>
      <ThemedText fontType="bold" type="title">
        مشخصات سفارش
      </ThemedText>
      {data?.map((item, index) => (
        <ThemedView
          style={styles.rowContainer}
          key={`${item?.value}_${index}_1`}
        >
          <ThemedText
            style={{ color: Colors.hint500, fontSize: 11 }}
            fontType="bold"
          >
            {item?.value}
          </ThemedText>
          <ThemedText
            fontType="bold"
            type="title"
            style={{ color: Colors.gray500 }}
          >
            {item?.label}
          </ThemedText>
        </ThemedView>
      ))}
      <Divider height={24} />
      <ThemedText fontType="bold" type="title">
        جزییات
      </ThemedText>
      {data2?.map((item, index) => (
        <ThemedView
          style={styles.rowContainer}
          key={`${item?.value}_${index}_2`}
        >
          <ThemedText style={styles.value2} type="subtitle">
            {item?.value}
          </ThemedText>
          <ThemedText type="subtitle" style={{ color: Colors.gray500 }}>
            {item?.label}
          </ThemedText>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayMedium,
    paddingVertical: 16,
    flexShrink: 1,
  },

  flex1: { flex: 1, width: "100%" },

  value2: {
    color: Colors.gray800,
    textAlign: "left",
    marginRight: 20,
    flexShrink: 1,
  },
});
