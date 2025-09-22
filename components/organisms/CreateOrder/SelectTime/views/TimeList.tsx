import { CustomFlatList, Divider, ThemedText } from "@/components";
import dayjs from "dayjs";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { useController } from "react-hook-form";
import { SectionList, StyleSheet } from "react-native";
import { useGetDisabledTimesQuery } from "../hooks";
import TimeSlotItem from "./TimeSlotItem";

const DATA = [
  {
    title: "بامداد",
    data: [
      [
        { label: "01:00", value: 1 },
        { label: "02:00", value: 2 },
        { label: "03:00", value: 3 },
      ],
      [
        { label: "04:00", value: 4 },
        { label: "05:00", value: 5 },
        { label: "06:00", value: 6 },
      ],
    ],
  },
  {
    title: "صبح",
    data: [
      [
        { label: "07:00", value: 7 },
        { label: "08:00", value: 8 },
        { label: "09:00", value: 9 },
      ],
      [
        { label: "10:00", value: 10 },
        { label: "11:00", value: 11 },
        { label: "12:00", value: 12 },
      ],
    ],
  },
  {
    title: "بعد از ظهر",
    data: [
      [
        { label: "13:00", value: 13 },
        { label: "14:00", value: 14 },
        { label: "15:00", value: 15 },
      ],
      [
        { label: "16:00", value: 16 },
        { label: "17:00", value: 17 },
        { label: "18:00", value: 18 },
      ],
    ],
  },
  {
    title: "شب",
    data: [
      [
        { label: "19:00", value: 19 },
        { label: "20:00", value: 20 },
        { label: "21:00", value: 21 },
      ],
      [
        { label: "22:00", value: 22 },
        { label: "23:00", value: 23 },
        { label: "24:00", value: 24 },
      ],
    ],
  },
];

const TimeList = forwardRef(({}, ref) => {
  const { field } = useController({ name: "selectedTime" });
  const { field: timeField } = useController({ name: "time" });
  const { field: dateField } = useController({ name: "date" });

  const [date, setCurrentDate] = useState(new Date().toDateString());

  const { data } = useGetDisabledTimesQuery({
    where: {
      time: {
        gte: `${dateField.value ?? date}T00:00:00+03:30`,
        lte: `${dateField.value ?? date}T23:59:59+03:30`,
      },
    },
  });

  useImperativeHandle(ref, () => ({
    onDateChanged: (date: any) => {
      setCurrentDate(date);
    },
  }));

  const nextFourHour = useMemo(() => {
    const dayDiff = dayjs().isSame(
      dayjs(dateField.value).format("YYYY/MM/DD"),
      "D"
    );

    if (dayDiff) {
      const minTime = dayjs().add(4, "hour");

      return minTime.hour() + 1;
    } else {
      return -1;
    }
  }, [dateField.value]);

  const disabledTime = useMemo(() => {
    const disabledTimes: any[] = [];

    if (data?.pages?.length > 0) {
      data?.pages?.forEach((element) => {
        if (element?.time) {
          const time = dayjs(element?.time);
          disabledTimes.push(time?.hour());
        }
      });
    }

    return disabledTimes;
  }, [data]);

  const SectionItem = useCallback(
    ({ item, index }) => {
      const isDisabled =
        item?.value < nextFourHour || disabledTime.includes(item?.value);

      const onPress = () => {
        timeField.onChange(item?.value);
        field.onChange(item);
      };

      return <TimeSlotItem {...{ item, onPress, field, isDisabled, index }} />;
    },
    [nextFourHour, disabledTime, field.value]
  );

  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => `${item?.[0]?.value} _ ${index}`}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        return (
          <CustomFlatList
            data={item}
            horizontal
            inverted
            snapToEnd
            ItemSeparatorComponent={() => <Divider width={8} height={0} />}
            renderItem={SectionItem}
          />
        );
      }}
      renderSectionHeader={({ section: { title } }) => (
        <ThemedText style={styles.sectionTitle} fontType="bold">
          {title}
        </ThemedText>
      )}
    />
  );
});

export default TimeList;

const styles = StyleSheet.create({
  container: { width: "100%" },

  sectionTitle: {
    fontSize: 12,
    textAlign: "right",
    marginVertical: 8,
  },
});
