import { ThemedText, ThemedView } from "@/components";
import { commonStyles } from "@/constants/CommonStyles";
import { useState } from "react";
import { StyleSheet } from "react-native";
import DayHeader from "./views/DayHeader";
import TimeList from "./views/TimeList";

export default function SelectOrderTime(props) {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  return (
    <ThemedView style={commonStyles.flex1}>
      <ThemedText fontType="bold">
        روز و ساعت سفارش خود را انتخاب کنید:
      </ThemedText>
      <ThemedText style={styles.margBottom}>
        زمان سفارش از ۴ ساعت آینده به بعد قابل انتخاب است.
      </ThemedText>
      <DayHeader setSelectedDate={setSelectedDate} setValue={props?.setValue} />
      <TimeList selectedDate={selectedDate} setValue={props?.setValue} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  margBottom: { marginBottom: 16 },
});
