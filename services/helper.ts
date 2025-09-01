import { ServiceRequestStatus } from "@/generated/graphql";

export function getStatusFa(status: string): string {
  switch (status) {
    case ServiceRequestStatus.AcceptedBySpecialist:
      return "پذیرفته شده توسط متخصص";
    case ServiceRequestStatus.Cancelled:
      return "لغو شده";
    case ServiceRequestStatus.Completed:
      return "تکمیل شده";
    case ServiceRequestStatus.PendingPayment:
      return "در انتظار پرداخت";
    case ServiceRequestStatus.Paid:
      return "پرداخت شده";
    case ServiceRequestStatus.Pending:
      return "ثبت شده";
    case ServiceRequestStatus.SpecialistArrivedToLocation:
      return "متخصص به محل رسید";
    default:
      return "نامشخص";
  }
}
