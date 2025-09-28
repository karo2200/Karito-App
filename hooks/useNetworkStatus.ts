import { useToast } from "@/components/atoms/Toast";
import * as Network from "expo-network";
import { useEffect, useState } from "react";

export default function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [type, setType] = useState<Network.NetworkStateType | null>(null);
  const [ip, setIp] = useState<string | null>(null);

  useEffect(() => {
    const fetchNetworkStatus = async () => {
      const status = await Network.getNetworkStateAsync();
      setIsConnected(status.isConnected ?? null);
      setType(status.type ?? null);

      const ipAddress = await Network.getIpAddressAsync();
      setIp(ipAddress);
    };

    fetchNetworkStatus();

    const interval = setInterval(fetchNetworkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return { isConnected, type, ip };
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
