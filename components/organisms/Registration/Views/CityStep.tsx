import React from "react";

import KeyboardAutoHide from "@/components/atoms/KeyboardAutoHide";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import SearchSelect from "@/components/atoms/SearchSelect";
import ThemedButton from "@/components/atoms/ThemedButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  state: yup.string().required(""),
  city: yup.string().required(""),
  profession: yup.string().required(""),
});

const CityStep = ({
  onNextPress,
  onPrevPress,
}: {
  onNextPress: () => void;
  onPrevPress: () => void;
}) => {
  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  const onPress = (formData: any) => {
    onNextPress?.();
  };

  const options = [
    { label: "تهران", value: "tehran" },
    { label: "اصفهان", value: "isfahan" },
    { label: "مشهد", value: "mashhad" },
  ];

  return (
    <KeyboardAutoHide>
      <FormProvider {...methods}>
        <ScreenNameWithBack title="ثبت‌نام" onBackPress={onPrevPress} />
        <View style={styles.form}>
          <SearchSelect
            name="state"
            control={control}
            label="استان *"
            placeholder="انتخاب کنید"
            options={options}
            sheetTitle="انتخاب استان"
          />
          <SearchSelect
            name="city"
            control={control}
            label="شهر *"
            placeholder="انتخاب کنید"
            options={options}
            sheetTitle="انتخاب شهر"
          />

          <SearchSelect
            label="تخصص *"
            name="profession"
            control={control}
            placeholder="انتخاب کنید"
            options={options}
            sheetTitle="انتخاب تخصص"
          />
        </View>

        <ThemedButton
          title="ثبت و ادامه"
          style={styles.button}
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
