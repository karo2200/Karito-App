import UploadIcon from "@/assets/icons/Upload";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Camera, Gallery } from "iconsax-react-native";
import React, { useRef } from "react";
import { Control, useController } from "react-hook-form";
import { Image, Pressable, StyleSheet, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";

type UploadImageFieldProps = {
  name: string;
  control: Control<any>;
  label?: string;
  description?: string;
};

const UploadImage: React.FC<UploadImageFieldProps> = ({
  name,
  control,
  label,
  description,
}) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const { field } = useController({
    control,
    name,
  });

  const openSheet = () => {
    actionSheetRef.current?.show();
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      field.onChange(result.assets[0].uri);
    }
    actionSheetRef.current?.hide();
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      field.onChange(result.assets[0].uri);
    }
    actionSheetRef.current?.hide();
  };

  return (
    <View style={{ marginVertical: 16, flex: 1 }}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      {description && (
        <ThemedText style={[styles.label, { color: Colors.mediumGray }]}>
          {description}
        </ThemedText>
      )}

      <View style={styles.imageContainer}>
        {field.value ? (
          <>
            <Image
              source={{ uri: field.value }}
              style={styles.image}
              resizeMode="cover"
            />
            <ThemedButton
              title="تغییر"
              type="outline"
              onPress={openSheet}
              style={styles.button}
            />
          </>
        ) : (
          <>
            <UploadIcon width={60} height={60} style={{ marginTop: 24 }} />
            <ThemedText style={[styles.label, { marginTop: 8 }]}>
              بارگذاری عکس
            </ThemedText>
            <ThemedButton
              title="انتخاب"
              type="outline"
              fontType="bold"
              onPress={openSheet}
              style={styles.button}
            />
          </>
        )}
      </View>

      {/* Action Sheet */}
      <ActionSheet ref={actionSheetRef} gestureEnabled>
        <View style={styles.sheetContainer}>
          <Pressable onPress={takePhoto} style={styles.btn}>
            <Camera size={24} color={Colors.semiBlack} />
            <ThemedText style={styles.margin}>گرفتن با دوربین</ThemedText>
          </Pressable>

          <Pressable onPress={pickFromGallery} style={styles.btn}>
            <Gallery size={24} color={Colors.semiBlack} />
            <ThemedText style={styles.margin}>انتخاب از گالری</ThemedText>
          </Pressable>
        </View>
      </ActionSheet>
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  label: { marginBottom: 8, fontSize: 16 },

  imageContainer: {
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.gray100,
  },

  image: { width: 146, height: 146, borderRadius: 16 },

  button: { width: 94, marginTop: 16 },

  btn: {
    padding: 24,
    alignItems: "center",
    alignContent: "center",
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    borderRadius: 12,
  },

  margin: {
    marginTop: 20,
  },

  sheetContainer: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 50,
  },
});
