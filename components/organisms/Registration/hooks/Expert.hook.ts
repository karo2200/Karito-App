import { useToast } from "@/components/atoms/Toast";
import { queryKeys } from "@/constants/queryKeys";
import {
  SkillPriority,
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
import {
  useGetServiceCategoriesQuery,
  useGetSubServiceCategoriesQuery,
} from "../../service/hooks";
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
    isExpert,
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

  const { data: categoriesData } = useGetServiceCategoriesQuery({ take: 100 });

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
          specialtyInputs: formData?.serviceTypes?.map((item) => {
            return { serviceTypeId: item, priority: SkillPriority.Primary };
          }),
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
        onError: (data) => console.log(JSON.stringify({ edata: data })),
      }
    );
  };

  const userAproved = isAllDocumentsApproved(profileData);
  const canGoNext = isProfileFullyUploaded(profileData);

  const phoneNumber =
    params?.phone || phone || convertIranPhoneNumber(profileData?.phoneNumber);

  useEffect(() => {
    if (!profileData) return;
    if (canGoNext) {
      setIsExpert(true);
      setIsLoggedIn(true);
      return;
    }

    const allApproved =
      profileData?.specializedDocumentsVerificationStatus ===
        VerificationStatus.Approved &&
      profileData?.idCardVerificationStatus === VerificationStatus.Approved &&
      profileData?.identityVerificationVideoStatus ===
        VerificationStatus.Approved;

    if (!isLoggedIn) {
      if (allApproved) {
        setIsExpert(true);
        setIsLoggedIn(true);
        return;
      }

      if (
        profileData?.nationalCode &&
        profileData?.serviceSubCategory &&
        page !== 3
      ) {
        setPage(3);
      }
    } else {
      if (page !== 1) setPage(1);
    }
  }, [profileData, isLoggedIn]);

  useEffect(() => {
    if (canGoNext && page === 3 && !userAproved) {
      showToast({
        message: "منتظر تایید از طرف ادمین باشید",
        type: "success",
      });
    }
  }, [canGoNext, page, userAproved]);

  const onLoginWithoutVerify = () => {
    setIsExpert(true);
    setIsLoggedIn(true);
  };

  return {
    router,
    page,
    setPage,
    exitVisible,
    setExitVisible,
    phoneNumber,

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
    categoriesData:
      (categoriesData?.pages as [{ name: string; id: string }]) ?? [],
    canGoNext,
    onLoginWithoutVerify,
    userAproved,
    isExpert,
  };
}

function convertIranPhoneNumber(phone?: string) {
  if (!phone) return "";
  return String(phone).replace(/^\+98/, "0");
}

function isProfileFullyUploaded(p?: SpecialistDto) {
  if (!p) return false;
  return Boolean(
    p.firstName &&
      p.lastName &&
      p.idCardImageUrl &&
      p.identityVerificationVideoUrl &&
      p.nationalCode &&
      p.phoneNumber &&
      p.profileImageUrl &&
      p.specializedDocumentUrls?.length > 0
  );
}

function isAllDocumentsApproved(p?: SpecialistDto) {
  if (!p) return false;
  return (
    p.specializedDocumentsVerificationStatus === VerificationStatus.Approved &&
    p.idCardVerificationStatus === VerificationStatus.Approved &&
    p.identityVerificationVideoStatus === VerificationStatus.Approved
  );
}
