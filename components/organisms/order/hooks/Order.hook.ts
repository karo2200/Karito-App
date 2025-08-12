import { useRouter } from "expo-router";

export default function useOrderHook() {
  const router = useRouter();

  return {
    router,
  };
}
