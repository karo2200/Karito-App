import { Car, Menu } from "iconsax-react-native";
import { useState } from "react";

export default function useServiceTabHook() {
  const serviceItems = [
    { Icon: Menu, title: "همه خدمات", id: 1 },
    { Icon: Car, title: "خودرو", id: 2 },
  ];
  const [selectedService, setSelectedService] = useState(serviceItems[0]);

  const onServiceItemPress = (index: number) => {
    setSelectedService(serviceItems[index]);
  };

  return {
    serviceItems,
    selectedService,
    onServiceItemPress,
  };
}
