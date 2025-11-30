import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  SpecialistDto,
  useSpecialist_SetLocationAndSpecialtyMutation,
  VerificationStatus,
} from "@/generated/graphql";
import authCacheStore from "@/stores/authCacheStore";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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

  const {
    setNationalCode,
    nationalCode,
    setPhone,
    phone,
    setIsLoggedIn,
    setIsExpert,
    isLoggedIn,
  } = authCacheStore();

  const [page, setPage] = useState<number>(1);
  const [exitVisible, setExitVisible] = useState<boolean>(false);
  const [province, setProvince] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { mutate: cityMutate, isPending: stepPending } =
    useSpecialist_SetLocationAndSpecialtyMutation();

  const { data: expertData } = useGetSpecialistProfile();

  const profileData: SpecialistDto =
    expertData?.specialist_getMyProfile?.result;
  console.log(JSON.stringify({ profileData }));
  useEffect(() => {
    if (!isLoggedIn) {
      if (
        profileData?.specializedDocumentsVerificationStatus ===
          VerificationStatus.Approved &&
        profileData?.idCardVerificationStatus === VerificationStatus.Approved &&
        profileData?.identityVerificationVideoStatus ===
          VerificationStatus.Approved
      ) {
        setIsExpert(true);
        setIsLoggedIn(true);
      } else if (profileData?.nationalCode && profileData?.serviceSubCategory) {
        setPage(3);
      }
    } else {
      setPage(1);
    }
  }, [profileData, isLoggedIn]);

  const { data: provinceData, isPending: provincePending } =
    useGetAllprovinceQuery({ take: 50 });

  const {
    data: cityData,
    isPending: cityPending,
    fetchNextPage: cityFetchNextPage,
    hasNextPage: cityHasNextPage,
  } = useGetAllCityQuery({
    where: { province: { id: { eq: province } } },
  });

  const { data: subCategoriesData } = useGetSubServiceCategoriesQuery({
    take: 50,
  });

  const { data: serviceTypeData } = useGetServiceTypesQuery({
    take: 100,
    where: { serviceSubCategory: { id: { eq: category } } },
  });

  const onLoadMoreCity = () => {
    if (cityHasNextPage) cityFetchNextPage();
  };

  const onRegistrationPress = (formData: any, onNextPress?: () => void) => {
    setNationalCode(formData?.code);
    setPhone(formData?.phone);
    onNextPress?.();
  };

  const onRegisterCity = (formData: any, onNextPress?: () => void) => {
    cityMutate(
      {
        input: {
          cityId: formData?.city,
          serviceSubCategoryId: formData?.profession,
          serviceTypeIds: formData?.serviceTypes,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.specialist_setLocationAndSpecialty?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.specialist_getMyProfile],
            });
            onNextPress?.();
          } else {
            showToast({
              message:
                data?.specialist_setLocationAndSpecialty?.status?.message,
              type: "error",
            });
          }
        },
      }
    );
  };

  function convertIranPhoneNumber(phone) {
    return phone.replace(/^\+98/, "0");
  }

  return {
    router,
    page,
    setPage,
    exitVisible,
    setExitVisible,
    phoneNumber:
      params?.phone ||
      phone ||
      convertIranPhoneNumber(profileData?.phoneNumber),
    onRegistrationPress,
    provincePending,
    provinceData: provinceData?.pages as [{ name: string; id: string }],
    setProvince,
    cityData: cityData?.pages as [{ name: string; id: string }],
    cityPending,
    subCategoriesData: subCategoriesData?.pages as [
      { name: string; id: string },
    ],
    stepPending,
    serviceTypeData: serviceTypeData?.pages as [{ name: string; id: string }],
    onRegisterCity,
    setCategory,
    profileData,
    nationalCode: profileData?.nationalCode ?? nationalCode,
    isLoggedIn,
    onLoadMoreCity,
  };
}
