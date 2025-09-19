import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceRequestDto,
  usePayment_CreateMutation,
  useServiceRequest_ApplyDiscountMutation,
  useServiceRequest_RemoveDiscountMutation,
} from "@/generated/graphql";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking } from "react-native";
import { useGetServiceById } from "../../orderDetail/hooks/OrderDetail.guery";

export default function usePaymentHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { showToast } = useToast();

  const queryClient = useQueryClient();

  const [discountCode, setDiscountCode] = useState("");
  const [isSetCode, setIsSetCode] = useState(false);

  const { data: serviceData, isLoading } = useGetServiceById({
    input: { serviceRequestId: params?.id },
  });

  const { mutate: disCountCodeMutate, isPending: disCountLoading } =
    useServiceRequest_ApplyDiscountMutation();

  const { mutate: paymentCreate, isPending: paymentLoading } =
    usePayment_CreateMutation();

  const { mutate: removeCode, isPending: removeLoading } =
    useServiceRequest_RemoveDiscountMutation();

  const onHandleDisCountCode = () => {
    disCountCodeMutate(
      { input: { serviceRequestId: params?.id, discountCode: discountCode } },
      {
        onSuccess: (data) => {
          if (data?.serviceRequest_applyDiscount?.status?.code === 1) {
            setIsSetCode(true);
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getById],
            });
          } else {
            showToast({
              type: "error",
              message: "کد تخفیف یافت نشد",
            });
          }
        },
      }
    );
  };

  const onRemoveCode = () => {
    removeCode(
      { input: { serviceRequestId: params?.id } },
      {
        onSuccess: (data) => {
          if (data?.serviceRequest_removeDiscount?.status?.code === 1) {
            setIsSetCode(false);
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getById],
            });
            setDiscountCode("");
          } else {
            showToast({
              type: "error",
              message: "کد تخفیف یافت نشد",
            });
          }
        },
      }
    );
  };

  const onPayPress = () => {
    paymentCreate(
      { input: { serviceRequestId: params?.id } },
      {
        onSuccess: (data) => {
          if (data?.payment_create_zibal?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getById],
            });
            Linking.openURL(
              data?.payment_create_zibal?.result?.paymentUrl as string
            );
          } else {
            showToast({
              type: "error",
              message: "لطفا دوباره تلاش کنید",
            });
          }
        },
      }
    );
  };

  return {
    isLoading,
    serviceData: serviceData?.serviceRequest_getById
      ?.result as ServiceRequestDto,
    discountCode,
    setDiscountCode,
    onHandleDisCountCode,
    disCountLoading,
    paymentLoading,
    onPayPress,
    removeLoading,
    onRemoveCode,
    isSetCode,
  };
}
