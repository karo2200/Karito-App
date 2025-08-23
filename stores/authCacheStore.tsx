import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

type AuthCacheType = {
  accessToken?: any;
  setAccessToken: (accessToken: string) => void;
  refreshToken?: any;
  setRefreshToken: (refreshToken: string) => void;
  validTo?: any;
  setValidTo: (validTo: string) => void;
  isOnBoarded?: boolean;
  setIsOnBoarded: (isOnBoarded: boolean) => void;
  isUserLoggedIn?: boolean;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
  userId: string;
  setUserId: (userId: string) => void;
  customerCity: string;
  setCustomerCity: (customerCity: string) => void;
  clearAuth: () => void;
};
type AuthCacheStore = (
  config: StateCreator<AuthCacheType>,
  options: PersistOptions<AuthCacheType>
) => StateCreator<AuthCacheType>;

export const authCacheStore = create<AuthCacheType>(
  (persist as AuthCacheStore)(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken: string) => set({ accessToken }),
      refreshToken: null,
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      validTo: null,
      setValidTo: (validTo: string) => set({ validTo }),
      isOnBoarded: false,
      setIsOnBoarded: (isOnBoarded: boolean) => set({ isOnBoarded }),
      isUserLoggedIn: false,
      setIsUserLoggedIn: (isUserLoggedIn: boolean) => set({ isUserLoggedIn }),
      userId: "",
      setUserId: (userId: string) => set({ userId }),
      customerCity: "تهران",
      setCustomerCity: (customerCity: string) => set({ customerCity }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          validTo: null,
          isUserLoggedIn: false,
        }),
    }),
    {
      name: "auth-cache-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default authCacheStore;
