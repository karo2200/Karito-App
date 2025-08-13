import { ThemedText, ThemedView } from "@/components";
import { commonStyles } from "@/constants/CommonStyles";
import { StyleSheet } from "react-native";
import DayHeader from "./views/DayHeader";
import TimeList from "./views/TimeList";

export default function SelectOrderTime() {
  return (
    <ThemedView style={commonStyles.flex1}>
      <ThemedText fontType="bold">
        روز و ساعت سفارش خود را انتخاب کنید:
      </ThemedText>
      <ThemedText style={styles.margBottom}>
        زمان سفارش از ۴ ساعت آینده به بعد قابل انتخاب است.
      </ThemedText>
      <DayHeader />
      <TimeList />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  margBottom: { marginBottom: 16 },
});
