import { CustomFlatList, ThemedText, ThemedView } from "@/components";
import IncomeInfoItem from "@/components/molecules/IncomeInfoItem";
import { Colors } from "@/constants/Colors";
import { Calendar as CalendarIcon } from "iconsax-react-native";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import EmptyIncom from "./EmptyIncom";

export default function TransactionInfo() {
  const renderItem = useCallback(
    ({ item, index }) => <IncomeInfoItem {...{ item, index }} />,
    []
  );
  const onCalenderPress = () => {
    SheetManager.hideAll();
    SheetManager.show("calendar-sheet");
  };
  return (
    <ThemedView>
      <ThemedView style={styles.headerContainer}>
        <ThemedView style={styles.headerView}>
          <TouchableOpacity onPress={onCalenderPress}>
            <CalendarIcon size={24} color={Colors.hint500} disabled />
          </TouchableOpacity>
          <ThemedText style={styles.blackTxt} fontType="bold">
            لیست تراکنشها
          </ThemedText>
        </ThemedView>

        <CustomFlatList
          data={[1, 2, 3]}
          style={styles.width}
          keyExtractor={(item, index) => `${index}_income`}
          ListEmptyComponent={() => <EmptyIncom />}
          renderItem={renderItem}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: { width: "100%", marginTop: 12 },

  headerView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginBottom: 12,
  },

  blackTxt: { color: Colors.black },

  width: { width: "100%" },
});
