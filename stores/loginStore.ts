import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStoreType = {
  isLoggedIn: boolean;
  isExpert: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setIsExpert: (value: boolean) => void;
  isSelectRole: boolean;
  setIsSelectRole: (value: boolean) => void;
  isModalUserLoggedInVisible: boolean;
  setIsModalUserLoggedInVisible: (isModalUserLoggedInVisible: boolean) => void;
};

const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isExpert: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setIsExpert: (isExpert: boolean) => set({ isExpert }),
      isSelectRole: false,
      setIsSelectRole: (isSelectRole: boolean) => set({ isSelectRole }),
      isModalUserLoggedInVisible: false,
      setIsModalUserLoggedInVisible: (isModalUserLoggedInVisible: boolean) =>
        set({ isModalUserLoggedInVisible }),
    }),
    { name: "user-storage", getStorage: () => AsyncStorage }
  )
);
export default useUserStore;
