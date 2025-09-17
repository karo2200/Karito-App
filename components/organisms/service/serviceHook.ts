import { useRoute } from "@react-navigation/native";
import { Menu } from "iconsax-react-native";
import { useEffect, useState } from "react";
import {
  useGetServiceCategoriesQuery,
  useGetSubServiceCategoriesQuery,
} from "./hooks";

export default function useServiceTabHook() {
  const serviceItem0 = { name: "همه خدمات", svg: Menu, id: -1 };

  const { params } = useRoute();

  const [selectedService, setSelectedService] = useState({});
  const [searchText, setSearchText] = useState<string | undefined>("");
  const { data, hasNextPage, fetchNextPage } = useGetServiceCategoriesQuery({});

  const searchQuery = { name: { contains: searchText } };

  useEffect(() => {
    if (params?.id) {
      setSelectedService({
        name: params?.name,
        svg: params?.logo,
        id: params?.id,
      });
    } else {
      setSelectedService(serviceItem0);
    }
  }, [params]);

  const {
    data: subServiceData,
    hasNextPage: subServiceHasNextPage,
    fetchNextPage: subServiceFetchNextPage,
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
    onFetchNextSubServices,
    onServiceItemPress,
    setSearchText,
    onSubServiceLoadMore: onFetchNextSubServices,
  };
}
