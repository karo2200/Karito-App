import React from "react";

import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import ThemedButton from "@/components/atoms/ThemedButton";
import UploadImage from "@/components/atoms/UploadImage";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import * as yup from "yup";
import useCertificateInfoHook from "./hooks/CertificateInfo.hook";

const schema = yup.object().shape({
  doc1: yup.string().required(""),
  doc2: yup.string(),
  doc3: yup.string(),
});

const CertificateInfo = () => {
  const { documentPending, onRegistrationPress } = useCertificateInfoHook();

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
            name="doc1"
            control={control}
            label="عکس مدرک"
            description="مدرک مرتبط با تخصص خود را بارگذاری کنید."
          />
          <UploadImage
            name="doc2"
            control={control}
            label="عکس مدرک"
            description="مدرک مرتبط با تخصص خود را بارگذاری کنید."
          />
          <UploadImage
            name="doc3"
            control={control}
            label="عکس مدرک"
            description="مدرک مرتبط با تخصص خود را بارگذاری کنید."
          />
        </ScrollView>
        <View style={styles.button}>
          <ThemedButton
            title="ثبت"
            isLoading={documentPending}
            onPress={handleSubmit(onRegistrationPress)}
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
