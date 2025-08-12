import { ThemedView } from "@/components";
import { useState } from "react";
import IncomeInfo from "./views/IncomeInfo";
import SelectDateActionSheet from "./views/SelectDateActionSheet";
import TransactionInfo from "./views/TransactionInfo";

export default function ExpertIncome() {
  const [visibleCalendar, setCalendarVisible] = useState(true);

  return (
    <ThemedView>
      <SelectDateActionSheet
        visible={visibleCalendar}
        onClose={() => setCalendarVisible(false)}
      />
      <IncomeInfo />

      <TransactionInfo />
    </ThemedView>
  );
}
