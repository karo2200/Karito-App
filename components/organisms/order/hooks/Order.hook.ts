import { useRouter } from "expo-router";
import { useGetServiceRequestsQuery } from "./Order.query";

export default function useOrderHook() {
  const router = useRouter();

  const { data } = useGetServiceRequestsQuery();

  console.log("dddd///", data);

  return {
    router,
  };
}
