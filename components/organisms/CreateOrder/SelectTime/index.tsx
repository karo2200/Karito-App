import { Divider, ThemedView } from "@/components";
import { StyleSheet } from "react-native";
import FlowInfo from "../Views/FlowInfo";
import QuestionDivider from "../Views/QuestionDivider";
import QuestionLabel from "../Views/QuestionLabel";
import DayHeader from "./views/DayHeader";
import TimePickerRow from "./views/TimePickerRow";

export default function SelectOrderTime() {
  return (
    <ThemedView style={{ width: "100%" }}>
      <QuestionLabel
        label={"روز سفارش خود را انتخاب کنید:"}
        isRequired={true}
      />
      <FlowInfo
        text="زمان‌ سفارش از ۴ ساعت آینده به بعد قابل انتخاب است."
        marginBottom={16}
      />
      <DayHeader />
      <Divider height={24} />
      <QuestionDivider />
      <QuestionLabel
        label={"ساعت سفارش خود را انتخاب کنید:"}
        isRequired={true}
      />
      <TimePickerRow />
      <FlowInfo
        text="ساعت درخواستی شما در شیفت عصر می‌باشد و شامل هزینه بیشتر خواهد بود"
        marginTop={10}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  margBottom: { marginBottom: 16 },
});
