import moment from "jalali-moment";
import { useState } from "react";

export default function useExpertIncome() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    new Date()?.toLocaleDateString()
  );

  const onDateSelect = (jDate: string) => {
    const gregorianDate = moment(jDate, "jYYYY/jMM/jDD") // مشخص می‌کنیم فرمت جلالی هست
      .locale("en") // خروجی انگلیسی (میلادی)
      .format("YYYY-MM-DD"); // خروجی نهایی

    console.log(".......//", gregorianDate);

    setSelectedDate(gregorianDate);
  };

  return {
    selectedDate,

    onDateSelect,
  };
}
