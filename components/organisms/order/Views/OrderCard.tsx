import LocationIcon from "@/assets/icons/Location";
import UserFrameIcon from "@/assets/icons/UserFrameIcon";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { ServiceRequestDto, ServiceRequestStatus } from "@/generated/graphql";
import { getStatusFa, toPersianNumber } from "@/services/helper";
import { formatPrice, formatToJalali } from "@/services/ParseData";
import { Calendar } from "iconsax-react-native";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const getDynamicLabelStyle = (orderStatus?: {
  bgColor?: string;
  borderColor?: string;
}) => ({
  backgroundColor: orderStatus?.bgColor,
  borderColor: orderStatus?.borderColor,
});

const getStatusTextStyle = (orderStatus?: { textColor?: string }) => ({
  color: orderStatus?.textColor,
});

const OrderCard = ({
  item,
  isCustomer = true,
  onOrderPress,
}: {
  item: ServiceRequestDto;
  isCustomer?: boolean;
  onOrderPress: () => void;
}) => {
  const orderStatus = useMemo(() => {
    return getStatusFa(item?.status, isCustomer);
  }, [item?.status, isCustomer]);

  const titleWidth =
    item?.status !== ServiceRequestStatus.Pending ? "65%" : "100%";

  return (
    <View style={styles.container}>
      <View style={styles.flexView}>
        <ThemedText
          fontType="semiBold"
          numberOfLines={2}
          style={[styles.title, { width: titleWidth }]}
        >
          {`${item?.serviceType?.name} (${item?.serviceType?.serviceSubCategory?.name})`}
        </ThemedText>
      </View>

      <View style={styles.dateView}>
        <Calendar size={16} color={Colors.gray500} />
        <ThemedText type="text" style={styles.date}>
          {toPersianNumber(formatToJalali(item?.requestDate))}
        </ThemedText>
      </View>

      <View style={styles.dateView}>
        <Calendar size={16} color={Colors.gray500} />
        <ThemedText style={styles.date} type="text">
          {toPersianNumber(formatPrice(item?.finalPrice))} تومان
        </ThemedText>
      </View>

      <View style={styles.row}>
        {isCustomer ? (
          <>
            <ThemedText type="text" style={styles.user}>
              {item?.specialist?.firstName} {item?.specialist?.lastName}
            </ThemedText>
            {item?.specialist && <UserFrameIcon color={Colors.gray500} />}
          </>
        ) : (
          <View style={styles.addressView}>
            <ThemedText type="text" style={styles.user}>
              {item?.address?.text}
            </ThemedText>
            <LocationIcon width={16} height={16} />
          </View>
        )}
      </View>

      <View style={styles.rowView}>
        {isCustomer ? (
          <View style={[styles.label, getDynamicLabelStyle(orderStatus)]}>
            <ThemedText
              type="text"
              style={[styles.statusText, getStatusTextStyle(orderStatus)]}
            >
              {orderStatus?.text}
            </ThemedText>
          </View>
        ) : item?.status !== ServiceRequestStatus.Pending ? (
          <View style={styles.label}>
            <ThemedText type="text" style={styles.defaultStatusText}>
              {orderStatus?.text}
            </ThemedText>
          </View>
        ) : (
          <View />
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.detailBtn}
          onPress={onOrderPress}
        >
          <ThemedText style={styles.detailText} type="text">
            جزئیات سفارش
          </ThemedText>
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

  flexView: {
    alignItems: "flex-end",
    flex: 1,
  },

  title: {
    fontSize: 14,
    color: Colors.gray900,
  },

  date: {
    color: Colors.gray500,
    marginHorizontal: 7,
    fontSize: 12,
  },

  dateView: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  user: {
    marginRight: 6,
    color: Colors.gray500,
  },

  label: {
    paddingVertical: 6,
    backgroundColor: Colors.info["100"],
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.info["300"],
    borderRadius: 4,
    flex: 1,
  },

  statusText: {
    fontSize: 12,
  },

  defaultStatusText: {
    fontSize: 12,
  },

  detailBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: Colors.gray["100"],
    borderColor: Colors.gray["300"],
    borderWidth: 1,
    borderRadius: 4,
    marginLeft: 10,
  },

  detailText: {
    color: Colors.gray["600"],
    fontSize: 12,
  },

  addressView: {
    flexDirection: "row",
    width: "81%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 16,
  },
});
