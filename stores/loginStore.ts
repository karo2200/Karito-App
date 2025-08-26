import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStoreType = {
  isLoggedIn: boolean;
  isExpert: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setIsExpert: (value: boolean) => void;
};

const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isExpert: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setIsExpert: (isExpert: boolean) => set({ isExpert }),
    }),
    { name: "user-storage", getStorage: () => AsyncStorage }
  )
);
export default useUserStore;
