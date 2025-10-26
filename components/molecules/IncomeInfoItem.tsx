import { Colors } from "@/constants/Colors";
import { ThemedText, ThemedView } from "..";

import { formatPrice } from "@/services/ParseData";
import moment from "jalali-moment";
import { StyleSheet } from "react-native";

export default function IncomeInfoItem({ item, index }) {
  const faDate = moment(new Date(item?.paidAt ?? new Date()))
    .locale("fa")
    .format("jYYYY/jMM/jDD HH:mm");

  const customer = item?.customer;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.rowView}>
        <ThemedText style={styles.dateTxt} hasNumber>
          {faDate}
        </ThemedText>
        <ThemedText
          hasNumber
          style={styles.valueTxt}
        >{`${formatPrice(item?.finalPrice ?? 0)}+ تومان`}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.rowView}>
        <ThemedText style={styles.customerTxt}>
          {item?.serviceType?.name}
        </ThemedText>
        <ThemedText style={styles.customerTxt}>
          {customer?.firstName || customer?.lastName
            ? `${customer?.firstName ?? ""} ${customer?.lastName}`
            : customer?.phoneNumber}
        </ThemedText>
      </ThemedView>
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
