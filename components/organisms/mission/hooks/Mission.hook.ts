import { useRouter } from "expo-router";
import { useGetServiceAcceptanceQuery } from "./Mission.query";

export default function useMissionsHook() {
  const router = useRouter();

  const { data } = useGetServiceAcceptanceQuery();
  console.log("ddddd", data);

  return {
    router,
  };
}
