import { Menu } from "iconsax-react-native";
import { useState } from "react";
import {
  useGetServiceCategoriesQuery,
  useGetSubServiceCategoriesQuery,
} from "./hooks";

export default function useServiceTabHook() {
  const { data, hasNextPage, fetchNextPage } = useGetServiceCategoriesQuery({});

  const {
    data: subServiceData,
    hasNextPage: subServiceHasNextPage,
    fetchNextPage: subServiceFetchNextPage,
  } = useGetSubServiceCategoriesQuery({});

  const serviceItem0 = { name: "همه خدمات", svg: Menu, id: -1 };
  const [selectedService, setSelectedService] = useState(serviceItem0);

  const onServiceItemPress = (item: any) => {
    setSelectedService(item);
  };

  const onFetchNextServices = () => {
    if (hasNextPage) fetchNextPage();
  };

  const onFetchNextSubServices = () => {
    if (subServiceHasNextPage) subServiceFetchNextPage();
  };

  return {
    serviceItems:
      data && data?.pages?.length > 0
        ? [serviceItem0, ...data?.pages]
        : [serviceItem0],
    selectedService,
    subServiceItems: subServiceData?.pages ?? [],

    onFetchNextServices,
    onServiceItemPress,
  };
}
