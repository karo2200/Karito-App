import { useRouter } from "expo-router";
import { useState } from "react";

export default function useExpertHook() {
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [exitVisible, setExitVisible] = useState<boolean>(false);

  return {
    router,
    page,
    setPage,
    exitVisible,
    setExitVisible,
  };
}
