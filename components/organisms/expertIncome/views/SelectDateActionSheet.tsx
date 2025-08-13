import { Divider, ThemedButton, ThemedView } from "@/components";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { DeviceHeight } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Trash } from "iconsax-react-native";
import { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import ActionSheet, {
  ActionSheetRef,
  SheetDefinition,
} from "react-native-actions-sheet";
import DatePicker, { getFormatedDate } from "react-native-datetimepicker-pro";

const { height } = Dimensions.get("window");
declare module "react-native-actions-sheet" {
  interface Sheets {
    "calendar-sheet": SheetDefinition;
  }
}
export default function SelectDateActionSheet({
  visible,
  onClose,
}: {
  visible?: boolean;
  onClose: () => void;
}) {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [selectedDate, setSelectedDate] = useState("");

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
      <DatePicker
        onDateChange={(date) => setSelectedDate(date)}
        onSelectedChange={(date) => setSelectedDate(date)}
        onMonthYearChange={(date) => {}}
        selected={getFormatedDate(new Date(), "jYYYY/jMM/jDD")}
        maximumDate={new Date().toISOString()}
        reverse
        options={{
          defaultFont: FontType.YekanBakhBold,
          headerFont: FontType.YekanBakhBold,
          mainColor: Colors.hint500,
          textHeaderColor: Colors.semiBlack,
        }}
      />
      <View style={styles.content}>
        <ThemedView style={styles.trashIcon}>
          <ThemedText fontType="medium" style={{ color: Colors.hint500 }}>
            حذف فیلترها
          </ThemedText>
          <Divider width={4} />
          <Trash size={24} color={Colors.hint500} />
        </ThemedView>
        <Divider width={12} height={0} />
        <ThemedButton
          fontType="medium"
          title="اعمال فیلتر"
          style={styles.btn}
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
    height: 40,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 33,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
