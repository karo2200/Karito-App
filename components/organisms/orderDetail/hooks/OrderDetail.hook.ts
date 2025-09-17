import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  ServiceRequestStatus,
  useRateAndReview_CreateMutation,
  useServiceRequest_AcceptMutation,
  useServiceRequest_CancelMutation,
  useServiceRequest_CompleteServiceMutation,
  useServiceRequest_MarkAsArrivedMutation,
  useServiceRequest_RejectMutation,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import {
  useGetCancelationRequestsQuery,
  useGetServiceById,
} from "./OrderDetail.guery";

import * as Location from "expo-location";

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
  const [isComplete, setIsComplete] = useState(false);

  const [rate, setRate] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

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
    useServiceRequest_MarkAsArrivedMutation();

  const {
    data: serviceData,
    isLoading,
    refetch,
  } = useGetServiceById({
    input: { serviceRequestId: params?.id },
  });

  const { data: cancelationData } = useGetCancelationRequestsQuery();

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };

  useEffect(() => {
    if (
      serviceData?.serviceRequest_getById?.result?.status ===
        ServiceRequestStatus.PendingPayment &&
      !isExpert
    ) {
      setFinishWorkVisible(true);
    }
  }, [serviceData]);

  const onBillPress = () => {
    router.push(`/order/payment?id=${params?.id}`);
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
            router.push("/(expertTabs)/mission");
            setCancelRequestVisible(false);
            showToast({ message: "ماموریت قبول شد.", type: "success" });
            queryClient.invalidateQueries({
              queryKey: [queryKeys.serviceRequest_getMyAcceptances],
            });
          } else {
            showToast({
              message: data?.serviceRequest_accept.status?.message,
              type: "error",
            });
          }
        },
      }
    );
  };

  const onCancelReuest = (
    cancelationId: number,
    closeActionSheet: () => void
  ) => {
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
            router.back();
            closeActionSheet?.();
          } else {
            showToast({
              message: data?.serviceRequest_cancel.status?.message,
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
              message: data?.serviceRequest_reject.status?.message,
              type: "error",
            });
          }
        },
      }
    );
  };

  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      showToast({
        message: "اجازه دسترسی به مکان شما داده نشده است.",
        type: "error",
      });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    if (location.coords) {
      arriveMutate(
        {
          input: {
            serviceRequestId: params?.id,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
        },
        {
          onSuccess: (data) => {
            if (data?.serviceRequest_markAsArrived.status?.code === 1) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys.serviceRequest_getById],
              });
            } else {
              setFoundLocationVisible(true);
            }
          },
        }
      );
    } else {
      showToast({ message: "عدم دریافت موقعیت مکانی" });
    }
  }

  const onArrivePress = () => {
    getCurrentLocation();
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
            setIsComplete(true);
          } else {
            showToast({
              message: data?.serviceRequest_completeService.status?.message,
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
          } else {
            showToast({
              message: "شما قبلا امتیاز داده اید.",
              type: "error",
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
    isComplete,
    onRefresh,
    refreshing,
    pageType: params?.page as string,
  };
}
