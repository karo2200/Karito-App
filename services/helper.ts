import { Colors } from "@/constants/Colors";
import { ServiceRequestStatus } from "@/generated/graphql";
import { Platform } from "react-native";

export function getStatusFa(status: string, isCustomer?: boolean) {
  switch (status) {
    case ServiceRequestStatus.AcceptedBySpecialist:
      return isCustomer
        ? {
            text: "سفارش تایید شده",
            bgColor: Colors.success["100"],
            borderColor: Colors.success["300"],
            textColor: Colors.success["800"],
          }
        : { text: "در انتظار انجام" };
    case ServiceRequestStatus.CancelledBySpecialist:
    case ServiceRequestStatus.CancelledByCustomer:
      return {
        text: "سفارش لغو شده",
        bgColor: Colors.danger10,
        borderColor: Colors.error["300"],
        textColor: Colors.error["800"],
      };
    case ServiceRequestStatus.SettledWithSpecialist:
    case ServiceRequestStatus.Paid:
      return {
        text: "سفارش انجام شده",
        bgColor: Colors.karito["100"],
        borderColor: Colors.karito["300"],
        textColor: Colors.karito["800"],
      };
    case ServiceRequestStatus.PendingPayment:
      return {
        text: "در انتظار پرداخت",
        bgColor: Colors.warning["100"],
        borderColor: Colors.warning["300"],
        textColor: Colors.warning["800"],
      };
    case ServiceRequestStatus.Pending:
      return {
        text: "سفارش ثبت شده",
        borderColor: Colors.info["300"],
        bgColor: Colors.info["100"],
        textColor: Colors.info["800"],
      };
    case ServiceRequestStatus.SpecialistArrivedToLocation:
      return isCustomer
        ? {
            text: "سفارش تایید شده",
            color: Colors.backGreen,
            textColor: Colors.black500,
          }
        : { text: "متخصص به محل رسید" };
    default:
      return { text: "نامشخص" };
  }
}

export const isWeb = Platform.OS === "web";

export const toPersianNumber = (value: string | number) => {
  return value.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
};
