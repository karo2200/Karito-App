import { queryKeys } from "@/constants/queryKeys";
import { useSubscriptionWithEventSource } from "@/services/subscriptionWithEventSource";
import authCacheStore from "@/stores/authCacheStore";
import { useQueryClient } from "@tanstack/react-query";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export default function useRequestSubscription() {
  const { accessToken } = authCacheStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!accessToken) return;
    const decoded = jwtDecode<JwtPayload>(accessToken);
    const userId = decoded?.sub;
    console.log({ userId });
    if (!userId) return;

    const unsbscribe = useSubscriptionWithEventSource({
      variables: { userId },
      query: `  subscription onServiceRequestStatusChanged($userId: UUID!) {
        onServiceRequestStatusChanged(userId: $userId) {
          newStatus
        }
      }`,
      callback: listener,
    });
    function listener(e) {
      try {
        if (e?.data?.includes("onServiceRequestStatusChanged")) {
          queryClient.invalidateQueries({
            queryKey: [queryKeys.address_getMyAddresses],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.serviceRequest_getMyAcceptances],
            exact: false,
          });

          queryClient.invalidateQueries({
            queryKey: [queryKeys.serviceRequest_getById],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.serviceRequest_getById],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.serviceRequest_getAvailableRequests],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: [queryKeys.payment_getMyPayments],
            exact: false,
          });
          queryClient.invalidateQueries({
            queryKey: ["revenue_getMyRevenue"],
            exact: false,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    return () => {
      unsbscribe();
    };
  }, [accessToken]);

  return null;
}
