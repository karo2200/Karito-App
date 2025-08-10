import { ThemedText, ThemedView } from "@/components";
import { ProgressBar } from "@/components/molecules/ProgressBar";
import TimeList from "./views/TimeList";

export default function SelectOrderTime() {
  return (
    <ThemedView>
      <ProgressBar percent={30} />
      <ThemedText fontType="bold">
        روز و ساعت سفارش خود را انتخاب کنید:
      </ThemedText>
      <ThemedText>
        زمان سفارش از ۴ ساعت آینده به بعد قابل انتخاب است.
      </ThemedText>
      {/* <DayHeader /> */}
      <TimeList />
    </ThemedView>
  );
}
