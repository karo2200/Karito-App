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

const schema = yup.object().shape({
  state: yup.string().required("انتخاب کنید"),
  city: yup.string().required("انتخاب کنید"),
  profession: yup.string().required("انتخاب کنید"),
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
    serviceTypeData,
    subCategoriesData,
    setCategory,
    onRegisterCity,
    profileData,
    stepPending,
  } = useExpertHook();

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      state: profileData?.city?.province?.id,
      city: profileData?.city?.id,
      profession: profileData?.serviceSubCategory?.id,
      serviceTypes: profileData?.serviceTypes?.map((opt: any) => opt?.id),
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = methods;
  console.log("www", watch("serviceTypes"));

  const onPress = (formData: any) => {
    onRegisterCity(formData, onNextPress);
  };

  useEffect(() => {
    setProvince(watch("state"));
    setCategory(watch("profession"));
  }, [watch("state"), watch("profession")]);

  return (
    <KeyboardAutoHide>
      <FormProvider {...methods}>
        <ScreenNameWithBack title="ثبت‌نام" onBackPress={onPrevPress} />
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
            />

            <SearchSelect
              label="تخصص *"
              name="profession"
              control={control}
              placeholder="انتخاب کنید"
              options={subCategoriesData}
              sheetTitle="انتخاب تخصص"
            />

            <SearchMultiSelect
              label="ماموریت *"
              name="serviceTypes"
              control={control}
              placeholder="انتخاب کنید"
              options={serviceTypeData}
              sheetTitle={`انتخاب ماموریت در ${serviceTypeData?.[0]?.serviceSubCategory?.name}`}
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
