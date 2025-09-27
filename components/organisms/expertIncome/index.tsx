import { ThemedView } from "@/components";
import { SheetManager } from "react-native-actions-sheet";
import useExpertIncome from "./expertIncome.hook";
import IncomeInfo from "./views/IncomeInfo";
import SelectDateActionSheet from "./views/SelectDateActionSheet";
import TransactionInfo from "./views/TransactionInfo";

export default function ExpertIncome() {
  const { onDateSelect, selectedDate } = useExpertIncome();

  return (
    <ThemedView>
      <SelectDateActionSheet
        onClose={() => {
          SheetManager.hideAll();
          SheetManager.hide("calendar-sheet");
        }}
        onDateSelect={onDateSelect}
      />
      <IncomeInfo />

      <TransactionInfo selectedDate={selectedDate} />
    </ThemedView>
  );
}
