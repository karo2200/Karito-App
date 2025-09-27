import { Colors } from "@/constants/Colors";
import { ThemedText, ThemedView } from "..";

import dayjs from "dayjs";
import { StyleSheet } from "react-native";

export default function IncomeInfoItem({ item, index }) {
  const paymentDate = dayjs(item?.serviceRequest?.requestDate).format(
    "YYYY/MM/DD - HH:MM"
  );
  const customer = item?.customer;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.rowView}>
        <ThemedText style={styles.dateTxt}>{paymentDate}</ThemedText>
        <ThemedText
          style={styles.valueTxt}
        >{`+${item?.finalPrice ?? 0} ریال`}</ThemedText>
      </ThemedView>
      <ThemedText style={styles.customerTxt}>
        {customer?.firstName || customer?.lastName
          ? `${customer?.firstName ?? ""} ${customer?.lastName}`
          : customer?.phoneNumber}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 16,
    width: "100%",
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },

  dateTxt: { color: Colors.infoDark, fontSize: 12 },

  valueTxt: { color: Colors.successDark },

  customerTxt: { color: Colors.link25, lineHeight: 32 },
});
