import { CustomFlatList, Divider, ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";
import dayjs from "dayjs";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useController } from "react-hook-form";
import { SectionList, StyleSheet, TouchableOpacity } from "react-native";
import { useGetDisabledTimesQuery } from "../hooks";

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

const TimeList = forwardRef(
  (
    {
      setValue,
    }: {
      setValue?: any;
    },
    ref
  ) => {
    const { field } = useController({ name: "selectedTime" });

    const [date, setCurrentDate] = useState(new Date().toDateString());

    const { data } = useGetDisabledTimesQuery({
      where: {
        time: {
          gte: `${date}T00:00:00+03:30`,
          lte: `${date}T23:59:59+03:30`,
        },
      },
    });

    useImperativeHandle(ref, () => ({
      onDateChanged: (date: any) => {
        setCurrentDate(date);
      },
    }));

    const nextFourHour = useMemo(() => {
      const dayDiff = dayjs().isSame(dayjs(date).format("YYYY/MM/DD"), "D");

      if (dayDiff) {
        const minTime = dayjs().add(4, "hour");
        if (minTime.hour() <= 24) field.onChange({ value: minTime.hour() + 1 });
        return minTime.hour() + 1;
      } else {
        field.onChange({ value: 8 });
        return -1;
      }
    }, [date]);

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

    const SectionItem = ({ item, index }) => {
      const isSelected = field?.value?.value === item?.value;
      const isDisabled =
        item?.value < nextFourHour || disabledTime.includes(item?.value);

      return (
        <TouchableOpacity
          style={[
            styles.timeButton,
            isSelected && styles.timeButtonSelected,
            isDisabled && { backgroundColor: Colors.disabledIcon },
          ]}
          onPress={() => {
            setValue("time", item?.value);
            field.onChange(item);
          }}
          disabled={isDisabled}
        >
          <ThemedText
            fontType={isSelected ? "bold" : "regular"}
            style={[styles.timeText, isSelected && styles.timeTextSelected]}
          >
            {item?.label}
          </ThemedText>
        </TouchableOpacity>
      );
    };

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
  }
);

export default TimeList;

const styles = StyleSheet.create({
  container: { width: "100%" },

  sectionTitle: {
    fontSize: 12,
    textAlign: "right",
    marginVertical: 8,
  },

  timeButton: {
    borderWidth: 2,
    borderColor: Colors.gray100,
    borderRadius: 8,
    paddingVertical: 8,
    marginBottom: 4,
    minWidth: DeviceWidth / 3 - 20,
    alignItems: "center",
    justifyContent: "center",
  },
  timeButtonSelected: {
    backgroundColor: Colors.hint50,
    borderColor: Colors.hint500,
    borderWidth: 2,
  },
  timeText: {
    fontSize: 14,
    color: Colors.gray900,
  },
  timeTextSelected: {
    color: Colors.hint500,
  },
});
