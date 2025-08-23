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
  qnAs: Array<QnAInput>;
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

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars["Decimal"]["input"]>;
  gt?: InputMaybe<Scalars["Decimal"]["input"]>;
  gte?: InputMaybe<Scalars["Decimal"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Decimal"]["input"]>>>;
  lt?: InputMaybe<Scalars["Decimal"]["input"]>;
  lte?: InputMaybe<Scalars["Decimal"]["input"]>;
  neq?: InputMaybe<Scalars["Decimal"]["input"]>;
  ngt?: InputMaybe<Scalars["Decimal"]["input"]>;
  ngte?: InputMaybe<Scalars["Decimal"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["Decimal"]["input"]>>>;
  nlt?: InputMaybe<Scalars["Decimal"]["input"]>;
  nlte?: InputMaybe<Scalars["Decimal"]["input"]>;
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

export type DiscountCodeDto = {
  __typename?: "DiscountCodeDto";
  amount: Scalars["Decimal"]["output"];
  code: Scalars["String"]["output"];
  expiryDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["UUID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isPercentage: Scalars["Boolean"]["output"];
};

/** A segment of a collection. */
export type DiscountCodeDtoCollectionSegment = {
  __typename?: "DiscountCodeDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<DiscountCodeDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type DiscountCodeDtoFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<DiscountCodeDtoFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  expiryDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isPercentage?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DiscountCodeDtoFilterInput>>;
};

export type DiscountCodeDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  code?: InputMaybe<SortEnumType>;
  expiryDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isPercentage?: InputMaybe<SortEnumType>;
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

export type ListFilterInputTypeOfServiceRequestQnADtoFilterInput = {
  all?: InputMaybe<ServiceRequestQnADtoFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]["input"]>;
  none?: InputMaybe<ServiceRequestQnADtoFilterInput>;
  some?: InputMaybe<ServiceRequestQnADtoFilterInput>;
};

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

export type ListResponseBaseOfDiscountCodeDto = {
  __typename?: "ListResponseBaseOfDiscountCodeDto";
  result?: Maybe<DiscountCodeDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfDiscountCodeDtoResultArgs = {
  order?: InputMaybe<Array<DiscountCodeDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DiscountCodeDtoFilterInput>;
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

export type ListResponseBaseOfServiceTypeQuestionDto = {
  __typename?: "ListResponseBaseOfServiceTypeQuestionDto";
  result?: Maybe<ServiceTypeQuestionDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfServiceTypeQuestionDtoResultArgs = {
  order?: InputMaybe<Array<ServiceTypeQuestionDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceTypeQuestionDtoFilterInput>;
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
  address_create: ResponseBaseOfAddressDto;
  address_delete: ResponseBase;
  address_update: ResponseBaseOfAddressDto;
  /** Generates a new access and refresh token pair using a valid refresh token. */
  auth_refreshToken: ResponseBaseOfAuthResult;
  /** Requests an OTP to be sent to the provided phone number and user type. */
  auth_requestOtp: ResponseBase;
  auth_verifyOtp: ResponseBaseOfAuthResult;
  banner_create: ResponseBaseOfBannerDto;
  banner_delete: ResponseBase;
  banner_update: ResponseBaseOfBannerDto;
  cancelationReason_create: ResponseBaseOfCancellationReasonDto;
  cancelationReason_delete: ResponseBase;
  cancelationReason_update: ResponseBaseOfCancellationReasonDto;
  carousel_create: ResponseBaseOfCarouselDto;
  carousel_delete: ResponseBase;
  carousel_update: ResponseBaseOfCarouselDto;
  city_activate: ResponseBaseOfCityDto;
  city_create: ResponseBaseOfCityDto;
  city_deactivate: ResponseBaseOfCityDto;
  city_setActiveBanner: ResponseBaseOfCityDto;
  city_setActiveCarousel: ResponseBaseOfCityDto;
  city_update: ResponseBaseOfCityDto;
  discountCode_activate: ResponseBaseOfDiscountCodeDto;
  discountCode_create: ResponseBaseOfDiscountCodeDto;
  discountCode_deactivate: ResponseBaseOfDiscountCodeDto;
  discountCode_delete: ResponseBase;
  neighborhood_create: ResponseBaseOfNeighborhoodDto;
  neighborhood_delete: ResponseBase;
  neighborhood_update: ResponseBaseOfNeighborhoodDto;
  province_create: ResponseBaseOfProvinceDto;
  province_delete: ResponseBase;
  province_update: ResponseBaseOfProvinceDto;
  serviceAcceptance_markAsArrived: ResponseBaseOfServiceRequestDto;
  serviceCategory_create: ResponseBaseOfServiceCategoryDto;
  serviceCategory_delete: ResponseBase;
  serviceCategory_update: ResponseBaseOfServiceCategoryDto;
  serviceRequest_accept: ResponseBaseOfServiceRequestDto;
  serviceRequest_cancel: ResponseBaseOfServiceRequestDto;
  serviceRequest_completeService: ResponseBaseOfServiceRequestDto;
  serviceRequest_create: ResponseBaseOfServiceRequestDto;
  serviceSubCategory_create: ResponseBaseOfServiceSubCategoryDto;
  serviceSubCategory_delete: ResponseBase;
  serviceSubCategory_update: ResponseBaseOfServiceSubCategoryDto;
  serviceTypeQuestion_create: ResponseBaseOfServiceTypeQuestionDto;
  serviceTypeQuestion_delete: ResponseBase;
  serviceTypeQuestion_update: ResponseBaseOfServiceTypeQuestionDto;
  serviceType_create: ResponseBaseOfServiceTypeDto;
  serviceType_delete: ResponseBase;
  serviceType_update: ResponseBaseOfServiceTypeDto;
  /** Allows an owner to create a new admin user. */
  user_createAdmin: ResponseBase;
};

export type MutationAddress_CreateArgs = {
  input: AddAddressInput;
};

export type MutationAddress_DeleteArgs = {
  input: DeleteAddressInput;
};

export type MutationAddress_UpdateArgs = {
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

export type MutationBanner_CreateArgs = {
  imageUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationBanner_DeleteArgs = {
  bannerId: Scalars["UUID"]["input"];
};

export type MutationBanner_UpdateArgs = {
  id: Scalars["UUID"]["input"];
  imageUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationCancelationReason_CreateArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCancelationReason_DeleteArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationCancelationReason_UpdateArgs = {
  id: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationCarousel_CreateArgs = {
  imageUrls: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type MutationCarousel_DeleteArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationCarousel_UpdateArgs = {
  id: Scalars["UUID"]["input"];
  imageUrls: Array<Scalars["String"]["input"]>;
  title: Scalars["String"]["input"];
};

export type MutationCity_ActivateArgs = {
  input: ActivateCityInput;
};

export type MutationCity_CreateArgs = {
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

export type MutationCity_UpdateArgs = {
  input: UpdateCityInput;
};

export type MutationDiscountCode_ActivateArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDiscountCode_CreateArgs = {
  amount: Scalars["Decimal"]["input"];
  expiryDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  isPercentage: Scalars["Boolean"]["input"];
};

export type MutationDiscountCode_DeactivateArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationDiscountCode_DeleteArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationNeighborhood_CreateArgs = {
  input: CreateNeighborhoodInput;
};

export type MutationNeighborhood_DeleteArgs = {
  input: DeleteNeighborhoodInput;
};

export type MutationNeighborhood_UpdateArgs = {
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

export type MutationServiceCategory_CreateArgs = {
  input: CreateServiceCategoryInput;
};

export type MutationServiceCategory_DeleteArgs = {
  input: DeleteServiceCategoryInput;
};

export type MutationServiceCategory_UpdateArgs = {
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

export type MutationServiceTypeQuestion_CreateArgs = {
  isRequired: Scalars["Boolean"]["input"];
  options: Array<Scalars["String"]["input"]>;
  questionType: QuestionType;
  serviceTypeId: Scalars["UUID"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationServiceTypeQuestion_DeleteArgs = {
  id: Scalars["UUID"]["input"];
};

export type MutationServiceTypeQuestion_UpdateArgs = {
  id: Scalars["UUID"]["input"];
  isRequired: Scalars["Boolean"]["input"];
  options: Array<Scalars["String"]["input"]>;
  questionType: QuestionType;
  title: Scalars["String"]["input"];
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

export type QnAInput = {
  answers: Array<Scalars["String"]["input"]>;
  questionId: Scalars["UUID"]["input"];
};

export type Query = {
  __typename?: "Query";
  address_getMyAddresses: ListResponseBaseOfAddressDto;
  address_nearestAddresses: ListResponseBaseOfAddressDto;
  banner_getAll: ListResponseBaseOfBannerDto;
  banner_getById: ResponseBaseOfBannerDto;
  cancelationReason_getAll: ListResponseBaseOfCancellationReasonDto;
  cancelationReason_getById: ResponseBaseOfCancellationReasonDto;
  carousel_getAll: ResponseBaseOfListResponseBaseOfCarouselDto;
  carousel_getById: ResponseBaseOfCarouselDto;
  city_getAll: ListResponseBaseOfCityDto;
  city_getById: ResponseBaseOfCityDto;
  discountCode_getAll: ListResponseBaseOfDiscountCodeDto;
  discountCode_getById: ResponseBaseOfDiscountCodeDto;
  neighborhood_getAll: ListResponseBaseOfNeighborhoodDto;
  neighborhood_getById: ResponseBaseOfNeighborhoodDto;
  province_getAll: ListResponseBaseOfProvinceDto;
  province_getById: ResponseBaseOfProvinceDto;
  serviceCategory_getAll: ListResponseBaseOfServiceCategoryDto;
  serviceCategory_getById: ResponseBaseOfServiceCategoryDto;
  serviceRequest_getAll: ListResponseBaseOfServiceRequestDto;
  serviceRequest_getById: ResponseBaseOfServiceRequestDto;
  serviceRequest_getMyAcceptances: ListResponseBaseOfServiceRequestDto;
  serviceRequest_getMyRequests: ListResponseBaseOfServiceRequestDto;
  serviceSubCategory_getAll: ListResponseBaseOfServiceSubCategoryDto;
  serviceSubCategory_getById: ResponseBaseOfServiceSubCategoryDto;
  serviceTypeQuestion_getById: ResponseBaseOfServiceTypeQuestionDto;
  serviceTypeQuestion_getByServiceType: ListResponseBaseOfServiceTypeQuestionDto;
  serviceType_getById: ResponseBaseOfServiceTypeDto;
  serviceTypes_getAll: ListResponseBaseOfServiceTypeDto;
  /** Gets the profile of the currently authenticated user. */
  user_getMyProfile: ResponseBaseOfUserProfileDto;
};

export type QueryAddress_NearestAddressesArgs = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type QueryBanner_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryCancelationReason_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryCarousel_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryCity_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryDiscountCode_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryNeighborhood_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryProvince_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceCategory_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceRequest_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceSubCategory_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceTypeQuestion_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceTypeQuestion_GetByServiceTypeArgs = {
  serviceTypeId: Scalars["UUID"]["input"];
};

export type QueryServiceType_GetByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export enum QuestionType {
  CheckBox = "CHECK_BOX",
  RadioButton = "RADIO_BUTTON",
}

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

export type ResponseBaseOfDiscountCodeDto = {
  __typename?: "ResponseBaseOfDiscountCodeDto";
  result?: Maybe<DiscountCodeDto>;
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

export type ResponseBaseOfServiceTypeQuestionDto = {
  __typename?: "ResponseBaseOfServiceTypeQuestionDto";
  result?: Maybe<ServiceTypeQuestionDto>;
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
  qnAs: Array<ServiceRequestQnADto>;
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
  qnAs?: InputMaybe<ListFilterInputTypeOfServiceRequestQnADtoFilterInput>;
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

export type ServiceRequestQnADto = {
  __typename?: "ServiceRequestQnADto";
  answer: Scalars["String"]["output"];
  questionText: Scalars["String"]["output"];
};

export type ServiceRequestQnADtoFilterInput = {
  and?: InputMaybe<Array<ServiceRequestQnADtoFilterInput>>;
  answer?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceRequestQnADtoFilterInput>>;
  questionText?: InputMaybe<StringOperationFilterInput>;
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

/** A segment of a collection. */
export type ServiceTypeQuestionDtoCollectionSegment = {
  __typename?: "ServiceTypeQuestionDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<ServiceTypeQuestionDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ServiceTypeQuestionDtoFilterInput = {
  and?: InputMaybe<Array<ServiceTypeQuestionDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  options?: InputMaybe<ListStringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceTypeQuestionDtoFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type ServiceTypeQuestionDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
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

export type ServiceRequest_GetMyRequestsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceRequestDtoSortInput> | ServiceRequestDtoSortInput
  >;
}>;

export type ServiceRequest_GetMyRequestsQuery = {
  __typename?: "Query";
  serviceRequest_getMyRequests: {
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

export type ServiceRequest_GetMyAcceptancesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceRequestDtoSortInput> | ServiceRequestDtoSortInput
  >;
}>;

export type ServiceRequest_GetMyAcceptancesQuery = {
  __typename?: "Query";
  serviceRequest_getMyAcceptances: {
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

export type ServiceRequest_GetByIdQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type ServiceRequest_GetByIdQuery = {
  __typename?: "Query";
  serviceRequest_getById: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceRequestDto";
      addressText: string;
      customerName: string;
      description: string;
      requestDate: any;
      id: any;
      serviceTypeName: string;
      specialistName: string;
      status: ServiceRequestStatus;
    } | null;
  };
};

export type ServiceCategory_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceCategoryDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceCategoryDtoSortInput> | ServiceCategoryDtoSortInput
  >;
}>;

export type ServiceCategory_GetAllQuery = {
  __typename?: "Query";
  serviceCategory_getAll: {
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

export type ServiceCategory_GetByIdQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type ServiceCategory_GetByIdQuery = {
  __typename?: "Query";
  serviceCategory_getById: {
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

export type ServiceSubCategory_GetByIdQueryVariables = Exact<{
  id: Scalars["UUID"]["input"];
}>;

export type ServiceSubCategory_GetByIdQuery = {
  __typename?: "Query";
  serviceSubCategory_getById: {
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

export const ServiceRequest_GetMyRequestsDocument = `
    query serviceRequest_getMyRequests($skip: Int, $take: Int, $where: ServiceRequestDtoFilterInput, $order: [ServiceRequestDtoSortInput!]) {
  serviceRequest_getMyRequests {
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

export const useServiceRequest_GetMyRequestsQuery = <
  TData = ServiceRequest_GetMyRequestsQuery,
  TError = unknown,
>(
  variables?: ServiceRequest_GetMyRequestsQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceRequest_GetMyRequestsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceRequest_GetMyRequestsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceRequest_GetMyRequestsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceRequest_getMyRequests"]
        : ["serviceRequest_getMyRequests", variables],
    queryFn: fetcher<
      ServiceRequest_GetMyRequestsQuery,
      ServiceRequest_GetMyRequestsQueryVariables
    >(ServiceRequest_GetMyRequestsDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceRequest_GetMyRequestsQuery = <
  TData = InfiniteData<ServiceRequest_GetMyRequestsQuery>,
  TError = unknown,
>(
  variables: ServiceRequest_GetMyRequestsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceRequest_GetMyRequestsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceRequest_GetMyRequestsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceRequest_GetMyRequestsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceRequest_getMyRequests.infinite"]
            : ["serviceRequest_getMyRequests.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceRequest_GetMyRequestsQuery,
            ServiceRequest_GetMyRequestsQueryVariables
          >(ServiceRequest_GetMyRequestsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceRequest_GetMyAcceptancesDocument = `
    query serviceRequest_getMyAcceptances($skip: Int, $take: Int, $where: ServiceRequestDtoFilterInput, $order: [ServiceRequestDtoSortInput!]) {
  serviceRequest_getMyAcceptances {
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

export const useServiceRequest_GetMyAcceptancesQuery = <
  TData = ServiceRequest_GetMyAcceptancesQuery,
  TError = unknown,
>(
  variables?: ServiceRequest_GetMyAcceptancesQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceRequest_GetMyAcceptancesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceRequest_GetMyAcceptancesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceRequest_GetMyAcceptancesQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceRequest_getMyAcceptances"]
        : ["serviceRequest_getMyAcceptances", variables],
    queryFn: fetcher<
      ServiceRequest_GetMyAcceptancesQuery,
      ServiceRequest_GetMyAcceptancesQueryVariables
    >(ServiceRequest_GetMyAcceptancesDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceRequest_GetMyAcceptancesQuery = <
  TData = InfiniteData<ServiceRequest_GetMyAcceptancesQuery>,
  TError = unknown,
>(
  variables: ServiceRequest_GetMyAcceptancesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceRequest_GetMyAcceptancesQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceRequest_GetMyAcceptancesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceRequest_GetMyAcceptancesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceRequest_getMyAcceptances.infinite"]
            : ["serviceRequest_getMyAcceptances.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceRequest_GetMyAcceptancesQuery,
            ServiceRequest_GetMyAcceptancesQueryVariables
          >(ServiceRequest_GetMyAcceptancesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceRequest_GetByIdDocument = `
    query serviceRequest_getById($id: UUID!) {
  serviceRequest_getById(id: $id) {
    result {
      addressText
      customerName
      description
      requestDate
      id
      serviceTypeName
      specialistName
      status
    }
    status
  }
}
    `;

export const useServiceRequest_GetByIdQuery = <
  TData = ServiceRequest_GetByIdQuery,
  TError = unknown,
>(
  variables: ServiceRequest_GetByIdQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceRequest_GetByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceRequest_GetByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceRequest_GetByIdQuery, TError, TData>({
    queryKey: ["serviceRequest_getById", variables],
    queryFn: fetcher<
      ServiceRequest_GetByIdQuery,
      ServiceRequest_GetByIdQueryVariables
    >(ServiceRequest_GetByIdDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceRequest_GetByIdQuery = <
  TData = InfiniteData<ServiceRequest_GetByIdQuery>,
  TError = unknown,
>(
  variables: ServiceRequest_GetByIdQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceRequest_GetByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceRequest_GetByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceRequest_GetByIdQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "serviceRequest_getById.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ServiceRequest_GetByIdQuery,
            ServiceRequest_GetByIdQueryVariables
          >(ServiceRequest_GetByIdDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceCategory_GetAllDocument = `
    query serviceCategory_getAll($skip: Int, $take: Int, $where: ServiceCategoryDtoFilterInput, $order: [ServiceCategoryDtoSortInput!]) {
  serviceCategory_getAll {
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

export const useServiceCategory_GetAllQuery = <
  TData = ServiceCategory_GetAllQuery,
  TError = unknown,
>(
  variables?: ServiceCategory_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceCategory_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceCategory_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceCategory_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceCategory_getAll"]
        : ["serviceCategory_getAll", variables],
    queryFn: fetcher<
      ServiceCategory_GetAllQuery,
      ServiceCategory_GetAllQueryVariables
    >(ServiceCategory_GetAllDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceCategory_GetAllQuery = <
  TData = InfiniteData<ServiceCategory_GetAllQuery>,
  TError = unknown,
>(
  variables: ServiceCategory_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceCategory_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceCategory_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceCategory_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceCategory_getAll.infinite"]
            : ["serviceCategory_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceCategory_GetAllQuery,
            ServiceCategory_GetAllQueryVariables
          >(ServiceCategory_GetAllDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceCategory_GetByIdDocument = `
    query serviceCategory_getById($id: UUID!) {
  serviceCategory_getById(id: $id) {
    result {
      name
      logo
      id
    }
    status
  }
}
    `;

export const useServiceCategory_GetByIdQuery = <
  TData = ServiceCategory_GetByIdQuery,
  TError = unknown,
>(
  variables: ServiceCategory_GetByIdQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceCategory_GetByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceCategory_GetByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceCategory_GetByIdQuery, TError, TData>({
    queryKey: ["serviceCategory_getById", variables],
    queryFn: fetcher<
      ServiceCategory_GetByIdQuery,
      ServiceCategory_GetByIdQueryVariables
    >(ServiceCategory_GetByIdDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceCategory_GetByIdQuery = <
  TData = InfiniteData<ServiceCategory_GetByIdQuery>,
  TError = unknown,
>(
  variables: ServiceCategory_GetByIdQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceCategory_GetByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceCategory_GetByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceCategory_GetByIdQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "serviceCategory_getById.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ServiceCategory_GetByIdQuery,
            ServiceCategory_GetByIdQueryVariables
          >(ServiceCategory_GetByIdDocument, {
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

export const ServiceSubCategory_GetByIdDocument = `
    query serviceSubCategory_getById($id: UUID!) {
  serviceSubCategory_getById(id: $id) {
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

export const useServiceSubCategory_GetByIdQuery = <
  TData = ServiceSubCategory_GetByIdQuery,
  TError = unknown,
>(
  variables: ServiceSubCategory_GetByIdQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceSubCategory_GetByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceSubCategory_GetByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceSubCategory_GetByIdQuery, TError, TData>({
    queryKey: ["serviceSubCategory_getById", variables],
    queryFn: fetcher<
      ServiceSubCategory_GetByIdQuery,
      ServiceSubCategory_GetByIdQueryVariables
    >(ServiceSubCategory_GetByIdDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceSubCategory_GetByIdQuery = <
  TData = InfiniteData<ServiceSubCategory_GetByIdQuery>,
  TError = unknown,
>(
  variables: ServiceSubCategory_GetByIdQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceSubCategory_GetByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceSubCategory_GetByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceSubCategory_GetByIdQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "serviceSubCategory_getById.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ServiceSubCategory_GetByIdQuery,
            ServiceSubCategory_GetByIdQueryVariables
          >(ServiceSubCategory_GetByIdDocument, {
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
    query address_getMyAddresses($skip: Int, $take: Int, $where: AddressDtoFilterInput, $order: [AddressDtoSortInput!]) {
  address_getMyAddresses {
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
  variables?: Address_GetMyAddressesQueryVariables,
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
    queryKey:
      variables === undefined
        ? ["address_getMyAddresses"]
        : ["address_getMyAddresses", variables],
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
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["address_getMyAddresses.infinite"]
            : ["address_getMyAddresses.infinite", variables],
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
