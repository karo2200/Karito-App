import authCacheStore from "@/stores/authCacheStore";
import useServiceStore from "@/stores/serviceTabStore";
import { useRoute } from "@react-navigation/native";
import { Menu } from "iconsax-react-native";
import { useEffect, useState } from "react";
import { SheetManager } from "react-native-actions-sheet";
import {
  useGetServiceCategoriesQuery,
  useGetSubServiceCategoriesQuery,
} from "./hooks";

export default function useServiceTabHook() {
  const serviceItem0 = { name: "همه خدمات", svg: Menu, id: -1 };
  const { customerCity, setCustomerCity } = authCacheStore();

  const { params } = useRoute();
  const { serCurrentService, currentService } = useServiceStore();

  const [selectedService, setSelectedService] = useState({});
  const [searchText, setSearchText] = useState<string | undefined>("");
  const { data, hasNextPage, fetchNextPage } = useGetServiceCategoriesQuery({});

  const searchQuery = { name: { contains: searchText } };

  useEffect(() => {
    if (params?.id) {
      const service = {
        name: params?.name,
        svg: params?.logo,
        id: params?.id,
      };
      serCurrentService(service);
      setSelectedService(service);
    } else {
      setSelectedService(currentService);
    }
  }, [params]);

  const {
    data: subServiceData,
    hasNextPage: subServiceHasNextPage,
    fetchNextPage: subServiceFetchNextPage,
    isLoading: subServiceLoading,
  } = useGetSubServiceCategoriesQuery({
    where:
      selectedService?.id === -1
        ? searchText && searchText?.length > 0
          ? searchQuery
          : undefined
        : searchText && searchText?.length > 0
          ? {
              and: [
                { serviceCategory: { id: { eq: selectedService?.id } } },
                searchQuery,
              ],
            }
          : { serviceCategory: { id: { eq: selectedService?.id } } },
  });

  const onServiceItemPress = (item: any) => {
    serCurrentService(item);
    console.log("****");
    setSelectedService(item);
  };

  const onFetchNextServices = () => {
    if (hasNextPage) fetchNextPage();
  };

  const onFetchNextSubServices = () => {
    if (subServiceHasNextPage) subServiceFetchNextPage();
  };

  const onLocationPress = () => {
    console.log("MM");
    SheetManager.show("address-sheet");
  };

  const onCloseSheet = () => {
    SheetManager.hide("address-sheet");
  };

  return {
    serviceItems:
      data && data?.pages?.length > 0
        ? [serviceItem0, ...data?.pages]
        : [serviceItem0],
    selectedService,
    subServiceItems: subServiceData?.pages ?? [],
    subServiceLoading,
    customerCity,

    onFetchNextServices,
    onFetchNextSubServices,
    onServiceItemPress,
    setSearchText,
    onSubServiceLoadMore: onFetchNextSubServices,
    onLocationPress,
    onCloseSheet,
    setCustomerCity,
  };
}
