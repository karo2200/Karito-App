import { CustomFlatList, Divider } from "@/components";
import TimeListHeaderItem from "@/components/molecules/TimeListHeaderItem";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { createRef, useMemo, useRef } from "react";
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

export default function DayHeader({
  setSelectedDate,
  setValue,
}: {
  setSelectedDate?: (date: any) => void;
  setValue?: any;
}) {
  const { field } = useController({ name: "date" });
  const checkedItem = useRef<any>(0);
  const dayRefs = useRef(Array.from({ length: 7 }, () => createRef<any>()));

  const dates = useMemo(() => {
    const data = generateNext7Days();

    setTimeout(() => {
      dayRefs.current[0].current.setCheck(true);
    }, 100);

    checkedItem.current = 0;
    if (!field?.value) {
      console.log("DayHeader");
      field.onChange(data?.[0]?.value);
    }
    setSelectedDate?.(data?.[0]?.value);

    return data;
  }, []);

  const renderItem = ({ item, index }) => {
    const itemRef = dayRefs.current[index];

    return (
      <TimeListHeaderItem
        item={item}
        checkedRef={checkedItem}
        index={index}
        dayRefs={dayRefs}
        onItemPress={() => {
          setSelectedDate?.(item?.value);
        }}
        ref={itemRef}
      />
    );
  };

  return (
    <CustomFlatList
      renderItem={renderItem}
      data={dates ?? []}
      horizontal
      ItemSeparatorComponent={() => <Divider width={8} height={0} />}
      inverted
      snapToEnd
      showsHorizontalScrollIndicator={false}
    />
  );
}
