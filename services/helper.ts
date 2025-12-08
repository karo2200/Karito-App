import { ServiceRequestStatus } from "@/generated/graphql";

export function getStatusFa(status: string, isCustomer?: boolean) {
  console.log("ssss", status);

  switch (status) {
    case ServiceRequestStatus.AcceptedBySpecialist:
      return isCustomer ? "پذیرفته شده توسط متخصص" : "در انتظار انجام";
    case ServiceRequestStatus.CancelledBySpecialist:
    case ServiceRequestStatus.CancelledByCustomer:
      return "لغو شده";
    case ServiceRequestStatus.Paid:
      return "تکمیل شده";
    case ServiceRequestStatus.PendingPayment:
      return "در انتظار پرداخت";
    case ServiceRequestStatus.Pending:
      return "ثبت شده";
    case ServiceRequestStatus.SpecialistArrivedToLocation:
      return "متخصص به محل رسید";
    default:
      return "نامشخص";
  }
}
