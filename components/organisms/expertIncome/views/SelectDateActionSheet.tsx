import BackArrowIcon from "@/assets/icons/BackArrow";
import { Divider, ThemedButton } from "@/components";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { DeviceHeight } from "@/constants/Dimension";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trash } from "iconsax-react-native";
import moment from "jalali-moment";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetDefinition,
} from "react-native-actions-sheet";

const { height } = Dimensions.get("window");
declare module "react-native-actions-sheet" {
  interface Sheets {
    "calendar-sheet": SheetDefinition;
  }
}

const weekDaysFa = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export default function SelectDateActionSheet({
  onClose,
  onDateSelect,
  initialDate,
  minDate,
  maxDate,
}: {
  onClose: () => void;
  onDateSelect?: (date: any) => void;
  initialDate?: Date | string;
  minDate?: Date | string;
  maxDate?: Date | string;
}) {
  const startMoment = useMemo(
    () => (initialDate ? moment(initialDate) : moment()),
    [initialDate]
  );

  const isReset = useRef(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [currentMonth, setCurrentMonth] = useState(moment(startMoment));
  const [selected, setSelected] = useState(startMoment.format("jYYYY/jMM/jDD"));

  useEffect(() => {
    setCurrentMonth(moment(startMoment));
    setSelected(moment(startMoment));
  }, [initialDate]);

  const minM = minDate ? moment(minDate) : undefined;
  const maxM = maxDate ? moment(maxDate) : moment();

  const onApplyPress = () => {
    console.log("ss", selected);

    onDateSelect?.(selected);
    onClose();
  };

  const onRemoveFilter = () => {
    isReset.current = true;
    setSelected(new Date(), "jYYYY/jMM/jDD");
    onDateSelect?.(new Date(), "jYYYY/jMM/jDD");

    onClose();
  };

  const onPrev = () => setCurrentMonth((m) => m.clone().add(-1, "jMonth"));
  const onNext = () => setCurrentMonth((m) => m.clone().add(1, "jMonth"));

  const matrix = useMemo(() => {
    const startOfMonth = currentMonth.clone().startOf("jMonth");

    // JS day(): 0=Sunday ... 6=Saturday
    const firstWeekday = startOfMonth.day(); // day index of first day
    // convert to index based on weekStartsOn
    const offset = (firstWeekday + 1) % 7;

    const matrixStart = startOfMonth.clone().subtract(offset, "day");
    const cells: moment.Moment[] = [];
    for (let i = 0; i < 35; i++) {
      cells.push(matrixStart.clone().add(i, "day"));
    }
    return cells;
  }, [currentMonth]);

  const today = moment();

  const isDisabled = (m: moment.Moment) => {
    if (minM && m.isBefore(minM, "day")) return true;
    if (maxM && m.isAfter(maxM, "day")) return true;
    return false;
  };

  const handleDayPress = (m: moment.Moment) => {
    if (isDisabled(m)) return;
    setSelected(m.format("jYYYY/jMM/jDD"));

    onDateSelect?.(m.toDate());
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      id="calendar-sheet"
      containerStyle={{
        minHeight: height / 3.5,
        maxHeight: 0.9 % DeviceHeight,
      }}
    >
      <View style={styles.header}>
        <Ionicons
          name="close"
          size={24}
          color={Colors.mediumGray}
          onPress={onClose}
        />
        <ThemedText fontType="bold">فیلترها</ThemedText>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.header2}>
          <TouchableOpacity onPress={onPrev} style={styles.navBtn}>
            <BackArrowIcon style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>
          <ThemedText
            style={{ flex: 1, textAlign: "center" }}
            fontType="regular"
          >
            {currentMonth.format("jMMMM jYYYY")}
          </ThemedText>
          <TouchableOpacity onPress={onNext} style={styles.navBtn}>
            <BackArrowIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        {/* week days */}
        <View style={styles.weekRow}>
          {weekDaysFa.map((d, i) => (
            <View key={i} style={styles.weekCell}>
              <ThemedText fontType="bold" type="text">
                {d}
              </ThemedText>
            </View>
          ))}
        </View>

        {/* days grid */}
        <FlatList
          data={matrix}
          keyExtractor={(item) => item.format("YYYY-MM-DD")}
          numColumns={7}
          renderItem={({ item }) => {
            const inMonth =
              (item as any).jMonth() === (currentMonth as any).jMonth();
            const isToday = item.isSame(today, "day");
            const isSelected = item.format("jYYYY/jMM/jDD") === selected;
            const disabled = isDisabled(item) || !inMonth;

            return (
              <Pressable
                onPress={() => handleDayPress(item)}
                style={[
                  styles.dayWrapper,
                  isSelected && styles.daySelected,
                  isToday && !isSelected && styles.dayToday,
                  disabled && styles.dayDisabled,
                ]}
                disabled={disabled}
              >
                <ThemedText
                  fontType="regular"
                  style={[
                    isSelected && styles.dayTextSelected,
                    disabled && styles.dayTextDisabled,
                  ]}
                >
                  {item.format("jD")}
                </ThemedText>
              </Pressable>
            );
          }}
        />
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.trashIcon} onPress={onRemoveFilter}>
          <ThemedText fontType="medium" style={{ color: Colors.hint500 }}>
            حذف فیلترها
          </ThemedText>
          <Divider width={4} />
          <Trash size={24} color={Colors.hint500} />
        </TouchableOpacity>
        <Divider width={12} height={0} />
        <ThemedButton
          fontType="medium"
          title="اعمال فیلتر"
          style={styles.btn}
          onPress={onApplyPress}
        />
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  header2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 0,
  },

  title: {
    marginVertical: 32,
    textAlign: "right",
  },

  btn: { flex: 1 },

  trashIcon: {
    flex: 1,
    borderBlockColor: Colors.hint500,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 4,
    borderStyle: "dashed",
    borderColor: Colors.hint500,
    height: 40,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 33,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  weekRow: { flexDirection: "row", marginBottom: 6 },

  weekCell: { flex: 1, alignItems: "center" },

  navBtn: { padding: 8 },

  dayTextSelected: { color: Colors.white },

  dayTextDisabled: { color: Colors.mediumGray },

  dayWrapper: {
    flex: 1,
    minWidth: 20,
    minHeight: 20,
    paddingVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    // minHeight: 40,
  },

  daySelected: {
    backgroundColor: Colors.hint500,
    borderRadius: 20,
    minWidth: 20,
    minHeight: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  dayToday: {
    borderWidth: 1,
    borderColor: Colors.hint500,
    borderRadius: 20,
    minWidth: 20,
    minHeight: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  dayDisabled: { opacity: 0.35 },

  wrapper: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.disabledIcon,
    borderRadius: 6,
    margin: 16,
  },

  divider: {
    width: "105%",
    height: 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.disabledIcon,
    alignSelf: "center",
    marginBottom: 12,
  },
});
