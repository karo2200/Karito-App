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
  Long: { input: any; output: any };
  UUID: { input: any; output: any };
};

export type AcceptServiceRequestInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type ActivateCityInput = {
  cityId: Scalars["UUID"]["input"];
};

export type ActivateDiscountCodeInput = {
  id: Scalars["UUID"]["input"];
};

export type AddAddressInput = {
  buildingNumber: Scalars["Int"]["input"];
  customerId: Scalars["UUID"]["input"];
  floorNumber: Scalars["Int"]["input"];
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
  text: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
  unitNumber: Scalars["Int"]["input"];
};

export type AddressDto = {
  __typename?: "AddressDto";
  buildingNumber: Scalars["Int"]["output"];
  city: CityDto;
  customer: CustomerDto;
  floorNumber: Scalars["Int"]["output"];
  id: Scalars["UUID"]["output"];
  isPrimary: Scalars["Boolean"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
  text: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  unitNumber: Scalars["Int"]["output"];
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
  buildingNumber?: InputMaybe<IntOperationFilterInput>;
  city?: InputMaybe<CityDtoFilterInput>;
  customer?: InputMaybe<CustomerDtoFilterInput>;
  floorNumber?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isPrimary?: InputMaybe<BooleanOperationFilterInput>;
  latitude?: InputMaybe<FloatOperationFilterInput>;
  longitude?: InputMaybe<FloatOperationFilterInput>;
  or?: InputMaybe<Array<AddressDtoFilterInput>>;
  text?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  unitNumber?: InputMaybe<IntOperationFilterInput>;
};

export type AddressDtoSortInput = {
  buildingNumber?: InputMaybe<SortEnumType>;
  city?: InputMaybe<CityDtoSortInput>;
  customer?: InputMaybe<CustomerDtoSortInput>;
  floorNumber?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isPrimary?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  unitNumber?: InputMaybe<SortEnumType>;
};

export type AdminDto = {
  __typename?: "AdminDto";
  code: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender: Gender;
  id: Scalars["UUID"]["output"];
  isBlocked: Scalars["Boolean"]["output"];
  isOwner: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Scalars["String"]["output"];
  profileImageUrl?: Maybe<Scalars["String"]["output"]>;
};

/** A segment of a collection. */
export type AdminDtoCollectionSegment = {
  __typename?: "AdminDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<AdminDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type AdminDtoFilterInput = {
  and?: InputMaybe<Array<AdminDtoFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  gender?: InputMaybe<GenderOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isBlocked?: InputMaybe<BooleanOperationFilterInput>;
  isOwner?: InputMaybe<BooleanOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<AdminDtoFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  profileImageUrl?: InputMaybe<StringOperationFilterInput>;
};

export type AdminDtoSortInput = {
  code?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  gender?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isBlocked?: InputMaybe<SortEnumType>;
  isOwner?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  profileImageUrl?: InputMaybe<SortEnumType>;
};

export type ApplyDiscountCodeToServiceRequestInput = {
  discountCode: Scalars["String"]["input"];
  serviceRequestId: Scalars["UUID"]["input"];
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

export type AvailableServiceRequestDto = {
  __typename?: "AvailableServiceRequestDto";
  address: AddressDto;
  basePrice: Scalars["Decimal"]["output"];
  cancellationReason?: Maybe<CancellationReasonDto>;
  customer: CustomerDto;
  customerShare: Scalars["Decimal"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  discountAmount: Scalars["Decimal"]["output"];
  distance: Scalars["Float"]["output"];
  finalPrice: Scalars["Decimal"]["output"];
  id: Scalars["UUID"]["output"];
  paidAt?: Maybe<Scalars["DateTime"]["output"]>;
  qnAs: Array<ServiceRequestQnADto>;
  rateAndReview?: Maybe<RateAndReviewDto>;
  requestDate: Scalars["DateTime"]["output"];
  serviceType: ServiceTypeDto;
  settledAt?: Maybe<Scalars["DateTime"]["output"]>;
  specialist?: Maybe<SpecialistDto>;
  status: ServiceRequestStatus;
};

/** A segment of a collection. */
export type AvailableServiceRequestDtoCollectionSegment = {
  __typename?: "AvailableServiceRequestDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<AvailableServiceRequestDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type AvailableServiceRequestDtoFilterInput = {
  address?: InputMaybe<AddressDtoFilterInput>;
  and?: InputMaybe<Array<AvailableServiceRequestDtoFilterInput>>;
  basePrice?: InputMaybe<DecimalOperationFilterInput>;
  cancellationReason?: InputMaybe<CancellationReasonDtoFilterInput>;
  customer?: InputMaybe<CustomerDtoFilterInput>;
  customerShare?: InputMaybe<DecimalOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  discountAmount?: InputMaybe<DecimalOperationFilterInput>;
  distance?: InputMaybe<FloatOperationFilterInput>;
  finalPrice?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<AvailableServiceRequestDtoFilterInput>>;
  paidAt?: InputMaybe<DateTimeOperationFilterInput>;
  qnAs?: InputMaybe<ListFilterInputTypeOfServiceRequestQnADtoFilterInput>;
  rateAndReview?: InputMaybe<RateAndReviewDtoFilterInput>;
  requestDate?: InputMaybe<DateTimeOperationFilterInput>;
  serviceType?: InputMaybe<ServiceTypeDtoFilterInput>;
  settledAt?: InputMaybe<DateTimeOperationFilterInput>;
  specialist?: InputMaybe<SpecialistDtoFilterInput>;
  status?: InputMaybe<ServiceRequestStatusOperationFilterInput>;
};

export type AvailableServiceRequestDtoSortInput = {
  address?: InputMaybe<AddressDtoSortInput>;
  basePrice?: InputMaybe<SortEnumType>;
  cancellationReason?: InputMaybe<CancellationReasonDtoSortInput>;
  customer?: InputMaybe<CustomerDtoSortInput>;
  customerShare?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  discountAmount?: InputMaybe<SortEnumType>;
  distance?: InputMaybe<SortEnumType>;
  finalPrice?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  paidAt?: InputMaybe<SortEnumType>;
  rateAndReview?: InputMaybe<RateAndReviewDtoSortInput>;
  requestDate?: InputMaybe<SortEnumType>;
  serviceType?: InputMaybe<ServiceTypeDtoSortInput>;
  settledAt?: InputMaybe<SortEnumType>;
  specialist?: InputMaybe<SpecialistDtoSortInput>;
  status?: InputMaybe<SortEnumType>;
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
  serviceTypes: Array<ServiceTypeDto>;
  title: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type CarouselDtoCollectionSegment = {
  __typename?: "CarouselDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<CarouselDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type CarouselDtoFilterInput = {
  and?: InputMaybe<Array<CarouselDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<CarouselDtoFilterInput>>;
  serviceTypes?: InputMaybe<ListFilterInputTypeOfServiceTypeDtoFilterInput>;
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
  availableServiceTypes: Array<ServiceTypeDto>;
  boundary: Scalars["String"]["output"];
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
  availableServiceTypes?: InputMaybe<ListFilterInputTypeOfServiceTypeDtoFilterInput>;
  boundary?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CityDtoFilterInput>>;
  province?: InputMaybe<ProvinceDtoFilterInput>;
};

export type CityDtoSortInput = {
  activeBanner?: InputMaybe<BannerDtoSortInput>;
  activeCarousel?: InputMaybe<CarouselDtoSortInput>;
  boundary?: InputMaybe<SortEnumType>;
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

export type CompleteMultipartUploadInput = {
  objectKey: Scalars["String"]["input"];
  uploadId: Scalars["String"]["input"];
};

export type CompleteServiceInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type CreateAdminInput = {
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
};

export type CreateBannerInput = {
  imageUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type CreateCancellationReasonInput = {
  name: Scalars["String"]["input"];
};

export type CreateCarouselInput = {
  serviceTypeIds: Array<Scalars["UUID"]["input"]>;
  title: Scalars["String"]["input"];
};

export type CreateCityInput = {
  name: Scalars["String"]["input"];
  provinceId: Scalars["UUID"]["input"];
  wktBoundary: Scalars["String"]["input"];
};

export type CreateDisabledServiceTimeInput = {
  time: Scalars["DateTime"]["input"];
};

export type CreateDiscountCodeInput = {
  amount: Scalars["Decimal"]["input"];
  customerId: Scalars["UUID"]["input"];
  expiryDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  isPercentage: Scalars["Boolean"]["input"];
  title: Scalars["String"]["input"];
};

export type CreatePaymentInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type CreateProvinceInput = {
  name: Scalars["String"]["input"];
};

export type CreateRateAndReviewInput = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  rate: Scalars["Int"]["input"];
  serviceRequestId: Scalars["UUID"]["input"];
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
  banner: Scalars["String"]["input"];
  basePrice: Scalars["Decimal"]["input"];
  isSpecial: Scalars["Boolean"]["input"];
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceSubCategoryId: Scalars["UUID"]["input"];
};

export type CreateServiceTypeQuestionInput = {
  isRequired: Scalars["Boolean"]["input"];
  options: Array<Scalars["String"]["input"]>;
  questionType: QuestionType;
  serviceTypeId: Scalars["UUID"]["input"];
  title: Scalars["String"]["input"];
};

export type CustomerDto = {
  __typename?: "CustomerDto";
  code: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender: Gender;
  id: Scalars["UUID"]["output"];
  isBlocked: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Scalars["String"]["output"];
  profileImageUrl?: Maybe<Scalars["String"]["output"]>;
};

/** A segment of a collection. */
export type CustomerDtoCollectionSegment = {
  __typename?: "CustomerDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<CustomerDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type CustomerDtoFilterInput = {
  and?: InputMaybe<Array<CustomerDtoFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  gender?: InputMaybe<GenderOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isBlocked?: InputMaybe<BooleanOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CustomerDtoFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  profileImageUrl?: InputMaybe<StringOperationFilterInput>;
};

export type CustomerDtoSortInput = {
  code?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  gender?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isBlocked?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  profileImageUrl?: InputMaybe<SortEnumType>;
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

export type DeactivateDiscountCodeInput = {
  id: Scalars["UUID"]["input"];
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

export type DeleteBannerInput = {
  bannerId: Scalars["UUID"]["input"];
};

export type DeleteCancellationReasonInput = {
  id: Scalars["UUID"]["input"];
};

export type DeleteCarouselInput = {
  id: Scalars["UUID"]["input"];
};

export type DeleteDiscountCodeInput = {
  id: Scalars["UUID"]["input"];
};

export type DeleteProvinceInput = {
  id: Scalars["UUID"]["input"];
};

export type DeleteServiceCategoryInput = {
  serviceCategoryId: Scalars["UUID"]["input"];
};

export type DeleteServiceSubCategoryInput = {
  serviceSubCategoryId: Scalars["UUID"]["input"];
};

export type DeleteServiceTypeInput = {
  id: Scalars["UUID"]["input"];
};

export type DeleteServiceTypeQuestionInput = {
  id: Scalars["UUID"]["input"];
};

export type DisabledServiceTimeDto = {
  __typename?: "DisabledServiceTimeDto";
  id: Scalars["UUID"]["output"];
  time: Scalars["DateTime"]["output"];
};

/** A segment of a collection. */
export type DisabledServiceTimeDtoCollectionSegment = {
  __typename?: "DisabledServiceTimeDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<DisabledServiceTimeDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type DisabledServiceTimeDtoFilterInput = {
  and?: InputMaybe<Array<DisabledServiceTimeDtoFilterInput>>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<DisabledServiceTimeDtoFilterInput>>;
  time?: InputMaybe<DateTimeOperationFilterInput>;
};

export type DisabledServiceTimeDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  time?: InputMaybe<SortEnumType>;
};

export type DiscountCodeDto = {
  __typename?: "DiscountCodeDto";
  amount: Scalars["Decimal"]["output"];
  code: Scalars["String"]["output"];
  customer: CustomerDto;
  expiryDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["UUID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isPercentage: Scalars["Boolean"]["output"];
  isUsed: Scalars["Boolean"]["output"];
  title: Scalars["String"]["output"];
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
  customer?: InputMaybe<CustomerDtoFilterInput>;
  expiryDate?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isPercentage?: InputMaybe<BooleanOperationFilterInput>;
  isUsed?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<DiscountCodeDtoFilterInput>>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type DiscountCodeDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  code?: InputMaybe<SortEnumType>;
  customer?: InputMaybe<CustomerDtoSortInput>;
  expiryDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isPercentage?: InputMaybe<SortEnumType>;
  isUsed?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
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
  NotSet = "NOT_SET",
}

export type GenderOperationFilterInput = {
  eq?: InputMaybe<Gender>;
  in?: InputMaybe<Array<Gender>>;
  neq?: InputMaybe<Gender>;
  nin?: InputMaybe<Array<Gender>>;
};

export type GenerateMultipartPresignedUrlsInput = {
  fileSize: Scalars["Long"]["input"];
  objectKey: Scalars["String"]["input"];
  partSize?: InputMaybe<Scalars["Int"]["input"]>;
};

export type GeneratePresignedUrlInput = {
  objectKey: Scalars["String"]["input"];
};

export type GetAddressByIdInput = {
  addressId: Scalars["UUID"]["input"];
};

export type GetAvailableRequestsInput = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type GetAvailableServiceCategoriesForCityInput = {
  cityId: Scalars["UUID"]["input"];
};

export type GetAvailableServiceSubCategoriesForCityInput = {
  cityId: Scalars["UUID"]["input"];
};

export type GetAvailableServiceTypesForCityInput = {
  cityId: Scalars["UUID"]["input"];
};

export type GetBannerByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetCancellationReasonByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetCarouselByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetCityByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetCustomerByIdInput = {
  customerId: Scalars["UUID"]["input"];
};

export type GetDiscountCodeByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetMyRevenueInput = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type GetNearestAddressesInput = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type GetPaymentByIdInput = {
  paymentId: Scalars["UUID"]["input"];
};

export type GetPaymentsForServiceRequestInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type GetProvinceByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetServiceCategoryByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetServiceRequestByIdInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type GetServiceSubCategoryByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetServiceTypeByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetServiceTypeQuestionByIdInput = {
  id: Scalars["UUID"]["input"];
};

export type GetServiceTypeQuestionsByServiceTypeInput = {
  serviceTypeId: Scalars["UUID"]["input"];
};

export type GetSpecialistByIdInput = {
  specialistId: Scalars["UUID"]["input"];
};

export type GetSpecialistRevenueByIdInput = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  specialistId: Scalars["UUID"]["input"];
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars["Int"]["input"]>;
  gt?: InputMaybe<Scalars["Int"]["input"]>;
  gte?: InputMaybe<Scalars["Int"]["input"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  lt?: InputMaybe<Scalars["Int"]["input"]>;
  lte?: InputMaybe<Scalars["Int"]["input"]>;
  neq?: InputMaybe<Scalars["Int"]["input"]>;
  ngt?: InputMaybe<Scalars["Int"]["input"]>;
  ngte?: InputMaybe<Scalars["Int"]["input"]>;
  nin?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  nlt?: InputMaybe<Scalars["Int"]["input"]>;
  nlte?: InputMaybe<Scalars["Int"]["input"]>;
};

export type ListFilterInputTypeOfServiceRequestQnADtoFilterInput = {
  all?: InputMaybe<ServiceRequestQnADtoFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]["input"]>;
  none?: InputMaybe<ServiceRequestQnADtoFilterInput>;
  some?: InputMaybe<ServiceRequestQnADtoFilterInput>;
};

export type ListFilterInputTypeOfServiceTypeDtoFilterInput = {
  all?: InputMaybe<ServiceTypeDtoFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]["input"]>;
  none?: InputMaybe<ServiceTypeDtoFilterInput>;
  some?: InputMaybe<ServiceTypeDtoFilterInput>;
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

export type ListResponseBaseOfAdminDto = {
  __typename?: "ListResponseBaseOfAdminDto";
  result?: Maybe<AdminDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfAdminDtoResultArgs = {
  order?: InputMaybe<Array<AdminDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AdminDtoFilterInput>;
};

export type ListResponseBaseOfAvailableServiceRequestDto = {
  __typename?: "ListResponseBaseOfAvailableServiceRequestDto";
  result?: Maybe<AvailableServiceRequestDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfAvailableServiceRequestDtoResultArgs = {
  order?: InputMaybe<Array<AvailableServiceRequestDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AvailableServiceRequestDtoFilterInput>;
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
  result?: Maybe<CarouselDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfCarouselDtoResultArgs = {
  order?: InputMaybe<Array<CarouselDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CarouselDtoFilterInput>;
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

export type ListResponseBaseOfCustomerDto = {
  __typename?: "ListResponseBaseOfCustomerDto";
  result?: Maybe<CustomerDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfCustomerDtoResultArgs = {
  order?: InputMaybe<Array<CustomerDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CustomerDtoFilterInput>;
};

export type ListResponseBaseOfDisabledServiceTimeDto = {
  __typename?: "ListResponseBaseOfDisabledServiceTimeDto";
  result?: Maybe<DisabledServiceTimeDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfDisabledServiceTimeDtoResultArgs = {
  order?: InputMaybe<Array<DisabledServiceTimeDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DisabledServiceTimeDtoFilterInput>;
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

export type ListResponseBaseOfPaymentDto = {
  __typename?: "ListResponseBaseOfPaymentDto";
  result?: Maybe<PaymentDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfPaymentDtoResultArgs = {
  order?: InputMaybe<Array<PaymentDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PaymentDtoFilterInput>;
};

export type ListResponseBaseOfPopularServiceTypeDto = {
  __typename?: "ListResponseBaseOfPopularServiceTypeDto";
  result?: Maybe<PopularServiceTypeDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfPopularServiceTypeDtoResultArgs = {
  order?: InputMaybe<Array<PopularServiceTypeDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<PopularServiceTypeDtoFilterInput>;
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

export type ListResponseBaseOfRateAndReviewDto = {
  __typename?: "ListResponseBaseOfRateAndReviewDto";
  result?: Maybe<RateAndReviewDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfRateAndReviewDtoResultArgs = {
  order?: InputMaybe<Array<RateAndReviewDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<RateAndReviewDtoFilterInput>;
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

export type ListResponseBaseOfServiceTypeCountDto = {
  __typename?: "ListResponseBaseOfServiceTypeCountDto";
  result?: Maybe<ServiceTypeCountDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfServiceTypeCountDtoResultArgs = {
  order?: InputMaybe<Array<ServiceTypeCountDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceTypeCountDtoFilterInput>;
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

export type ListResponseBaseOfSpecialistDto = {
  __typename?: "ListResponseBaseOfSpecialistDto";
  result?: Maybe<SpecialistDtoCollectionSegment>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ListResponseBaseOfSpecialistDtoResultArgs = {
  order?: InputMaybe<Array<SpecialistDtoSortInput>>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<SpecialistDtoFilterInput>;
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
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
  serviceRequestId: Scalars["UUID"]["input"];
};

export type MarkServiceRequestSettledInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  address_create: SingleResponseBaseOfAddressDto;
  address_delete: ResponseBase;
  address_setPrimary: ResponseBase;
  address_update: SingleResponseBaseOfAddressDto;
  /** Allows an owner to create a new admin user. */
  admin_create: ResponseBase;
  auth_refreshToken: ResponseBaseOfAuthResult;
  auth_requestOtp: ResponseBase;
  auth_verifyOtp: ResponseBaseOfAuthResult;
  banner_create: ResponseBaseOfBannerDto;
  banner_delete: ResponseBase;
  banner_update: ResponseBaseOfBannerDto;
  cancellationReason_create: ResponseBaseOfCancellationReasonDto;
  cancellationReason_delete: ResponseBase;
  cancellationReason_update: ResponseBaseOfCancellationReasonDto;
  carousel_create: ResponseBaseOfCarouselDto;
  carousel_delete: ResponseBase;
  carousel_update: ResponseBaseOfCarouselDto;
  city_activate: SingleResponseBaseOfCityDto;
  city_create: SingleResponseBaseOfCityDto;
  city_deactivate: SingleResponseBaseOfCityDto;
  city_setActiveBanner: SingleResponseBaseOfCityDto;
  city_setActiveCarousel: SingleResponseBaseOfCityDto;
  city_setAvailableServiceTypes: SingleResponseBaseOfCityDto;
  city_update: SingleResponseBaseOfCityDto;
  city_updateBoundary: SingleResponseBaseOfCityDto;
  disabledServiceTime_create: ResponseBaseOfDisabledServiceTimeDto;
  disabledServiceTime_remove: ResponseBase;
  discountCode_activate: ResponseBaseOfDiscountCodeDto;
  discountCode_create: ResponseBaseOfDiscountCodeDto;
  discountCode_deactivate: ResponseBaseOfDiscountCodeDto;
  discountCode_delete: ResponseBase;
  payment_create_zibal: ResponseBaseOfPaymentDto;
  province_create: ResponseBaseOfProvinceDto;
  province_delete: ResponseBase;
  province_update: ResponseBaseOfProvinceDto;
  rateAndReview_create: ResponseBaseOfRateAndReviewDto;
  s3_completeMultipartUpload: ResponseBase;
  s3_generatePresignedUrl: ResponseBaseOfS3SinglepartUploadUrlsResultDto;
  s3_generatePresignedUrls: ResponseBaseOfS3MultipartUploadUrlsResultDto;
  serviceCategory_create: ResponseBaseOfServiceCategoryDto;
  serviceCategory_delete: ResponseBase;
  serviceCategory_update: ResponseBaseOfServiceCategoryDto;
  serviceRequest_accept: ResponseBaseOfServiceRequestDto;
  serviceRequest_applyDiscount: ResponseBaseOfServiceRequestDto;
  serviceRequest_cancel: ResponseBaseOfServiceRequestDto;
  serviceRequest_completeService: ResponseBaseOfServiceRequestDto;
  serviceRequest_create: ResponseBaseOfServiceRequestDto;
  serviceRequest_markAsArrived: ResponseBaseOfServiceRequestDto;
  serviceRequest_markAsSettled: ResponseBaseOfServiceRequestDto;
  serviceRequest_reject: ResponseBaseOfRejectedServiceRequestDto;
  serviceRequest_removeDiscount: ResponseBaseOfServiceRequestDto;
  serviceSubCategory_create: ResponseBaseOfServiceSubCategoryDto;
  serviceSubCategory_delete: ResponseBase;
  serviceSubCategory_update: ResponseBaseOfServiceSubCategoryDto;
  serviceTypeQuestion_create: ResponseBaseOfServiceTypeQuestionDto;
  serviceTypeQuestion_delete: ResponseBase;
  serviceTypeQuestion_update: ResponseBaseOfServiceTypeQuestionDto;
  serviceType_create: ResponseBaseOfServiceTypeDto;
  serviceType_delete: ResponseBase;
  serviceType_update: ResponseBaseOfServiceTypeDto;
  specialist_setLocationAndSpecialty: ResponseBase;
  specialist_setPersonalInformation: ResponseBase;
  specialist_updateIdentityVerificationVideo: ResponseBase;
  specialist_updateSpecializedDocuments: ResponseBase;
  specialist_verifyIDCard: ResponseBase;
  specialist_verifyIdentityVerificationVideo: ResponseBase;
  specialist_verifySpecializedDocuments: ResponseBase;
  user_setBlockState: ResponseBase;
  user_updateProfile: ResponseBaseOfUserProfileDto;
};

export type MutationAddress_CreateArgs = {
  input: AddAddressInput;
};

export type MutationAddress_DeleteArgs = {
  input: DeleteAddressInput;
};

export type MutationAddress_SetPrimaryArgs = {
  input: SetPrimaryAddressInput;
};

export type MutationAddress_UpdateArgs = {
  input: UpdateAddressInput;
};

export type MutationAdmin_CreateArgs = {
  input: CreateAdminInput;
};

export type MutationAuth_RefreshTokenArgs = {
  input: RefreshTokenRequestInput;
};

export type MutationAuth_RequestOtpArgs = {
  input: RequestOtpInput;
};

export type MutationAuth_VerifyOtpArgs = {
  input: VerifyOtpInput;
};

export type MutationBanner_CreateArgs = {
  input: CreateBannerInput;
};

export type MutationBanner_DeleteArgs = {
  input: DeleteBannerInput;
};

export type MutationBanner_UpdateArgs = {
  input: UpdateBannerInput;
};

export type MutationCancellationReason_CreateArgs = {
  input: CreateCancellationReasonInput;
};

export type MutationCancellationReason_DeleteArgs = {
  input: DeleteCancellationReasonInput;
};

export type MutationCancellationReason_UpdateArgs = {
  input: UpdateCancellationReasonInput;
};

export type MutationCarousel_CreateArgs = {
  input: CreateCarouselInput;
};

export type MutationCarousel_DeleteArgs = {
  input: DeleteCarouselInput;
};

export type MutationCarousel_UpdateArgs = {
  input: UpdateCarouselInput;
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
  input: SetActiveBannerInput;
};

export type MutationCity_SetActiveCarouselArgs = {
  input: SetActiveCarouselInput;
};

export type MutationCity_SetAvailableServiceTypesArgs = {
  input: SetCityAvailableServiceTypesInput;
};

export type MutationCity_UpdateArgs = {
  input: UpdateCityInput;
};

export type MutationCity_UpdateBoundaryArgs = {
  input: UpdateCityBoundaryInput;
};

export type MutationDisabledServiceTime_CreateArgs = {
  input: CreateDisabledServiceTimeInput;
};

export type MutationDisabledServiceTime_RemoveArgs = {
  input: RemoveDisabledServiceTimeInput;
};

export type MutationDiscountCode_ActivateArgs = {
  input: ActivateDiscountCodeInput;
};

export type MutationDiscountCode_CreateArgs = {
  input: CreateDiscountCodeInput;
};

export type MutationDiscountCode_DeactivateArgs = {
  input: DeactivateDiscountCodeInput;
};

export type MutationDiscountCode_DeleteArgs = {
  input: DeleteDiscountCodeInput;
};

export type MutationPayment_Create_ZibalArgs = {
  input: CreatePaymentInput;
};

export type MutationProvince_CreateArgs = {
  input: CreateProvinceInput;
};

export type MutationProvince_DeleteArgs = {
  input: DeleteProvinceInput;
};

export type MutationProvince_UpdateArgs = {
  input: UpdateProvinceInput;
};

export type MutationRateAndReview_CreateArgs = {
  input: CreateRateAndReviewInput;
};

export type MutationS3_CompleteMultipartUploadArgs = {
  input: CompleteMultipartUploadInput;
};

export type MutationS3_GeneratePresignedUrlArgs = {
  input: GeneratePresignedUrlInput;
};

export type MutationS3_GeneratePresignedUrlsArgs = {
  input: GenerateMultipartPresignedUrlsInput;
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

export type MutationServiceRequest_ApplyDiscountArgs = {
  input: ApplyDiscountCodeToServiceRequestInput;
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

export type MutationServiceRequest_MarkAsArrivedArgs = {
  input: MarkAsArrivedInput;
};

export type MutationServiceRequest_MarkAsSettledArgs = {
  input: MarkServiceRequestSettledInput;
};

export type MutationServiceRequest_RejectArgs = {
  input: RejectServiceRequestInput;
};

export type MutationServiceRequest_RemoveDiscountArgs = {
  input: RemoveDiscountCodeFromServiceRequestInput;
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
  input: CreateServiceTypeQuestionInput;
};

export type MutationServiceTypeQuestion_DeleteArgs = {
  input: DeleteServiceTypeQuestionInput;
};

export type MutationServiceTypeQuestion_UpdateArgs = {
  input: UpdateServiceTypeQuestionInput;
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

export type MutationSpecialist_SetLocationAndSpecialtyArgs = {
  input: SetLocationAndSpecialtyInput;
};

export type MutationSpecialist_SetPersonalInformationArgs = {
  input: SetPersonalInformationInput;
};

export type MutationSpecialist_UpdateIdentityVerificationVideoArgs = {
  input: UpdateIdentityVerificationVideoInput;
};

export type MutationSpecialist_UpdateSpecializedDocumentsArgs = {
  input: UpdateSpecializedDocumentsInput;
};

export type MutationSpecialist_VerifyIdCardArgs = {
  input: VerifyIdCardInput;
};

export type MutationSpecialist_VerifyIdentityVerificationVideoArgs = {
  input: VerifyIdentityVerificationVideoInput;
};

export type MutationSpecialist_VerifySpecializedDocumentsArgs = {
  input: VerifySpecializedDocumentsInput;
};

export type MutationUser_SetBlockStateArgs = {
  input: SetUserBlockStateInput;
};

export type MutationUser_UpdateProfileArgs = {
  input: UpdateUserProfileInput;
};

export type PaymentDto = {
  __typename?: "PaymentDto";
  amount: Scalars["Decimal"]["output"];
  discountCode?: Maybe<DiscountCodeDto>;
  id: Scalars["UUID"]["output"];
  paymentUrl?: Maybe<Scalars["String"]["output"]>;
  serviceRequest: ServiceRequestDto;
  status: PaymentStatus;
};

/** A segment of a collection. */
export type PaymentDtoCollectionSegment = {
  __typename?: "PaymentDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<PaymentDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type PaymentDtoFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<PaymentDtoFilterInput>>;
  discountCode?: InputMaybe<DiscountCodeDtoFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<PaymentDtoFilterInput>>;
  paymentUrl?: InputMaybe<StringOperationFilterInput>;
  serviceRequest?: InputMaybe<ServiceRequestDtoFilterInput>;
  status?: InputMaybe<PaymentStatusOperationFilterInput>;
};

export type PaymentDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  discountCode?: InputMaybe<DiscountCodeDtoSortInput>;
  id?: InputMaybe<SortEnumType>;
  paymentUrl?: InputMaybe<SortEnumType>;
  serviceRequest?: InputMaybe<ServiceRequestDtoSortInput>;
  status?: InputMaybe<SortEnumType>;
};

export enum PaymentStatus {
  Failed = "FAILED",
  Pending = "PENDING",
  Success = "SUCCESS",
}

export type PaymentStatusOperationFilterInput = {
  eq?: InputMaybe<PaymentStatus>;
  in?: InputMaybe<Array<PaymentStatus>>;
  neq?: InputMaybe<PaymentStatus>;
  nin?: InputMaybe<Array<PaymentStatus>>;
};

export type PopularServiceTypeDto = {
  __typename?: "PopularServiceTypeDto";
  banner: Scalars["String"]["output"];
  basePrice: Scalars["Decimal"]["output"];
  id: Scalars["UUID"]["output"];
  isSpecial: Scalars["Boolean"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  requestCount: Scalars["Int"]["output"];
  serviceSubCategory: ServiceSubCategoryDto;
};

/** A segment of a collection. */
export type PopularServiceTypeDtoCollectionSegment = {
  __typename?: "PopularServiceTypeDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<PopularServiceTypeDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type PopularServiceTypeDtoFilterInput = {
  and?: InputMaybe<Array<PopularServiceTypeDtoFilterInput>>;
  banner?: InputMaybe<StringOperationFilterInput>;
  basePrice?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isSpecial?: InputMaybe<BooleanOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<PopularServiceTypeDtoFilterInput>>;
  requestCount?: InputMaybe<IntOperationFilterInput>;
  serviceSubCategory?: InputMaybe<ServiceSubCategoryDtoFilterInput>;
};

export type PopularServiceTypeDtoSortInput = {
  banner?: InputMaybe<SortEnumType>;
  basePrice?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isSpecial?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  requestCount?: InputMaybe<SortEnumType>;
  serviceSubCategory?: InputMaybe<ServiceSubCategoryDtoSortInput>;
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
  address_getAddressById: SingleResponseBaseOfAddressDto;
  address_getMyAddresses: ListResponseBaseOfAddressDto;
  address_nearestAddresses: ListResponseBaseOfAddressDto;
  /** Returns all admin users. Accessible by owner/admin. */
  admin_getAll: ListResponseBaseOfAdminDto;
  /** Returns an admin by their ID. Accessible by owner/admin. */
  admin_getById: ResponseBaseOfAdminDto;
  banner_getAll: ListResponseBaseOfBannerDto;
  banner_getById: ResponseBaseOfBannerDto;
  cancellationReason_getAll: ListResponseBaseOfCancellationReasonDto;
  cancellationReason_getById: ResponseBaseOfCancellationReasonDto;
  carousel_getAll: ListResponseBaseOfCarouselDto;
  carousel_getById: ResponseBaseOfCarouselDto;
  city_getAll: ListResponseBaseOfCityDto;
  city_getAvailableServiceCategories: ListResponseBaseOfServiceCategoryDto;
  city_getAvailableServiceSubCategories: ListResponseBaseOfServiceSubCategoryDto;
  city_getAvailableServiceTypes: ListResponseBaseOfServiceTypeDto;
  city_getById: SingleResponseBaseOfCityDto;
  /** Returns all customers. */
  customer_getAll: ListResponseBaseOfCustomerDto;
  /** Returns a customer by their ID. */
  customer_getById: ResponseBaseOfCustomerDto;
  disabledServiceTime_getAll: ListResponseBaseOfDisabledServiceTimeDto;
  discountCode_getAll: ListResponseBaseOfDiscountCodeDto;
  discountCode_getById: ResponseBaseOfDiscountCodeDto;
  discountCode_getMyCodes: ListResponseBaseOfDiscountCodeDto;
  payment_getAll: ListResponseBaseOfPaymentDto;
  payment_getById: ResponseBaseOfPaymentDto;
  payment_getMyPayments: ListResponseBaseOfPaymentDto;
  payment_listForServiceRequest: ListResponseBaseOfPaymentDto;
  province_getAll: ListResponseBaseOfProvinceDto;
  province_getById: ResponseBaseOfProvinceDto;
  rateAndReview_getByCustomerId: ListResponseBaseOfRateAndReviewDto;
  rateAndReview_getBySpecialistId: ListResponseBaseOfRateAndReviewDto;
  /** Get revenue for the currently authenticated specialist in a given date range. */
  revenue_getMyRevenue: ResponseBaseOfSpecialistRevenueDto;
  /** Admin: get revenue of a specialist in a given date range. */
  revenue_getRevenueBySpecialistId: ResponseBaseOfSpecialistRevenueDto;
  serviceCategory_getAll: ListResponseBaseOfServiceCategoryDto;
  serviceCategory_getById: ResponseBaseOfServiceCategoryDto;
  serviceRequest_getAll: ListResponseBaseOfServiceRequestDto;
  serviceRequest_getAvailableRequests: ListResponseBaseOfAvailableServiceRequestDto;
  serviceRequest_getById: SingleResponseBaseOfServiceRequestDto;
  serviceRequest_getMyAcceptances: ListResponseBaseOfServiceRequestDto;
  serviceRequest_getMyRequests: ListResponseBaseOfServiceRequestDto;
  serviceSubCategory_getAll: ListResponseBaseOfServiceSubCategoryDto;
  serviceSubCategory_getById: ResponseBaseOfServiceSubCategoryDto;
  serviceTypeQuestion_getById: SingleResponseBaseOfServiceTypeQuestionDto;
  serviceTypeQuestion_getByServiceType: ListResponseBaseOfServiceTypeQuestionDto;
  serviceType_getById: ResponseBaseOfServiceTypeDto;
  serviceTypes_getAll: ListResponseBaseOfServiceTypeDto;
  serviceTypes_getPopular: ListResponseBaseOfPopularServiceTypeDto;
  /** Returns all specialists. */
  specialist_getAll: ListResponseBaseOfSpecialistDto;
  /** Returns a specialist by their ID. */
  specialist_getById: ResponseBaseOfSpecialistDto;
  /** Returns the profile of the currently authenticated specialist. */
  specialist_getMyProfile: ResponseBaseOfSpecialistDto;
  stats_getActiveSpecialists: ResponseBaseOfInt32;
  stats_getServiceRequests: ResponseBaseOfServiceRequestsDto;
  stats_getServiceTypeCounts: ListResponseBaseOfServiceTypeCountDto;
  stats_getTotalRevenue: ResponseBaseOfTotalRevenueDto;
  /** Gets the profile of the currently authenticated user. */
  user_getMyProfile: ResponseBaseOfUserProfileDto;
};

export type QueryAddress_GetAddressByIdArgs = {
  input: GetAddressByIdInput;
};

export type QueryAddress_NearestAddressesArgs = {
  input: GetNearestAddressesInput;
};

export type QueryAdmin_GetByIdArgs = {
  adminId: Scalars["UUID"]["input"];
};

export type QueryBanner_GetByIdArgs = {
  input: GetBannerByIdInput;
};

export type QueryCancellationReason_GetByIdArgs = {
  input: GetCancellationReasonByIdInput;
};

export type QueryCarousel_GetByIdArgs = {
  input: GetCarouselByIdInput;
};

export type QueryCity_GetAvailableServiceCategoriesArgs = {
  input: GetAvailableServiceCategoriesForCityInput;
};

export type QueryCity_GetAvailableServiceSubCategoriesArgs = {
  input: GetAvailableServiceSubCategoriesForCityInput;
};

export type QueryCity_GetAvailableServiceTypesArgs = {
  input: GetAvailableServiceTypesForCityInput;
};

export type QueryCity_GetByIdArgs = {
  input: GetCityByIdInput;
};

export type QueryCustomer_GetByIdArgs = {
  input: GetCustomerByIdInput;
};

export type QueryDiscountCode_GetByIdArgs = {
  input: GetDiscountCodeByIdInput;
};

export type QueryPayment_GetByIdArgs = {
  input: GetPaymentByIdInput;
};

export type QueryPayment_ListForServiceRequestArgs = {
  input: GetPaymentsForServiceRequestInput;
};

export type QueryProvince_GetByIdArgs = {
  input: GetProvinceByIdInput;
};

export type QueryRateAndReview_GetByCustomerIdArgs = {
  customerId: Scalars["UUID"]["input"];
};

export type QueryRateAndReview_GetBySpecialistIdArgs = {
  specialistId: Scalars["UUID"]["input"];
};

export type QueryRevenue_GetMyRevenueArgs = {
  input: GetMyRevenueInput;
};

export type QueryRevenue_GetRevenueBySpecialistIdArgs = {
  input: GetSpecialistRevenueByIdInput;
};

export type QueryServiceCategory_GetByIdArgs = {
  input: GetServiceCategoryByIdInput;
};

export type QueryServiceRequest_GetAvailableRequestsArgs = {
  input: GetAvailableRequestsInput;
};

export type QueryServiceRequest_GetByIdArgs = {
  input: GetServiceRequestByIdInput;
};

export type QueryServiceSubCategory_GetByIdArgs = {
  input: GetServiceSubCategoryByIdInput;
};

export type QueryServiceTypeQuestion_GetByIdArgs = {
  input: GetServiceTypeQuestionByIdInput;
};

export type QueryServiceTypeQuestion_GetByServiceTypeArgs = {
  input: GetServiceTypeQuestionsByServiceTypeInput;
};

export type QueryServiceType_GetByIdArgs = {
  input: GetServiceTypeByIdInput;
};

export type QuerySpecialist_GetByIdArgs = {
  input: GetSpecialistByIdInput;
};

export type QueryStats_GetActiveSpecialistsArgs = {
  input: StatsRangeInput;
};

export type QueryStats_GetServiceRequestsArgs = {
  input: StatsRangeInput;
};

export type QueryStats_GetServiceTypeCountsArgs = {
  input: StatsRangeInput;
};

export type QueryStats_GetTotalRevenueArgs = {
  input: StatsRangeInput;
};

export enum QuestionType {
  CheckBox = "CHECK_BOX",
  RadioButton = "RADIO_BUTTON",
}

export type QuestionTypeOperationFilterInput = {
  eq?: InputMaybe<QuestionType>;
  in?: InputMaybe<Array<QuestionType>>;
  neq?: InputMaybe<QuestionType>;
  nin?: InputMaybe<Array<QuestionType>>;
};

export type RateAndReviewDto = {
  __typename?: "RateAndReviewDto";
  comment?: Maybe<Scalars["String"]["output"]>;
  rate: Scalars["Int"]["output"];
};

/** A segment of a collection. */
export type RateAndReviewDtoCollectionSegment = {
  __typename?: "RateAndReviewDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<RateAndReviewDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type RateAndReviewDtoFilterInput = {
  and?: InputMaybe<Array<RateAndReviewDtoFilterInput>>;
  comment?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RateAndReviewDtoFilterInput>>;
  rate?: InputMaybe<IntOperationFilterInput>;
};

export type RateAndReviewDtoSortInput = {
  comment?: InputMaybe<SortEnumType>;
  rate?: InputMaybe<SortEnumType>;
};

export type RefreshTokenRequestInput = {
  accessToken: Scalars["String"]["input"];
  refreshToken: Scalars["String"]["input"];
};

export type RejectServiceRequestInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type RejectedServiceRequestDto = {
  __typename?: "RejectedServiceRequestDto";
  serviceRequest: ServiceRequestDto;
  specialist: SpecialistDto;
};

export type RemoveDisabledServiceTimeInput = {
  id: Scalars["UUID"]["input"];
};

export type RemoveDiscountCodeFromServiceRequestInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type RequestOtpInput = {
  phoneNumber: Scalars["String"]["input"];
  userType: UserType;
};

export type ResponseBase = {
  __typename?: "ResponseBase";
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfAdminDto = {
  __typename?: "ResponseBaseOfAdminDto";
  result?: Maybe<AdminDto>;
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

export type ResponseBaseOfCustomerDto = {
  __typename?: "ResponseBaseOfCustomerDto";
  result?: Maybe<CustomerDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfDisabledServiceTimeDto = {
  __typename?: "ResponseBaseOfDisabledServiceTimeDto";
  result?: Maybe<DisabledServiceTimeDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfDiscountCodeDto = {
  __typename?: "ResponseBaseOfDiscountCodeDto";
  result?: Maybe<DiscountCodeDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfInt32 = {
  __typename?: "ResponseBaseOfInt32";
  result: Scalars["Int"]["output"];
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfPaymentDto = {
  __typename?: "ResponseBaseOfPaymentDto";
  result?: Maybe<PaymentDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfProvinceDto = {
  __typename?: "ResponseBaseOfProvinceDto";
  result?: Maybe<ProvinceDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfRateAndReviewDto = {
  __typename?: "ResponseBaseOfRateAndReviewDto";
  result?: Maybe<RateAndReviewDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfRejectedServiceRequestDto = {
  __typename?: "ResponseBaseOfRejectedServiceRequestDto";
  result?: Maybe<RejectedServiceRequestDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfS3MultipartUploadUrlsResultDto = {
  __typename?: "ResponseBaseOfS3MultipartUploadUrlsResultDto";
  result?: Maybe<S3MultipartUploadUrlsResultDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfS3SinglepartUploadUrlsResultDto = {
  __typename?: "ResponseBaseOfS3SinglepartUploadUrlsResultDto";
  result?: Maybe<S3SinglepartUploadUrlsResultDto>;
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

export type ResponseBaseOfServiceRequestsDto = {
  __typename?: "ResponseBaseOfServiceRequestsDto";
  result?: Maybe<ServiceRequestsDto>;
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

export type ResponseBaseOfSpecialistDto = {
  __typename?: "ResponseBaseOfSpecialistDto";
  result?: Maybe<SpecialistDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfSpecialistRevenueDto = {
  __typename?: "ResponseBaseOfSpecialistRevenueDto";
  result?: Maybe<SpecialistRevenueDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfTotalRevenueDto = {
  __typename?: "ResponseBaseOfTotalRevenueDto";
  result?: Maybe<TotalRevenueDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type ResponseBaseOfUserProfileDto = {
  __typename?: "ResponseBaseOfUserProfileDto";
  result?: Maybe<UserProfileDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type S3MultipartUploadUrlsResultDto = {
  __typename?: "S3MultipartUploadUrlsResultDto";
  objectUrl: Scalars["String"]["output"];
  presignedUrls: Array<Scalars["String"]["output"]>;
  uploadId: Scalars["String"]["output"];
};

export type S3SinglepartUploadUrlsResultDto = {
  __typename?: "S3SinglepartUploadUrlsResultDto";
  objectUrl: Scalars["String"]["output"];
  presignedUrl: Scalars["String"]["output"];
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
  address: AddressDto;
  basePrice: Scalars["Decimal"]["output"];
  cancellationReason?: Maybe<CancellationReasonDto>;
  customer: CustomerDto;
  customerShare: Scalars["Decimal"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  discountAmount: Scalars["Decimal"]["output"];
  finalPrice: Scalars["Decimal"]["output"];
  id: Scalars["UUID"]["output"];
  paidAt?: Maybe<Scalars["DateTime"]["output"]>;
  qnAs: Array<ServiceRequestQnADto>;
  rateAndReview?: Maybe<RateAndReviewDto>;
  requestDate: Scalars["DateTime"]["output"];
  serviceType: ServiceTypeDto;
  settledAt?: Maybe<Scalars["DateTime"]["output"]>;
  specialist?: Maybe<SpecialistDto>;
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
  address?: InputMaybe<AddressDtoFilterInput>;
  and?: InputMaybe<Array<ServiceRequestDtoFilterInput>>;
  basePrice?: InputMaybe<DecimalOperationFilterInput>;
  cancellationReason?: InputMaybe<CancellationReasonDtoFilterInput>;
  customer?: InputMaybe<CustomerDtoFilterInput>;
  customerShare?: InputMaybe<DecimalOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  discountAmount?: InputMaybe<DecimalOperationFilterInput>;
  finalPrice?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<Array<ServiceRequestDtoFilterInput>>;
  paidAt?: InputMaybe<DateTimeOperationFilterInput>;
  qnAs?: InputMaybe<ListFilterInputTypeOfServiceRequestQnADtoFilterInput>;
  rateAndReview?: InputMaybe<RateAndReviewDtoFilterInput>;
  requestDate?: InputMaybe<DateTimeOperationFilterInput>;
  serviceType?: InputMaybe<ServiceTypeDtoFilterInput>;
  settledAt?: InputMaybe<DateTimeOperationFilterInput>;
  specialist?: InputMaybe<SpecialistDtoFilterInput>;
  status?: InputMaybe<ServiceRequestStatusOperationFilterInput>;
};

export type ServiceRequestDtoSortInput = {
  address?: InputMaybe<AddressDtoSortInput>;
  basePrice?: InputMaybe<SortEnumType>;
  cancellationReason?: InputMaybe<CancellationReasonDtoSortInput>;
  customer?: InputMaybe<CustomerDtoSortInput>;
  customerShare?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  discountAmount?: InputMaybe<SortEnumType>;
  finalPrice?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  paidAt?: InputMaybe<SortEnumType>;
  rateAndReview?: InputMaybe<RateAndReviewDtoSortInput>;
  requestDate?: InputMaybe<SortEnumType>;
  serviceType?: InputMaybe<ServiceTypeDtoSortInput>;
  settledAt?: InputMaybe<SortEnumType>;
  specialist?: InputMaybe<SpecialistDtoSortInput>;
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
  CancelledByCustomer = "CANCELLED_BY_CUSTOMER",
  CancelledBySpecialist = "CANCELLED_BY_SPECIALIST",
  Paid = "PAID",
  Pending = "PENDING",
  PendingPayment = "PENDING_PAYMENT",
  SettledWithSpecialist = "SETTLED_WITH_SPECIALIST",
  SpecialistArrivedToLocation = "SPECIALIST_ARRIVED_TO_LOCATION",
}

export type ServiceRequestStatusOperationFilterInput = {
  eq?: InputMaybe<ServiceRequestStatus>;
  in?: InputMaybe<Array<ServiceRequestStatus>>;
  neq?: InputMaybe<ServiceRequestStatus>;
  nin?: InputMaybe<Array<ServiceRequestStatus>>;
};

export type ServiceRequestsDto = {
  __typename?: "ServiceRequestsDto";
  successfulRequests: Scalars["Int"]["output"];
  totalRequests: Scalars["Int"]["output"];
};

export type ServiceSubCategoryDto = {
  __typename?: "ServiceSubCategoryDto";
  id: Scalars["UUID"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceCategory: ServiceCategoryDto;
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
  serviceCategory?: InputMaybe<ServiceCategoryDtoFilterInput>;
};

export type ServiceSubCategoryDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  serviceCategory?: InputMaybe<ServiceCategoryDtoSortInput>;
};

export type ServiceTypeCountDto = {
  __typename?: "ServiceTypeCountDto";
  count: Scalars["Int"]["output"];
  serviceTypeId: Scalars["UUID"]["output"];
  serviceTypeName: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type ServiceTypeCountDtoCollectionSegment = {
  __typename?: "ServiceTypeCountDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<ServiceTypeCountDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type ServiceTypeCountDtoFilterInput = {
  and?: InputMaybe<Array<ServiceTypeCountDtoFilterInput>>;
  count?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ServiceTypeCountDtoFilterInput>>;
  serviceTypeId?: InputMaybe<UuidOperationFilterInput>;
  serviceTypeName?: InputMaybe<StringOperationFilterInput>;
};

export type ServiceTypeCountDtoSortInput = {
  count?: InputMaybe<SortEnumType>;
  serviceTypeId?: InputMaybe<SortEnumType>;
  serviceTypeName?: InputMaybe<SortEnumType>;
};

export type ServiceTypeDto = {
  __typename?: "ServiceTypeDto";
  banner: Scalars["String"]["output"];
  basePrice: Scalars["Decimal"]["output"];
  id: Scalars["UUID"]["output"];
  isSpecial: Scalars["Boolean"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceSubCategory: ServiceSubCategoryDto;
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
  banner?: InputMaybe<StringOperationFilterInput>;
  basePrice?: InputMaybe<DecimalOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isSpecial?: InputMaybe<BooleanOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceTypeDtoFilterInput>>;
  serviceSubCategory?: InputMaybe<ServiceSubCategoryDtoFilterInput>;
};

export type ServiceTypeDtoSortInput = {
  banner?: InputMaybe<SortEnumType>;
  basePrice?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isSpecial?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  serviceSubCategory?: InputMaybe<ServiceSubCategoryDtoSortInput>;
};

export type ServiceTypeQuestionDto = {
  __typename?: "ServiceTypeQuestionDto";
  id: Scalars["UUID"]["output"];
  isRequired: Scalars["Boolean"]["output"];
  options: Array<Scalars["String"]["output"]>;
  questionType: QuestionType;
  serviceType: ServiceTypeDto;
  text: Scalars["String"]["output"];
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
  isRequired?: InputMaybe<BooleanOperationFilterInput>;
  options?: InputMaybe<ListStringOperationFilterInput>;
  or?: InputMaybe<Array<ServiceTypeQuestionDtoFilterInput>>;
  questionType?: InputMaybe<QuestionTypeOperationFilterInput>;
  serviceType?: InputMaybe<ServiceTypeDtoFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type ServiceTypeQuestionDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  isRequired?: InputMaybe<SortEnumType>;
  questionType?: InputMaybe<SortEnumType>;
  serviceType?: InputMaybe<ServiceTypeDtoSortInput>;
  text?: InputMaybe<SortEnumType>;
};

export type SetActiveBannerInput = {
  bannerId?: InputMaybe<Scalars["UUID"]["input"]>;
  cityId: Scalars["UUID"]["input"];
};

export type SetActiveCarouselInput = {
  carouselId?: InputMaybe<Scalars["UUID"]["input"]>;
  cityId: Scalars["UUID"]["input"];
};

export type SetCityAvailableServiceTypesInput = {
  cityId: Scalars["UUID"]["input"];
  serviceTypeIds: Array<Scalars["UUID"]["input"]>;
};

export type SetLocationAndSpecialtyInput = {
  cityId: Scalars["UUID"]["input"];
  serviceSubCategoryId: Scalars["UUID"]["input"];
  serviceTypeIds: Array<Scalars["UUID"]["input"]>;
};

export type SetPersonalInformationInput = {
  birthDate: Scalars["DateTime"]["input"];
  firstName: Scalars["String"]["input"];
  gender: Gender;
  idCardImageUrl?: InputMaybe<Scalars["String"]["input"]>;
  lastName: Scalars["String"]["input"];
  nationalCode: Scalars["String"]["input"];
  profileImageUrl?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetPrimaryAddressInput = {
  addressId: Scalars["UUID"]["input"];
};

export type SetUserBlockStateInput = {
  isBlocked: Scalars["Boolean"]["input"];
  userId: Scalars["UUID"]["input"];
};

export type SingleResponseBaseOfAddressDto = {
  __typename?: "SingleResponseBaseOfAddressDto";
  result?: Maybe<AddressDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type SingleResponseBaseOfCityDto = {
  __typename?: "SingleResponseBaseOfCityDto";
  result?: Maybe<CityDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type SingleResponseBaseOfServiceRequestDto = {
  __typename?: "SingleResponseBaseOfServiceRequestDto";
  result?: Maybe<ServiceRequestDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export type SingleResponseBaseOfServiceTypeQuestionDto = {
  __typename?: "SingleResponseBaseOfServiceTypeQuestionDto";
  result?: Maybe<ServiceTypeQuestionDto>;
  status?: Maybe<Scalars["Any"]["output"]>;
};

export enum SortEnumType {
  Asc = "ASC",
  Desc = "DESC",
}

export type SpecialistDto = {
  __typename?: "SpecialistDto";
  acceptedMissions: Scalars["Int"]["output"];
  averageRating: Scalars["Float"]["output"];
  birthDate: Scalars["DateTime"]["output"];
  cancelledMissions: Scalars["Int"]["output"];
  city?: Maybe<CityDto>;
  code: Scalars["String"]["output"];
  daysRegistered: Scalars["Int"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender: Gender;
  id: Scalars["UUID"]["output"];
  idCardImageUrl?: Maybe<Scalars["String"]["output"]>;
  idCardVerificationStatus: VerificationStatus;
  identityVerificationVideoStatus: VerificationStatus;
  identityVerificationVideoUrl?: Maybe<Scalars["String"]["output"]>;
  isBlocked: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  nationalCode?: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Scalars["String"]["output"];
  profileImageUrl?: Maybe<Scalars["String"]["output"]>;
  rateCount: Scalars["Int"]["output"];
  rejectedMissions: Scalars["Int"]["output"];
  serviceSubCategory?: Maybe<ServiceSubCategoryDto>;
  serviceTypes: Array<ServiceTypeDto>;
  specializedDocumentUrls?: Maybe<Array<Scalars["String"]["output"]>>;
  specializedDocumentsVerificationStatus: VerificationStatus;
  successfulMissions: Scalars["Int"]["output"];
};

/** A segment of a collection. */
export type SpecialistDtoCollectionSegment = {
  __typename?: "SpecialistDtoCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<Array<SpecialistDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars["Int"]["output"];
};

export type SpecialistDtoFilterInput = {
  acceptedMissions?: InputMaybe<IntOperationFilterInput>;
  and?: InputMaybe<Array<SpecialistDtoFilterInput>>;
  averageRating?: InputMaybe<FloatOperationFilterInput>;
  birthDate?: InputMaybe<DateTimeOperationFilterInput>;
  cancelledMissions?: InputMaybe<IntOperationFilterInput>;
  city?: InputMaybe<CityDtoFilterInput>;
  code?: InputMaybe<StringOperationFilterInput>;
  daysRegistered?: InputMaybe<IntOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  gender?: InputMaybe<GenderOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  idCardImageUrl?: InputMaybe<StringOperationFilterInput>;
  idCardVerificationStatus?: InputMaybe<VerificationStatusOperationFilterInput>;
  identityVerificationVideoStatus?: InputMaybe<VerificationStatusOperationFilterInput>;
  identityVerificationVideoUrl?: InputMaybe<StringOperationFilterInput>;
  isBlocked?: InputMaybe<BooleanOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  nationalCode?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SpecialistDtoFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  profileImageUrl?: InputMaybe<StringOperationFilterInput>;
  rateCount?: InputMaybe<IntOperationFilterInput>;
  rejectedMissions?: InputMaybe<IntOperationFilterInput>;
  serviceSubCategory?: InputMaybe<ServiceSubCategoryDtoFilterInput>;
  serviceTypes?: InputMaybe<ListFilterInputTypeOfServiceTypeDtoFilterInput>;
  specializedDocumentUrls?: InputMaybe<ListStringOperationFilterInput>;
  specializedDocumentsVerificationStatus?: InputMaybe<VerificationStatusOperationFilterInput>;
  successfulMissions?: InputMaybe<IntOperationFilterInput>;
};

export type SpecialistDtoSortInput = {
  acceptedMissions?: InputMaybe<SortEnumType>;
  averageRating?: InputMaybe<SortEnumType>;
  birthDate?: InputMaybe<SortEnumType>;
  cancelledMissions?: InputMaybe<SortEnumType>;
  city?: InputMaybe<CityDtoSortInput>;
  code?: InputMaybe<SortEnumType>;
  daysRegistered?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  gender?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  idCardImageUrl?: InputMaybe<SortEnumType>;
  idCardVerificationStatus?: InputMaybe<SortEnumType>;
  identityVerificationVideoStatus?: InputMaybe<SortEnumType>;
  identityVerificationVideoUrl?: InputMaybe<SortEnumType>;
  isBlocked?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  nationalCode?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  profileImageUrl?: InputMaybe<SortEnumType>;
  rateCount?: InputMaybe<SortEnumType>;
  rejectedMissions?: InputMaybe<SortEnumType>;
  serviceSubCategory?: InputMaybe<ServiceSubCategoryDtoSortInput>;
  specializedDocumentsVerificationStatus?: InputMaybe<SortEnumType>;
  successfulMissions?: InputMaybe<SortEnumType>;
};

export type SpecialistRevenueDto = {
  __typename?: "SpecialistRevenueDto";
  settledAmount: Scalars["Decimal"]["output"];
  specialist: SpecialistDto;
  totalAmount: Scalars["Decimal"]["output"];
  unsettledAmount: Scalars["Decimal"]["output"];
};

export type StatsRangeInput = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

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

export type TotalRevenueDto = {
  __typename?: "TotalRevenueDto";
  totalGross: Scalars["Decimal"]["output"];
  totalPlatformShare: Scalars["Decimal"]["output"];
  totalSpecialistShare: Scalars["Decimal"]["output"];
};

export type UpdateAddressInput = {
  addressId: Scalars["UUID"]["input"];
  buildingNumber: Scalars["Int"]["input"];
  floorNumber: Scalars["Int"]["input"];
  newLatitude: Scalars["Float"]["input"];
  newLongitude: Scalars["Float"]["input"];
  newText: Scalars["String"]["input"];
  newTitle: Scalars["String"]["input"];
  unitNumber: Scalars["Int"]["input"];
};

export type UpdateBannerInput = {
  id: Scalars["UUID"]["input"];
  imageUrl: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type UpdateCancellationReasonInput = {
  id: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
};

export type UpdateCarouselInput = {
  id: Scalars["UUID"]["input"];
  serviceTypeIds: Array<Scalars["UUID"]["input"]>;
  title: Scalars["String"]["input"];
};

export type UpdateCityBoundaryInput = {
  cityId: Scalars["UUID"]["input"];
  newWktBoundary: Scalars["String"]["input"];
};

export type UpdateCityInput = {
  cityId: Scalars["UUID"]["input"];
  newName: Scalars["String"]["input"];
};

export type UpdateIdentityVerificationVideoInput = {
  newVideoUrl: Scalars["String"]["input"];
};

export type UpdateProvinceInput = {
  id: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
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
  banner: Scalars["String"]["input"];
  basePrice: Scalars["Decimal"]["input"];
  id: Scalars["UUID"]["input"];
  isSpecial: Scalars["Boolean"]["input"];
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type UpdateServiceTypeQuestionInput = {
  id: Scalars["UUID"]["input"];
  isRequired: Scalars["Boolean"]["input"];
  options: Array<Scalars["String"]["input"]>;
  questionType: QuestionType;
  title: Scalars["String"]["input"];
};

export type UpdateSpecializedDocumentsInput = {
  newDocumentUrls: Array<Scalars["String"]["input"]>;
};

export type UpdateUserProfileInput = {
  firstName: Scalars["String"]["input"];
  gender: Gender;
  lastName: Scalars["String"]["input"];
  profileImageUrl?: InputMaybe<Scalars["String"]["input"]>;
};

export type UserProfileDto = {
  __typename?: "UserProfileDto";
  code: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender: Gender;
  id: Scalars["UUID"]["output"];
  isBlocked: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Scalars["String"]["output"];
  profileImageUrl?: Maybe<Scalars["String"]["output"]>;
};

export enum UserType {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
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

export enum VerificationStatus {
  Approved = "APPROVED",
  Pending = "PENDING",
  Rejected = "REJECTED",
}

export type VerificationStatusOperationFilterInput = {
  eq?: InputMaybe<VerificationStatus>;
  in?: InputMaybe<Array<VerificationStatus>>;
  neq?: InputMaybe<VerificationStatus>;
  nin?: InputMaybe<Array<VerificationStatus>>;
};

export type VerifyIdCardInput = {
  specialistId: Scalars["UUID"]["input"];
  status: VerificationStatus;
};

export type VerifyIdentityVerificationVideoInput = {
  specialistId: Scalars["UUID"]["input"];
  status: VerificationStatus;
};

export type VerifyOtpInput = {
  otp: Scalars["String"]["input"];
  phoneNumber: Scalars["String"]["input"];
  userType: UserType;
};

export type VerifySpecializedDocumentsInput = {
  specialistId: Scalars["UUID"]["input"];
  status: VerificationStatus;
};

export type Address_CreateMutationVariables = Exact<{
  input: AddAddressInput;
}>;

export type Address_CreateMutation = {
  __typename?: "Mutation";
  address_create: {
    __typename?: "SingleResponseBaseOfAddressDto";
    status?: any | null;
  };
};

export type Address_UpdateMutationVariables = Exact<{
  input: UpdateAddressInput;
}>;

export type Address_UpdateMutation = {
  __typename?: "Mutation";
  address_update: {
    __typename?: "SingleResponseBaseOfAddressDto";
    status?: any | null;
  };
};

export type Address_DeleteMutationVariables = Exact<{
  input: DeleteAddressInput;
}>;

export type Address_DeleteMutation = {
  __typename?: "Mutation";
  address_delete: { __typename?: "ResponseBase"; status?: any | null };
};

export type Auth_RequestOtpMutationVariables = Exact<{
  input: RequestOtpInput;
}>;

export type Auth_RequestOtpMutation = {
  __typename?: "Mutation";
  auth_requestOtp: { __typename?: "ResponseBase"; status?: any | null };
};

export type Auth_VerifyOtpMutationVariables = Exact<{
  input: VerifyOtpInput;
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
  input: RefreshTokenRequestInput;
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

export type City_GetAvailableServiceCategoriesQueryVariables = Exact<{
  input: GetAvailableServiceCategoriesForCityInput;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceCategoryDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceCategoryDtoSortInput> | ServiceCategoryDtoSortInput
  >;
}>;

export type City_GetAvailableServiceCategoriesQuery = {
  __typename?: "Query";
  city_getAvailableServiceCategories: {
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

export type City_GetAvailableServiceSubCategoriesQueryVariables = Exact<{
  input: GetAvailableServiceSubCategoriesForCityInput;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<
    Array<ServiceSubCategoryDtoSortInput> | ServiceSubCategoryDtoSortInput
  >;
  where?: InputMaybe<ServiceSubCategoryDtoFilterInput>;
}>;

export type City_GetAvailableServiceSubCategoriesQuery = {
  __typename?: "Query";
  city_getAvailableServiceSubCategories: {
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
        serviceCategory: {
          __typename?: "ServiceCategoryDto";
          id: any;
          name: string;
        };
      }> | null;
    } | null;
  };
};

export type DisabledServiceTimeQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DisabledServiceTimeDtoFilterInput>;
}>;

export type DisabledServiceTimeQuery = {
  __typename?: "Query";
  disabledServiceTime_getAll: {
    __typename?: "ListResponseBaseOfDisabledServiceTimeDto";
    status?: any | null;
    result?: {
      __typename?: "DisabledServiceTimeDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "DisabledServiceTimeDto";
        time: any;
        id: any;
      }> | null;
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
        activeBanner?: {
          __typename?: "BannerDto";
          imageUrl: string;
          id: any;
          title: string;
        } | null;
        activeCarousel?: {
          __typename?: "CarouselDto";
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

export type Banner_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BannerDtoFilterInput>;
  order?: InputMaybe<Array<BannerDtoSortInput> | BannerDtoSortInput>;
}>;

export type Banner_GetAllQuery = {
  __typename?: "Query";
  banner_getAll: {
    __typename?: "ListResponseBaseOfBannerDto";
    status?: any | null;
    result?: {
      __typename?: "BannerDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "BannerDto";
        id: any;
        imageUrl: string;
        title: string;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type ServiceRequest_AcceptMutationVariables = Exact<{
  input: AcceptServiceRequestInput;
}>;

export type ServiceRequest_AcceptMutation = {
  __typename?: "Mutation";
  serviceRequest_accept: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
  };
};

export type ServiceRequest_CancelMutationVariables = Exact<{
  input: CancelServiceRequestInput;
}>;

export type ServiceRequest_CancelMutation = {
  __typename?: "Mutation";
  serviceRequest_cancel: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
  };
};

export type ServiceRequest_RejectMutationVariables = Exact<{
  input: RejectServiceRequestInput;
}>;

export type ServiceRequest_RejectMutation = {
  __typename?: "Mutation";
  serviceRequest_reject: {
    __typename?: "ResponseBaseOfRejectedServiceRequestDto";
    status?: any | null;
  };
};

export type ServiceRequest_MarkAsArrivedMutationVariables = Exact<{
  input: MarkAsArrivedInput;
}>;

export type ServiceRequest_MarkAsArrivedMutation = {
  __typename?: "Mutation";
  serviceRequest_markAsArrived: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
  };
};

export type ServiceRequest_CompleteServiceMutationVariables = Exact<{
  input: CompleteServiceInput;
}>;

export type ServiceRequest_CompleteServiceMutation = {
  __typename?: "Mutation";
  serviceRequest_completeService: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
  };
};

export type Payment_Create_ZibalMutationVariables = Exact<{
  input: CreatePaymentInput;
}>;

export type Payment_Create_ZibalMutation = {
  __typename?: "Mutation";
  payment_create_zibal: {
    __typename?: "ResponseBaseOfPaymentDto";
    status?: any | null;
    result?: {
      __typename?: "PaymentDto";
      id: any;
      paymentUrl?: string | null;
    } | null;
  };
};

export type ServiceRequest_ApplyDiscountMutationVariables = Exact<{
  input: ApplyDiscountCodeToServiceRequestInput;
}>;

export type ServiceRequest_ApplyDiscountMutation = {
  __typename?: "Mutation";
  serviceRequest_applyDiscount: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceRequestDto";
      id: any;
      basePrice: any;
      finalPrice: any;
    } | null;
  };
};

export type ServiceRequest_RemoveDiscountMutationVariables = Exact<{
  input: RemoveDiscountCodeFromServiceRequestInput;
}>;

export type ServiceRequest_RemoveDiscountMutation = {
  __typename?: "Mutation";
  serviceRequest_removeDiscount: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceRequestDto";
      id: any;
      basePrice: any;
      finalPrice: any;
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
        basePrice: any;
        finalPrice: any;
        description?: string | null;
        id: any;
        requestDate: any;
        status: ServiceRequestStatus;
        address: { __typename?: "AddressDto"; text: string };
        customer: {
          __typename?: "CustomerDto";
          lastName?: string | null;
          firstName?: string | null;
          phoneNumber: string;
        };
        serviceType: { __typename?: "ServiceTypeDto"; name: string; id: any };
        specialist?: {
          __typename?: "SpecialistDto";
          lastName?: string | null;
          firstName?: string | null;
          id: any;
          profileImageUrl?: string | null;
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
        finalPrice: any;
        description?: string | null;
        requestDate: any;
        id: any;
        status: ServiceRequestStatus;
        address: {
          __typename?: "AddressDto";
          text: string;
          latitude: number;
          longitude: number;
          city: { __typename?: "CityDto"; name: string; id: any };
        };
        cancellationReason?: {
          __typename?: "CancellationReasonDto";
          id: any;
          name: string;
        } | null;
        customer: {
          __typename?: "CustomerDto";
          firstName?: string | null;
          lastName?: string | null;
          phoneNumber: string;
          profileImageUrl?: string | null;
          id: any;
          gender: Gender;
        };
        serviceType: {
          __typename?: "ServiceTypeDto";
          name: string;
          id: any;
          logo: string;
        };
        specialist?: {
          __typename?: "SpecialistDto";
          lastName?: string | null;
          firstName?: string | null;
          id: any;
          profileImageUrl?: string | null;
          rateCount: number;
          phoneNumber: string;
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

export type ServiceRequest_GetMyAcceptancesIncomQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDtoFilterInput>;
  order?: InputMaybe<
    Array<ServiceRequestDtoSortInput> | ServiceRequestDtoSortInput
  >;
}>;

export type ServiceRequest_GetMyAcceptancesIncomQuery = {
  __typename?: "Query";
  serviceRequest_getMyAcceptances: {
    __typename?: "ListResponseBaseOfServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceRequestDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "ServiceRequestDto";
        finalPrice: any;
        paidAt?: any | null;
        id: any;
        customer: {
          __typename?: "CustomerDto";
          firstName?: string | null;
          lastName?: string | null;
          phoneNumber: string;
        };
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
  input: GetServiceRequestByIdInput;
}>;

export type ServiceRequest_GetByIdQuery = {
  __typename?: "Query";
  serviceRequest_getById: {
    __typename?: "SingleResponseBaseOfServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceRequestDto";
      finalPrice: any;
      basePrice: any;
      discountAmount: any;
      description?: string | null;
      requestDate: any;
      id: any;
      status: ServiceRequestStatus;
      address: {
        __typename?: "AddressDto";
        text: string;
        latitude: number;
        longitude: number;
        city: { __typename?: "CityDto"; name: string; id: any };
      };
      cancellationReason?: {
        __typename?: "CancellationReasonDto";
        id: any;
        name: string;
      } | null;
      customer: {
        __typename?: "CustomerDto";
        firstName?: string | null;
        lastName?: string | null;
        phoneNumber: string;
        profileImageUrl?: string | null;
        id: any;
        gender: Gender;
      };
      serviceType: {
        __typename?: "ServiceTypeDto";
        name: string;
        id: any;
        logo: string;
      };
      specialist?: {
        __typename?: "SpecialistDto";
        lastName?: string | null;
        firstName?: string | null;
        id: any;
        profileImageUrl?: string | null;
        rateCount: number;
        phoneNumber: string;
        successfulMissions: number;
      } | null;
    } | null;
  };
};

export type CancellationReason_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CancellationReasonDtoFilterInput>;
  order?: InputMaybe<
    Array<CancellationReasonDtoSortInput> | CancellationReasonDtoSortInput
  >;
}>;

export type CancellationReason_GetAllQuery = {
  __typename?: "Query";
  cancellationReason_getAll: {
    __typename?: "ListResponseBaseOfCancellationReasonDto";
    status?: any | null;
    result?: {
      __typename?: "CancellationReasonDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "CancellationReasonDto";
        id: any;
        name: string;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type Payment_GetMyPaymentsQueryVariables = Exact<{
  where?: InputMaybe<PaymentDtoFilterInput>;
  order?: InputMaybe<Array<PaymentDtoSortInput> | PaymentDtoSortInput>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type Payment_GetMyPaymentsQuery = {
  __typename?: "Query";
  payment_getMyPayments: {
    __typename?: "ListResponseBaseOfPaymentDto";
    status?: any | null;
    result?: {
      __typename?: "PaymentDtoCollectionSegment";
      totalCount: number;
      items?: Array<{
        __typename?: "PaymentDto";
        amount: any;
        id: any;
        serviceRequest: {
          __typename?: "ServiceRequestDto";
          requestDate: any;
          customer: { __typename?: "CustomerDto"; phoneNumber: string };
        };
      }> | null;
    } | null;
  };
};

export type Revenue_GetMyRevenueQueryVariables = Exact<{
  daySD: Scalars["DateTime"]["input"];
  dayED: Scalars["DateTime"]["input"];
}>;

export type Revenue_GetMyRevenueQuery = {
  __typename?: "Query";
  revenue_getMyRevenue: {
    __typename?: "ResponseBaseOfSpecialistRevenueDto";
    status?: any | null;
    result?: { __typename?: "SpecialistRevenueDto"; totalAmount: any } | null;
  };
};

export type GetMyRevenueQueryVariables = Exact<{
  input: GetMyRevenueInput;
}>;

export type GetMyRevenueQuery = {
  __typename?: "Query";
  revenue_getMyRevenue: {
    __typename?: "ResponseBaseOfSpecialistRevenueDto";
    status?: any | null;
    result?: {
      __typename?: "SpecialistRevenueDto";
      totalAmount: any;
      unsettledAmount: any;
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
  input: GetServiceCategoryByIdInput;
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

export type CreateRequestMutationVariables = Exact<{
  input: CreateServiceRequestInput;
}>;

export type CreateRequestMutation = {
  __typename?: "Mutation";
  serviceRequest_create: {
    __typename?: "ResponseBaseOfServiceRequestDto";
    status?: any | null;
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
        serviceCategory: {
          __typename?: "ServiceCategoryDto";
          id: any;
          name: string;
        };
      }> | null;
    } | null;
  };
};

export type ServiceSubCategory_GetByIdQueryVariables = Exact<{
  input: GetServiceSubCategoryByIdInput;
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
      serviceCategory: {
        __typename?: "ServiceCategoryDto";
        id: any;
        name: string;
      };
    } | null;
  };
};

export type ServiceTypeQuestion_GetByServiceTypeQueryVariables = Exact<{
  input: GetServiceTypeQuestionsByServiceTypeInput;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type ServiceTypeQuestion_GetByServiceTypeQuery = {
  __typename?: "Query";
  serviceTypeQuestion_getByServiceType: {
    __typename?: "ListResponseBaseOfServiceTypeQuestionDto";
    status?: any | null;
    result?: {
      __typename?: "ServiceTypeQuestionDtoCollectionSegment";
      items?: Array<{
        __typename?: "ServiceTypeQuestionDto";
        id: any;
        text: string;
        options: Array<string>;
        questionType: QuestionType;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
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
        basePrice: any;
        serviceSubCategory: {
          __typename?: "ServiceSubCategoryDto";
          id: any;
          name: string;
        };
      }> | null;
    } | null;
  };
};

export type ServiceRequest_GetAvailableRequestsQueryVariables = Exact<{
  input: GetAvailableRequestsInput;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<
    | Array<AvailableServiceRequestDtoSortInput>
    | AvailableServiceRequestDtoSortInput
  >;
  where?: InputMaybe<AvailableServiceRequestDtoFilterInput>;
}>;

export type ServiceRequest_GetAvailableRequestsQuery = {
  __typename?: "Query";
  serviceRequest_getAvailableRequests: {
    __typename?: "ListResponseBaseOfAvailableServiceRequestDto";
    status?: any | null;
    result?: {
      __typename?: "AvailableServiceRequestDtoCollectionSegment";
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: "AvailableServiceRequestDto";
        finalPrice: any;
        description?: string | null;
        requestDate: any;
        id: any;
        status: ServiceRequestStatus;
        address: {
          __typename?: "AddressDto";
          text: string;
          latitude: number;
          longitude: number;
          city: { __typename?: "CityDto"; id: any; name: string };
        };
        cancellationReason?: {
          __typename?: "CancellationReasonDto";
          id: any;
          name: string;
        } | null;
        customer: {
          __typename?: "CustomerDto";
          firstName?: string | null;
          lastName?: string | null;
          phoneNumber: string;
          profileImageUrl?: string | null;
          id: any;
          gender: Gender;
        };
        serviceType: {
          __typename?: "ServiceTypeDto";
          name: string;
          id: any;
          logo: string;
        };
        specialist?: {
          __typename?: "SpecialistDto";
          lastName?: string | null;
          firstName?: string | null;
          id: any;
          profileImageUrl?: string | null;
          rateCount: number;
          phoneNumber: string;
        } | null;
      }> | null;
    } | null;
  };
};

export type ServiceTypes_GetPopularQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<
    Array<PopularServiceTypeDtoSortInput> | PopularServiceTypeDtoSortInput
  >;
  where?: InputMaybe<PopularServiceTypeDtoFilterInput>;
}>;

export type ServiceTypes_GetPopularQuery = {
  __typename?: "Query";
  serviceTypes_getPopular: {
    __typename?: "ListResponseBaseOfPopularServiceTypeDto";
    status?: any | null;
    result?: {
      __typename?: "PopularServiceTypeDtoCollectionSegment";
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
      items?: Array<{
        __typename?: "PopularServiceTypeDto";
        name: string;
        logo: string;
        id: any;
        basePrice: any;
        requestCount: number;
        serviceSubCategory: {
          __typename?: "ServiceSubCategoryDto";
          id: any;
          name: string;
        };
      }> | null;
    } | null;
  };
};

export type S3_CompleteMultipartUploadMutationVariables = Exact<{
  input: CompleteMultipartUploadInput;
}>;

export type S3_CompleteMultipartUploadMutation = {
  __typename?: "Mutation";
  s3_completeMultipartUpload: {
    __typename?: "ResponseBase";
    status?: any | null;
  };
};

export type S3_GeneratePresignedUrlMutationVariables = Exact<{
  input: GeneratePresignedUrlInput;
}>;

export type S3_GeneratePresignedUrlMutation = {
  __typename?: "Mutation";
  s3_generatePresignedUrl: {
    __typename?: "ResponseBaseOfS3SinglepartUploadUrlsResultDto";
    status?: any | null;
    result?: {
      __typename?: "S3SinglepartUploadUrlsResultDto";
      objectUrl: string;
      presignedUrl: string;
    } | null;
  };
};

export type S3_GeneratePresignedUrlsMutationVariables = Exact<{
  input: GenerateMultipartPresignedUrlsInput;
}>;

export type S3_GeneratePresignedUrlsMutation = {
  __typename?: "Mutation";
  s3_generatePresignedUrls: {
    __typename?: "ResponseBaseOfS3MultipartUploadUrlsResultDto";
    status?: any | null;
    result?: {
      __typename?: "S3MultipartUploadUrlsResultDto";
      objectUrl: string;
      presignedUrls: Array<string>;
      uploadId: string;
    } | null;
  };
};

export type User_UpdateProfileMutationVariables = Exact<{
  input: UpdateUserProfileInput;
}>;

export type User_UpdateProfileMutation = {
  __typename?: "Mutation";
  user_updateProfile: {
    __typename?: "ResponseBaseOfUserProfileDto";
    status?: any | null;
    result?: { __typename?: "UserProfileDto"; id: any } | null;
  };
};

export type Specialist_UpdateSpecializedDocumentsMutationVariables = Exact<{
  input: UpdateSpecializedDocumentsInput;
}>;

export type Specialist_UpdateSpecializedDocumentsMutation = {
  __typename?: "Mutation";
  specialist_updateSpecializedDocuments: {
    __typename?: "ResponseBase";
    status?: any | null;
  };
};

export type Specialist_UpdateIdentityVerificationVideoMutationVariables =
  Exact<{
    input: UpdateIdentityVerificationVideoInput;
  }>;

export type Specialist_UpdateIdentityVerificationVideoMutation = {
  __typename?: "Mutation";
  specialist_updateIdentityVerificationVideo: {
    __typename?: "ResponseBase";
    status?: any | null;
  };
};

export type Specialist_SetPersonalInformationMutationVariables = Exact<{
  input: SetPersonalInformationInput;
}>;

export type Specialist_SetPersonalInformationMutation = {
  __typename?: "Mutation";
  specialist_setPersonalInformation: {
    __typename?: "ResponseBase";
    status?: any | null;
  };
};

export type Specialist_SetLocationAndSpecialtyMutationVariables = Exact<{
  input: SetLocationAndSpecialtyInput;
}>;

export type Specialist_SetLocationAndSpecialtyMutation = {
  __typename?: "Mutation";
  specialist_setLocationAndSpecialty: {
    __typename?: "ResponseBase";
    status?: any | null;
  };
};

export type RateAndReview_CreateMutationVariables = Exact<{
  input: CreateRateAndReviewInput;
}>;

export type RateAndReview_CreateMutation = {
  __typename?: "Mutation";
  rateAndReview_create: {
    __typename?: "ResponseBaseOfRateAndReviewDto";
    status?: any | null;
  };
};

export type Address_SetPrimaryMutationVariables = Exact<{
  input: SetPrimaryAddressInput;
}>;

export type Address_SetPrimaryMutation = {
  __typename?: "Mutation";
  address_setPrimary: { __typename?: "ResponseBase"; status?: any | null };
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
      firstName?: string | null;
      gender: Gender;
      lastName?: string | null;
      profileImageUrl?: string | null;
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
        isPrimary: boolean;
        floorNumber: number;
        buildingNumber: number;
        unitNumber: number;
        text: string;
        city: { __typename?: "CityDto"; name: string; id: any };
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type DiscountCode_GetMyCodesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DiscountCodeDtoFilterInput>;
  order?: InputMaybe<
    Array<DiscountCodeDtoSortInput> | DiscountCodeDtoSortInput
  >;
}>;

export type DiscountCode_GetMyCodesQuery = {
  __typename?: "Query";
  discountCode_getMyCodes: {
    __typename?: "ListResponseBaseOfDiscountCodeDto";
    status?: any | null;
    result?: {
      __typename?: "DiscountCodeDtoCollectionSegment";
      items?: Array<{
        __typename?: "DiscountCodeDto";
        id: any;
        amount: any;
        code: string;
        expiryDate?: any | null;
        isActive: boolean;
        isPercentage: boolean;
        title: string;
        isUsed: boolean;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type Specialist_GetMyProfileQueryVariables = Exact<{
  [key: string]: never;
}>;

export type Specialist_GetMyProfileQuery = {
  __typename?: "Query";
  specialist_getMyProfile: {
    __typename?: "ResponseBaseOfSpecialistDto";
    status?: any | null;
    result?: {
      __typename?: "SpecialistDto";
      averageRating: number;
      rateCount: number;
      birthDate: any;
      id: any;
      firstName?: string | null;
      lastName?: string | null;
      gender: Gender;
      nationalCode?: string | null;
      profileImageUrl?: string | null;
      idCardImageUrl?: string | null;
      daysRegistered: number;
      phoneNumber: string;
      successfulMissions: number;
      idCardVerificationStatus: VerificationStatus;
      identityVerificationVideoStatus: VerificationStatus;
      identityVerificationVideoUrl?: string | null;
      specializedDocumentsVerificationStatus: VerificationStatus;
      specializedDocumentUrls?: Array<string> | null;
      city?: {
        __typename?: "CityDto";
        id: any;
        name: string;
        province: { __typename?: "ProvinceDto"; id: any; name: string };
      } | null;
      serviceSubCategory?: {
        __typename?: "ServiceSubCategoryDto";
        id: any;
        logo: string;
        name: string;
        serviceCategory: {
          __typename?: "ServiceCategoryDto";
          id: any;
          logo: string;
          name: string;
        };
      } | null;
      serviceTypes: Array<{
        __typename?: "ServiceTypeDto";
        id: any;
        logo: string;
        name: string;
      }>;
    } | null;
  };
};

export type Province_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ProvinceDtoFilterInput>;
  order?: InputMaybe<Array<ProvinceDtoSortInput> | ProvinceDtoSortInput>;
}>;

export type Province_GetAllQuery = {
  __typename?: "Query";
  province_getAll: {
    __typename?: "ListResponseBaseOfProvinceDto";
    status?: any | null;
    result?: {
      __typename?: "ProvinceDtoCollectionSegment";
      items?: Array<{
        __typename?: "ProvinceDto";
        id: any;
        name: string;
      }> | null;
      pageInfo: {
        __typename?: "CollectionSegmentInfo";
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  };
};

export type Specialist_GetAllQueryVariables = Exact<{
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<SpecialistDtoFilterInput>;
  order?: InputMaybe<Array<SpecialistDtoSortInput> | SpecialistDtoSortInput>;
}>;

export type Specialist_GetAllQuery = {
  __typename?: "Query";
  specialist_getAll: {
    __typename?: "ListResponseBaseOfSpecialistDto";
    status?: any | null;
    result?: {
      __typename?: "SpecialistDtoCollectionSegment";
      items?: Array<{
        __typename?: "SpecialistDto";
        id: any;
        firstName?: string | null;
        lastName?: string | null;
        profileImageUrl?: string | null;
        serviceSubCategory?: {
          __typename?: "ServiceSubCategoryDto";
          id: any;
          logo: string;
          name: string;
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

export type Address_GetAddressByIdQueryVariables = Exact<{
  input: GetAddressByIdInput;
}>;

export type Address_GetAddressByIdQuery = {
  __typename?: "Query";
  address_getAddressById: {
    __typename?: "SingleResponseBaseOfAddressDto";
    result?: {
      __typename?: "AddressDto";
      id: any;
      latitude: number;
      longitude: number;
      isPrimary: boolean;
      floorNumber: number;
      buildingNumber: number;
      unitNumber: number;
      text: string;
      city: { __typename?: "CityDto"; name: string; id: any };
    } | null;
  };
};

export const Address_CreateDocument = `
    mutation address_create($input: AddAddressInput!) {
  address_create(input: $input) {
    status
  }
}
    `;

export const useAddress_CreateMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Address_CreateMutation,
    TError,
    Address_CreateMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Address_CreateMutation,
    TError,
    Address_CreateMutationVariables,
    TContext
  >({
    mutationKey: ["address_create"],
    mutationFn: (variables?: Address_CreateMutationVariables) =>
      fetcher<Address_CreateMutation, Address_CreateMutationVariables>(
        Address_CreateDocument,
        variables,
      )(),
    ...options,
  });
};

export const Address_UpdateDocument = `
    mutation address_update($input: UpdateAddressInput!) {
  address_update(input: $input) {
    status
  }
}
    `;

export const useAddress_UpdateMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Address_UpdateMutation,
    TError,
    Address_UpdateMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Address_UpdateMutation,
    TError,
    Address_UpdateMutationVariables,
    TContext
  >({
    mutationKey: ["address_update"],
    mutationFn: (variables?: Address_UpdateMutationVariables) =>
      fetcher<Address_UpdateMutation, Address_UpdateMutationVariables>(
        Address_UpdateDocument,
        variables,
      )(),
    ...options,
  });
};

export const Address_DeleteDocument = `
    mutation address_delete($input: DeleteAddressInput!) {
  address_delete(input: $input) {
    status
  }
}
    `;

export const useAddress_DeleteMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Address_DeleteMutation,
    TError,
    Address_DeleteMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Address_DeleteMutation,
    TError,
    Address_DeleteMutationVariables,
    TContext
  >({
    mutationKey: ["address_delete"],
    mutationFn: (variables?: Address_DeleteMutationVariables) =>
      fetcher<Address_DeleteMutation, Address_DeleteMutationVariables>(
        Address_DeleteDocument,
        variables,
      )(),
    ...options,
  });
};

export const Auth_RequestOtpDocument = `
    mutation auth_requestOtp($input: RequestOtpInput!) {
  auth_requestOtp(input: $input) {
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
    mutation auth_verifyOtp($input: VerifyOtpInput!) {
  auth_verifyOtp(input: $input) {
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
    mutation auth_refreshToken($input: RefreshTokenRequestInput!) {
  auth_refreshToken(input: $input) {
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

export const City_GetAvailableServiceCategoriesDocument = `
    query city_getAvailableServiceCategories($input: GetAvailableServiceCategoriesForCityInput!, $skip: Int, $take: Int, $where: ServiceCategoryDtoFilterInput, $order: [ServiceCategoryDtoSortInput!]) {
  city_getAvailableServiceCategories(input: $input) {
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

export const useCity_GetAvailableServiceCategoriesQuery = <
  TData = City_GetAvailableServiceCategoriesQuery,
  TError = unknown,
>(
  variables: City_GetAvailableServiceCategoriesQueryVariables,
  options?: Omit<
    UseQueryOptions<City_GetAvailableServiceCategoriesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      City_GetAvailableServiceCategoriesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<City_GetAvailableServiceCategoriesQuery, TError, TData>({
    queryKey: ["city_getAvailableServiceCategories", variables],
    queryFn: fetcher<
      City_GetAvailableServiceCategoriesQuery,
      City_GetAvailableServiceCategoriesQueryVariables
    >(City_GetAvailableServiceCategoriesDocument, variables),
    ...options,
  });
};

export const useInfiniteCity_GetAvailableServiceCategoriesQuery = <
  TData = InfiniteData<City_GetAvailableServiceCategoriesQuery>,
  TError = unknown,
>(
  variables: City_GetAvailableServiceCategoriesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      City_GetAvailableServiceCategoriesQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      City_GetAvailableServiceCategoriesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    City_GetAvailableServiceCategoriesQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "city_getAvailableServiceCategories.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            City_GetAvailableServiceCategoriesQuery,
            City_GetAvailableServiceCategoriesQueryVariables
          >(City_GetAvailableServiceCategoriesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const City_GetAvailableServiceSubCategoriesDocument = `
    query city_getAvailableServiceSubCategories($input: GetAvailableServiceSubCategoriesForCityInput!, $skip: Int, $take: Int, $order: [ServiceSubCategoryDtoSortInput!], $where: ServiceSubCategoryDtoFilterInput) {
  city_getAvailableServiceSubCategories(input: $input) {
    result(skip: $skip, take: $take, order: $order, where: $where) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        logo
        name
        serviceCategory {
          id
          name
        }
      }
    }
    status
  }
}
    `;

export const useCity_GetAvailableServiceSubCategoriesQuery = <
  TData = City_GetAvailableServiceSubCategoriesQuery,
  TError = unknown,
>(
  variables: City_GetAvailableServiceSubCategoriesQueryVariables,
  options?: Omit<
    UseQueryOptions<City_GetAvailableServiceSubCategoriesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      City_GetAvailableServiceSubCategoriesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<City_GetAvailableServiceSubCategoriesQuery, TError, TData>({
    queryKey: ["city_getAvailableServiceSubCategories", variables],
    queryFn: fetcher<
      City_GetAvailableServiceSubCategoriesQuery,
      City_GetAvailableServiceSubCategoriesQueryVariables
    >(City_GetAvailableServiceSubCategoriesDocument, variables),
    ...options,
  });
};

export const useInfiniteCity_GetAvailableServiceSubCategoriesQuery = <
  TData = InfiniteData<City_GetAvailableServiceSubCategoriesQuery>,
  TError = unknown,
>(
  variables: City_GetAvailableServiceSubCategoriesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      City_GetAvailableServiceSubCategoriesQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      City_GetAvailableServiceSubCategoriesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    City_GetAvailableServiceSubCategoriesQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "city_getAvailableServiceSubCategories.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            City_GetAvailableServiceSubCategoriesQuery,
            City_GetAvailableServiceSubCategoriesQueryVariables
          >(City_GetAvailableServiceSubCategoriesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const DisabledServiceTimeDocument = `
    query disabledServiceTime($skip: Int, $take: Int, $where: DisabledServiceTimeDtoFilterInput) {
  disabledServiceTime_getAll {
    result(skip: $skip, take: $take, where: $where) {
      totalCount
      items {
        time
        id
      }
    }
    status
  }
}
    `;

export const useDisabledServiceTimeQuery = <
  TData = DisabledServiceTimeQuery,
  TError = unknown,
>(
  variables?: DisabledServiceTimeQueryVariables,
  options?: Omit<
    UseQueryOptions<DisabledServiceTimeQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      DisabledServiceTimeQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<DisabledServiceTimeQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["disabledServiceTime"]
        : ["disabledServiceTime", variables],
    queryFn: fetcher<
      DisabledServiceTimeQuery,
      DisabledServiceTimeQueryVariables
    >(DisabledServiceTimeDocument, variables),
    ...options,
  });
};

export const useInfiniteDisabledServiceTimeQuery = <
  TData = InfiniteData<DisabledServiceTimeQuery>,
  TError = unknown,
>(
  variables: DisabledServiceTimeQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<DisabledServiceTimeQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      DisabledServiceTimeQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<DisabledServiceTimeQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["disabledServiceTime.infinite"]
            : ["disabledServiceTime.infinite", variables],
        queryFn: (metaData) =>
          fetcher<DisabledServiceTimeQuery, DisabledServiceTimeQueryVariables>(
            DisabledServiceTimeDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
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
        activeBanner {
          imageUrl
          id
          title
        }
        activeCarousel {
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

export const Banner_GetAllDocument = `
    query banner_getAll($skip: Int, $take: Int, $where: BannerDtoFilterInput, $order: [BannerDtoSortInput!]) {
  banner_getAll {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        imageUrl
        title
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

export const useBanner_GetAllQuery = <
  TData = Banner_GetAllQuery,
  TError = unknown,
>(
  variables?: Banner_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<Banner_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<Banner_GetAllQuery, TError, TData>["queryKey"];
  },
) => {
  return useQuery<Banner_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["banner_getAll"]
        : ["banner_getAll", variables],
    queryFn: fetcher<Banner_GetAllQuery, Banner_GetAllQueryVariables>(
      Banner_GetAllDocument,
      variables,
    ),
    ...options,
  });
};

export const useInfiniteBanner_GetAllQuery = <
  TData = InfiniteData<Banner_GetAllQuery>,
  TError = unknown,
>(
  variables: Banner_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Banner_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Banner_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Banner_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["banner_getAll.infinite"]
            : ["banner_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<Banner_GetAllQuery, Banner_GetAllQueryVariables>(
            Banner_GetAllDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceRequest_AcceptDocument = `
    mutation serviceRequest_accept($input: AcceptServiceRequestInput!) {
  serviceRequest_accept(input: $input) {
    status
  }
}
    `;

export const useServiceRequest_AcceptMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ServiceRequest_AcceptMutation,
    TError,
    ServiceRequest_AcceptMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ServiceRequest_AcceptMutation,
    TError,
    ServiceRequest_AcceptMutationVariables,
    TContext
  >({
    mutationKey: ["serviceRequest_accept"],
    mutationFn: (variables?: ServiceRequest_AcceptMutationVariables) =>
      fetcher<
        ServiceRequest_AcceptMutation,
        ServiceRequest_AcceptMutationVariables
      >(ServiceRequest_AcceptDocument, variables)(),
    ...options,
  });
};

export const ServiceRequest_CancelDocument = `
    mutation serviceRequest_cancel($input: CancelServiceRequestInput!) {
  serviceRequest_cancel(input: $input) {
    status
  }
}
    `;

export const useServiceRequest_CancelMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ServiceRequest_CancelMutation,
    TError,
    ServiceRequest_CancelMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ServiceRequest_CancelMutation,
    TError,
    ServiceRequest_CancelMutationVariables,
    TContext
  >({
    mutationKey: ["serviceRequest_cancel"],
    mutationFn: (variables?: ServiceRequest_CancelMutationVariables) =>
      fetcher<
        ServiceRequest_CancelMutation,
        ServiceRequest_CancelMutationVariables
      >(ServiceRequest_CancelDocument, variables)(),
    ...options,
  });
};

export const ServiceRequest_RejectDocument = `
    mutation serviceRequest_reject($input: RejectServiceRequestInput!) {
  serviceRequest_reject(input: $input) {
    status
  }
}
    `;

export const useServiceRequest_RejectMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ServiceRequest_RejectMutation,
    TError,
    ServiceRequest_RejectMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ServiceRequest_RejectMutation,
    TError,
    ServiceRequest_RejectMutationVariables,
    TContext
  >({
    mutationKey: ["serviceRequest_reject"],
    mutationFn: (variables?: ServiceRequest_RejectMutationVariables) =>
      fetcher<
        ServiceRequest_RejectMutation,
        ServiceRequest_RejectMutationVariables
      >(ServiceRequest_RejectDocument, variables)(),
    ...options,
  });
};

export const ServiceRequest_MarkAsArrivedDocument = `
    mutation serviceRequest_markAsArrived($input: MarkAsArrivedInput!) {
  serviceRequest_markAsArrived(input: $input) {
    status
  }
}
    `;

export const useServiceRequest_MarkAsArrivedMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ServiceRequest_MarkAsArrivedMutation,
    TError,
    ServiceRequest_MarkAsArrivedMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ServiceRequest_MarkAsArrivedMutation,
    TError,
    ServiceRequest_MarkAsArrivedMutationVariables,
    TContext
  >({
    mutationKey: ["serviceRequest_markAsArrived"],
    mutationFn: (variables?: ServiceRequest_MarkAsArrivedMutationVariables) =>
      fetcher<
        ServiceRequest_MarkAsArrivedMutation,
        ServiceRequest_MarkAsArrivedMutationVariables
      >(ServiceRequest_MarkAsArrivedDocument, variables)(),
    ...options,
  });
};

export const ServiceRequest_CompleteServiceDocument = `
    mutation serviceRequest_completeService($input: CompleteServiceInput!) {
  serviceRequest_completeService(input: $input) {
    status
  }
}
    `;

export const useServiceRequest_CompleteServiceMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ServiceRequest_CompleteServiceMutation,
    TError,
    ServiceRequest_CompleteServiceMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ServiceRequest_CompleteServiceMutation,
    TError,
    ServiceRequest_CompleteServiceMutationVariables,
    TContext
  >({
    mutationKey: ["serviceRequest_completeService"],
    mutationFn: (variables?: ServiceRequest_CompleteServiceMutationVariables) =>
      fetcher<
        ServiceRequest_CompleteServiceMutation,
        ServiceRequest_CompleteServiceMutationVariables
      >(ServiceRequest_CompleteServiceDocument, variables)(),
    ...options,
  });
};

export const Payment_Create_ZibalDocument = `
    mutation payment_create_zibal($input: CreatePaymentInput!) {
  payment_create_zibal(input: $input) {
    status
    result {
      id
      paymentUrl
    }
  }
}
    `;

export const usePayment_Create_ZibalMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Payment_Create_ZibalMutation,
    TError,
    Payment_Create_ZibalMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Payment_Create_ZibalMutation,
    TError,
    Payment_Create_ZibalMutationVariables,
    TContext
  >({
    mutationKey: ["payment_create_zibal"],
    mutationFn: (variables?: Payment_Create_ZibalMutationVariables) =>
      fetcher<
        Payment_Create_ZibalMutation,
        Payment_Create_ZibalMutationVariables
      >(Payment_Create_ZibalDocument, variables)(),
    ...options,
  });
};

export const ServiceRequest_ApplyDiscountDocument = `
    mutation serviceRequest_applyDiscount($input: ApplyDiscountCodeToServiceRequestInput!) {
  serviceRequest_applyDiscount(input: $input) {
    status
    result {
      id
      basePrice
      finalPrice
    }
  }
}
    `;

export const useServiceRequest_ApplyDiscountMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ServiceRequest_ApplyDiscountMutation,
    TError,
    ServiceRequest_ApplyDiscountMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ServiceRequest_ApplyDiscountMutation,
    TError,
    ServiceRequest_ApplyDiscountMutationVariables,
    TContext
  >({
    mutationKey: ["serviceRequest_applyDiscount"],
    mutationFn: (variables?: ServiceRequest_ApplyDiscountMutationVariables) =>
      fetcher<
        ServiceRequest_ApplyDiscountMutation,
        ServiceRequest_ApplyDiscountMutationVariables
      >(ServiceRequest_ApplyDiscountDocument, variables)(),
    ...options,
  });
};

export const ServiceRequest_RemoveDiscountDocument = `
    mutation serviceRequest_removeDiscount($input: RemoveDiscountCodeFromServiceRequestInput!) {
  serviceRequest_removeDiscount(input: $input) {
    status
    result {
      id
      basePrice
      finalPrice
    }
  }
}
    `;

export const useServiceRequest_RemoveDiscountMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    ServiceRequest_RemoveDiscountMutation,
    TError,
    ServiceRequest_RemoveDiscountMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    ServiceRequest_RemoveDiscountMutation,
    TError,
    ServiceRequest_RemoveDiscountMutationVariables,
    TContext
  >({
    mutationKey: ["serviceRequest_removeDiscount"],
    mutationFn: (variables?: ServiceRequest_RemoveDiscountMutationVariables) =>
      fetcher<
        ServiceRequest_RemoveDiscountMutation,
        ServiceRequest_RemoveDiscountMutationVariables
      >(ServiceRequest_RemoveDiscountDocument, variables)(),
    ...options,
  });
};

export const ServiceRequest_GetMyRequestsDocument = `
    query serviceRequest_getMyRequests($skip: Int, $take: Int, $where: ServiceRequestDtoFilterInput, $order: [ServiceRequestDtoSortInput!]) {
  serviceRequest_getMyRequests {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        address {
          text
        }
        basePrice
        finalPrice
        customer {
          lastName
          firstName
          phoneNumber
        }
        description
        id
        requestDate
        status
        serviceType {
          name
          id
        }
        specialist {
          lastName
          firstName
          id
          profileImageUrl
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
        address {
          text
          latitude
          longitude
          city {
            name
            id
          }
        }
        finalPrice
        cancellationReason {
          id
          name
        }
        customer {
          firstName
          lastName
          phoneNumber
          profileImageUrl
          id
          gender
        }
        description
        requestDate
        id
        serviceType {
          name
          id
          logo
        }
        specialist {
          lastName
          firstName
          id
          profileImageUrl
          rateCount
          phoneNumber
        }
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

export const ServiceRequest_GetMyAcceptancesIncomDocument = `
    query serviceRequest_getMyAcceptancesIncom($skip: Int, $take: Int, $where: ServiceRequestDtoFilterInput, $order: [ServiceRequestDtoSortInput!]) {
  serviceRequest_getMyAcceptances {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        finalPrice
        customer {
          firstName
          lastName
          phoneNumber
        }
        paidAt
        id
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

export const useServiceRequest_GetMyAcceptancesIncomQuery = <
  TData = ServiceRequest_GetMyAcceptancesIncomQuery,
  TError = unknown,
>(
  variables?: ServiceRequest_GetMyAcceptancesIncomQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceRequest_GetMyAcceptancesIncomQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceRequest_GetMyAcceptancesIncomQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceRequest_GetMyAcceptancesIncomQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceRequest_getMyAcceptancesIncom"]
        : ["serviceRequest_getMyAcceptancesIncom", variables],
    queryFn: fetcher<
      ServiceRequest_GetMyAcceptancesIncomQuery,
      ServiceRequest_GetMyAcceptancesIncomQueryVariables
    >(ServiceRequest_GetMyAcceptancesIncomDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceRequest_GetMyAcceptancesIncomQuery = <
  TData = InfiniteData<ServiceRequest_GetMyAcceptancesIncomQuery>,
  TError = unknown,
>(
  variables: ServiceRequest_GetMyAcceptancesIncomQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceRequest_GetMyAcceptancesIncomQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceRequest_GetMyAcceptancesIncomQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    ServiceRequest_GetMyAcceptancesIncomQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceRequest_getMyAcceptancesIncom.infinite"]
            : ["serviceRequest_getMyAcceptancesIncom.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceRequest_GetMyAcceptancesIncomQuery,
            ServiceRequest_GetMyAcceptancesIncomQueryVariables
          >(ServiceRequest_GetMyAcceptancesIncomDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceRequest_GetByIdDocument = `
    query serviceRequest_getById($input: GetServiceRequestByIdInput!) {
  serviceRequest_getById(input: $input) {
    result {
      address {
        text
        latitude
        longitude
        city {
          name
          id
        }
      }
      finalPrice
      basePrice
      discountAmount
      cancellationReason {
        id
        name
      }
      customer {
        firstName
        lastName
        phoneNumber
        profileImageUrl
        id
        gender
      }
      description
      requestDate
      id
      serviceType {
        name
        id
        logo
      }
      specialist {
        lastName
        firstName
        id
        profileImageUrl
        rateCount
        phoneNumber
        successfulMissions
      }
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

export const CancellationReason_GetAllDocument = `
    query cancellationReason_getAll($skip: Int, $take: Int, $where: CancellationReasonDtoFilterInput, $order: [CancellationReasonDtoSortInput!]) {
  cancellationReason_getAll {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        name
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

export const useCancellationReason_GetAllQuery = <
  TData = CancellationReason_GetAllQuery,
  TError = unknown,
>(
  variables?: CancellationReason_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<CancellationReason_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      CancellationReason_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<CancellationReason_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["cancellationReason_getAll"]
        : ["cancellationReason_getAll", variables],
    queryFn: fetcher<
      CancellationReason_GetAllQuery,
      CancellationReason_GetAllQueryVariables
    >(CancellationReason_GetAllDocument, variables),
    ...options,
  });
};

export const useInfiniteCancellationReason_GetAllQuery = <
  TData = InfiniteData<CancellationReason_GetAllQuery>,
  TError = unknown,
>(
  variables: CancellationReason_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<CancellationReason_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      CancellationReason_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<CancellationReason_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["cancellationReason_getAll.infinite"]
            : ["cancellationReason_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            CancellationReason_GetAllQuery,
            CancellationReason_GetAllQueryVariables
          >(CancellationReason_GetAllDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const Payment_GetMyPaymentsDocument = `
    query payment_getMyPayments($where: PaymentDtoFilterInput, $order: [PaymentDtoSortInput!], $take: Int, $skip: Int) {
  payment_getMyPayments {
    result(where: $where, order: $order, skip: $skip, take: $take) {
      items {
        amount
        id
        serviceRequest {
          customer {
            phoneNumber
          }
          requestDate
        }
      }
      totalCount
    }
    status
  }
}
    `;

export const usePayment_GetMyPaymentsQuery = <
  TData = Payment_GetMyPaymentsQuery,
  TError = unknown,
>(
  variables?: Payment_GetMyPaymentsQueryVariables,
  options?: Omit<
    UseQueryOptions<Payment_GetMyPaymentsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      Payment_GetMyPaymentsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<Payment_GetMyPaymentsQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["payment_getMyPayments"]
        : ["payment_getMyPayments", variables],
    queryFn: fetcher<
      Payment_GetMyPaymentsQuery,
      Payment_GetMyPaymentsQueryVariables
    >(Payment_GetMyPaymentsDocument, variables),
    ...options,
  });
};

export const useInfinitePayment_GetMyPaymentsQuery = <
  TData = InfiniteData<Payment_GetMyPaymentsQuery>,
  TError = unknown,
>(
  variables: Payment_GetMyPaymentsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Payment_GetMyPaymentsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Payment_GetMyPaymentsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Payment_GetMyPaymentsQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["payment_getMyPayments.infinite"]
            : ["payment_getMyPayments.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            Payment_GetMyPaymentsQuery,
            Payment_GetMyPaymentsQueryVariables
          >(Payment_GetMyPaymentsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const Revenue_GetMyRevenueDocument = `
    query revenue_getMyRevenue($daySD: DateTime!, $dayED: DateTime!) {
  revenue_getMyRevenue(input: {startDate: $daySD, endDate: $dayED}) {
    status
    result {
      totalAmount
    }
  }
}
    `;

export const useRevenue_GetMyRevenueQuery = <
  TData = Revenue_GetMyRevenueQuery,
  TError = unknown,
>(
  variables: Revenue_GetMyRevenueQueryVariables,
  options?: Omit<
    UseQueryOptions<Revenue_GetMyRevenueQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      Revenue_GetMyRevenueQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<Revenue_GetMyRevenueQuery, TError, TData>({
    queryKey: ["revenue_getMyRevenue", variables],
    queryFn: fetcher<
      Revenue_GetMyRevenueQuery,
      Revenue_GetMyRevenueQueryVariables
    >(Revenue_GetMyRevenueDocument, variables),
    ...options,
  });
};

export const useInfiniteRevenue_GetMyRevenueQuery = <
  TData = InfiniteData<Revenue_GetMyRevenueQuery>,
  TError = unknown,
>(
  variables: Revenue_GetMyRevenueQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Revenue_GetMyRevenueQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Revenue_GetMyRevenueQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Revenue_GetMyRevenueQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "revenue_getMyRevenue.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            Revenue_GetMyRevenueQuery,
            Revenue_GetMyRevenueQueryVariables
          >(Revenue_GetMyRevenueDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const GetMyRevenueDocument = `
    query getMyRevenue($input: GetMyRevenueInput!) {
  revenue_getMyRevenue(input: $input) {
    status
    result {
      totalAmount
      unsettledAmount
    }
  }
}
    `;

export const useGetMyRevenueQuery = <
  TData = GetMyRevenueQuery,
  TError = unknown,
>(
  variables: GetMyRevenueQueryVariables,
  options?: Omit<
    UseQueryOptions<GetMyRevenueQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<GetMyRevenueQuery, TError, TData>["queryKey"];
  },
) => {
  return useQuery<GetMyRevenueQuery, TError, TData>({
    queryKey: ["getMyRevenue", variables],
    queryFn: fetcher<GetMyRevenueQuery, GetMyRevenueQueryVariables>(
      GetMyRevenueDocument,
      variables,
    ),
    ...options,
  });
};

export const useInfiniteGetMyRevenueQuery = <
  TData = InfiniteData<GetMyRevenueQuery>,
  TError = unknown,
>(
  variables: GetMyRevenueQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<GetMyRevenueQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      GetMyRevenueQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<GetMyRevenueQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? ["getMyRevenue.infinite", variables],
        queryFn: (metaData) =>
          fetcher<GetMyRevenueQuery, GetMyRevenueQueryVariables>(
            GetMyRevenueDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
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
    query serviceCategory_getById($input: GetServiceCategoryByIdInput!) {
  serviceCategory_getById(input: $input) {
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

export const CreateRequestDocument = `
    mutation createRequest($input: CreateServiceRequestInput!) {
  serviceRequest_create(input: $input) {
    status
  }
}
    `;

export const useCreateRequestMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CreateRequestMutation,
    TError,
    CreateRequestMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    CreateRequestMutation,
    TError,
    CreateRequestMutationVariables,
    TContext
  >({
    mutationKey: ["createRequest"],
    mutationFn: (variables?: CreateRequestMutationVariables) =>
      fetcher<CreateRequestMutation, CreateRequestMutationVariables>(
        CreateRequestDocument,
        variables,
      )(),
    ...options,
  });
};

export const ServiceSubCategory_GetAllDocument = `
    query serviceSubCategory_getAll($skip: Int, $take: Int, $order: [ServiceSubCategoryDtoSortInput!], $where: ServiceSubCategoryDtoFilterInput) {
  serviceSubCategory_getAll {
    result(skip: $skip, take: $take, order: $order, where: $where) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        id
        logo
        name
        serviceCategory {
          id
          name
        }
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
    query serviceSubCategory_getById($input: GetServiceSubCategoryByIdInput!) {
  serviceSubCategory_getById(input: $input) {
    result {
      id
      logo
      name
      serviceCategory {
        id
        name
      }
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

export const ServiceTypeQuestion_GetByServiceTypeDocument = `
    query serviceTypeQuestion_getByServiceType($input: GetServiceTypeQuestionsByServiceTypeInput!, $skip: Int, $take: Int) {
  serviceTypeQuestion_getByServiceType(input: $input) {
    result(take: $take, skip: $skip) {
      items {
        id
        text
        options
        questionType
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

export const useServiceTypeQuestion_GetByServiceTypeQuery = <
  TData = ServiceTypeQuestion_GetByServiceTypeQuery,
  TError = unknown,
>(
  variables: ServiceTypeQuestion_GetByServiceTypeQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceTypeQuestion_GetByServiceTypeQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceTypeQuestion_GetByServiceTypeQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceTypeQuestion_GetByServiceTypeQuery, TError, TData>({
    queryKey: ["serviceTypeQuestion_getByServiceType", variables],
    queryFn: fetcher<
      ServiceTypeQuestion_GetByServiceTypeQuery,
      ServiceTypeQuestion_GetByServiceTypeQueryVariables
    >(ServiceTypeQuestion_GetByServiceTypeDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceTypeQuestion_GetByServiceTypeQuery = <
  TData = InfiniteData<ServiceTypeQuestion_GetByServiceTypeQuery>,
  TError = unknown,
>(
  variables: ServiceTypeQuestion_GetByServiceTypeQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceTypeQuestion_GetByServiceTypeQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceTypeQuestion_GetByServiceTypeQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    ServiceTypeQuestion_GetByServiceTypeQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "serviceTypeQuestion_getByServiceType.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ServiceTypeQuestion_GetByServiceTypeQuery,
            ServiceTypeQuestion_GetByServiceTypeQueryVariables
          >(ServiceTypeQuestion_GetByServiceTypeDocument, {
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
        basePrice
        serviceSubCategory {
          id
          name
        }
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

export const ServiceRequest_GetAvailableRequestsDocument = `
    query serviceRequest_getAvailableRequests($input: GetAvailableRequestsInput!, $skip: Int, $take: Int, $order: [AvailableServiceRequestDtoSortInput!], $where: AvailableServiceRequestDtoFilterInput) {
  serviceRequest_getAvailableRequests(input: $input) {
    result(skip: $skip, take: $take, order: $order, where: $where) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        address {
          text
          latitude
          longitude
          city {
            id
            name
          }
        }
        cancellationReason {
          id
          name
        }
        finalPrice
        customer {
          firstName
          lastName
          phoneNumber
          profileImageUrl
          id
          gender
        }
        description
        requestDate
        id
        serviceType {
          name
          id
          logo
        }
        specialist {
          lastName
          firstName
          id
          profileImageUrl
          rateCount
          phoneNumber
        }
        status
      }
    }
    status
  }
}
    `;

export const useServiceRequest_GetAvailableRequestsQuery = <
  TData = ServiceRequest_GetAvailableRequestsQuery,
  TError = unknown,
>(
  variables: ServiceRequest_GetAvailableRequestsQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceRequest_GetAvailableRequestsQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceRequest_GetAvailableRequestsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceRequest_GetAvailableRequestsQuery, TError, TData>({
    queryKey: ["serviceRequest_getAvailableRequests", variables],
    queryFn: fetcher<
      ServiceRequest_GetAvailableRequestsQuery,
      ServiceRequest_GetAvailableRequestsQueryVariables
    >(ServiceRequest_GetAvailableRequestsDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceRequest_GetAvailableRequestsQuery = <
  TData = InfiniteData<ServiceRequest_GetAvailableRequestsQuery>,
  TError = unknown,
>(
  variables: ServiceRequest_GetAvailableRequestsQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<
      ServiceRequest_GetAvailableRequestsQuery,
      TError,
      TData
    >,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceRequest_GetAvailableRequestsQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<
    ServiceRequest_GetAvailableRequestsQuery,
    TError,
    TData
  >(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "serviceRequest_getAvailableRequests.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            ServiceRequest_GetAvailableRequestsQuery,
            ServiceRequest_GetAvailableRequestsQueryVariables
          >(ServiceRequest_GetAvailableRequestsDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const ServiceTypes_GetPopularDocument = `
    query serviceTypes_getPopular($skip: Int, $take: Int, $order: [PopularServiceTypeDtoSortInput!], $where: PopularServiceTypeDtoFilterInput) {
  serviceTypes_getPopular {
    result(skip: $skip, take: $take, order: $order, where: $where) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      items {
        name
        logo
        id
        basePrice
        requestCount
        serviceSubCategory {
          id
          name
        }
      }
    }
    status
  }
}
    `;

export const useServiceTypes_GetPopularQuery = <
  TData = ServiceTypes_GetPopularQuery,
  TError = unknown,
>(
  variables?: ServiceTypes_GetPopularQueryVariables,
  options?: Omit<
    UseQueryOptions<ServiceTypes_GetPopularQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      ServiceTypes_GetPopularQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<ServiceTypes_GetPopularQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["serviceTypes_getPopular"]
        : ["serviceTypes_getPopular", variables],
    queryFn: fetcher<
      ServiceTypes_GetPopularQuery,
      ServiceTypes_GetPopularQueryVariables
    >(ServiceTypes_GetPopularDocument, variables),
    ...options,
  });
};

export const useInfiniteServiceTypes_GetPopularQuery = <
  TData = InfiniteData<ServiceTypes_GetPopularQuery>,
  TError = unknown,
>(
  variables: ServiceTypes_GetPopularQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<ServiceTypes_GetPopularQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      ServiceTypes_GetPopularQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<ServiceTypes_GetPopularQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["serviceTypes_getPopular.infinite"]
            : ["serviceTypes_getPopular.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            ServiceTypes_GetPopularQuery,
            ServiceTypes_GetPopularQueryVariables
          >(ServiceTypes_GetPopularDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const S3_CompleteMultipartUploadDocument = `
    mutation s3_completeMultipartUpload($input: CompleteMultipartUploadInput!) {
  s3_completeMultipartUpload(input: $input) {
    status
  }
}
    `;

export const useS3_CompleteMultipartUploadMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    S3_CompleteMultipartUploadMutation,
    TError,
    S3_CompleteMultipartUploadMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    S3_CompleteMultipartUploadMutation,
    TError,
    S3_CompleteMultipartUploadMutationVariables,
    TContext
  >({
    mutationKey: ["s3_completeMultipartUpload"],
    mutationFn: (variables?: S3_CompleteMultipartUploadMutationVariables) =>
      fetcher<
        S3_CompleteMultipartUploadMutation,
        S3_CompleteMultipartUploadMutationVariables
      >(S3_CompleteMultipartUploadDocument, variables)(),
    ...options,
  });
};

export const S3_GeneratePresignedUrlDocument = `
    mutation s3_generatePresignedUrl($input: GeneratePresignedUrlInput!) {
  s3_generatePresignedUrl(input: $input) {
    result {
      objectUrl
      presignedUrl
    }
    status
  }
}
    `;

export const useS3_GeneratePresignedUrlMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    S3_GeneratePresignedUrlMutation,
    TError,
    S3_GeneratePresignedUrlMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    S3_GeneratePresignedUrlMutation,
    TError,
    S3_GeneratePresignedUrlMutationVariables,
    TContext
  >({
    mutationKey: ["s3_generatePresignedUrl"],
    mutationFn: (variables?: S3_GeneratePresignedUrlMutationVariables) =>
      fetcher<
        S3_GeneratePresignedUrlMutation,
        S3_GeneratePresignedUrlMutationVariables
      >(S3_GeneratePresignedUrlDocument, variables)(),
    ...options,
  });
};

export const S3_GeneratePresignedUrlsDocument = `
    mutation s3_generatePresignedUrls($input: GenerateMultipartPresignedUrlsInput!) {
  s3_generatePresignedUrls(input: $input) {
    result {
      objectUrl
      presignedUrls
      uploadId
    }
    status
  }
}
    `;

export const useS3_GeneratePresignedUrlsMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    S3_GeneratePresignedUrlsMutation,
    TError,
    S3_GeneratePresignedUrlsMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    S3_GeneratePresignedUrlsMutation,
    TError,
    S3_GeneratePresignedUrlsMutationVariables,
    TContext
  >({
    mutationKey: ["s3_generatePresignedUrls"],
    mutationFn: (variables?: S3_GeneratePresignedUrlsMutationVariables) =>
      fetcher<
        S3_GeneratePresignedUrlsMutation,
        S3_GeneratePresignedUrlsMutationVariables
      >(S3_GeneratePresignedUrlsDocument, variables)(),
    ...options,
  });
};

export const User_UpdateProfileDocument = `
    mutation user_updateProfile($input: UpdateUserProfileInput!) {
  user_updateProfile(input: $input) {
    status
    result {
      id
    }
  }
}
    `;

export const useUser_UpdateProfileMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    User_UpdateProfileMutation,
    TError,
    User_UpdateProfileMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    User_UpdateProfileMutation,
    TError,
    User_UpdateProfileMutationVariables,
    TContext
  >({
    mutationKey: ["user_updateProfile"],
    mutationFn: (variables?: User_UpdateProfileMutationVariables) =>
      fetcher<User_UpdateProfileMutation, User_UpdateProfileMutationVariables>(
        User_UpdateProfileDocument,
        variables,
      )(),
    ...options,
  });
};

export const Specialist_UpdateSpecializedDocumentsDocument = `
    mutation specialist_updateSpecializedDocuments($input: UpdateSpecializedDocumentsInput!) {
  specialist_updateSpecializedDocuments(input: $input) {
    status
  }
}
    `;

export const useSpecialist_UpdateSpecializedDocumentsMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Specialist_UpdateSpecializedDocumentsMutation,
    TError,
    Specialist_UpdateSpecializedDocumentsMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Specialist_UpdateSpecializedDocumentsMutation,
    TError,
    Specialist_UpdateSpecializedDocumentsMutationVariables,
    TContext
  >({
    mutationKey: ["specialist_updateSpecializedDocuments"],
    mutationFn: (
      variables?: Specialist_UpdateSpecializedDocumentsMutationVariables,
    ) =>
      fetcher<
        Specialist_UpdateSpecializedDocumentsMutation,
        Specialist_UpdateSpecializedDocumentsMutationVariables
      >(Specialist_UpdateSpecializedDocumentsDocument, variables)(),
    ...options,
  });
};

export const Specialist_UpdateIdentityVerificationVideoDocument = `
    mutation specialist_updateIdentityVerificationVideo($input: UpdateIdentityVerificationVideoInput!) {
  specialist_updateIdentityVerificationVideo(input: $input) {
    status
  }
}
    `;

export const useSpecialist_UpdateIdentityVerificationVideoMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Specialist_UpdateIdentityVerificationVideoMutation,
    TError,
    Specialist_UpdateIdentityVerificationVideoMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Specialist_UpdateIdentityVerificationVideoMutation,
    TError,
    Specialist_UpdateIdentityVerificationVideoMutationVariables,
    TContext
  >({
    mutationKey: ["specialist_updateIdentityVerificationVideo"],
    mutationFn: (
      variables?: Specialist_UpdateIdentityVerificationVideoMutationVariables,
    ) =>
      fetcher<
        Specialist_UpdateIdentityVerificationVideoMutation,
        Specialist_UpdateIdentityVerificationVideoMutationVariables
      >(Specialist_UpdateIdentityVerificationVideoDocument, variables)(),
    ...options,
  });
};

export const Specialist_SetPersonalInformationDocument = `
    mutation specialist_setPersonalInformation($input: SetPersonalInformationInput!) {
  specialist_setPersonalInformation(input: $input) {
    status
  }
}
    `;

export const useSpecialist_SetPersonalInformationMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Specialist_SetPersonalInformationMutation,
    TError,
    Specialist_SetPersonalInformationMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Specialist_SetPersonalInformationMutation,
    TError,
    Specialist_SetPersonalInformationMutationVariables,
    TContext
  >({
    mutationKey: ["specialist_setPersonalInformation"],
    mutationFn: (
      variables?: Specialist_SetPersonalInformationMutationVariables,
    ) =>
      fetcher<
        Specialist_SetPersonalInformationMutation,
        Specialist_SetPersonalInformationMutationVariables
      >(Specialist_SetPersonalInformationDocument, variables)(),
    ...options,
  });
};

export const Specialist_SetLocationAndSpecialtyDocument = `
    mutation specialist_setLocationAndSpecialty($input: SetLocationAndSpecialtyInput!) {
  specialist_setLocationAndSpecialty(input: $input) {
    status
  }
}
    `;

export const useSpecialist_SetLocationAndSpecialtyMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Specialist_SetLocationAndSpecialtyMutation,
    TError,
    Specialist_SetLocationAndSpecialtyMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Specialist_SetLocationAndSpecialtyMutation,
    TError,
    Specialist_SetLocationAndSpecialtyMutationVariables,
    TContext
  >({
    mutationKey: ["specialist_setLocationAndSpecialty"],
    mutationFn: (
      variables?: Specialist_SetLocationAndSpecialtyMutationVariables,
    ) =>
      fetcher<
        Specialist_SetLocationAndSpecialtyMutation,
        Specialist_SetLocationAndSpecialtyMutationVariables
      >(Specialist_SetLocationAndSpecialtyDocument, variables)(),
    ...options,
  });
};

export const RateAndReview_CreateDocument = `
    mutation rateAndReview_create($input: CreateRateAndReviewInput!) {
  rateAndReview_create(input: $input) {
    status
  }
}
    `;

export const useRateAndReview_CreateMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    RateAndReview_CreateMutation,
    TError,
    RateAndReview_CreateMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    RateAndReview_CreateMutation,
    TError,
    RateAndReview_CreateMutationVariables,
    TContext
  >({
    mutationKey: ["rateAndReview_create"],
    mutationFn: (variables?: RateAndReview_CreateMutationVariables) =>
      fetcher<
        RateAndReview_CreateMutation,
        RateAndReview_CreateMutationVariables
      >(RateAndReview_CreateDocument, variables)(),
    ...options,
  });
};

export const Address_SetPrimaryDocument = `
    mutation address_setPrimary($input: SetPrimaryAddressInput!) {
  address_setPrimary(input: $input) {
    status
  }
}
    `;

export const useAddress_SetPrimaryMutation = <
  TError = unknown,
  TContext = unknown,
>(
  options?: UseMutationOptions<
    Address_SetPrimaryMutation,
    TError,
    Address_SetPrimaryMutationVariables,
    TContext
  >,
) => {
  return useMutation<
    Address_SetPrimaryMutation,
    TError,
    Address_SetPrimaryMutationVariables,
    TContext
  >({
    mutationKey: ["address_setPrimary"],
    mutationFn: (variables?: Address_SetPrimaryMutationVariables) =>
      fetcher<Address_SetPrimaryMutation, Address_SetPrimaryMutationVariables>(
        Address_SetPrimaryDocument,
        variables,
      )(),
    ...options,
  });
};

export const User_GetMyProfileDocument = `
    query user_getMyProfile {
  user_getMyProfile {
    status
    result {
      id
      phoneNumber
      firstName
      gender
      lastName
      profileImageUrl
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
        isPrimary
        floorNumber
        buildingNumber
        unitNumber
        city {
          name
          id
        }
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

export const DiscountCode_GetMyCodesDocument = `
    query discountCode_getMyCodes($skip: Int, $take: Int, $where: DiscountCodeDtoFilterInput, $order: [DiscountCodeDtoSortInput!]) {
  discountCode_getMyCodes {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        amount
        code
        expiryDate
        isActive
        isPercentage
        title
        isUsed
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

export const useDiscountCode_GetMyCodesQuery = <
  TData = DiscountCode_GetMyCodesQuery,
  TError = unknown,
>(
  variables?: DiscountCode_GetMyCodesQueryVariables,
  options?: Omit<
    UseQueryOptions<DiscountCode_GetMyCodesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      DiscountCode_GetMyCodesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<DiscountCode_GetMyCodesQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["discountCode_getMyCodes"]
        : ["discountCode_getMyCodes", variables],
    queryFn: fetcher<
      DiscountCode_GetMyCodesQuery,
      DiscountCode_GetMyCodesQueryVariables
    >(DiscountCode_GetMyCodesDocument, variables),
    ...options,
  });
};

export const useInfiniteDiscountCode_GetMyCodesQuery = <
  TData = InfiniteData<DiscountCode_GetMyCodesQuery>,
  TError = unknown,
>(
  variables: DiscountCode_GetMyCodesQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<DiscountCode_GetMyCodesQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      DiscountCode_GetMyCodesQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<DiscountCode_GetMyCodesQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["discountCode_getMyCodes.infinite"]
            : ["discountCode_getMyCodes.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            DiscountCode_GetMyCodesQuery,
            DiscountCode_GetMyCodesQueryVariables
          >(DiscountCode_GetMyCodesDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const Specialist_GetMyProfileDocument = `
    query specialist_getMyProfile {
  specialist_getMyProfile {
    status
    result {
      city {
        id
        name
        province {
          id
          name
        }
      }
      averageRating
      rateCount
      birthDate
      id
      firstName
      lastName
      gender
      nationalCode
      profileImageUrl
      idCardImageUrl
      daysRegistered
      phoneNumber
      successfulMissions
      idCardVerificationStatus
      identityVerificationVideoStatus
      identityVerificationVideoUrl
      serviceSubCategory {
        id
        logo
        name
        serviceCategory {
          id
          logo
          name
        }
      }
      serviceTypes {
        id
        logo
        name
      }
      specializedDocumentsVerificationStatus
      specializedDocumentUrls
    }
  }
}
    `;

export const useSpecialist_GetMyProfileQuery = <
  TData = Specialist_GetMyProfileQuery,
  TError = unknown,
>(
  variables?: Specialist_GetMyProfileQueryVariables,
  options?: Omit<
    UseQueryOptions<Specialist_GetMyProfileQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      Specialist_GetMyProfileQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<Specialist_GetMyProfileQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["specialist_getMyProfile"]
        : ["specialist_getMyProfile", variables],
    queryFn: fetcher<
      Specialist_GetMyProfileQuery,
      Specialist_GetMyProfileQueryVariables
    >(Specialist_GetMyProfileDocument, variables),
    ...options,
  });
};

export const useInfiniteSpecialist_GetMyProfileQuery = <
  TData = InfiniteData<Specialist_GetMyProfileQuery>,
  TError = unknown,
>(
  variables: Specialist_GetMyProfileQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Specialist_GetMyProfileQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Specialist_GetMyProfileQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Specialist_GetMyProfileQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["specialist_getMyProfile.infinite"]
            : ["specialist_getMyProfile.infinite", variables],
        queryFn: (metaData) =>
          fetcher<
            Specialist_GetMyProfileQuery,
            Specialist_GetMyProfileQueryVariables
          >(Specialist_GetMyProfileDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};

export const Province_GetAllDocument = `
    query province_getAll($skip: Int, $take: Int, $where: ProvinceDtoFilterInput, $order: [ProvinceDtoSortInput!]) {
  province_getAll {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        name
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

export const useProvince_GetAllQuery = <
  TData = Province_GetAllQuery,
  TError = unknown,
>(
  variables?: Province_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<Province_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<Province_GetAllQuery, TError, TData>["queryKey"];
  },
) => {
  return useQuery<Province_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["province_getAll"]
        : ["province_getAll", variables],
    queryFn: fetcher<Province_GetAllQuery, Province_GetAllQueryVariables>(
      Province_GetAllDocument,
      variables,
    ),
    ...options,
  });
};

export const useInfiniteProvince_GetAllQuery = <
  TData = InfiniteData<Province_GetAllQuery>,
  TError = unknown,
>(
  variables: Province_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Province_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Province_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Province_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["province_getAll.infinite"]
            : ["province_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<Province_GetAllQuery, Province_GetAllQueryVariables>(
            Province_GetAllDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

export const Specialist_GetAllDocument = `
    query specialist_getAll($skip: Int, $take: Int, $where: SpecialistDtoFilterInput, $order: [SpecialistDtoSortInput!]) {
  specialist_getAll {
    result(skip: $skip, take: $take, where: $where, order: $order) {
      items {
        id
        firstName
        lastName
        profileImageUrl
        serviceSubCategory {
          id
          logo
          name
        }
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

export const useSpecialist_GetAllQuery = <
  TData = Specialist_GetAllQuery,
  TError = unknown,
>(
  variables?: Specialist_GetAllQueryVariables,
  options?: Omit<
    UseQueryOptions<Specialist_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      Specialist_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<Specialist_GetAllQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["specialist_getAll"]
        : ["specialist_getAll", variables],
    queryFn: fetcher<Specialist_GetAllQuery, Specialist_GetAllQueryVariables>(
      Specialist_GetAllDocument,
      variables,
    ),
    ...options,
  });
};

export const useInfiniteSpecialist_GetAllQuery = <
  TData = InfiniteData<Specialist_GetAllQuery>,
  TError = unknown,
>(
  variables: Specialist_GetAllQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Specialist_GetAllQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Specialist_GetAllQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Specialist_GetAllQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey:
          (optionsQueryKey ?? variables === undefined)
            ? ["specialist_getAll.infinite"]
            : ["specialist_getAll.infinite", variables],
        queryFn: (metaData) =>
          fetcher<Specialist_GetAllQuery, Specialist_GetAllQueryVariables>(
            Specialist_GetAllDocument,
            { ...variables, ...(metaData.pageParam ?? {}) },
          )(),
        ...restOptions,
      };
    })(),
  );
};

export const Address_GetAddressByIdDocument = `
    query address_getAddressById($input: GetAddressByIdInput!) {
  address_getAddressById(input: $input) {
    result {
      id
      latitude
      longitude
      isPrimary
      floorNumber
      buildingNumber
      unitNumber
      city {
        name
        id
      }
      text
    }
  }
}
    `;

export const useAddress_GetAddressByIdQuery = <
  TData = Address_GetAddressByIdQuery,
  TError = unknown,
>(
  variables: Address_GetAddressByIdQueryVariables,
  options?: Omit<
    UseQueryOptions<Address_GetAddressByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseQueryOptions<
      Address_GetAddressByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useQuery<Address_GetAddressByIdQuery, TError, TData>({
    queryKey: ["address_getAddressById", variables],
    queryFn: fetcher<
      Address_GetAddressByIdQuery,
      Address_GetAddressByIdQueryVariables
    >(Address_GetAddressByIdDocument, variables),
    ...options,
  });
};

export const useInfiniteAddress_GetAddressByIdQuery = <
  TData = InfiniteData<Address_GetAddressByIdQuery>,
  TError = unknown,
>(
  variables: Address_GetAddressByIdQueryVariables,
  options: Omit<
    UseInfiniteQueryOptions<Address_GetAddressByIdQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      Address_GetAddressByIdQuery,
      TError,
      TData
    >["queryKey"];
  },
) => {
  return useInfiniteQuery<Address_GetAddressByIdQuery, TError, TData>(
    (() => {
      const { queryKey: optionsQueryKey, ...restOptions } = options;
      return {
        queryKey: optionsQueryKey ?? [
          "address_getAddressById.infinite",
          variables,
        ],
        queryFn: (metaData) =>
          fetcher<
            Address_GetAddressByIdQuery,
            Address_GetAddressByIdQueryVariables
          >(Address_GetAddressByIdDocument, {
            ...variables,
            ...(metaData.pageParam ?? {}),
          })(),
        ...restOptions,
      };
    })(),
  );
};
