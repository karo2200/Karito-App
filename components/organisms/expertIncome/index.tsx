import { ThemedView } from "@/components";
import { SheetManager } from "react-native-actions-sheet";
import IncomeInfo from "./views/IncomeInfo";
import SelectDateActionSheet from "./views/SelectDateActionSheet";
import TransactionInfo from "./views/TransactionInfo";

export default function ExpertIncome() {
  return (
    <ThemedView>
      <SelectDateActionSheet
        onClose={() => {
          SheetManager.hideAll();
          SheetManager.hide("calendar-sheet");
        }}
      />
      <IncomeInfo />

      <TransactionInfo />
    </ThemedView>
  );
}
