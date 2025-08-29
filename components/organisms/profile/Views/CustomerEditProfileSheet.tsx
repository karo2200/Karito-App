import ThemedButton from "@/components/atoms/ThemedButton";
import ThemedInput from "@/components/atoms/ThemedInput";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { queryKeys } from "@/constants/queryKeys";
import Ionicons from "@expo/vector-icons/Ionicons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import * as yup from "yup";
import useProfileHook from "../hooks/Profile.hook";

const { height, width } = Dimensions.get("screen");

const schema = yup.object().shape({
  name: yup.string().required("نام خود را وارد کنید."),
  family: yup.string().required("نام خانوادگی خود را وارد کنید."),
});

const CustomerEditProfileSheet = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { updatePending, updateMutate, userData } = useProfileHook();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (visible) {
      actionSheetRef.current?.show();
    }
  }, [visible]);

  const closeActionSheet = () => {
    onClose?.();
    actionSheetRef.current?.hide();
  };

  const { ...methods } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: userData?.firstName as string,
      family: userData?.lastName as string,
    },
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = methods;

  const onRegistrationPress = (formData: any) => {
    updateMutate(
      { input: { firstName: formData?.name, lastName: formData?.family } },
      {
        onSuccess: (data) => {
          if (data?.user_updateProfile?.status?.code === 1) {
            queryClient.invalidateQueries({
              queryKey: [queryKeys.user_updateProfile],
            });
            closeActionSheet;
          }
        },
      }
    );
  };

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.container}>
      <FormProvider {...methods}>
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={24}
            color={Colors.mediumGray}
            onPress={() => closeActionSheet()}
          />
          <ThemedText fontType="bold">خروج از حساب کاربری</ThemedText>
        </View>
        <View style={styles.content}>
          <ThemedInput
            label="نام"
            {...register("name")}
            placeholder="نام"
            maxLength={50}
          />
          <ThemedInput
            label=" خانوادگی"
            {...register("family")}
            placeholder="نام خانوادگی*"
            maxLength={50}
            style={styles.margin}
          />
          <ThemedButton
            title="ذخیره"
            onPress={handleSubmit(onRegistrationPress)}
            style={styles.btn}
            isLoading={updatePending}
          />
        </View>
      </FormProvider>
    </ActionSheet>
  );
};

export default CustomerEditProfileSheet;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  title: {
    marginVertical: 32,
    textAlign: "right",
  },

  btn: { marginTop: 24 },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 33,
  },

  container: {
    minHeight: height / 3.5,
    width: Platform.OS === "web" ? Math.min(width, 480) : "100%",
  },

  margin: { marginTop: 24 },
});
