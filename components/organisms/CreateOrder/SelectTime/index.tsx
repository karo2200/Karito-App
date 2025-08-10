import { ThemedText, ThemedView } from "@/components";
import { commonStyles } from "@/constants/CommonStyles";
import DayHeader from "./views/DayHeader";
import TimeList from "./views/TimeList";

export default function SelectOrderTime() {
  return (
    <ThemedView style={commonStyles.flex1}>
      <ThemedText fontType="bold">
        روز و ساعت سفارش خود را انتخاب کنید:
      </ThemedText>
      <ThemedText>
        زمان سفارش از ۴ ساعت آینده به بعد قابل انتخاب است.
      </ThemedText>
      <DayHeader />
      <TimeList />
    </ThemedView>
  );
}
