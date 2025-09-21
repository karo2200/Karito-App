import { Menu } from "iconsax-react-native";
import { create } from "zustand";

const useServiceStore = create((set) => ({
  currentService: { name: "همه خدمات", svg: Menu, id: -1 },
  serCurrentService: (currentService: any) => set(() => ({ currentService })),
}));

export default useServiceStore;
