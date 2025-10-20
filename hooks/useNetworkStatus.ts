import { useToast } from "@/components/atoms/Toast";
import { useNetworkState } from "expo-network";
import { useEffect, useState } from "react";

export default function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean | undefined>();
  const networkState = useNetworkState();

  useEffect(() => {
    setIsConnected(networkState.isConnected);
  }, [networkState]);

  return { isConnected };
}

export function NetworkWatcher() {
  const { isConnected } = useNetworkStatus();
  const { showToast } = useToast();

  useEffect(() => {
    if (isConnected === false) {
      showToast({
        message: "لطفا اتصال اینترنت خود را بررسی کنید",
        type: "error",
      });
    }
  }, [isConnected]);

  return null;
}
