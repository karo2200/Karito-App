import { Divider, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { formatPrice } from "@/services/ParseData";
import createOrderStore from "@/stores/createOrder";
import { useRoute } from "@react-navigation/native";
import moment from "jalali-moment";
import { StyleSheet } from "react-native";

export default function PreviewOrder(props: any) {
  const requestDate = props?.getValues()?.requestDate;

  const { address } = createOrderStore();

  const basePrice = useRoute().params?.price;

  const data = [
    {
      label: "هزینه برآورد شده",
      value: `${formatPrice(basePrice ?? 0)}  تومان`,
    },
    {
      label: "زمان",
      value: moment(new Date(requestDate))
        .locale("fa")
        .format("jYYYY/jMM/jDD dddd [ساعت] HH:mm"),
    },
  ];

  const data2 = [
    { label: "خدمات درخواستی", value: props?.getValues()?.serviceType },
    {
      label: "آدرس",
      value: address,
    },
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
