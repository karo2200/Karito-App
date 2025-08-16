import React from "react";

import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import UploadImage from "@/components/atoms/UploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute } from "@react-navigation/native";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .length(50, "تعداد کارکترها بیش از حد مجاز است.")
    .required(""),
  family: yup
    .string()
    .length(50, "تعداد کارکترها بیش از حد مجاز است.")
    .required(""),
  code: yup
    .string()
    .length(10, "کد ملی بدرستی وارد نشده است")
    .required("لطفا کد ملی خود را وارد کنید"),
});

const CertificateInfo = () => {
  const { params } = useRoute();

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods;

  const onPress = (formData: any) => {};

  return (
    <FormProvider {...methods}>
      <ScreenNameWithBack title="مدارک" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <UploadImage
            name="profilePhoto"
            control={control}
            label="عکس مدرک"
            description="مدرک مرتبط با تخصص خود را بارگذاری کنید."
          />
          <UploadImage
            name="profilePhoto"
            control={control}
            label="عکس مدرک"
            description="مدرک مرتبط با تخصص خود را بارگذاری کنید."
          />
          <UploadImage
            name="profilePhoto"
            control={control}
            label="عکس مدرک"
            description="مدرک مرتبط با تخصص خود را بارگذاری کنید."
          />
        </ScrollView>
        <View style={styles.button}>
          <ThemedButton
            title="ثبت"
            onPress={handleSubmit(onPress)}
            fontType="bold"
          />
        </View>
      </View>
    </FormProvider>
  );
};

export default CertificateInfo;

const styles = StyleSheet.create({
  button: {
    position: "relative",
    backgroundColor: "white",
    paddingTop: 5,
    paddingBottom: 40,
  },

  form: {
    width: "100%",
    flexGrow: 1,
    paddingBottom: 100,
  },

  margin: { marginTop: 32 },

  rowView: {
    flexDirection: "row",
  },

  birthdate: {
    marginBottom: 8,
    fontSize: 16,
    marginTop: 32,
  },
});
