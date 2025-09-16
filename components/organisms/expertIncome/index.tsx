import { ThemedView } from "@/components";
import { useRevenue_GetMyRevenueQuery } from "@/generated/graphql";
import dayjs from "dayjs";
import { useMemo } from "react";
import { SheetManager } from "react-native-actions-sheet";
import useExpertIncome from "./expertIncome.hook";
import IncomeInfo from "./views/IncomeInfo";
import SelectDateActionSheet from "./views/SelectDateActionSheet";
import TransactionInfo from "./views/TransactionInfo";

const startTimeStr = "T00:00:00+03:30";
const endTimeStr = "T23:59:59+03:30";

export default function ExpertIncome() {
  const { onDateSelect, selectedDate } = useExpertIncome();

  const { daySD, dayED, weekSD, monthSD } = useMemo(() => {
    const today = dayjs().format("YYYY-MM-DD");
    const daySD = today + startTimeStr;
    const dayED = today + endTimeStr;

    const weekStart = dayjs().subtract(1, "week").format("YYYY-MM-DD");
    const weekSD = weekStart + startTimeStr;

    const monthStart = dayjs().subtract(1, "month").format("YYYY-MM-DD");
    const monthSD = monthStart + startTimeStr;

    return { daySD, dayED, monthSD, weekSD };
  }, []);

  const { data } = useRevenue_GetMyRevenueQuery({
    dayED,
    daySD,
    weekSD,
    monthSD,
    monthED: dayED,
    weekED: dayED,
  });

  return (
    <ThemedView>
      <SelectDateActionSheet
        onClose={() => {
          SheetManager.hideAll();
          SheetManager.hide("calendar-sheet");
        }}
        onDateSelect={onDateSelect}
      />
      <IncomeInfo data={data} />

      <TransactionInfo selectedDate={selectedDate} />
    </ThemedView>
  );
}
