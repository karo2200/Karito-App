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
  userId: string;
  setUserId: (userId: string) => void;
  customerCity: string;
  setCustomerCity: (customerCity: string) => void;
  clearAuth: () => void;
  isLoggedIn: boolean;
  isExpert: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setIsExpert: (value: boolean) => void;
  nationalCode: string;
  setNationalCode: (value: string) => void;
  setPhone: (value: string) => void;
  phone: string;
  isSelectRole: boolean;
  setIsSelectRole: (value: boolean) => void;
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
      userId: "",
      isLoggedIn: false,
      isExpert: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setIsExpert: (isExpert: boolean) => set({ isExpert }),
      nationalCode: "",
      setNationalCode: (nationalCode: string) => set({ nationalCode }),
      phone: "",
      setPhone: (phone: string) => set({ phone }),
      setUserId: (userId: string) => set({ userId }),
      customerCity: "تهران",
      setCustomerCity: (customerCity: string) => set({ customerCity }),
      isSelectRole: false,
      setIsSelectRole: (value: boolean) => set({ isSelectRole: value }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          validTo: null,
          isLoggedIn: false,
          isExpert: undefined,
          nationalCode: "",
          phone: "",
          isSelectRole: false,
        }),
    }),
    {
      name: "auth-cache-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default authCacheStore;
