import React from "react";

import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedInput from "@/components/atoms/ThemedInput";
import ThemedText from "@/components/atoms/ThemedText";
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

const PersonalInfo = () => {
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
      <ScreenNameWithBack title="اطلاعات شخصی" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.form}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        >
          <ThemedInput
            label="نام*"
            {...register("name")}
            placeholder="نام"
            maxLength={50}
            readOnly={true}
          />
          <ThemedInput
            label="نام خانوادگی*"
            {...register("family")}
            placeholder="نام خانوادگی*"
            maxLength={50}
            style={styles.margin}
          />
          <ThemedText style={styles.birthdate}>تاریخ تولد</ThemedText>
          <View style={styles.rowView}>
            <ThemedInput
              {...register("code")}
              placeholder="سال"
              keyboardType="numeric"
              maxLength={4}
            />
          </View>

          <UploadImage
            name="profilePhoto"
            control={control}
            label="عکس پروفایل"
            description="یک عکس برای پروفایل خود انتخاب کنید."
          />
          <ThemedInput
            label="کد ملی*"
            {...register("code")}
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            keyboardType="numeric"
            maxLength={10}
            readOnly={true}
          />
          <UploadImage name="profilePhoto" control={control} />

          <UploadImage
            name="profilePhoto"
            control={control}
            label="عکس کارت ملی"
            description="عکس کارت ملی خود را بارگذاری کنید."
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

export default PersonalInfo;

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
