import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  useSpecialist_SetCityMutation,
  useSpecialist_SetServiceSubCategoryMutation,
  useSpecialist_SetServiceTypesMutation,
} from "@/generated/graphql";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  useGetAllCityQuery,
  useGetAllprovinceQuery,
} from "../../home/hooks/Home.query";
import { useGetSpecialistProfile } from "../../PersonalInfo/hooks/personalInfo.query";
import { useGetSubServiceCategoriesQuery } from "../../service/hooks";
import { useGetServiceTypesQuery } from "../../subService/hooks";

export default function useExpertHook() {
  const router = useRouter();

  const { params } = useRoute();

  const queryClient = useQueryClient();

  const { showToast } = useToast();

  const [page, setPage] = useState<number>(1);
  const [exitVisible, setExitVisible] = useState<boolean>(false);
  const [province, setProvince] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { mutate: cityMutate, isPending: cityPneding } =
    useSpecialist_SetCityMutation();
  const { mutate: categoryMutate, isPending: categoryPending } =
    useSpecialist_SetServiceSubCategoryMutation();
  const { mutate: serviceMutate, isPending: servicePending } =
    useSpecialist_SetServiceTypesMutation();

  const { data: expertData } = useGetSpecialistProfile();

  const profileData = expertData?.specialist_getMyProfile?.result;

  console.log("=====>>>", expertData);

  const { data: provinceData, isPending: provincePending } =
    useGetAllprovinceQuery({ take: 50 });

  const { data: cityData, isPending: cityPending } = useGetAllCityQuery({
    where: { province: { id: { eq: province } } },
  });

  const { data: subCategoriesData } = useGetSubServiceCategoriesQuery({
    take: 50,
  });

  const { data: serviceTypeData } = useGetServiceTypesQuery({
    take: 100,
    where: { serviceSubCategory: { id: { eq: category } } },
  });

  const onRegistrationPress = (formData: any) => {
    console.log("fffffff", formData);
  };

  const onRegisterCity = (formData: any, onNextPress?: () => void) => {
    cityMutate(
      { input: { cityId: formData?.city } },
      {
        onSuccess: () => {
          categoryMutate(
            { input: { serviceSubCategoryId: formData?.profession } },
            {
              onSuccess: () => {
                serviceMutate(
                  { input: { serviceTypeIds: formData?.serviceTypes } },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({
                        queryKey: [queryKeys.specialist_getMyProfile],
                      });
                      onNextPress?.();
                    },
                  }
                );
              },
            }
          );
        },
      }
    );
  };

  return {
    router,
    page,
    setPage,
    exitVisible,
    setExitVisible,
    phoneNumber: params?.phone,
    onRegistrationPress,
    provincePending,
    provinceData: provinceData?.pages as [{ name: string; id: string }],
    setProvince,
    cityData: cityData?.pages as [{ name: string; id: string }],
    cityPending,
    subCategoriesData: subCategoriesData?.pages as [
      { name: string; id: string },
    ],
    cityPneding,
    serviceTypeData: serviceTypeData?.pages as [{ name: string; id: string }],
    onRegisterCity,
    setCategory,
    categoryPending,
    servicePending,
    profileData,
  };
}
