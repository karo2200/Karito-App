import { persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

type UserStoreType = {
  isLoggedIn: boolean;
  isExpert: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setIsExpert: (value: boolean) => void;
};

const useUserStore = createStore<UserStoreType>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isExpert: false,
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
      setIsExpert: (isExpert: boolean) => set({ isExpert }),
    }),
    { name: "user-storage" }
  )
);
export default useUserStore;
