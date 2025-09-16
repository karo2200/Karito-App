import { CustomFlatList, Divider } from "@/components";
import DayTimeItem from "@/components/molecules/DayTimeItem";
import dayjs from "dayjs";
import moment from "jalali-moment";
import { createRef, useMemo, useRef } from "react";

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
  return Array.from({ length: 7 }).map((_, i) => {
    const d = today.add(i, "day");

    return {
      label: weekDays[d.day()],
      value: d.format("YYYY-MM-DD"),
      display: moment(d.toISOString()).locale("fa").format("M/D"),
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
  const checkedItem = useRef<any>(0);
  const dayRefs = useRef(Array.from({ length: 7 }, () => createRef<any>()));

  const dates = useMemo(() => {
    const data = generateNext7Days();
    checkedItem.current = data?.[0];
    checkedItem.current = 0;
    setValue?.("date", data?.[0]?.value);
    setSelectedDate?.(data?.[0]?.value);
    return data;
  }, []);

  const renderItem = ({ item, index }) => {
    const itemRef = dayRefs.current[index];
    return (
      <DayTimeItem
        title={item?.label}
        subtitle={item?.display}
        width={80}
        checked={index === 0 ? true : false}
        onItemPress={() => {
          if (index != checkedItem.current) {
            itemRef?.current?.setCheck(true);
            dayRefs.current[checkedItem.current].current.setCheck(false);
            checkedItem.current = index;
          }
          setValue?.("date", item?.value);
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
