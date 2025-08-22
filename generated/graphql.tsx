import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  UseMutationOptions,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  InfiniteData,
} from "@tanstack/react-query";
import { fetcher } from "@/graphql/fetcher";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Any: { input: any; output: any };
  DateTime: { input: any; output: any };
  Decimal: { input: any; output: any };
  UUID: { input: any; output: any };
};

export type AcceptServiceRequestInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type ActivateCityInput = {
  cityId: Scalars["UUID"]["input"];
};

export type AddAddressInput = {
  customerId: Scalars["UUID"]["input"];
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
  neighborhoodId: Scalars["UUID"]["input"];
  text: Scalars["String"]["input"];
};

export type AddressDto = {
  __typename?: "AddressDto";
  id: Scalars["UUID"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
  neighborhoodId: Scalars["UUID"]["output"];
  text: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type AddressDtoCollectionSegment = {
  __typename?: "AddressDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<AddressDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type AddressDtoFilterInput = {
  and?: InputMaybe<Array<AddressDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  latitude?: InputMaybe<FloatOperationFilterInput>;
  longitude?: InputMaybe<FloatOperationFilterInput>;
  neighborhoodId?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<AddressDtoFilterInput>>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type AddressDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  neighborhoodId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
};

/** Defines when a policy shall be executed. */
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = "AFTER_RESOLVER",
  /** Before the resolver was executed. */
  BeforeResolver = "BEFORE_RESOLVER",
  /** The policy is applied in the validation step before the execution. */
  Validation = "VALIDATION",
}

export type AuthResult = {
  __typename?: "AuthResult";
  accessToken: Scalars["String"]["output"];
  refreshToken: Scalars["String"]["output"];
};

export type BannerDto = {
  __typename?: "BannerDto";
  id: Scalars["UUID"]["output"];
  imageUrl: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type BannerDtoCollectionSegment = {
  __typename?: "BannerDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<BannerDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type BannerDtoFilterInput = {
  and?: InputMaybe<Array<BannerDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  imageUrl?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<BannerDtoFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type BannerDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  imageUrl?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  neq?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CancelServiceRequestInput = {
  cancellationReasonId: Scalars["UUID"]["input"];
  serviceRequestId: Scalars["UUID"]["input"];
};

export type CancellationReasonDto = {
  __typename?: "CancellationReasonDto";
  id: Scalars["UUID"]["output"];
  name: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type CancellationReasonDtoCollectionSegment = {
  __typename?: "CancellationReasonDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<CancellationReasonDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type CancellationReasonDtoFilterInput = {
  and?: InputMaybe<Array<CancellationReasonDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CancellationReasonDtoFilterInput>>;
};

export type CancellationReasonDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type CarouselDto = {
  __typename?: "CarouselDto";
  id: Scalars["UUID"]["output"];
  imageUrls: Array<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type CarouselDtoFilterInput = {
  and?: InputMaybe<Array<CarouselDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  imageUrls?: InputMaybe<ListStringOperationFilterInput>;
  or?: InputMaybe<Array<CarouselDtoFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type CarouselDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type CityDto = {
  __typename?: "CityDto";
  activeBanner?: Maybe<BannerDto>;
  activeCarousel?: Maybe<CarouselDto>;
  id: Scalars["UUID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  province: ProvinceDto;
};

/** A segment of a collection. */
export type CityDtoCollectionSegment = {
  __typename?: "CityDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<CityDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type CityDtoFilterInput = {
  activeBanner?: InputMaybe<BannerDtoFilterInput>;
  activeCarousel?: InputMaybe<CarouselDtoFilterInput>;
  and?: InputMaybe<Array<CityDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CityDtoFilterInput>>;
  province?: InputMaybe<ProvinceDtoFilterInput>;
};

export type CityDtoSortInput = {
  activeBanner?: InputMaybe<BannerDtoSortInput>;
  activeCarousel?: InputMaybe<CarouselDtoSortInput>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  province?: InputMaybe<ProvinceDtoSortInput>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: "CollectionSegmentInfo";
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars["Boolean"]["output"];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars["Boolean"]["output"];
};

export type CompleteServiceInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type CreateCityInput = {
  name: Scalars["String"]["input"];
  provinceId: Scalars["UUID"]["input"];
};

export type CreateNeighborhoodInput = {
  cityId: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateServiceCategoryInput = {
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateServiceRequestInput = {
  addressId: Scalars["UUID"]["input"];
  description: Scalars["String"]["input"];
  gender?: InputMaybe<Gender>;
  locationType: LocationType;
  requestDate: Scalars["DateTime"]["input"];
  serviceTypeId: Scalars["UUID"]["input"];
};

export type CreateServiceSubCategoryInput = {
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceCategoryId: Scalars["UUID"]["input"];
};

export type CreateServiceTypeInput = {
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceSubCategoryId: Scalars["UUID"]["input"];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  neq?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngt?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngte?: InputMaybe<Scalars["DateTime"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  nlt?: InputMaybe<Scalars["DateTime"]["input"]>;
  nlte?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type DeactivateCityInput = {
  cityId: Scalars["UUID"]["input"];
};

export type DeleteAddressInput = {
  addressId: Scalars["UUID"]["input"];
};

export type DeleteNeighborhoodInput = {
  neighborhoodId: Scalars["UUID"]["input"];
};

export type DeleteServiceCategoryInput = {
  serviceCategoryId: Scalars["UUID"]["input"];
};

export type DeleteServiceSubCategoryInput = {
  serviceSubCategoryId: Scalars["UUID"]["input"];
};

export type DeleteServiceTypeInput = {
  serviceTypeId: Scalars["UUID"]["input"];
};

export type DiscountCode = {
  __typename?: "DiscountCode";
  amount: Scalars["Decimal"]["output"];
  code: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  expiryDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["UUID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isPercentage: Scalars["Boolean"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type FloatOperationFilterInput = {
  eq?: InputMaybe<Scalars["Float"]["input"]>;
  gt?: InputMaybe<Scalars["Float"]["input"]>;
  gte?: InputMaybe<Scalars["Float"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  neq?: InputMaybe<Scalars["Float"]["input"]>;
  ngt?: InputMaybe<Scalars["Float"]["input"]>;
  ngte?: InputMaybe<Scalars["Float"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["Float"]["input"]>>>;
  nlt?: InputMaybe<Scalars["Float"]["input"]>;
  nlte?: InputMaybe<Scalars["Float"]["input"]>;
};

export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
}

export type ListResponseBaseOfAddressDto = {
  __typename?: "ListResponseBaseOfAddressDto";
  result?: Maybe<AddressDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfAddressDtoResultArgs = {
  order?: InputMaybe<Array<AddressDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AddressDtoFilterInput>;
};

export type ListResponseBaseOfBannerDto = {
  __typename?: "ListResponseBaseOfBannerDto";
  result?: Maybe<BannerDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfBannerDtoResultArgs = {
  order?: InputMaybe<Array<BannerDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BannerDtoFilterInput>;
};

export type ListResponseBaseOfCancellationReasonDto = {
  __typename?: "ListResponseBaseOfCancellationReasonDto";
  result?: Maybe<CancellationReasonDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfCancellationReasonDtoResultArgs = {
  order?: InputMaybe<Array<CancellationReasonDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CancellationReasonDtoFilterInput>;
};

export type ListResponseBaseOfCarouselDto = {
  __typename?: "ListResponseBaseOfCarouselDto";
  result?: Maybe<Array<CarouselDto>>;
  status: ResponseStatus;
  toSingleResponseBase: SingleResponseBaseOfCarouselDto;
};

export type ListResponseBaseOfCityDto = {
  __typename?: "ListResponseBaseOfCityDto";
  result?: Maybe<CityDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfCityDtoResultArgs = {
  order?: InputMaybe<Array<CityDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CityDtoFilterInput>;
};

export type ListResponseBaseOfNeighborhoodDto = {
  __typename?: "ListResponseBaseOfNeighborhoodDto";
  result?: Maybe<NeighborhoodDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfNeighborhoodDtoResultArgs = {
  order?: InputMaybe<Array<NeighborhoodDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<NeighborhoodDtoFilterInput>;
};

export type ListResponseBaseOfProvinceDto = {
  __typename?: "ListResponseBaseOfProvinceDto";
  result?: Maybe<ProvinceDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfProvinceDtoResultArgs = {
  order?: InputMaybe<Array<ProvinceDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ProvinceDtoFilterInput>;
};

export type ListResponseBaseOfServiceCategoryDto = {
  __typename?: "ListResponseBaseOfServiceCategoryDto";
  result?: Maybe<ServiceCategoryDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfServiceCategoryDtoResultArgs = {
  order?: InputMaybe<Array<ServiceCategoryDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceCategoryDtoFilterInput>;
};

export type ListResponseBaseOfServiceRequestDto = {
  __typename?: "ListResponseBaseOfServiceRequestDto";
  result?: Maybe<ServiceRequestDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfServiceRequestDtoResultArgs = {
  order?: InputMaybe<Array<ServiceRequestDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDtoFilterInput>;
};

export type ListResponseBaseOfServiceSubCategoryDto = {
  __typename?: "ListResponseBaseOfServiceSubCategoryDto";
  result?: Maybe<ServiceSubCategoryDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfServiceSubCategoryDtoResultArgs = {
  order?: InputMaybe<Array<ServiceSubCategoryDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceSubCategoryDtoFilterInput>;
};

export type ListResponseBaseOfServiceTypeDto = {
  __typename?: "ListResponseBaseOfServiceTypeDto";
  result?: Maybe<ServiceTypeDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfServiceTypeDtoResultArgs = {
  order?: InputMaybe<Array<ServiceTypeDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceTypeDtoFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]["input"]>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export enum LocationType {
  Commercial = "COMMERCIAL",
  Office = "OFFICE",
  Residential = "RESIDENTIAL",
  Vacant = "VACANT",
}

export type MarkAsArrivedInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  address_createAddress: ResponseBaseOfAddressDto;
  address_deleteAddress: ResponseBase;
  address_updateAddress: ResponseBaseOfAddressDto;
  /** Generates a new access and refresh token pair using a valid refresh token. */
  auth_refreshToken: ResponseBaseOfAuthResult;
  /** Requests an OTP to be sent to the provided phone number and user type. */
  auth_requestOtp: ResponseBase;
  auth_verifyOtp: ResponseBaseOfAuthResult;
  banner_createBanner: ResponseBaseOfBannerDto;
  banner_deleteBanner: ResponseBase;
  banner_updateBanner: ResponseBaseOfBannerDto;
  cancelationReason_createCancelationReason: ResponseBaseOfCancellationReasonDto;
  cancelationReason_deleteCancelationReason: ResponseBase;
  cancelationReason_updateCancelationReason: ResponseBaseOfCancellationReasonDto;
  carousel_createCarousel: ResponseBaseOfCarouselDto;
  carousel_deleteCarousel: ResponseBase;
  carousel_updateCarousel: ResponseBaseOfCarouselDto;
  city_activate: ResponseBaseOfCityDto;
  city_createCity: ResponseBaseOfCityDto;
  city_deactivate: ResponseBaseOfCityDto;
  city_setActiveBanner: ResponseBaseOfCityDto;
  city_setActiveCarousel: ResponseBaseOfCityDto;
  city_updateCity: ResponseBaseOfCityDto;
  createDiscountCode: Scalars["UUID"]["output"];
  createServiceTypeQuestion: Scalars["UUID"]["output"];
  neighborhood_createNeighborhood: ResponseBaseOfNeighborhoodDto;
  neighborhood_deleteNeighborhood: ResponseBase;
  neighborhood_updateNeighborhood: ResponseBaseOfNeighborhoodDto;
  province_create: ResponseBaseOfProvinceDto;
  province_delete: ResponseBase;
  province_update: ResponseBaseOfProvinceDto;
  serviceAcceptance_markAsArrived: ResponseBaseOfServiceRequestDto;
  serviceCategory_createServiceCategory: ResponseBaseOfServiceCategoryDto;
  serviceCategory_deleteServiceCategory: ResponseBase;
  serviceCategory_updateServiceCategory: ResponseBaseOfServiceCategoryDto;
  serviceRequest_accept: ResponseBaseOfServiceRequestDto;
  serviceRequest_cancel: ResponseBaseOfServiceRequestDto;
  serviceRequest_completeService: ResponseBaseOfServiceRequestDto;
  serviceRequest_create: ResponseBaseOfServiceRequestDto;
  serviceSubCategory_create: ResponseBaseOfServiceSubCategoryDto;
  serviceSubCategory_delete: ResponseBase;
  serviceSubCategory_update: ResponseBaseOfServiceSubCategoryDto;
  serviceType_create: ResponseBaseOfServiceTypeDto;
  serviceType_delete: ResponseBase;
  serviceType_update: ResponseBaseOfServiceTypeDto;
  /** Allows an owner to create a new admin user. */
  user_createAdmin: ResponseBase;
};

export type MutationAddress_CreateAddressArgs = {
  input: AddAddressInput;
};

export type MutationAddress_DeleteAddressArgs = {
  input: DeleteAddressInput;
};

export type MutationAddress_UpdateAddressArgs = {
  input: UpdateAddressInput;
};

export type MutationAuth_RefreshTokenArgs = {
  accessToken: Scalars["String"]["input"];
  refreshToken: Scalars["String"]["input"];
};

export type MutationAuth_RequestOtpArgs = {
  phoneNumber: Scalars["String"]["input"];
  userType: UserType;
};

export type MutationAuth_VerifyOtpArgs = {
  otp: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
  userType: UserType;
};

export type MutationBanner_CreateBannerArgs = {
  imageUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationBanner_DeleteBannerArgs = {
  bannerId: Scalars["UUID"]["input"];
};

export type MutationBanner_UpdateBannerArgs = {
  id: Scalars["UUID"]["input"];
  imageUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationCancelationReason_CreateCancelationReasonArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCancelationReason_DeleteCancelationReasonArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationCancelationReason_UpdateCancelationReasonArgs = {
  id: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationCarousel_CreateCarouselArgs = {
  imageUrls: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type MutationCarousel_DeleteCarouselArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationCarousel_UpdateCarouselArgs = {
  id: Scalars["UUID"]["input"];
  imageUrls: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type MutationCity_ActivateArgs = {
  input: ActivateCityInput;
};

export type MutationCity_CreateCityArgs = {
  input: CreateCityInput;
};

export type MutationCity_DeactivateArgs = {
  input: DeactivateCityInput;
};

export type MutationCity_SetActiveBannerArgs = {
  bannerId?: InputMaybe<Scalars["UUID"]["input"]>;
  cityId: Scalars["UUID"]["input"];
};

export type MutationCity_SetActiveCarouselArgs = {
  carouselId?: InputMaybe<Scalars["UUID"]["input"]>;
  cityId: Scalars["UUID"]["input"];
};

export type MutationCity_UpdateCityArgs = {
  input: UpdateCityInput;
};

export type MutationCreateDiscountCodeArgs = {
  amount: Scalars["Decimal"]["input"];
  code: Scalars["String"]["input"];
  expiryDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  isActive: Scalars["Boolean"]["input"];
  isPercentage: Scalars["Boolean"]["input"];
};

export type MutationCreateServiceTypeQuestionArgs = {
  options: Array<Scalars["String"]["input"]>;
  serviceTypeId: Scalars["UUID"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationNeighborhood_CreateNeighborhoodArgs = {
  input: CreateNeighborhoodInput;
};

export type MutationNeighborhood_DeleteNeighborhoodArgs = {
  input: DeleteNeighborhoodInput;
};

export type MutationNeighborhood_UpdateNeighborhoodArgs = {
  input: UpdateNeighborhoodInput;
};

export type MutationProvince_CreateArgs = {
  name: Scalars["String"]["input"];
};

export type MutationProvince_DeleteArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationProvince_UpdateArgs = {
  id: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationServiceAcceptance_MarkAsArrivedArgs = {
  input: MarkAsArrivedInput;
};

export type MutationServiceCategory_CreateServiceCategoryArgs = {
  input: CreateServiceCategoryInput;
};

export type MutationServiceCategory_DeleteServiceCategoryArgs = {
  input: DeleteServiceCategoryInput;
};

export type MutationServiceCategory_UpdateServiceCategoryArgs = {
  input: UpdateServiceCategoryInput;
};

export type MutationServiceRequest_AcceptArgs = {
  input: AcceptServiceRequestInput;
};

export type MutationServiceRequest_CancelArgs = {
  input: CancelServiceRequestInput;
};

export type MutationServiceRequest_CompleteServiceArgs = {
  input: CompleteServiceInput;
};

export type MutationServiceRequest_CreateArgs = {
  input: CreateServiceRequestInput;
};

export type MutationServiceSubCategory_CreateArgs = {
  input: CreateServiceSubCategoryInput;
};

export type MutationServiceSubCategory_DeleteArgs = {
  input: DeleteServiceSubCategoryInput;
};

export type MutationServiceSubCategory_UpdateArgs = {
  input: UpdateServiceSubCategoryInput;
};

export type MutationServiceType_CreateArgs = {
  input: CreateServiceTypeInput;
};

export type MutationServiceType_DeleteArgs = {
  input: DeleteServiceTypeInput;
};

export type MutationServiceType_UpdateArgs = {
  input: UpdateServiceTypeInput;
};

export type MutationUser_CreateAdminArgs = {
  adminPhoneNumber: Scalars["String"]["input"];
};

export type NeighborhoodDto = {
  __typename?: "NeighborhoodDto";
  cityId: Scalars["UUID"]["output"];
  id: Scalars["UUID"]["output"];
  name: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type NeighborhoodDtoCollectionSegment = {
  __typename?: "NeighborhoodDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<NeighborhoodDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type NeighborhoodDtoFilterInput = {
  and?: InputMaybe<Array<NeighborhoodDtoFilterInput>>;
  cityId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<NeighborhoodDtoFilterInput>>;
};

export type NeighborhoodDtoSortInput = {
  cityId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type ProvinceDto = {
  __typename?: "ProvinceDto";
  id: Scalars["UUID"]["output"];
  name: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type ProvinceDtoCollectionSegment = {
  __typename?: "ProvinceDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<ProvinceDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ProvinceDtoFilterInput = {
  and?: InputMaybe<Array<ProvinceDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ProvinceDtoFilterInput>>;
};

export type ProvinceDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: "Query";
  address_getMyAddresses: ListResponseBaseOfAddressDto;
  address_nearestAddresses: ListResponseBaseOfAddressDto;
  banner_getAll: ListResponseBaseOfBannerDto;
  banner_getBanner: ResponseBaseOfBannerDto;
  cancelationReason_getAllCancelationReasons: ListResponseBaseOfCancellationReasonDto;
  cancelationReason_getCancelationReason: ResponseBaseOfCancellationReasonDto;
  carousel_getAll: ResponseBaseOfListResponseBaseOfCarouselDto;
  carousel_getCarousel: ResponseBaseOfCarouselDto;
  city_getAll: ListResponseBaseOfCityDto;
  city_getCity: ResponseBaseOfCityDto;
  discountCodes: Array<DiscountCode>;
  neighborhood_getAll: ListResponseBaseOfNeighborhoodDto;
  neighborhood_getNeighborhood: ResponseBaseOfNeighborhoodDto;
  province_getAll: ListResponseBaseOfProvinceDto;
  province_getProvince: ResponseBaseOfProvinceDto;
  serviceCategory_getServiceCategories: ListResponseBaseOfServiceCategoryDto;
  serviceCategory_getServiceCategory: ResponseBaseOfServiceCategoryDto;
  serviceRequest_getAll: ListResponseBaseOfServiceRequestDto;
  serviceRequest_getMyServiceAcceptances: ListResponseBaseOfServiceRequestDto;
  serviceRequest_getMyServiceRequests: ListResponseBaseOfServiceRequestDto;
  serviceRequest_getServiceRequest: ResponseBaseOfServiceRequestDto;
  serviceSubCategory_get: ResponseBaseOfServiceSubCategoryDto;
  serviceSubCategory_getAll: ListResponseBaseOfServiceSubCategoryDto;
  serviceTypeQuestionsByServiceType: Array<ServiceTypeQuestionDto>;
  serviceType_get: ResponseBaseOfServiceTypeDto;
  serviceTypes_getAll: ListResponseBaseOfServiceTypeDto;
  /** Gets the profile of the currently authenticated user. */
  user_getMyProfile: ResponseBaseOfUserProfileDto;
};

export type QueryAddress_GetMyAddressesArgs = {
  userId: Scalars["UUID"]["input"];
};

export type QueryAddress_NearestAddressesArgs = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type QueryBanner_GetBannerArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryCancelationReason_GetCancelationReasonArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryCarousel_GetCarouselArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryCity_GetCityArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryNeighborhood_GetNeighborhoodArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryProvince_GetProvinceArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceCategory_GetServiceCategoryArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceRequest_GetServiceRequestArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceSubCategory_GetArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceTypeQuestionsByServiceTypeArgs = {
  serviceTypeId: Scalars["UUID"]["input"];
};

export type QueryServiceType_GetArgs = {
  id: Scalars["UUID"]["input"];
};

export type ResponseBase = {
  __typename?: "ResponseBase";
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfAddressDto = {
  __typename?: "ResponseBaseOfAddressDto";
  result?: Maybe<AddressDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfAuthResult = {
  __typename?: "ResponseBaseOfAuthResult";
  result?: Maybe<AuthResult>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfBannerDto = {
  __typename?: "ResponseBaseOfBannerDto";
  result?: Maybe<BannerDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfCancellationReasonDto = {
  __typename?: "ResponseBaseOfCancellationReasonDto";
  result?: Maybe<CancellationReasonDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfCarouselDto = {
  __typename?: "ResponseBaseOfCarouselDto";
  result?: Maybe<CarouselDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfCityDto = {
  __typename?: "ResponseBaseOfCityDto";
  result?: Maybe<CityDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfListResponseBaseOfCarouselDto = {
  __typename?: "ResponseBaseOfListResponseBaseOfCarouselDto";
  result?: Maybe<ListResponseBaseOfCarouselDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfNeighborhoodDto = {
  __typename?: "ResponseBaseOfNeighborhoodDto";
  result?: Maybe<NeighborhoodDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfProvinceDto = {
  __typename?: "ResponseBaseOfProvinceDto";
  result?: Maybe<ProvinceDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfServiceCategoryDto = {
  __typename?: "ResponseBaseOfServiceCategoryDto";
  result?: Maybe<ServiceCategoryDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfServiceRequestDto = {
  __typename?: "ResponseBaseOfServiceRequestDto";
  result?: Maybe<ServiceRequestDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfServiceSubCategoryDto = {
  __typename?: "ResponseBaseOfServiceSubCategoryDto";
  result?: Maybe<ServiceSubCategoryDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfServiceTypeDto = {
  __typename?: "ResponseBaseOfServiceTypeDto";
  result?: Maybe<ServiceTypeDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfUserProfileDto = {
  __typename?: "ResponseBaseOfUserProfileDto";
  result?: Maybe<UserProfileDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseStatus = {
  __typename?: "ResponseStatus";
  code: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type ServiceCategoryDto = {
  __typename?: "ServiceCategoryDto";
  id: Scalars["UUID"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type ServiceCategoryDtoCollectionSegment = {
  __typename?: "ServiceCategoryDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<ServiceCategoryDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ServiceCategoryDtoFilterInput = {
  and?: InputMaybe<Array<ServiceCategoryDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceCategoryDtoFilterInput>>;
};

export type ServiceCategoryDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type ServiceRequestDto = {
  __typename?: "ServiceRequestDto";
  addressText: Scalars["String"]["output"];
  customerName: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  requestDate: Scalars["DateTime"]["output"];
  serviceTypeName: Scalars["String"]["output"];
  specialistName: Scalars["String"]["output"];
  status: ServiceRequestStatus;
};

/** A segment of a collection. */
export type ServiceRequestDtoCollectionSegment = {
  __typename?: "ServiceRequestDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<ServiceRequestDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ServiceRequestDtoFilterInput = {
  addressText?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ServiceRequestDtoFilterInput>>;
  customerName?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<ServiceRequestDtoFilterInput>>;
  requestDate?: InputMaybe<DateTimeOperationFilterInput>;
  serviceTypeName?: InputMaybe<StringOperationFilterInput>;
  specialistName?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<ServiceRequestStatusOperationFilterInput>;
};

export type ServiceRequestDtoSortInput = {
  addressText?: InputMaybe<SortEnumType>;
  customerName?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  requestDate?: InputMaybe<SortEnumType>;
  serviceTypeName?: InputMaybe<SortEnumType>;
  specialistName?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export enum ServiceRequestStatus {
  AcceptedBySpecialist = "ACCEPTED_BY_SPECIALIST",
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  Paid = "PAID",
  Pending = "PENDING",
  PendingPayment = "PENDING_PAYMENT",
  SpecialistArrivedToLocation = "SPECIALIST_ARRIVED_TO_LOCATION",
}

export type ServiceRequestStatusOperationFilterInput = {
  eq?: InputMaybe<ServiceRequestStatus>;
  in?: InputMaybe<Array<ServiceRequestStatus>>;
  neq?: InputMaybe<ServiceRequestStatus>;
  nin?: InputMaybe<Array<ServiceRequestStatus>>;
};

export type ServiceSubCategoryDto = {
  __typename?: "ServiceSubCategoryDto";
  id: Scalars["UUID"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceCategoryId: Scalars["UUID"]["output"];
};

/** A segment of a collection. */
export type ServiceSubCategoryDtoCollectionSegment = {
  __typename?: "ServiceSubCategoryDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<ServiceSubCategoryDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ServiceSubCategoryDtoFilterInput = {
  and?: InputMaybe<Array<ServiceSubCategoryDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceSubCategoryDtoFilterInput>>;
  serviceCategoryId?: InputMaybe<UuidOperationFilterInput>;
};

export type ServiceSubCategoryDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  serviceCategoryId?: InputMaybe<SortEnumType>;
};

export type ServiceTypeDto = {
  __typename?: "ServiceTypeDto";
  id: Scalars["UUID"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceSubCategoryId: Scalars["UUID"]["output"];
};

/** A segment of a collection. */
export type ServiceTypeDtoCollectionSegment = {
  __typename?: "ServiceTypeDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<ServiceTypeDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ServiceTypeDtoFilterInput = {
  and?: InputMaybe<Array<ServiceTypeDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceTypeDtoFilterInput>>;
  serviceSubCategoryId?: InputMaybe<UuidOperationFilterInput>;
};

export type ServiceTypeDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  serviceSubCategoryId?: InputMaybe<SortEnumType>;
};

export type ServiceTypeQuestionDto = {
  __typename?: "ServiceTypeQuestionDto";
  id: Scalars["UUID"]["output"];
  options: Array<Scalars["String"]["output"]>;
  title: Scalars["String"]["output"];
};

export type SingleResponseBaseOfCarouselDto = {
  __typename?: "SingleResponseBaseOfCarouselDto";
  query?: Maybe<Array<CarouselDto>>;
  result?: Maybe<CarouselDto>;
  status: ResponseStatus;
};

export enum SortEnumType {
  Asc = "ASC",
  Desc = "DESC",
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  ncontains?: InputMaybe<Scalars["String"]["input"]>;
  nendsWith?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  nstartsWith?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateAddressInput = {
  addressId: Scalars["UUID"]["input"];
  newLatitude: Scalars["Float"]["input"];
  newLongitude: Scalars["Float"]["input"];
  newText: Scalars["String"]["input"];
};

export type UpdateCityInput = {
  cityId: Scalars["UUID"]["input"];
  newName: Scalars["String"]["input"];
};

export type UpdateNeighborhoodInput = {
  neighborhoodId: Scalars["UUID"]["input"];
  newName: Scalars["String"]["input"];
};

export type UpdateServiceCategoryInput = {
  newLogo: Scalars["String"]["input"];
  newName: Scalars["String"]["input"];
  serviceCategoryId: Scalars["UUID"]["input"];
};

export type UpdateServiceSubCategoryInput = {
  newLogo: Scalars["String"]["input"];
  newName: Scalars["String"]["input"];
  serviceSubCategoryId: Scalars["UUID"]["input"];
};

export type UpdateServiceTypeInput = {
  newLogo: Scalars["String"]["input"];
  newName: Scalars["String"]["input"];
  serviceTypeId: Scalars["UUID"]["input"];
};

export type UserProfileDto = {
  __typename?: "UserProfileDto";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  phoneNumber: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export enum UserType {
  Admin = "ADMIN",
  Base = "BASE",
  Customer = "CUSTOMER",
  Owner = "OWNER",
  Specialist = "SPECIALIST",
}

export type UuidOperationFilterInput = {
  eq?: InputMaybe<Scalars["UUID"]["input"]>;
  gt?: InputMaybe<Scalars["UUID"]["input"]>;
  gte?: InputMaybe<Scalars["UUID"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["UUID"]["input"]>>>;
  lt?: InputMaybe<Scalars["UUID"]["input"]>;
  lte?: InputMaybe<Scalars["UUID"]["input"]>;
  neq?: InputMaybe<Scalars["UUID"]["input"]>;
  ngt?: InputMaybe<Scalars["UUID"]["input"]>;
  ngte?: InputMaybe<Scalars["UUID"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["UUID"]["input"]>>>;
  nlt?: InputMaybe<Scalars["UUID"]["input"]>;
  nlte?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Auth_RequestOtpMutationVariables = Exact<{
  phoneNumber: Scalars["String"]["input"];
  userType: UserType;
}>;

export type Auth_RequestOtpMutation = {
  __typename?: "Mutation";
  auth_requestOtp: { __typename?: "ResponseBase"; status?: any | null };
};

export type Auth_VerifyOtpMutationVariables = Exact<{
  phoneNumber: Scalars["String"]["input"];
  userType: UserType;
  otp: Scalars["String"]["input"];
}>;

export type Auth_VerifyOtpMutation = {
  __typename?: "Mutation";
  auth_verifyOtp: {
    __typename?: "ResponseBaseOfAuthResult";
    status?: any | null;
    result?: {
      __typename?: "AuthResult";
      accessToken: string;
      refreshToken: string;
    } | null;
  };
};

export type Auth_RefreshTokenMutationVariables = Exact<{
  accessToken: Scalars["String"]["input"];
  refreshToken: Scalars["String"]["input"];
}>;

export type Auth_RefreshTokenMutation = {
  __typename?: "Mutation";
  auth_refreshToken: {
    __typename?: "ResponseBaseOfAuthResult";
    status?: any | null;
    result?: {
      __typename?: "AuthResult";
      accessToken: string;
      refreshToken: string;
    } | null;
  };
};

export type City_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CityDtoFilterInput>;
  order?: InputMaybe<Array<CityDtoSortInput> | CityDtoSortInput>;
}>;

export type City_GetAllQuery = {
  __typename?: "Query";
  city_getAll: {
    __typename?: "ListResponseBaseOfCityDto";
    status?: any | null;
    result?: {
      __typename?: "CityDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "CityDto";
        id: any;
        isActive: boolean;
        name: string;
        province: { __typename?: "ProvinceDto"; id: any; name: string };
        activeCarousel?: {
          __typename?: "CarouselDto";
          imageUrls: Array<string>;
          id: any;
          title: string;
        } | null;
        activeBanner?: {
          __typename?: "BannerDto";
          imageUrl: string;
          id: any;
          title: string;
        } | null;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type ServiceRequest_GetMyServiceRequestsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceRequestDtoSortInput> | ServiceRequestDtoSortInput
  >;
}>;

export type ServiceRequest_GetMyServiceRequestsQuery = {
  __typename?: "Query";
  serviceRequest_getMyServiceRequests: {
    __typename?: "ListResponseBaseOfServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceRequestDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "ServiceRequestDto";
        addressText: string;
        customerName: string;
        description: string;
        id: any;
        requestDate: any;
        status: ServiceRequestStatus;
        serviceTypeName: string;
        specialistName: string;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type ServiceRequest_GetMyServiceAcceptancesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceRequestDtoSortInput> | ServiceRequestDtoSortInput
  >;
}>;

export type ServiceRequest_GetMyServiceAcceptancesQuery = {
  __typename?: "Query";
  serviceRequest_getMyServiceAcceptances: {
    __typename?: "ListResponseBaseOfServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceRequestDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "ServiceRequestDto";
        addressText: string;
        customerName: string;
        description: string;
        requestDate: any;
        id: any;
        serviceTypeName: string;
        specialistName: string;
        status: ServiceRequestStatus;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type ServiceCategory_GetServiceCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceCategoryDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceCategoryDtoSortInput> | ServiceCategoryDtoSortInput
  >;
}>;

export type ServiceCategory_GetServiceCategoriesQuery = {
  __typename?: "Query";
  serviceCategory_getServiceCategories: {
    __typename?: "ListResponseBaseOfServiceCategoryDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceCategoryDtoCollectionSegment";
      items?: Array<{
        __typename?: "ServiceCategoryDto";
        name: string;
        logo: string;
        id: any;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type ServiceCategory_GetServiceCategoryQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type ServiceCategory_GetServiceCategoryQuery = {
  __typename?: "Query";
  serviceCategory_getServiceCategory: {
    __typename?: "ResponseBaseOfServiceCategoryDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceCategoryDto";
      name: string;
      logo: string;
      id: any;
    } | null;
  };
};

export type ServiceSubCategory_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<
    Array<ServiceSubCategoryDtoSortInput> | ServiceSubCategoryDtoSortInput
  >;
  where?: InputMaybe<ServiceSubCategoryDtoFilterInput>;
}>;

export type ServiceSubCategory_GetAllQuery = {
  __typename?: "Query";
  serviceSubCategory_getAll: {
    __typename?: "ListResponseBaseOfServiceSubCategoryDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceSubCategoryDtoCollectionSegment";
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: "ServiceSubCategoryDto";
        id: any;
        logo: string;
        name: string;
        serviceCategoryId: any;
      }> | null;
    } | null;
  };
};

export type ServiceSubCategory_GetQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type ServiceSubCategory_GetQuery = {
  __typename?: "Query";
  serviceSubCategory_get: {
    __typename?: "ResponseBaseOfServiceSubCategoryDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceSubCategoryDto";
      id: any;
      logo: string;
      name: string;
      serviceCategoryId: any;
    } | null;
  };
};

export type ServiceTypes_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<Array<ServiceTypeDtoSortInput> | ServiceTypeDtoSortInput>;
  where?: InputMaybe<ServiceTypeDtoFilterInput>;
}>;

export type ServiceTypes_GetAllQuery = {
  __typename?: "Query";
  serviceTypes_getAll: {
    __typename?: "ListResponseBaseOfServiceTypeDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceTypeDtoCollectionSegment";
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: "ServiceTypeDto";
        name: string;
        logo: string;
        id: any;
        serviceSubCategoryId: any;
      }> | null;
    } | null;
  };
};

export type User_GetMyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type User_GetMyProfileQuery = {
  __typename?: "Query";
  user_getMyProfile: {
    __typename?: "ResponseBaseOfUserProfileDto";
    status?: any | null;
    result?: {
      __typename?: "UserProfileDto";
      id: any;
      phoneNumber: string;
    } | null;
  };
};

export type Address_GetMyAddressesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  userId: Scalars["UUID"]["input"];
  where?: InputMaybe<AddressDtoFilterInput>;
  order?: InputMaybe<Array<AddressDtoSortInput> | AddressDtoSortInput>;
}>;

export type Address_GetMyAddressesQuery = {
  __typename?: "Query";
  address_getMyAddresses: {
    __typename?: "ListResponseBaseOfAddressDto";
    status?: any | null;
    result?: {
      __typename?: "AddressDtoCollectionSegment";
      items?: Array<{
        __typename?: "AddressDto";
        id: any;
        latitude: number;
        longitude: number;
        neighborhoodId: any;
        text: string;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export const Auth_RequestOtpDocument = `
    mutation auth_requestOtp($phoneNumber: String!, $userType: UserType!) {
  auth_requestOtp(phoneNumber: $phoneNumber, userType: $userType) {
    status
  }
}
    `;

export const useAuth_RequestOtpMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Auth_RequestOtpMutation,
    TError,
    Auth_RequestOtpMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Auth_RequestOtpMutation,
    TError,
    Auth_RequestOtpMutationVariables,
    TContext
  >({
    mutationKey: ["auth_requestOtp"],
    mutationFn: (variables?: Auth_RequestOtpMutationVariables) =>
      fetcher<Auth_RequestOtpMutation, Auth_RequestOtpMutationVariables>(
        Auth_RequestOtpDocument,
        variables,
      )(),
    ...options,
  });
};

export const Auth_VerifyOtpDocument = `
    mutation auth_verifyOtp($phoneNumber: String!, $userType: UserType!, $otp: String!) {
  auth_verifyOtp(phoneNumber: $phoneNumber, userType: $userType, otp: $otp) {
    status
    result {
      accessToken
      refreshToken
    }
  }
}
    `;

export const useAuth_VerifyOtpMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Auth_VerifyOtpMutation,
    TError,
    Auth_VerifyOtpMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Auth_VerifyOtpMutation,
    TError,
    Auth_VerifyOtpMutationVariables,
    TContext
  >({
    mutationKey: ["auth_verifyOtp"],
    mutationFn: (variables?: Auth_VerifyOtpMutationVariables) =>
      fetcher<Auth_VerifyOtpMutation, Auth_VerifyOtpMutationVariables>(
        Auth_VerifyOtpDocument,
        variables,
      )(),
    ...options,
  });
};

export const Auth_RefreshTokenDocument = `
    mutation auth_refreshToken($accessToken: String!, $refreshToken: String!) {
  auth_refreshToken(accessToken: $accessToken, refreshToken: $refreshToken) {
    status
    result {
      accessToken
      refreshToken
    }
  }
}
    `;

export const useAuth_RefreshTokenMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Auth_RefreshTokenMutation,
    TError,
    Auth_RefreshTokenMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Auth_RefreshTokenMutation,
    TError,
    Auth_RefreshTokenMutationVariables,
    TContext
  >({
    mutationKey: ["auth_refreshToken"],
    mutationFn: (variables?: Auth_RefreshTokenMutationVariables) =>
      fetcher<Auth_RefreshTokenMutation, Auth_RefreshTokenMutationVariables>(
        Auth_RefreshTokenDocument,
        variables,
      )(),
    ...options,
  });
};

export const City_GetAllDocument = `
    query city_getAll($skip: Int, $take: Int, $where: CityDtoFilterInput, $order: [CityDtoSortInput!]) {
  city_getAll {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        isActive
        name
        province {
          id
          name
        }
        activeCarousel {
          imageUrls
          id
          title
        }
        activeBanner {
          imageUrl
          id
          title
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
    status
  }
}
    `;

export const useCity_GetAllQuery = <TData = City_GetAllQuery, TError = unknown>(
  variables?: City_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<City_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<City_GetAllQuery, TError, TData>["queryKey"];
  },
) => {
  return useQuery<City_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined ? ["city_getAll"] : ["city_getAll", variables],
    queryFn: fetcher<City_GetAllQuery, City_GetAllQueryVariables>(
      City_GetAllDocument,
      variables,
    ),
    ...options,
  });
};

export const useInfiniteCity_GetAllQuery = <
  TData = InfiniteData<City_GetAllQuery>,
  TError = unknown,
>(
  variables: City_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<City_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      City_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<City_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["city_getAll.infinite"]
            : ["city_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<City_GetAllQuery, City_GetAllQueryVariables>(
            City_GetAllDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceRequest_GetMyServiceRequestsDocument = `
    query serviceRequest_getMyServiceRequests($skip: Int, $take: Int, $where: ServiceRequestDtoFilterInput, $order: [ServiceRequestDtoSortInput!]) {
  serviceRequest_getMyServiceRequests {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        addressText
        customerName
        description
        id
        requestDate
        status
        serviceTypeName
        specialistName
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
    status
  }
}
    `;

export const useServiceRequest_GetMyServiceRequestsQuery = <
  TData = ServiceRequest_GetMyServiceRequestsQuery,
  TError = unknown,
>(
  variables?: ServiceRequest_GetMyServiceRequestsQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceRequest_GetMyServiceRequestsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceRequest_GetMyServiceRequestsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceRequest_GetMyServiceRequestsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceRequest_getMyServiceRequests"]
        : ["serviceRequest_getMyServiceRequests", variables],
    queryFn: fetcher<
      ServiceRequest_GetMyServiceRequestsQuery,
      ServiceRequest_GetMyServiceRequestsQueryVariables
    >(ServiceRequest_GetMyServiceRequestsDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceRequest_GetMyServiceRequestsQuery = <
  TData = InfiniteData<ServiceRequest_GetMyServiceRequestsQuery>,
  TError = unknown,
>(
  variables: ServiceRequest_GetMyServiceRequestsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceRequest_GetMyServiceRequestsQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceRequest_GetMyServiceRequestsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    ServiceRequest_GetMyServiceRequestsQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceRequest_getMyServiceRequests.infinite"]
            : ["serviceRequest_getMyServiceRequests.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceRequest_GetMyServiceRequestsQuery,
            ServiceRequest_GetMyServiceRequestsQueryVariables
          >(ServiceRequest_GetMyServiceRequestsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceRequest_GetMyServiceAcceptancesDocument = `
    query serviceRequest_getMyServiceAcceptances($skip: Int, $take: Int, $where: ServiceRequestDtoFilterInput, $order: [ServiceRequestDtoSortInput!]) {
  serviceRequest_getMyServiceAcceptances {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        addressText
        customerName
        description
        requestDate
        id
        serviceTypeName
        specialistName
        status
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
    status
  }
}
    `;

export const useServiceRequest_GetMyServiceAcceptancesQuery = <
  TData = ServiceRequest_GetMyServiceAcceptancesQuery,
  TError = unknown,
>(
  variables?: ServiceRequest_GetMyServiceAcceptancesQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceRequest_GetMyServiceAcceptancesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceRequest_GetMyServiceAcceptancesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceRequest_GetMyServiceAcceptancesQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceRequest_getMyServiceAcceptances"]
        : ["serviceRequest_getMyServiceAcceptances", variables],
    queryFn: fetcher<
      ServiceRequest_GetMyServiceAcceptancesQuery,
      ServiceRequest_GetMyServiceAcceptancesQueryVariables
    >(ServiceRequest_GetMyServiceAcceptancesDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceRequest_GetMyServiceAcceptancesQuery = <
  TData = InfiniteData<ServiceRequest_GetMyServiceAcceptancesQuery>,
  TError = unknown,
>(
  variables: ServiceRequest_GetMyServiceAcceptancesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceRequest_GetMyServiceAcceptancesQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceRequest_GetMyServiceAcceptancesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    ServiceRequest_GetMyServiceAcceptancesQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceRequest_getMyServiceAcceptances.infinite"]
            : ["serviceRequest_getMyServiceAcceptances.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceRequest_GetMyServiceAcceptancesQuery,
            ServiceRequest_GetMyServiceAcceptancesQueryVariables
          >(ServiceRequest_GetMyServiceAcceptancesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceCategory_GetServiceCategoriesDocument = `
    query serviceCategory_getServiceCategories($skip: Int, $take: Int, $where: ServiceCategoryDtoFilterInput, $order: [ServiceCategoryDtoSortInput!]) {
  serviceCategory_getServiceCategories {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        name
        logo
        id
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
    status
  }
}
    `;

export const useServiceCategory_GetServiceCategoriesQuery = <
  TData = ServiceCategory_GetServiceCategoriesQuery,
  TError = unknown,
>(
  variables?: ServiceCategory_GetServiceCategoriesQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceCategory_GetServiceCategoriesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceCategory_GetServiceCategoriesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceCategory_GetServiceCategoriesQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceCategory_getServiceCategories"]
        : ["serviceCategory_getServiceCategories", variables],
    queryFn: fetcher<
      ServiceCategory_GetServiceCategoriesQuery,
      ServiceCategory_GetServiceCategoriesQueryVariables
    >(ServiceCategory_GetServiceCategoriesDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceCategory_GetServiceCategoriesQuery = <
  TData = InfiniteData<ServiceCategory_GetServiceCategoriesQuery>,
  TError = unknown,
>(
  variables: ServiceCategory_GetServiceCategoriesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceCategory_GetServiceCategoriesQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceCategory_GetServiceCategoriesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    ServiceCategory_GetServiceCategoriesQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceCategory_getServiceCategories.infinite"]
            : ["serviceCategory_getServiceCategories.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceCategory_GetServiceCategoriesQuery,
            ServiceCategory_GetServiceCategoriesQueryVariables
          >(ServiceCategory_GetServiceCategoriesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceCategory_GetServiceCategoryDocument = `
    query serviceCategory_getServiceCategory($id: UUID!) {
  serviceCategory_getServiceCategory(id: $id) {
    result {
      name
      logo
      id
    }
    status
  }
}
    `;

export const useServiceCategory_GetServiceCategoryQuery = <
  TData = ServiceCategory_GetServiceCategoryQuery,
  TError = unknown,
>(
  variables: ServiceCategory_GetServiceCategoryQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceCategory_GetServiceCategoryQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceCategory_GetServiceCategoryQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceCategory_GetServiceCategoryQuery, TError, TData>({
    queryKey: ["serviceCategory_getServiceCategory", variables],
    queryFn: fetcher<
      ServiceCategory_GetServiceCategoryQuery,
      ServiceCategory_GetServiceCategoryQueryVariables
    >(ServiceCategory_GetServiceCategoryDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceCategory_GetServiceCategoryQuery = <
  TData = InfiniteData<ServiceCategory_GetServiceCategoryQuery>,
  TError = unknown,
>(
  variables: ServiceCategory_GetServiceCategoryQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceCategory_GetServiceCategoryQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceCategory_GetServiceCategoryQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    ServiceCategory_GetServiceCategoryQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "serviceCategory_getServiceCategory.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ServiceCategory_GetServiceCategoryQuery,
            ServiceCategory_GetServiceCategoryQueryVariables
          >(ServiceCategory_GetServiceCategoryDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceSubCategory_GetAllDocument = `
    query serviceSubCategory_getAll($skip: Int, $take: Int, $order: [ServiceSubCategoryDtoSortInput!], $where: ServiceSubCategoryDtoFilterInput) {
  serviceSubCategory_getAll {
    result(skip: $skip, take: $take, order: $order) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        logo
        name
        serviceCategoryId
      }
    }
    status
  }
}
    `;

export const useServiceSubCategory_GetAllQuery = <
  TData = ServiceSubCategory_GetAllQuery,
  TError = unknown,
>(
  variables?: ServiceSubCategory_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceSubCategory_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceSubCategory_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceSubCategory_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceSubCategory_getAll"]
        : ["serviceSubCategory_getAll", variables],
    queryFn: fetcher<
      ServiceSubCategory_GetAllQuery,
      ServiceSubCategory_GetAllQueryVariables
    >(ServiceSubCategory_GetAllDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceSubCategory_GetAllQuery = <
  TData = InfiniteData<ServiceSubCategory_GetAllQuery>,
  TError = unknown,
>(
  variables: ServiceSubCategory_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceSubCategory_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceSubCategory_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceSubCategory_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceSubCategory_getAll.infinite"]
            : ["serviceSubCategory_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceSubCategory_GetAllQuery,
            ServiceSubCategory_GetAllQueryVariables
          >(ServiceSubCategory_GetAllDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceSubCategory_GetDocument = `
    query serviceSubCategory_get($id: UUID!) {
  serviceSubCategory_get(id: $id) {
    result {
      id
      logo
      name
      serviceCategoryId
    }
    status
  }
}
    `;

export const useServiceSubCategory_GetQuery = <
  TData = ServiceSubCategory_GetQuery,
  TError = unknown,
>(
  variables: ServiceSubCategory_GetQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceSubCategory_GetQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceSubCategory_GetQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceSubCategory_GetQuery, TError, TData>({
    queryKey: ["serviceSubCategory_get", variables],
    queryFn: fetcher<
      ServiceSubCategory_GetQuery,
      ServiceSubCategory_GetQueryVariables
    >(ServiceSubCategory_GetDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceSubCategory_GetQuery = <
  TData = InfiniteData<ServiceSubCategory_GetQuery>,
  TError = unknown,
>(
  variables: ServiceSubCategory_GetQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceSubCategory_GetQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceSubCategory_GetQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceSubCategory_GetQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "serviceSubCategory_get.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ServiceSubCategory_GetQuery,
            ServiceSubCategory_GetQueryVariables
          >(ServiceSubCategory_GetDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceTypes_GetAllDocument = `
    query serviceTypes_getAll($skip: Int, $take: Int, $order: [ServiceTypeDtoSortInput!], $where: ServiceTypeDtoFilterInput) {
  serviceTypes_getAll {
    result(skip: $skip, take: $take, order: $order, where: $where) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        name
        logo
        id
        serviceSubCategoryId
      }
    }
    status
  }
}
    `;

export const useServiceTypes_GetAllQuery = <
  TData = ServiceTypes_GetAllQuery,
  TError = unknown,
>(
  variables?: ServiceTypes_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceTypes_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceTypes_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceTypes_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceTypes_getAll"]
        : ["serviceTypes_getAll", variables],
    queryFn: fetcher<
      ServiceTypes_GetAllQuery,
      ServiceTypes_GetAllQueryVariables
    >(ServiceTypes_GetAllDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceTypes_GetAllQuery = <
  TData = InfiniteData<ServiceTypes_GetAllQuery>,
  TError = unknown,
>(
  variables: ServiceTypes_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceTypes_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceTypes_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceTypes_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceTypes_getAll.infinite"]
            : ["serviceTypes_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<ServiceTypes_GetAllQuery, ServiceTypes_GetAllQueryVariables>(
            ServiceTypes_GetAllDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

export const User_GetMyProfileDocument = `
    query user_getMyProfile {
  user_getMyProfile {
    status
    result {
      id
      phoneNumber
    }
  }
}
    `;

export const useUser_GetMyProfileQuery = <
  TData = User_GetMyProfileQuery,
  TError = unknown,
>(
  variables?: User_GetMyProfileQueryVariables,
  options?: Omit<
    UseQueryOptions<User_GetMyProfileQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      User_GetMyProfileQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<User_GetMyProfileQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["user_getMyProfile"]
        : ["user_getMyProfile", variables],
    queryFn: fetcher<User_GetMyProfileQuery, User_GetMyProfileQueryVariables>(
      User_GetMyProfileDocument,
      variables,
    ),
    ...options,
  });
};

export const useInfiniteUser_GetMyProfileQuery = <
  TData = InfiniteData<User_GetMyProfileQuery>,
  TError = unknown,
>(
  variables: User_GetMyProfileQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<User_GetMyProfileQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      User_GetMyProfileQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<User_GetMyProfileQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["user_getMyProfile.infinite"]
            : ["user_getMyProfile.infinite", variables],
        queryFn: (metaData) =>
          fetcher<User_GetMyProfileQuery, User_GetMyProfileQueryVariables>(
            User_GetMyProfileDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

export const Address_GetMyAddressesDocument = `
    query address_getMyAddresses($skip: Int, $take: Int, $userId: UUID!, $where: AddressDtoFilterInput, $order: [AddressDtoSortInput!]) {
  address_getMyAddresses(userId: $userId) {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        latitude
        longitude
        neighborhoodId
        text
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
    status
  }
}
    `;

export const useAddress_GetMyAddressesQuery = <
  TData = Address_GetMyAddressesQuery,
  TError = unknown,
>(
  variables: Address_GetMyAddressesQueryVariables,
  options?: Omit<
    UseQueryOptions<Address_GetMyAddressesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      Address_GetMyAddressesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<Address_GetMyAddressesQuery, TError, TData>({
    queryKey: ["address_getMyAddresses", variables],
    queryFn: fetcher<
      Address_GetMyAddressesQuery,
      Address_GetMyAddressesQueryVariables
    >(Address_GetMyAddressesDocument, variables),
    ...options,
  });
};

export const useInfiniteAddress_GetMyAddressesQuery = <
  TData = InfiniteData<Address_GetMyAddressesQuery>,
  TError = unknown,
>(
  variables: Address_GetMyAddressesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Address_GetMyAddressesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Address_GetMyAddressesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Address_GetMyAddressesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "address_getMyAddresses.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            Address_GetMyAddressesQuery,
            Address_GetMyAddressesQueryVariables
          >(Address_GetMyAddressesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};
