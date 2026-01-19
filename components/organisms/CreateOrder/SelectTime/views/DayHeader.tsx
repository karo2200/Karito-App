import { CustomFlatList, Divider } from "@/components";
import TimeListHeaderItem from "@/components/molecules/TimeListHeaderItem";
import { maxWidth } from "@/constants/Dimension";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { useCallback, useEffect, useMemo } from "react";
import { useController } from "react-hook-form";

const weekDays = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
  "شنبه",
];

const generateNext7Days = () => {
  const today = dayjs();
  const tommorow = dayjs().add(1, "day");
  const baseDay = 24 - today.hour() <= 4 ? tommorow : today;

  return Array.from({ length: 7 }).map((_, i) => {
    const d = baseDay.add(i, "day");

    return {
      label: weekDays[d.day()],
      value: d.format("YYYY-MM-DD"),
      display: moment(new Date(d.toISOString())).format("jMM/jDD"),
    };
  });
};

export default function DayHeader() {
  const { field } = useController({ name: "date" });
  const dates = useMemo(() => generateNext7Days(), []);

  useEffect(() => {
    if (!field?.value && dates?.[0]?.value) {
      field.onChange(dates[0].value);
    }
  }, [dates, field?.value, field?.onChange]);

  const renderItem = useCallback(
    ({ item }) => {
      const onItemPress = () => {
        field.onChange?.(item?.value);
      };

      return <TimeListHeaderItem item={item} onItemPress={onItemPress} />;
    },
    [field.onChange]
  );

  return (
    <CustomFlatList
      renderItem={renderItem}
      data={dates ?? []}
      horizontal
      ItemSeparatorComponent={() => <Divider width={8} height={0} />}
      inverted
      snapToEnd
      style={{ maxWidth: maxWidth - 40 }}
      showsHorizontalScrollIndicator={false}
    />
  );
}
