import { Divider, ThemedButton, ThemedText } from "@/components";
import DropDownPicker from "@/components/atoms/DropDownPicker";
import ThemedInput from "@/components/atoms/ThemedInput";
import { Colors } from "@/constants/Colors";
import { queryKeys } from "@/constants/queryKeys";
import {
  useAddress_CreateMutation,
  useUser_GetMyProfileQuery,
} from "@/generated/graphql";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";
import MapView from "./MapView";
import { useGetNeighborhoodsQuery } from "./hooks";

const schema = yup.object().shape({
  area: yup.string().required("This field is required"),
  address: yup.string().required("لطفا آدرس را وارد کنید."),
  lat: yup.number(),
  lng: yup.number(),
});

export default function AddressMap() {
  const { data } = useGetNeighborhoodsQuery({});
  const neighborHoods = data?.pages?.[0] ? data?.pages : [];

  const router = useRouter();

  const { data: userData } = useUser_GetMyProfileQuery();
  const user = userData?.user_getMyProfile?.result;
  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { handleSubmit, register, setValue } = methods;

  const onLocationSelected = (latLng?: string) => {
    if (!latLng || latLng?.length < 3) return;
    try {
      const latLngJson = JSON.parse(latLng);

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
  const queryClient = useQueryClient();
  const onPress = (formData) => {
    mutate(
      {
        input: {
          neighborhoodId: formData?.area,
          latitude: formData?.lat,
          longitude: formData?.lng,
          customerId: user?.id,
          text: formData?.address,
        },
      },
      {
        onSuccess: (data) => {
          if (data?.address_create?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.address_getMyAddresses],
              exact: false,
            });
            router?.back();
          }
        },
        onError: (edata) => {
          console?.log(edata);
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <ThemedText fontType="bold">آدرس خود را مشخص کنید:</ThemedText>
        <Divider height={24} />
        <View style={styles.dropdownContainer}>
          <DropDownPicker
            {...register("area")}
            title="محله"
            data={neighborHoods}
            width={"100%"}
            titleKey="name"
            valueKey="id"
            arrowBGColor={Colors.background}
            arrowColor={Colors.gray500}
            titleStyle={{ type: "subtitle" }}
            containerViewStyle={{
              width: "100%",
              borderRadius: 6,
              borderColor: Colors.disabledIcon,
            }}
            arrowSize={16}
          />
        </View>

        <ThemedInput
          placeholder="آدرس شما"
          name="address"
          textArea
          label="نشانی دقیق"
          labelStyle="sm"
        />
        <Divider height={24} />
        <ThemedText type="subtitle">موقعیت روی نقشه</ThemedText>
        <Divider height={16} />
        <MapView onLocationSelected={onLocationSelected} />
        <ThemedButton
          title="ذخیره"
          onPress={handleSubmit(onPress)}
          isLoading={isPending}
        />
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  dropdownContainer: {
    marginBottom: 12,
  },
});
