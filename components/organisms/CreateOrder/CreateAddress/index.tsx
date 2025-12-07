import { Divider, ThemedButton, ThemedText, ThemedView } from "@/components";
import Breadcrumb from "@/components/atoms/Breadcrumb";
import ThemedInput from "@/components/atoms/ThemedInput";
import { useToast } from "@/components/atoms/Toast";
import { DeviceHeight } from "@/constants/Dimension";
import { queryKeys } from "@/constants/queryKeys";
import {
  AddressDto,
  useAddress_CreateMutation,
  useAddress_SetPrimaryMutation,
  useAddress_UpdateMutation,
  useUser_GetMyProfileQuery,
} from "@/generated/graphql";
import createOrderStore from "@/stores/createOrder";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import * as yup from "yup";
import { useGetUserAddressesQuery } from "../../address/hooks/Address.query";
import GoogleMapView from "./GoogleMapView";

const schema = yup.object().shape({
  address: yup.string().required("لطفا آدرس را وارد کنید."),
  title: yup.string().required("عنوان آدرس خود را وارد کنید."),
  lat: yup.number(),
  lng: yup.number(),
  buildingNumber: yup
    .number()
    .typeError("عدد وارد کنید")
    .required("لطفاْ شماره پلاک را وارد کنید"),
  floorNumber: yup
    .number()
    .typeError("عدد وارد کنید")
    .required("لطفاْ طبقه را وارد کنید"),
  unitNumber: yup
    .number()
    .typeError("عدد وارد کنید")
    .required("لطفاْ شماره واحد را وارد کنید"),
});

export default function AddressMap() {
  const editItem = useRoute().params;

  const toast = useToast();

  const {
    setAddressId,
    setCustomerCity,
    setCustomerCityId,
    setAddress,
    addressId,
    address,
  } = createOrderStore();

  const { data: addressData } = useGetUserAddressesQuery({
    where: { id: { eq: editItem?.id } },
    take: 1,
    skip: 0,
  });
  const currentAddress = addressData?.pages[0];

  const router = useRouter();
  const mapRef = useRef(null);

  const { data: userData } = useUser_GetMyProfileQuery();
  const user = userData?.user_getMyProfile?.result;

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    if (currentAddress) {
      setValue("address", currentAddress?.text);
      setValue("lat", currentAddress?.latitude ?? 0);
      setValue("lng", currentAddress?.longitude ?? 0);
      setValue("floorNumber", currentAddress?.floorNumber ?? 0);
      setValue("buildingNumber", currentAddress?.buildingNumber ?? 0);
      setValue("unitNumber", currentAddress?.unitNumber ?? 0);
      setValue("title", currentAddress?.title ?? "");
      mapRef.current?.changeLocation({
        latitude: currentAddress?.latitude,
        longitude: currentAddress?.longitude,
      });
    }
  }, [currentAddress]);

  const onLocationSelected = (latLngJson?: any) => {
    try {
      setValue("lat", latLngJson?.lat);
      setValue("lng", latLngJson?.lng);

      if (latLngJson?.lat && latLngJson?.lng)
        fetch(
          `https://api.neshan.org/v5/reverse?lat=${latLngJson?.lat}&lng=${latLngJson?.lng}`,
          {
            method: "GET",
            headers: {
              "Api-Key": "service.b8a4ddfc4aa54e6886120cfcfd6e5431",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            data?.formatted_address &&
              setValue("address", data?.formatted_address ?? "");
          })
          .catch((error) => console.error("Error:", error));
    } catch (error) {
      return;
    }
  };

  const { mutate, isPending } = useAddress_CreateMutation();
  const { mutate: editMutate, isPending: isUpdating } =
    useAddress_UpdateMutation();
  const { mutate: primaryMutate, isPending: primaryPending } =
    useAddress_SetPrimaryMutation();

  const queryClient = useQueryClient();

  const setPrimaryAddress = (address: AddressDto) => {
    primaryMutate(
      { input: { addressId: address?.id } },
      {
        onSuccess: (data) => {
          setAddressId(address?.id);
          setCustomerCity(address?.city?.name);
          setCustomerCityId(address?.city?.id);
          setAddress(address?.text);
          router?.back();
        },
        onError: () => router?.back(),
      }
    );
  };

  const onPress = (formData) => {
    const input = {
      latitude: formData?.lat,
      longitude: formData?.lng,
      customerId: user?.id,
      text: formData?.address,
      buildingNumber: formData?.buildingNumber,
      unitNumber: formData?.unitNumber,
      floorNumber: formData?.floorNumber,
      title: formData?.title,
    };
    if (editItem?.id) {
      editMutate(
        {
          input: {
            addressId: editItem?.id,
            newLatitude: formData?.lat,
            newLongitude: formData?.lng,
            newText: formData?.address,
            buildingNumber: formData?.buildingNumber,
            unitNumber: formData?.unitNumber,
            floorNumber: formData?.floorNumber,
            newTitle: formData?.title,
          },
        },
        {
          onSuccess: (data) => {
            if (data?.address_update?.status?.code === 1) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys.address_getMyAddresses],
                exact: false,
              });
              router?.back();
            }
          },
          onError: (edata) => {
            console.log(JSON.stringify({ edata }));
          },
        }
      );
    } else {
      mutate(
        {
          input,
        },
        {
          onSuccess: (data) => {
            console.log(JSON.stringify({ data }));
            const resultCode = data?.address_create?.status?.code;
            if (resultCode === 1) {
              queryClient.invalidateQueries({
                queryKey: [queryKeys.address_getMyAddresses],
                exact: false,
              });
              setPrimaryAddress(data?.address_create?.result);
            } else if (resultCode === 0) {
              toast.showToast({
                message: "آدرس در محدوده تحت پوشش کاریتو قرار ندارد.",
              });
            }
          },
          onError: (edata) => {
            console.log(JSON.stringify({ edata }));
          },
        }
      );
    }
  };

  return (
    <ThemedView style={styles.flex1}>
      <ScrollView style={styles.container}>
        <FormProvider {...methods}>
          {editItem?.id && (
            <Breadcrumb
              items={[
                { label: "مدیریت آدرس‌ها", href: "/(tabs)/profile/address" },
                { label: "تغییر آدرس" },
              ]}
            />
          )}
          {!editItem?.id && <Divider height={24} />}
          <ThemedText fontType="bold">آدرس خود را مشخص کنید:</ThemedText>
          <Divider height={24} />
          <ThemedInput
            placeholder=" خانه"
            name="title"
            label="عنوان آدرس"
            labelStyle="sm"
          />
          <Divider height={24} />
          <ThemedInput
            placeholder="آدرس شما"
            name="address"
            textArea
            label="نشانی دقیق"
            labelStyle="sm"
          />
          <Divider height={24} />
          <ThemedView style={styles.addressView}>
            <ThemedInput
              label="واحد"
              name="unitNumber"
              style={{ width: "32%" }}
              keyboardType="numeric"
              maxLength={4}
              labelStyle="sm"
            />
            <ThemedInput
              label="طبقه"
              name="floorNumber"
              style={{ width: "32%" }}
              keyboardType="numeric"
              maxLength={4}
              labelStyle="sm"
            />
            <ThemedInput
              label="پلاک"
              name="buildingNumber"
              style={{ width: "32%" }}
              keyboardType="numeric"
              maxLength={8}
              labelStyle="sm"
            />
          </ThemedView>
          <Divider height={24} />
          <ThemedText type="subtitle">موقعیت روی نقشه</ThemedText>
          <Divider height={16} />
          <ThemedView style={styles.mapView}>
            <GoogleMapView
              onLocationSelected={onLocationSelected}
              latLng={
                currentAddress?.id
                  ? {
                      lat: currentAddress?.latitude,
                      lng: currentAddress?.longitude,
                    }
                  : undefined
              }
              ref={mapRef}
            />
          </ThemedView>
        </FormProvider>
      </ScrollView>
      <ThemedButton
        title="ذخیره"
        onPress={handleSubmit(onPress)}
        isLoading={isPending || isUpdating || primaryPending}
        style={styles.button}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fff", paddingHorizontal: 16 },

  flex1: { flex: 1, alignItems: "center" },

  mapView: { height: DeviceHeight * 0.35, width: "100%" },

  dropdownContainer: {
    marginBottom: 12,
  },

  button: {
    marginTop: 18,
    marginBottom: 50,
    width: "100%",
    alignSelf: "center",
  },

  addressView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
  },
});
