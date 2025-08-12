import LocationIcon from "@/assets/icons/Location";
import UserFrameIcon from "@/assets/icons/UserFrameIcon";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const OrderCard = ({
  item,
  isCustomer = true,
  onOrderPress,
}: {
  item: any;
  isCustomer?: boolean;
  onOrderPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <ThemedText fontType="bold">
        سرمایش و گرمایش (تعمیر و سرویس کولر آبی)
      </ThemedText>
      <View style={styles.dateView}>
        <ThemedText type="text" style={styles.date}>
          1404/03/15 چهارشنبه ساعت 17:00
        </ThemedText>
      </View>
      <View style={styles.rowView}>
        <ThemedText fontType="bold" style={{ color: Colors.hint500 }}>
          1,200,000 تومان
        </ThemedText>
        <View style={styles.row}>
          {isCustomer ? (
            <>
              <ThemedText type="text" style={styles.user}>
                موسی مرادیان
              </ThemedText>
              <UserFrameIcon />
            </>
          ) : (
            <>
              <ThemedText type="text" style={styles.user}>
                پاسداران، خ دولت مهستان ۵
              </ThemedText>
              <LocationIcon width={16} height={16} />
            </>
          )}
        </View>
      </View>
      <View style={styles.rowView}>
        {isCustomer ? (
          <View style={styles.label}>
            <ThemedText type="text">ثبت شده</ThemedText>
          </View>
        ) : (
          <View />
        )}
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.detailBtn}
          onPress={onOrderPress}
        >
          <ThemedText style={{ color: "white" }}>جزئیات</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    padding: 12,
    width: "93%",
    marginBottom: 8,
  },

  date: {
    color: Colors.hint500,
  },

  dateView: {
    backgroundColor: Colors.hint50,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-end",
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  user: { marginRight: 4, color: Colors.link25 },

  row: { flexDirection: "row", alignItems: "center" },

  label: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    borderRadius: 4,
  },

  detailBtn: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: Colors.hint500,

    borderRadius: 6,
  },
});
