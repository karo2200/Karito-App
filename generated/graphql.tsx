import { fetcher } from "@/graphql/fetcher";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";
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
  DateTime: { input: any; output: any };
  Decimal: { input: any; output: any };
  UUID: { input: any; output: any };
};

export type AcceptServiceRequestInput = {
  serviceRequestId: Scalars["UUID"]["input"];
};

export type AcceptServiceRequestPayload = {
  __typename?: "AcceptServiceRequestPayload";
  serviceAcceptanceId: Scalars["UUID"]["output"];
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

export type AddAddressPayload = {
  __typename?: "AddAddressPayload";
  addressId: Scalars["UUID"]["output"];
};

export type Address = {
  __typename?: "Address";
  createdAt: Scalars["DateTime"]["output"];
  customer: Customer;
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  location: Coordinates;
  neighborhood: Neighborhood;
  serviceRequests: ServiceRequest[];
  text: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type AddressDto = {
  __typename?: "AddressDto";
  cityName: Scalars["String"]["output"];
  distanceInMeters?: Maybe<Scalars["Float"]["output"]>;
  fullText: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
  neighborhoodName: Scalars["String"]["output"];
};

export type AddressDtoFilterInput = {
  and?: InputMaybe<AddressDtoFilterInput[]>;
  cityName?: InputMaybe<StringOperationFilterInput>;
  distanceInMeters?: InputMaybe<FloatOperationFilterInput>;
  fullText?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  latitude?: InputMaybe<FloatOperationFilterInput>;
  longitude?: InputMaybe<FloatOperationFilterInput>;
  neighborhoodName?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<AddressDtoFilterInput[]>;
};

export type AddressDtoSortInput = {
  cityName?: InputMaybe<SortEnumType>;
  distanceInMeters?: InputMaybe<SortEnumType>;
  fullText?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  neighborhoodName?: InputMaybe<SortEnumType>;
};

export type AddressInput = {
  createdAt: Scalars["DateTime"]["input"];
  customer: CustomerInput;
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  location: CoordinatesInput;
  neighborhood: NeighborhoodInput;
  serviceRequests: ServiceRequestInput[];
  text: Scalars["String"]["input"];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** A segment of a collection. */
export type Address_GetUserAddressesCollectionSegment = {
  __typename?: "Address_getUserAddressesCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<AddressDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

/** A segment of a collection. */
export type Address_NearestAddressesCollectionSegment = {
  __typename?: "Address_nearestAddressesCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<AddressDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
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

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
  neq?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CancelServiceRequestInput = {
  cancellationReasonId: Scalars["UUID"]["input"];
  serviceRequestId: Scalars["UUID"]["input"];
};

export type CancellationReason = {
  __typename?: "CancellationReason";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  serviceRequests: ServiceRequest[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CancellationReasonInput = {
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  serviceRequests: ServiceRequestInput[];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type City = {
  __typename?: "City";
  addresses: Address[];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  neighborhoods: Neighborhood[];
  province: Province;
  specialists: Specialist[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type CityDto = {
  __typename?: "CityDto";
  id: Scalars["UUID"]["output"];
  isActive: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  provinceId: Scalars["UUID"]["output"];
};

export type CityDtoFilterInput = {
  and?: InputMaybe<CityDtoFilterInput[]>;
  id?: InputMaybe<UuidOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<CityDtoFilterInput[]>;
  provinceId?: InputMaybe<UuidOperationFilterInput>;
};

export type CityDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  provinceId?: InputMaybe<SortEnumType>;
};

export type CityInput = {
  addresses: AddressInput[];
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isActive: Scalars["Boolean"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  neighborhoods: NeighborhoodInput[];
  province: ProvinceInput;
  specialists: SpecialistInput[];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** A segment of a collection. */
export type City_GetAllCollectionSegment = {
  __typename?: "City_getAllCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<CityDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
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

export type Coordinates = {
  __typename?: "Coordinates";
  latitude: Scalars["Float"]["output"];
  longitude: Scalars["Float"]["output"];
};

export type CoordinatesInput = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
};

export type CreateCityInput = {
  name: Scalars["String"]["input"];
  provinceId: Scalars["UUID"]["input"];
};

export type CreateCityPayload = {
  __typename?: "CreateCityPayload";
  cityId: Scalars["UUID"]["output"];
};

export type CreateNeighborhoodInput = {
  cityId: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateNeighborhoodPayload = {
  __typename?: "CreateNeighborhoodPayload";
  neighborhoodId: Scalars["UUID"]["output"];
};

export type CreateServiceCategoryInput = {
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateServiceCategoryPayload = {
  __typename?: "CreateServiceCategoryPayload";
  serviceCategoryId: Scalars["UUID"]["output"];
};

export type CreateServiceRequestInput = {
  addressId: Scalars["UUID"]["input"];
  description: Scalars["String"]["input"];
  gender?: InputMaybe<Gender>;
  locationType: LocationType;
  requestDate: Scalars["DateTime"]["input"];
  serviceTypeId: Scalars["UUID"]["input"];
};

export type CreateServiceRequestPayload = {
  __typename?: "CreateServiceRequestPayload";
  serviceRequestId: Scalars["UUID"]["output"];
};

export type CreateServiceSubCategoryInput = {
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceCategoryId: Scalars["UUID"]["input"];
};

export type CreateServiceSubCategoryPayload = {
  __typename?: "CreateServiceSubCategoryPayload";
  serviceSubCategoryId: Scalars["UUID"]["output"];
};

export type CreateServiceTypeInput = {
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceSubCategoryId: Scalars["UUID"]["input"];
};

export type CreateServiceTypePayload = {
  __typename?: "CreateServiceTypePayload";
  serviceTypeId: Scalars["UUID"]["output"];
};

export type Customer = {
  __typename?: "Customer";
  addresses: Address[];
  createdAt: Scalars["DateTime"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender: Gender;
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Scalars["String"]["output"];
  profileImageUrl?: Maybe<Scalars["String"]["output"]>;
  refreshTokens: RefreshToken[];
  serviceRequests: ServiceRequest[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  userType: UserType;
};

export type CustomerInput = {
  addresses: AddressInput[];
  createdAt: Scalars["DateTime"]["input"];
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  gender: Gender;
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber: Scalars["String"]["input"];
  profileImageUrl?: InputMaybe<Scalars["String"]["input"]>;
  refreshTokens: RefreshTokenInput[];
  serviceRequests: ServiceRequestInput[];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  userType: UserType;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<InputMaybe<Scalars["DateTime"]["input"]>[]>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  neq?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngt?: InputMaybe<Scalars["DateTime"]["input"]>;
  ngte?: InputMaybe<Scalars["DateTime"]["input"]>;
  nin?: InputMaybe<InputMaybe<Scalars["DateTime"]["input"]>[]>;
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
  in?: InputMaybe<InputMaybe<Scalars["Float"]["input"]>[]>;
  lt?: InputMaybe<Scalars["Float"]["input"]>;
  lte?: InputMaybe<Scalars["Float"]["input"]>;
  neq?: InputMaybe<Scalars["Float"]["input"]>;
  ngt?: InputMaybe<Scalars["Float"]["input"]>;
  ngte?: InputMaybe<Scalars["Float"]["input"]>;
  nin?: InputMaybe<InputMaybe<Scalars["Float"]["input"]>[]>;
  nlt?: InputMaybe<Scalars["Float"]["input"]>;
  nlte?: InputMaybe<Scalars["Float"]["input"]>;
};

export enum Gender {
  Female = "FEMALE",
  Male = "MALE",
}

export type ListFilterInputTypeOfServiceAcceptanceDtoFilterInput = {
  all?: InputMaybe<ServiceAcceptanceDtoFilterInput>;
  any?: InputMaybe<Scalars["Boolean"]["input"]>;
  none?: InputMaybe<ServiceAcceptanceDtoFilterInput>;
  some?: InputMaybe<ServiceAcceptanceDtoFilterInput>;
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
  address_create: AddAddressPayload;
  address_delete: SuccessPayload;
  address_update: SuccessPayload;
  /** Generates a new access and refresh token pair using a valid refresh token. */
  auth_refreshToken: AuthResult;
  /** Requests an OTP to be sent to the provided phone number and user type. */
  auth_requestOtp: ResponseBase;
  auth_verifyOtp: ResponseBaseOfAuthResult;
  city_activate: SuccessPayload;
  city_create: CreateCityPayload;
  city_deactivate: SuccessPayload;
  city_update: SuccessPayload;
  createCancelationReason: Scalars["UUID"]["output"];
  createDiscountCode: Scalars["UUID"]["output"];
  createProvince: Scalars["UUID"]["output"];
  createServiceTypeQuestion: Scalars["UUID"]["output"];
  deleteProvince: Scalars["Boolean"]["output"];
  neighborhood_create: CreateNeighborhoodPayload;
  neighborhood_delete: SuccessPayload;
  neighborhood_update: SuccessPayload;
  serviceAcceptance_markAsArrived: SuccessPayload;
  serviceAcceptance_revoke: SuccessPayload;
  serviceCategory_create: CreateServiceCategoryPayload;
  serviceCategory_delete: SuccessPayload;
  serviceCategory_update: SuccessPayload;
  serviceRequest_accept: AcceptServiceRequestPayload;
  serviceRequest_cancel: SuccessPayload;
  serviceRequest_completeService: SuccessPayload;
  serviceRequest_create: CreateServiceRequestPayload;
  serviceSubCategory_create: CreateServiceSubCategoryPayload;
  serviceSubCategory_delete: SuccessPayload;
  serviceSubCategory_update: SuccessPayload;
  serviceType_create: CreateServiceTypePayload;
  serviceType_delete: SuccessPayload;
  serviceType_update: SuccessPayload;
  updateProvince: Scalars["Boolean"]["output"];
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

export type MutationCity_ActivateArgs = {
  input: ActivateCityInput;
};

export type MutationCity_CreateArgs = {
  input: CreateCityInput;
};

export type MutationCity_DeactivateArgs = {
  input: DeactivateCityInput;
};

export type MutationCity_UpdateArgs = {
  input: UpdateCityInput;
};

export type MutationCreateCancelationReasonArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateDiscountCodeArgs = {
  amount: Scalars["Decimal"]["input"];
  code: Scalars["String"]["input"];
  expiryDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  isActive: Scalars["Boolean"]["input"];
  isPercentage: Scalars["Boolean"]["input"];
};

export type MutationCreateProvinceArgs = {
  name: Scalars["String"]["input"];
};

export type MutationCreateServiceTypeQuestionArgs = {
  options: Scalars["String"]["input"][];
  serviceTypeId: Scalars["UUID"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationDeleteProvinceArgs = {
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

export type MutationServiceAcceptance_MarkAsArrivedArgs = {
  input: MarkAsArrivedInput;
};

export type MutationServiceAcceptance_RevokeArgs = {
  input: RevokeServiceAcceptanceInput;
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

export type MutationServiceType_CreateArgs = {
  input: CreateServiceTypeInput;
};

export type MutationServiceType_DeleteArgs = {
  input: DeleteServiceTypeInput;
};

export type MutationServiceType_UpdateArgs = {
  input: UpdateServiceTypeInput;
};

export type MutationUpdateProvinceArgs = {
  id: Scalars["UUID"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationUser_CreateAdminArgs = {
  adminPhoneNumber: Scalars["String"]["input"];
};

export type Neighborhood = {
  __typename?: "Neighborhood";
  city: City;
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type NeighborhoodDto = {
  __typename?: "NeighborhoodDto";
  cityId: Scalars["UUID"]["output"];
  id: Scalars["UUID"]["output"];
  name: Scalars["String"]["output"];
};

export type NeighborhoodDtoFilterInput = {
  and?: InputMaybe<NeighborhoodDtoFilterInput[]>;
  cityId?: InputMaybe<UuidOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<NeighborhoodDtoFilterInput[]>;
};

export type NeighborhoodDtoSortInput = {
  cityId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type NeighborhoodInput = {
  city: CityInput;
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** A segment of a collection. */
export type Neighborhood_GetAllCollectionSegment = {
  __typename?: "Neighborhood_getAllCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<NeighborhoodDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type Province = {
  __typename?: "Province";
  cities: City[];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ProvinceInput = {
  cities: CityInput[];
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  name: Scalars["String"]["input"];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  address_getUserAddresses?: Maybe<Address_GetUserAddressesCollectionSegment>;
  address_nearestAddresses?: Maybe<Address_NearestAddressesCollectionSegment>;
  cancelationReasons: CancellationReason[];
  city_getAll?: Maybe<City_GetAllCollectionSegment>;
  city_getCity: CityDto;
  discountCodes: DiscountCode[];
  neighborhood_getAll?: Maybe<Neighborhood_GetAllCollectionSegment>;
  neighborhood_getNeighborhood: NeighborhoodDto;
  provinceById?: Maybe<Province>;
  provinces: Province[];
  serviceCategory_getServiceCategories?: Maybe<ServiceCategory_GetServiceCategoriesCollectionSegment>;
  serviceCategory_getServiceCategory: ServiceCategoryDto;
  serviceRequest_get: ServiceRequestDetailDto;
  serviceRequest_getAll?: Maybe<ServiceRequest_GetAllCollectionSegment>;
  serviceRequest_getMyServiceAcceptances?: Maybe<ServiceRequest_GetMyServiceAcceptancesCollectionSegment>;
  serviceRequest_getMyServiceRequests?: Maybe<ServiceRequest_GetMyServiceRequestsCollectionSegment>;
  serviceSubCategory_get: ServiceSubCategoryDto;
  serviceSubCategory_getAll?: Maybe<ServiceSubCategory_GetAllCollectionSegment>;
  serviceTypeQuestionsByServiceType: ServiceTypeQuestionDto[];
  serviceType_get: ServiceTypeDto;
  serviceTypes_gatAll?: Maybe<ServiceTypes_GatAllCollectionSegment>;
  /** Gets the profile of the currently authenticated user. */
  user_getMyProfile: ResponseBaseOfUserProfileDto;
};

export type QueryAddress_GetUserAddressesArgs = {
  order?: InputMaybe<AddressDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  userId: Scalars["UUID"]["input"];
  where?: InputMaybe<AddressDtoFilterInput>;
};

export type QueryAddress_NearestAddressesArgs = {
  latitude: Scalars["Float"]["input"];
  longitude: Scalars["Float"]["input"];
  order?: InputMaybe<AddressDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AddressDtoFilterInput>;
};

export type QueryCity_GetAllArgs = {
  order?: InputMaybe<CityDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<CityDtoFilterInput>;
};

export type QueryCity_GetCityArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryNeighborhood_GetAllArgs = {
  order?: InputMaybe<NeighborhoodDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<NeighborhoodDtoFilterInput>;
};

export type QueryNeighborhood_GetNeighborhoodArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryProvinceByIdArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceCategory_GetServiceCategoriesArgs = {
  order?: InputMaybe<ServiceCategoryDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceCategoryDtoFilterInput>;
};

export type QueryServiceCategory_GetServiceCategoryArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceRequest_GetArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceRequest_GetAllArgs = {
  order?: InputMaybe<ServiceRequestDetailDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDetailDtoFilterInput>;
};

export type QueryServiceRequest_GetMyServiceAcceptancesArgs = {
  order?: InputMaybe<ServiceAcceptanceDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceAcceptanceDtoFilterInput>;
};

export type QueryServiceRequest_GetMyServiceRequestsArgs = {
  order?: InputMaybe<ServiceRequestDetailDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceRequestDetailDtoFilterInput>;
};

export type QueryServiceSubCategory_GetArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceSubCategory_GetAllArgs = {
  order?: InputMaybe<ServiceSubCategoryDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceSubCategoryDtoFilterInput>;
};

export type QueryServiceTypeQuestionsByServiceTypeArgs = {
  serviceTypeId: Scalars["UUID"]["input"];
};

export type QueryServiceType_GetArgs = {
  id: Scalars["UUID"]["input"];
};

export type QueryServiceTypes_GatAllArgs = {
  order?: InputMaybe<ServiceTypeDtoSortInput[]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ServiceTypeDtoFilterInput>;
};

export type RefreshToken = {
  __typename?: "RefreshToken";
  createdAt: Scalars["DateTime"]["output"];
  expires: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isExpired: Scalars["Boolean"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  isRevoked: Scalars["Boolean"]["output"];
  token: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  user: User;
};

export type RefreshTokenInput = {
  createdAt: Scalars["DateTime"]["input"];
  expires: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  isRevoked: Scalars["Boolean"]["input"];
  token: Scalars["String"]["input"];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  user: UserInput;
};

export type ResponseBase = {
  __typename?: "ResponseBase";
  status: ResponseStatus;
};

export type ResponseBaseOfAuthResult = {
  __typename?: "ResponseBaseOfAuthResult";
  result?: Maybe<AuthResult>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserProfileDto = {
  __typename?: "ResponseBaseOfUserProfileDto";
  result?: Maybe<UserProfileDto>;
  status: ResponseStatus;
};

export type ResponseStatus = {
  __typename?: "ResponseStatus";
  code: Scalars["Int"]["output"];
  message: Scalars["String"]["output"];
  value: Scalars["String"]["output"];
};

export type RevokeServiceAcceptanceInput = {
  reason: Scalars["String"]["input"];
  serviceAcceptanceId: Scalars["UUID"]["input"];
  serviceRequestId: Scalars["UUID"]["input"];
};

export type ServiceAcceptance = {
  __typename?: "ServiceAcceptance";
  actionDate: Scalars["DateTime"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  serviceRequest: ServiceRequest;
  specialist: Specialist;
  status: ServiceAcceptanceStatus;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ServiceAcceptanceDto = {
  __typename?: "ServiceAcceptanceDto";
  actionDate: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  specialistId: Scalars["UUID"]["output"];
  specialistName: Scalars["String"]["output"];
  status: ServiceAcceptanceStatus;
};

export type ServiceAcceptanceDtoFilterInput = {
  actionDate?: InputMaybe<DateTimeOperationFilterInput>;
  and?: InputMaybe<ServiceAcceptanceDtoFilterInput[]>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<ServiceAcceptanceDtoFilterInput[]>;
  specialistId?: InputMaybe<UuidOperationFilterInput>;
  specialistName?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<ServiceAcceptanceStatusOperationFilterInput>;
};

export type ServiceAcceptanceDtoSortInput = {
  actionDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  specialistId?: InputMaybe<SortEnumType>;
  specialistName?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export type ServiceAcceptanceInput = {
  actionDate: Scalars["DateTime"]["input"];
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  serviceRequest: ServiceRequestInput;
  specialist: SpecialistInput;
  status: ServiceAcceptanceStatus;
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export enum ServiceAcceptanceStatus {
  Accepted = "ACCEPTED",
  ArrivedToLocation = "ARRIVED_TO_LOCATION",
  Completed = "COMPLETED",
  RevokedByCustomer = "REVOKED_BY_CUSTOMER",
  RevokedBySpecialist = "REVOKED_BY_SPECIALIST",
}

export type ServiceAcceptanceStatusOperationFilterInput = {
  eq?: InputMaybe<ServiceAcceptanceStatus>;
  in?: InputMaybe<ServiceAcceptanceStatus[]>;
  neq?: InputMaybe<ServiceAcceptanceStatus>;
  nin?: InputMaybe<ServiceAcceptanceStatus[]>;
};

export type ServiceCategory = {
  __typename?: "ServiceCategory";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceSubCategories: ServiceSubCategory[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ServiceCategoryDto = {
  __typename?: "ServiceCategoryDto";
  id: Scalars["UUID"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type ServiceCategoryDtoFilterInput = {
  and?: InputMaybe<ServiceCategoryDtoFilterInput[]>;
  id?: InputMaybe<UuidOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<ServiceCategoryDtoFilterInput[]>;
};

export type ServiceCategoryDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type ServiceCategoryInput = {
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceSubCategories: ServiceSubCategoryInput[];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** A segment of a collection. */
export type ServiceCategory_GetServiceCategoriesCollectionSegment = {
  __typename?: "ServiceCategory_getServiceCategoriesCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<ServiceCategoryDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type ServiceRequest = {
  __typename?: "ServiceRequest";
  accept: ServiceAcceptance;
  address: Address;
  canSpecialistAcceptBasedOnGender: Scalars["Boolean"]["output"];
  cancelationReason?: Maybe<CancellationReason>;
  createdAt: Scalars["DateTime"]["output"];
  customer: Customer;
  description: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  locationType: LocationType;
  requestDate: Scalars["DateTime"]["output"];
  serviceAcceptances: ServiceAcceptance[];
  serviceType: ServiceType;
  specialistGender?: Maybe<Gender>;
  status: ServiceRequestStatus;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ServiceRequestAcceptArgs = {
  specialist: SpecialistInput;
};

export type ServiceRequestCanSpecialistAcceptBasedOnGenderArgs = {
  specialist: SpecialistInput;
};

export type ServiceRequestDetailDto = {
  __typename?: "ServiceRequestDetailDto";
  acceptances: ServiceAcceptanceDto[];
  addressText: Scalars["String"]["output"];
  customerName: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["UUID"]["output"];
  requestDate: Scalars["DateTime"]["output"];
  serviceTypeName: Scalars["String"]["output"];
  status: ServiceRequestStatus;
};

export type ServiceRequestDetailDtoFilterInput = {
  acceptances?: InputMaybe<ListFilterInputTypeOfServiceAcceptanceDtoFilterInput>;
  addressText?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<ServiceRequestDetailDtoFilterInput[]>;
  customerName?: InputMaybe<StringOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<UuidOperationFilterInput>;
  or?: InputMaybe<ServiceRequestDetailDtoFilterInput[]>;
  requestDate?: InputMaybe<DateTimeOperationFilterInput>;
  serviceTypeName?: InputMaybe<StringOperationFilterInput>;
  status?: InputMaybe<ServiceRequestStatusOperationFilterInput>;
};

export type ServiceRequestDetailDtoSortInput = {
  addressText?: InputMaybe<SortEnumType>;
  customerName?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  requestDate?: InputMaybe<SortEnumType>;
  serviceTypeName?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
};

export type ServiceRequestInput = {
  address: AddressInput;
  cancelationReason?: InputMaybe<CancellationReasonInput>;
  createdAt: Scalars["DateTime"]["input"];
  customer: CustomerInput;
  description: Scalars["String"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  locationType: LocationType;
  requestDate: Scalars["DateTime"]["input"];
  serviceType: ServiceTypeInput;
  specialistGender?: InputMaybe<Gender>;
  status: ServiceRequestStatus;
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export enum ServiceRequestStatus {
  Cancelled = "CANCELLED",
  Completed = "COMPLETED",
  InProgress = "IN_PROGRESS",
  Paid = "PAID",
  Pending = "PENDING",
  PendingPayment = "PENDING_PAYMENT",
}

export type ServiceRequestStatusOperationFilterInput = {
  eq?: InputMaybe<ServiceRequestStatus>;
  in?: InputMaybe<ServiceRequestStatus[]>;
  neq?: InputMaybe<ServiceRequestStatus>;
  nin?: InputMaybe<ServiceRequestStatus[]>;
};

/** A segment of a collection. */
export type ServiceRequest_GetAllCollectionSegment = {
  __typename?: "ServiceRequest_getAllCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<ServiceRequestDetailDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

/** A segment of a collection. */
export type ServiceRequest_GetMyServiceAcceptancesCollectionSegment = {
  __typename?: "ServiceRequest_getMyServiceAcceptancesCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<ServiceAcceptanceDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

/** A segment of a collection. */
export type ServiceRequest_GetMyServiceRequestsCollectionSegment = {
  __typename?: "ServiceRequest_getMyServiceRequestsCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<ServiceRequestDetailDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type ServiceSubCategory = {
  __typename?: "ServiceSubCategory";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceCategory: ServiceCategory;
  serviceTypes: ServiceType[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ServiceSubCategoryDto = {
  __typename?: "ServiceSubCategoryDto";
  id: Scalars["UUID"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceCategoryId: Scalars["UUID"]["output"];
};

export type ServiceSubCategoryDtoFilterInput = {
  and?: InputMaybe<ServiceSubCategoryDtoFilterInput[]>;
  id?: InputMaybe<UuidOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<ServiceSubCategoryDtoFilterInput[]>;
  serviceCategoryId?: InputMaybe<UuidOperationFilterInput>;
};

export type ServiceSubCategoryDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  serviceCategoryId?: InputMaybe<SortEnumType>;
};

export type ServiceSubCategoryInput = {
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceCategory: ServiceCategoryInput;
  serviceTypes: ServiceTypeInput[];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** A segment of a collection. */
export type ServiceSubCategory_GetAllCollectionSegment = {
  __typename?: "ServiceSubCategory_getAllCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<ServiceSubCategoryDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export type ServiceType = {
  __typename?: "ServiceType";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceRequests: ServiceRequest[];
  serviceSubCategory: ServiceSubCategory;
  serviceTypeQuestions: ServiceTypeQuestion[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ServiceTypeDto = {
  __typename?: "ServiceTypeDto";
  id: Scalars["UUID"]["output"];
  logo: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  serviceSubCategoryId: Scalars["UUID"]["output"];
};

export type ServiceTypeDtoFilterInput = {
  and?: InputMaybe<ServiceTypeDtoFilterInput[]>;
  id?: InputMaybe<UuidOperationFilterInput>;
  logo?: InputMaybe<StringOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<ServiceTypeDtoFilterInput[]>;
  serviceSubCategoryId?: InputMaybe<UuidOperationFilterInput>;
};

export type ServiceTypeDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  logo?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  serviceSubCategoryId?: InputMaybe<SortEnumType>;
};

export type ServiceTypeInput = {
  createdAt: Scalars["DateTime"]["input"];
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  logo: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  serviceRequests: ServiceRequestInput[];
  serviceSubCategory: ServiceSubCategoryInput;
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ServiceTypeQuestion = {
  __typename?: "ServiceTypeQuestion";
  createdAt: Scalars["DateTime"]["output"];
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  options: Scalars["String"]["output"][];
  serviceRequests: ServiceRequest[];
  serviceType: ServiceType;
  title: Scalars["String"]["output"];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type ServiceTypeQuestionDto = {
  __typename?: "ServiceTypeQuestionDto";
  id: Scalars["UUID"]["output"];
  options: Scalars["String"]["output"][];
  title: Scalars["String"]["output"];
};

/** A segment of a collection. */
export type ServiceTypes_GatAllCollectionSegment = {
  __typename?: "ServiceTypes_gatAllCollectionSegment";
  /** A flattened list of the items. */
  items?: Maybe<ServiceTypeDto[]>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
};

export enum SortEnumType {
  Asc = "ASC",
  Desc = "DESC",
}

export type Specialist = {
  __typename?: "Specialist";
  birthDate: Scalars["DateTime"]["output"];
  city?: Maybe<City>;
  createdAt: Scalars["DateTime"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender: Gender;
  id: Scalars["UUID"]["output"];
  idCardImageUrl?: Maybe<Scalars["String"]["output"]>;
  identityVerificationVideoUrl?: Maybe<Scalars["String"]["output"]>;
  isRemoved: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  nationalCode?: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Scalars["String"]["output"];
  profileImageUrl?: Maybe<Scalars["String"]["output"]>;
  refreshTokens: RefreshToken[];
  serviceAcceptances: ServiceAcceptance[];
  serviceSubCategory?: Maybe<ServiceSubCategory>;
  serviceTypes: ServiceType[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  userType: UserType;
};

export type SpecialistInput = {
  birthDate: Scalars["DateTime"]["input"];
  city?: InputMaybe<CityInput>;
  createdAt: Scalars["DateTime"]["input"];
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  gender: Gender;
  id: Scalars["UUID"]["input"];
  idCardImageUrl?: InputMaybe<Scalars["String"]["input"]>;
  identityVerificationVideoUrl?: InputMaybe<Scalars["String"]["input"]>;
  isRemoved: Scalars["Boolean"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  nationalCode?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber: Scalars["String"]["input"];
  profileImageUrl?: InputMaybe<Scalars["String"]["input"]>;
  refreshTokens: RefreshTokenInput[];
  serviceAcceptances: ServiceAcceptanceInput[];
  serviceSubCategory?: InputMaybe<ServiceSubCategoryInput>;
  serviceTypes: ServiceTypeInput[];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  userType: UserType;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<StringOperationFilterInput[]>;
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<InputMaybe<Scalars["String"]["input"]>[]>;
  ncontains?: InputMaybe<Scalars["String"]["input"]>;
  nendsWith?: InputMaybe<Scalars["String"]["input"]>;
  neq?: InputMaybe<Scalars["String"]["input"]>;
  nin?: InputMaybe<InputMaybe<Scalars["String"]["input"]>[]>;
  nstartsWith?: InputMaybe<Scalars["String"]["input"]>;
  or?: InputMaybe<StringOperationFilterInput[]>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type SuccessPayload = {
  __typename?: "SuccessPayload";
  success: Scalars["Boolean"]["output"];
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

export type User = {
  __typename?: "User";
  createdAt: Scalars["DateTime"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  gender: Gender;
  id: Scalars["UUID"]["output"];
  isRemoved: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  phoneNumber: Scalars["String"]["output"];
  profileImageUrl?: Maybe<Scalars["String"]["output"]>;
  refreshTokens: RefreshToken[];
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  userType: UserType;
};

export type UserInput = {
  createdAt: Scalars["DateTime"]["input"];
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  gender: Gender;
  id: Scalars["UUID"]["input"];
  isRemoved: Scalars["Boolean"]["input"];
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  phoneNumber: Scalars["String"]["input"];
  profileImageUrl?: InputMaybe<Scalars["String"]["input"]>;
  refreshTokens: RefreshTokenInput[];
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  userType: UserType;
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
  in?: InputMaybe<InputMaybe<Scalars["UUID"]["input"]>[]>;
  lt?: InputMaybe<Scalars["UUID"]["input"]>;
  lte?: InputMaybe<Scalars["UUID"]["input"]>;
  neq?: InputMaybe<Scalars["UUID"]["input"]>;
  ngt?: InputMaybe<Scalars["UUID"]["input"]>;
  ngte?: InputMaybe<Scalars["UUID"]["input"]>;
  nin?: InputMaybe<InputMaybe<Scalars["UUID"]["input"]>[]>;
  nlt?: InputMaybe<Scalars["UUID"]["input"]>;
  nlte?: InputMaybe<Scalars["UUID"]["input"]>;
};

export type Auth_RequestOtpMutationVariables = Exact<{
  phoneNumber: Scalars["String"]["input"];
  userType: UserType;
}>;

export type Auth_RequestOtpMutation = {
  __typename?: "Mutation";
  auth_requestOtp: {
    __typename?: "ResponseBase";
    status: { __typename?: "ResponseStatus"; code: number; value: string };
  };
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
    status: { __typename?: "ResponseStatus"; code: number; value: string };
  };
};

export type User_GetMyProfileQueryVariables = Exact<{ [key: string]: never }>;

export type User_GetMyProfileQuery = {
  __typename?: "Query";
  user_getMyProfile: {
    __typename?: "ResponseBaseOfUserProfileDto";
    status: { __typename?: "ResponseStatus"; code: number; value: string };
    result?: {
      __typename?: "UserProfileDto";
      id: any;
      phoneNumber: string;
    } | null;
  };
};

export const Auth_RequestOtpDocument = `
    mutation auth_requestOtp($phoneNumber: String!, $userType: UserType!) {
  auth_requestOtp(phoneNumber: $phoneNumber, userType: $userType) {
    status {
      code
      value
    }
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
  >
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
        variables
      )(),
    ...options,
  });
};

export const Auth_VerifyOtpDocument = `
    mutation auth_verifyOtp($phoneNumber: String!, $userType: UserType!, $otp: String!) {
  auth_verifyOtp(phoneNumber: $phoneNumber, userType: $userType, otp: $otp) {
    status {
      code
      value
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
  >
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
        variables
      )(),
    ...options,
  });
};

export const User_GetMyProfileDocument = `
    query user_getMyProfile {
  user_getMyProfile {
    status {
      code
      value
    }
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
  }
) => {
  return useQuery<User_GetMyProfileQuery, TError, TData>({
    queryKey:
      variables === undefined
        ? ["user_getMyProfile"]
        : ["user_getMyProfile", variables],
    queryFn: fetcher<User_GetMyProfileQuery, User_GetMyProfileQueryVariables>(
      User_GetMyProfileDocument,
      variables
    ),
    ...options,
  });
};
