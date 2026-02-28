import React, { useEffect } from "react";

import KeyboardAutoHide from "@/components/atoms/KeyboardAutoHide";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import SearchMultiSelect from "@/components/atoms/SearchMultiSelect";
import SearchSelect from "@/components/atoms/SearchSelect";
import ThemedButton from "@/components/atoms/ThemedButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import * as yup from "yup";
import useExpertHook from "../hooks/Expert.hook";
import { useGetCityServiceTypesQuery } from "../hooks/hooks";

const schema = yup.object().shape({
  state: yup.string().required("انتخاب کنید"),
  city: yup.string().required("انتخاب کنید"),
  // profession: yup.string().required("انتخاب کنید"),
  serviceTypes: yup
    .array()
    .of(yup.string().required("گزینه معتبر نیست"))
    .min(1, "حداقل یک مورد باید انتخاب شود")
    .required("انتخاب حداقل یک مورد الزامی است"),
});

const CityStep = ({
  onNextPress,
  onPrevPress,
}: {
  onNextPress: () => void;
  onPrevPress: () => void;
}) => {
  const {
    provincePending,
    provinceData,
    setProvince,
    cityData,
    onRegisterCity,
    profileData,
    stepPending,
    isLoggedIn,
    onLoadMoreCity,
  } = useExpertHook();

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      state: profileData?.city?.province?.id,
      city: profileData?.city?.id,
      // profession: profileData?.serviceSubCategory?.id,
      serviceTypes: profileData?.serviceTypes?.map((opt: any) => opt?.id),
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = methods;

  const { data: serviceTypeData, refetch } = useGetCityServiceTypesQuery({
    input: { cityId: watch("city") },
    enabled: !watch("city") ? false : true,
  });

  const onPress = (formData: any) => {
    onRegisterCity(formData, onNextPress);
  };

  useEffect(() => {
    if (profileData) {
      setValue("state", profileData?.city?.province?.id);
      setValue("city", profileData?.city?.id);
      // setValue("profession", profileData?.serviceSubCategory?.id);
      setValue(
        "serviceTypes",
        profileData?.serviceTypes?.map((opt: any) => opt?.id)
      );
    }
  }, [profileData]);

  useEffect(() => {
    setProvince(watch("state"));
    // setCategory(watch("profession"));
    // if (profileData?.serviceSubCategory?.id !== watch("profession")) {
    //   setValue("serviceTypes", []);
    // }
  }, [watch("state")]);
  useEffect(() => {
    console.log({ city: watch("city") });
    if (watch("city")) refetch();
  }, [watch("city")]);

  return (
    <KeyboardAutoHide>
      <FormProvider {...methods}>
        <ScreenNameWithBack
          title={isLoggedIn ? "ویرایش اطلاعات" : "ثبت‌نام"}
          onBackPress={onPrevPress}
        />
        {provincePending ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.form}>
            <SearchSelect
              name="state"
              control={control}
              label="استان *"
              placeholder="انتخاب کنید"
              options={provinceData}
              sheetTitle="انتخاب استان"
            />

            <SearchSelect
              name="city"
              control={control}
              label="شهر *"
              placeholder="انتخاب کنید"
              options={cityData}
              sheetTitle="انتخاب شهر"
              onEndReached={onLoadMoreCity}
            />

            {/* <SearchSelect
              label="تخصص *"
              name="profession"
              control={control}
              placeholder="انتخاب کنید"
              options={subCategoriesData}
              sheetTitle="انتخاب تخصص"
            /> */}

            <SearchMultiSelect
              label="ماموریت *"
              name="serviceTypes"
              control={control}
              placeholder="انتخاب کنید"
              options={serviceTypeData?.pages ?? []}
              sheetTitle={`انتخاب ماموریت`}
            />
          </View>
        )}

        <ThemedButton
          title="ثبت و ادامه"
          style={styles.button}
          isLoading={stepPending}
          onPress={handleSubmit(onPress)}
        />
      </FormProvider>
    </KeyboardAutoHide>
  );
};

export default CityStep;

const styles = StyleSheet.create({
  button: { position: "relative", bottom: "8%" },

  form: {
    // width: "100%",
    flex: 1,
  },

  image: {
    alignSelf: "flex-start",
    zIndex: 1,
    left: "-5%",
  },

  margin: { marginTop: 16 },
});
