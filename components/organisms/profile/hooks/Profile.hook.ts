import { useRouter } from "expo-router";
import { useState } from "react";

export default function useProfileHook() {
  const router = useRouter();

  const [exitVisible, setExitVisible] = useState(false);

  return {
    exitVisible,
    setExitVisible,
  };
}
