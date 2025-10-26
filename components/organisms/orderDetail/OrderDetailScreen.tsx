import CloseIcon from "@/assets/icons/Close";
import TickIcon from "@/assets/icons/tick";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import Divider from "@/components/atoms/Divider";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedContainer from "@/components/atoms/ThemedContainer";
import ThemedText from "@/components/atoms/ThemedText";
import LocationActionSheet from "@/components/molecules/LocationActionSheet";
import PaymentWaitingSheet from "@/components/molecules/PaymentWaitingSheet";
import { Colors } from "@/constants/Colors";
import { ServiceRequestStatus } from "@/generated/graphql";
import { formatPrice, formatToJalali } from "@/services/ParseData";
import { getStatusFa } from "@/services/helper";
import { CallCalling } from "iconsax-react-native";
import * as React from "react";
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CancelRequestSheet from "./Views/CancelRequestSheet";
import FinishWorkSheet from "./Views/FinishWorkSheet";
import SpecialistData from "./Views/SpecialistData";
import useOrderDetailHook from "./hooks/OrderDetail.hook";

export default function OrderDetailScreen() {
  const {
    onBillPress,
    setFinishWorkVisible,
    finishWorkVisible,
    isExpert,
    makeCall,
    setFoundLocationVisible,
    foundLocationVisible,
    specialistFinishWorkVisible,
    setSpecialistFinishWorkVisible,
    onAcceptWork,
    acceptWorkPending,
    isLoading,
    serviceData,
    cancelWorkPending,
    cancelRequestVisible,
    setCancelRequestVisible,
    rejectPending,
    onRejectPress,
    onArrivePress,
    arrivePending,
    onRefresh,
    refreshing,
    pageType,
  } = useOrderDetailHook();
  console.log(JSON.stringify({ serviceData }));
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <ThemedContainer style={{ paddingHorizontal: 15 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {!isExpert ||
        (serviceData?.status !== ServiceRequestStatus.Pending && isExpert) ? (
          <Breadcrumb
            items={[
              {
                label: isExpert ? "ماموریت‌ ها" : "سفارش‌های من",
                href: isExpert ? "/mission" : "/order",
              },
              {
                label: isExpert
                  ? pageType === "complete"
                    ? "ماموریت های گذشته"
                    : "ماموریت های جاری"
                  : pageType === "canceled"
                    ? "سفارش‌های لغو شده"
                    : pageType === "complete"
                      ? "سفارش‌های گذشته"
                      : "سفارش‌های جاری",
                href: isExpert
                  ? `/mission?index=${pageType === "complete" ? 1 : 0}`
                  : `/order?index=${pageType === "canceled" ? 2 : pageType === "complete" ? 1 : 0}`,
              },
              { label: serviceData?.serviceType?.name },
            ]}
          />
        ) : (
          <ScreenNameWithBack title={serviceData?.serviceType?.name} />
        )}
        {(!isExpert ||
          (serviceData?.status !== ServiceRequestStatus.Pending &&
            isExpert)) && (
          <React.Fragment>
            <ThemedText fontType="bold" style={{ marginTop: 4 }}>
              {serviceData?.serviceType?.name}
            </ThemedText>
            <View
              style={[
                styles.rowView2,
                { paddingTop: 0, paddingBottom: 0, paddingHorizontal: 0 },
              ]}
            >
              {serviceData?.status !== ServiceRequestStatus.PendingPayment &&
              serviceData?.status !== ServiceRequestStatus.Paid &&
              isExpert ? (
                <View />
              ) : (
                // <Pressable onPress={() => setCancelRequestVisible(true)}>
                //   {cancelWorkPending ? (
                //     <ActivityIndicator />
                //   ) : (
                //     <ThemedText style={{ color: Colors.darkError }}>
                //       لغو سفارش
                //     </ThemedText>
                //   )}
                // </Pressable>
                <View />
              )}
              <View
                style={[
                  styles.label,
                  serviceData?.status === ServiceRequestStatus.PendingPayment
                    ? {
                        borderColor: isExpert
                          ? Colors.infoDark
                          : Colors.warningDark,
                      }
                    : serviceData?.status === ServiceRequestStatus.Paid && {
                        borderColor: Colors.successDark,
                      },
                ]}
              >
                <ThemedText
                  type="text"
                  style={
                    serviceData?.status === ServiceRequestStatus.PendingPayment
                      ? {
                          color: isExpert
                            ? Colors.infoDark
                            : Colors.warningDark,
                        }
                      : serviceData?.status === ServiceRequestStatus.Paid && {
                          color: Colors.successDark,
                        }
                  }
                >
                  {getStatusFa(serviceData?.status)}
                </ThemedText>
              </View>
            </View>
          </React.Fragment>
        )}
        <View style={styles.rowView}>
          <ThemedText fontType="bold" style={{ color: Colors.hint500 }}>
            {formatPrice(serviceData?.finalPrice)} تومان
          </ThemedText>
          <ThemedText fontType="bold" style={{ color: Colors.gray500 }}>
            {!isExpert ? "هزینه" : "دستمزد"}
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          <ThemedText type="text" style={{ color: Colors.hint500 }}>
            {formatToJalali(serviceData?.requestDate)}
          </ThemedText>
          <ThemedText fontType="bold" style={{ color: Colors.gray500 }}>
            زمان
          </ThemedText>
        </View>

        {!isExpert && (
          <View
            style={[
              styles.rowView2,
              serviceData?.status ===
                ServiceRequestStatus.AcceptedBySpecialist && {
                paddingRight: 0,
              },
            ]}
          >
            {serviceData?.status !== ServiceRequestStatus.PendingPayment &&
            serviceData?.status !== ServiceRequestStatus.Paid &&
            serviceData?.status != ServiceRequestStatus.CancelledByCustomer ? (
              <Pressable onPress={() => setCancelRequestVisible(true)}>
                {cancelWorkPending ? (
                  <ActivityIndicator />
                ) : (
                  <ThemedText style={{ color: Colors.darkError }}>
                    لغو سفارش
                  </ThemedText>
                )}
              </Pressable>
            ) : (
              <View />
            )}

            {serviceData?.status !== ServiceRequestStatus.Pending &&
            serviceData?.status !==
              ServiceRequestStatus?.CancelledByCustomer ? (
              <SpecialistData />
            ) : (
              serviceData?.status === ServiceRequestStatus.Pending && (
                <ThemedText fontType="bold" style={{ color: "black" }}>
                  در انتظار تایید متخصص...
                </ThemedText>
              )
            )}
          </View>
        )}
        <Divider height={16} />
        <ThemedText fontType="bold" style={{ color: "black" }}>
          جزئیات
        </ThemedText>
        <View style={styles.rowView}>
          <ThemedText type="text" style={{ color: Colors.label }}>
            {serviceData?.serviceType?.name}
          </ThemedText>
          <ThemedText type="text" style={{ color: Colors.gray500 }}>
            خدمت درخواستی
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          <ThemedText type="text" style={styles.address} numberOfLines={2}>
            {serviceData?.address?.text}
          </ThemedText>
          <ThemedText type="text" style={{ color: Colors.gray500 }}>
            {!isExpert ? "آدرس" : "آدرس دقیق"}
          </ThemedText>
        </View>
        <View style={styles.rowView}>
          {!isExpert ? (
            <React.Fragment>
              <ThemedText type="text" style={{ color: Colors.label }}>
                1
              </ThemedText>
              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                تعداد سرویس
              </ThemedText>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ThemedText type="text" style={styles.address}>
                {serviceData?.description}
              </ThemedText>
              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                توضیحات
              </ThemedText>
            </React.Fragment>
          )}
        </View>
        {serviceData?.status !== ServiceRequestStatus.Pending && (
          <View style={styles.rowView}>
            <ThemedText type="text" style={{ color: Colors.label }}>
              {serviceData?.trackingCode}
            </ThemedText>
            <ThemedText type="text" style={{ color: Colors.gray500 }}>
              کد رهگیری
            </ThemedText>
          </View>
        )}
        {isExpert && (
          <View>
            <Divider height={16} />
            <ThemedText fontType="bold" style={{ color: "black" }}>
              اطلاعات مشتری
            </ThemedText>
            <View style={styles.rowView}>
              <ThemedText type="text" style={{ color: Colors.label }}>
                {serviceData?.customer?.firstName}{" "}
                {serviceData?.customer?.lastName}
              </ThemedText>
              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                نام مشتری
              </ThemedText>
            </View>
            <View style={styles.rowView}>
              <View style={styles.simpleRow}>
                <CallCalling color={Colors.hint500} size={20} />
                <ThemedText
                  type="text"
                  style={styles.phone}
                  onPress={() => makeCall(serviceData?.customer?.phoneNumber)}
                >
                  {serviceData?.customer?.phoneNumber}
                </ThemedText>
              </View>

              <ThemedText type="text" style={{ color: Colors.gray500 }}>
                شماره تماس
              </ThemedText>
            </View>
          </View>
        )}
      </ScrollView>
      {!isExpert &&
      serviceData?.status === ServiceRequestStatus.PendingPayment ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.payment}
          onPress={() => onBillPress()}
        >
          <ThemedText type="defaultSemiBold" style={styles.textBtn}>
            مشاهده صورت حساب
          </ThemedText>
        </TouchableOpacity>
      ) : serviceData?.status === ServiceRequestStatus.AcceptedBySpecialist &&
        isExpert ? (
        <ThemedButton
          title="به مقصد رسیدم"
          style={styles.fullbtn}
          isLoading={arrivePending}
          rightIcon={<TickIcon style={{ marginLeft: 8 }} />}
          onPress={onArrivePress}
        />
      ) : serviceData?.status ===
          ServiceRequestStatus.SpecialistArrivedToLocation && isExpert ? (
        <ThemedButton
          title="اتمام کار"
          style={styles.fullbtn}
          isLoading={acceptWorkPending}
          rightIcon={<TickIcon style={{ marginLeft: 8 }} />}
          onPress={() => setSpecialistFinishWorkVisible(true)}
        />
      ) : (
        serviceData?.status === ServiceRequestStatus.Pending &&
        isExpert && (
          <View style={styles.actionFooter}>
            <ThemedButton
              title="قبول کار"
              style={styles.btn}
              isLoading={acceptWorkPending}
              rightIcon={<TickIcon style={{ marginLeft: 8 }} />}
              onPress={onAcceptWork}
            />
            <ThemedButton
              title="رد کار"
              type="outline"
              style={styles.btn}
              isLoading={rejectPending}
              rightIcon={<CloseIcon style={{ marginLeft: 8 }} />}
              onPress={onRejectPress}
            />
          </View>
        )
      )}
      <FinishWorkSheet
        visible={finishWorkVisible}
        setVisible={() => setFinishWorkVisible(false)}
      />
      <LocationActionSheet
        visible={foundLocationVisible}
        onClose={() => setFoundLocationVisible(false)}
      />
      <PaymentWaitingSheet
        visible={specialistFinishWorkVisible}
        onClose={() => setSpecialistFinishWorkVisible(false)}
      />
      <CancelRequestSheet
        visible={cancelRequestVisible}
        onClose={() => setCancelRequestVisible(false)}
      />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.grayMedium,
    borderRadius: 4,
    alignSelf: "flex-end",
    marginVertical: 12,
  },

  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: Colors.grayMedium,
    borderBottomWidth: 1,
  },

  rowView2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },

  address: { color: Colors.label, width: "80%", textAlign: "left" },

  textBtn: {
    fontWeight: "400",
    color: "white",
  },

  payment: {
    backgroundColor: Colors.hint500,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: 24,
    borderRadius: 4,
  },

  simpleRow: { flexDirection: "row", justifyContent: "center" },

  phone: {
    color: Colors.hint500,
    marginLeft: 5,
    textDecorationLine: "underline",
  },

  actionFooter: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  btn: { width: "48%" },

  fullbtn: {
    width: "100%",
    marginBottom: 16,
  },
});
