import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  useRateAndReview_CreateMutation,
  useServiceAcceptance_MarkAsArrivedMutation,
  useServiceRequest_AcceptMutation,
  useServiceRequest_CancelMutation,
  useServiceRequest_CompleteServiceMutation,
  useServiceRequest_RejectMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform } from "react-native";
import {
  useGetCancelationRequestsQuery,
  useGetServiceById,
} from "./OrderDetail.guery";

export default function useOrderDetailHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { showToast } = useToast();

  const queryClient = useQueryClient();

  const [finishWorkVisible, setFinishWorkVisible] = useState(false);
  const [foundLocationVisible, setFoundLocationVisible] = useState(false);
  const [specialistFinishWorkVisible, setSpecialistFinishWorkVisible] =
    useState(false);
  const [cancelRequestVisible, setCancelRequestVisible] = useState(false);

  const [rate, setRate] = useState(0);

  const { isExpert } = authCacheStore();

  const { mutate: acceptWorkMutate, isPending: acceptWorkPending } =
    useServiceRequest_AcceptMutation();
  const { mutate: cancelWorkMutate, isPending: cancelWorkPending } =
    useServiceRequest_CancelMutation();
  const { mutate: rejectMutate, isPending: rejectPending } =
    useServiceRequest_RejectMutation();
  const { mutate: completeMutate, isPending: completePending } =
    useServiceRequest_CompleteServiceMutation();

  const { mutate: rateMutate, isPending: ratePending } =
    useRateAndReview_CreateMutation();

  const { mutate: arriveMutate, isPending: arrivePending } =
    useServiceAcceptance_MarkAsArrivedMutation();

  const { data: serviceData, isLoading } = useGetServiceById({
    id: params?.id,
  });

  const { data: cancelationData } = useGetCancelationRequestsQuery();

  const onBillPress = () => {
    router.push("/order/payment");
  };

  const makeCall = (phoneNumber: string) => {
    if (Platform.OS === "web") {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      Linking.openURL(`tel:${phoneNumber}`);
    }
  };

  const onAcceptWork = () => {
    acceptWorkMutate(
      {
        input: {
          serviceRequestId: params?.id,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.serviceRequest_accept.status?.code === 1) {
            showToast({ message: "ماموریت قبول شد.", type: "success" });
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getMyAcceptances],
            });
            router.push("/(expertTabs)/mission");
          } else {
            showToast({
              message: data?.serviceRequest_accept.status,
              type: "error",
            });
          }
        },
      }
    );
  };

  const onCancelReuest = (cancelationId: number) => {
    cancelWorkMutate(
      {
        input: {
          cancellationReasonId: cancelationId,
          serviceRequestId: params?.id,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.serviceRequest_cancel.status?.code === 1) {
            showToast({ message: "سفارش با موفقیت لغو شد.", type: "success" });
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getMyAcceptances],
            });
            router.push("/(expertTabs)/mission");
          } else {
            showToast({
              message: data?.serviceRequest_cancel.status,
              type: "error",
            });
          }
        },
      }
    );
  };

  const onRejectPress = () => {
    rejectMutate(
      {
        input: {
          serviceRequestId: params?.id,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.serviceRequest_reject.status?.code === 1) {
            showToast({ message: "ماموریت رد شد.", type: "success" });
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getAvailableRequests],
            });
            router.push("/(expertTabs)/workList");
          } else {
            showToast({
              message: data?.serviceRequest_reject.status,
              type: "error",
            });
          }
        },
      }
    );
  };

  const onArrivePress = () => {
    arriveMutate(
      {
        input: {
          serviceRequestId: params?.id,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.serviceAcceptance_markAsArrived.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getById],
            });
          } else {
            showToast({
              message: data?.serviceAcceptance_markAsArrived.status,
              type: "error",
            });
          }
        },
      }
    );
  };

  const onCompletePress = () => {
    completeMutate(
      {
        input: {
          serviceRequestId: params?.id,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.serviceRequest_completeService.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getById],
            });
          } else {
            showToast({
              message: data?.serviceRequest_completeService.status,
              type: "error",
            });
          }
        },
      }
    );
  };

  const onRatePress = (closeActionSheet: () => void) => {
    rateMutate(
      {
        input: {
          rate: rate,
          serviceRequestId: params?.id,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.rateAndReview_create?.status?.code === 1) {
            showToast({
              message: "امتیاز شما با موفقیت ثبت شد.",
              type: "success",
            });
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getById],
            });
            closeActionSheet?.();
          }
        },
      }
    );
  };

  return {
    finishWorkVisible,
    setFinishWorkVisible,
    onBillPress,
    isExpert,
    makeCall,
    setFoundLocationVisible,
    foundLocationVisible,
    specialistFinishWorkVisible,
    setSpecialistFinishWorkVisible,
    serviceData: serviceData?.serviceRequest_getById?.result,
    onAcceptWork,
    acceptWorkPending,
    isLoading,
    onCancelReuest,
    cancelWorkPending,
    cancelRequestVisible,
    setCancelRequestVisible,
    cancelationData: cancelationData?.pages ?? [],
    rejectPending,
    onRejectPress,
    arrivePending,
    onArrivePress,
    completePending,
    onCompletePress,
    onRatePress,
    ratePending,
    setRate,
  };
}
