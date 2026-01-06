import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";

type CreateOrderStoreType = {
  addressId: string;
  setAddressId: (addressId: string) => void;
  customerCityId: string;
  setCustomerCityId: (cityId: string) => void;
  customerCity: string;
  setCustomerCity: (city: string) => void;
  address?: string;
  setAddress: (adr: string) => void;
  clearAll: () => void;
  prices?: any[];
  setPrices: (value: any[]) => void;
};
type AuthCacheStore = (
  config: StateCreator<CreateOrderStoreType>,
  options: PersistOptions<CreateOrderStoreType>
) => StateCreator<CreateOrderStoreType>;

export const createOrderStore = create<CreateOrderStoreType>(
  (persist as AuthCacheStore)(
    (set) => ({
      addressId: "",
      customerCity: "",
      customerCityId: "",
      address: "",
      prices: [],
      setAddressId: (addressId: string) => set({ addressId }),
      setCustomerCityId: (customerCityId: string) => set({ customerCityId }),
      setCustomerCity: (customerCity: string) => set({ customerCity }),
      setAddress: (address: string) => set({ address }),
      setPrices: (prices: any) => set({ prices }),
      clearAll: () =>
        set({
          addressId: "",
          customerCity: "",
          customerCityId: "",
          address: "",
          prices: [],
        }),
    }),
    {
      name: "create-order-storage",

      storage: createJSONStorage(() =>
        Platform.OS === "web" ? localStorage : AsyncStorage
      ),
    }
  )
);

export default createOrderStore;
