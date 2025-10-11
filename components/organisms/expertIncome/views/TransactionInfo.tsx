import { CustomFlatList, ThemedText, ThemedView } from "@/components";
import IncomeInfoItem from "@/components/molecules/IncomeInfoItem";
import { Colors } from "@/constants/Colors";
import { ServiceRequestStatus } from "@/generated/graphql";
import { Calendar as CalendarIcon } from "iconsax-react-native";
import { useCallback } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { useGetServiceAcceptanceIncomeQuery } from "../hooks";

export default function TransactionInfo({
  selectedDate,
}: {
  selectedDate?: any;
}) {
  const { data, isLoading } = useGetServiceAcceptanceIncomeQuery({
    where: selectedDate
      ? {
          and: [
            { paidAt: { gte: `${selectedDate}T00:00:00+03:30` } },
            { paidAt: { lte: `${selectedDate}T23:59:59+03:30` } },
            { status: { eq: ServiceRequestStatus.Paid } },
          ],
        }
      : {
          and: [
            {
              paidAt: {
                gte: `2018-09-09T00:00:00+03:30`,
              },
            },
            { status: { eq: ServiceRequestStatus.Paid } },
          ],
        },
  });

  console.log(
    JSON.stringify({
      where: selectedDate
        ? {
            and: [
              { paidAt: { gte: `${selectedDate}T00:00:00+03:30` } },
              { paidAt: { lte: `${selectedDate}T23:59:59+03:30` } },
              { status: { eq: ServiceRequestStatus.Paid } },
            ],
          }
        : {
            and: [
              {
                paidAt: {
                  gte: `2018-09-09T00:00:00+03:30`,
                },
              },
              { status: { eq: ServiceRequestStatus.Paid } },
            ],
          },
    })
  );

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

  const ListEmptyComponent = useCallback(() => {
    return (
      <ThemedView style={{ alignItems: "center", marginTop: 30 }}>
        <ThemedText>تراکنشی در این تاریخ ندارید.</ThemedText>
      </ThemedView>
    );
  }, []);

  return (
    <ThemedView style={styles.container}>
      {isLoading ? (
        <ThemedView style={styles.loading}>
          <ActivityIndicator size="large" />
        </ThemedView>
      ) : (
        <CustomFlatList
          data={data?.pages}
          keyExtractor={(_, index) => `${index}_income`}
          renderItem={renderItem}
          ListEmptyComponent={isLoading ? undefined : ListEmptyComponent}
          ListHeaderComponent={
            <ThemedView style={styles.headerView}>
              <TouchableOpacity onPress={onCalenderPress}>
                <CalendarIcon size={24} color={Colors.hint500} disabled />
              </TouchableOpacity>
              <ThemedText style={styles.blackTxt} fontType="bold">
                لیست تراکنشها
              </ThemedText>
            </ThemedView>
          }
          style={styles.list} // make the list take available space
          keyboardShouldPersistTaps="handled"
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 }, // <- important

  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 12,
    width: "100%",
  },

  blackTxt: { color: Colors.black },

  list: { flex: 1 }, // <- important

  loading: {
    flex: 1, // <- so the spinner centers in available space
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
