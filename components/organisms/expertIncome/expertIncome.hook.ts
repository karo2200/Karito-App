import moment from "jalali-moment";
import { useState } from "react";

export default function useExpertIncome() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    new Date()?.toLocaleDateString()
  );

  const onDateSelect = (jDate: string) => {
    const gregorianDate = moment
      .from(jDate, "fa", "YYYY/MM/DD") // ورودی جلالی
      .locale("en") // خروجی انگلیسی
      .format("YYYY-MM-DD");

    setSelectedDate(gregorianDate);
  };

  return {
    selectedDate,

    onDateSelect,
  };
}
