import { CustomFlatList, ThemedText, ThemedView } from "@/components";
import IncomeInfoItem from "@/components/molecules/IncomeInfoItem";
import { Colors } from "@/constants/Colors";
import { Calendar as CalendarIcon } from "iconsax-react-native";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { useGetMyPaymentsQuery } from "../hooks";
import EmptyIncom from "./EmptyIncom";

export default function TransactionInfo({
  selectedDate,
}: {
  selectedDate?: any;
}) {
  const { data } = useGetMyPaymentsQuery({
    where: selectedDate
      ? {
          serviceRequest: {
            and: [
              { requestDate: { gte: `${selectedDate}T00:00:00+03:30` } },
              { requestDate: { lte: `${selectedDate}T23:59:59+03:30` } },
            ],
          },
        }
      : undefined,
  });

  const renderItem = useCallback(
    ({ item, index }: { item?: any; index?: number }) => (
      <IncomeInfoItem {...{ item, index }} />
    ),
    []
  );

  const onCalenderPress = () => {
    SheetManager.hideAll();
    SheetManager.show("calendar-sheet");
  };

  return (
    <ThemedView style={styles.width}>
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
          data={data?.pages}
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
