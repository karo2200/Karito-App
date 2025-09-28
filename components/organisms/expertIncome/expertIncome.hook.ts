import dayjs from "dayjs";
import { useState } from "react";

export default function useExpertIncome() {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  const onDateSelect = (jDate: string) => {
    const gregorianDate = dayjs(jDate).format("YYYY-MM-DD"); // خروجی نهایی

    setSelectedDate(gregorianDate);
  };

  return {
    selectedDate,

    onDateSelect,
  };
}
