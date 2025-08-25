import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  useServiceRequest_AcceptMutation,
  useServiceRequest_CancelMutation,
} from "@/generated/graphql";
import useUserStore from "@/stores/loginStore";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Linking, Platform } from "react-native";
import { useGetServiceById } from "./OrderDetail.guery";

export default function useOrderDetailHook() {
  const router = useRouter();

  const { params } = useRoute();

  const { showToast } = useToast();

  const queryClient = useQueryClient();

  const [finishWorkVisible, setFinishWorkVisible] = useState(false);
  const [foundLocationVisible, setFoundLocationVisible] = useState(false);
  const [specialistFinishWorkVisible, setSpecialistFinishWorkVisible] =
    useState(false);

  const isDone = true;

  const { isExpert, setIsExpert } = useUserStore();

  const { mutate: acceptWorkMutate, isPending: acceptWorkPending } =
    useServiceRequest_AcceptMutation();
  const { mutate: cancelWorkMutate, isPending: cancelWorkPending } =
    useServiceRequest_CancelMutation();

  const { data: serviceData, isLoading } = useGetServiceById({
    id: params?.id,
  });

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

  const onCancelReuest = () => {
    cancelWorkMutate(
      {
        input: {
          cancellationReasonId: 1,
          serviceRequestId: 1,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.serviceRequest_cancel.status?.code === 1) {
            showToast({ message: "ماموریت لغو شد.", type: "success" });
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

  return {
    finishWorkVisible,
    setFinishWorkVisible,
    onBillPress,
    isDone,
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
  };
}
