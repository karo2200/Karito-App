// UploadImage.web.tsx
import UploadIcon from "@/assets/icons/Upload";
import { Colors } from "@/constants/Colors";
import { maxWidth } from "@/constants/Dimension";
import { FontType } from "@/constants/Fonts";
import { useUploadFile } from "@/graphql/upload";
import { Image } from "expo-image";
import { Camera, Gallery } from "iconsax-react-native";
import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CameraModalWeb from "./CameraModal.web";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";
import { useToast } from "./Toast";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  description?: string;
};

export const blobToFile = (blob: Blob, fileName: string) => {
  return new File([blob], fileName, { type: blob.type });
};

export default function UploadImage({
  name,
  control,
  label,
  description,
}: Props) {
  const { field } = useController({ name, control });
  const [cameraVisible, setCameraVisible] = useState(false);

  const { showToast } = useToast();
  const { mutate: upload, isPending } = useUploadFile();

  const [modalVisible, setModalVisible] = useState(false);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];
    if (!file) {
      setModalVisible(false);
      return;
    }

    // Pass File directly to your upload hook

    upload(file, {
      onSuccess: (url) => field.onChange(url),
      onError: (ee) => {
        console.log({ ee });
        showToast({ type: "error", message: "خطا! دوباره تلاش کنید." });
      },
    });

    setModalVisible(false);
  };

  return (
    <View style={{ marginVertical: 16 }}>
      {/* Hidden native input - rendered directly */}

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
              contentFit="cover"
            />
            <ThemedButton
              title="تغییر"
              type="outline"
              isLoading={isPending}
              style={{ width: 94, marginTop: 16 }}
              onPress={() => setModalVisible(true)}
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
              onPress={() => setModalVisible(true)}
              isLoading={isPending}
            />
          </>
        )}

        {isPending && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>

      {/* Simple modal to choose camera vs gallery. When user taps, we set capture and click the input */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.webModalBackdrop}>
          <View style={[styles.webModalContent, { width: maxWidth }]}>
            <ThemedText style={styles.webModalTitle}>انتخاب عکس</ThemedText>

            {/* Hidden Inputs */}
            <input
              id="upload-gallery"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleInputChange(e)}
            />

            <input
              id="upload-camera"
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={(e) => handleInputChange(e)}
            />

            <View style={styles.webOptions}>
              {/* Camera button */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  setCameraVisible(true);
                }}
                style={styles.webOptionButtonLabel}
              >
                <Camera size={20} color={Colors.semiBlack} />
                <ThemedText style={styles.webOptionText}>
                  گرفتن با دوربین
                </ThemedText>
              </TouchableOpacity>

              {/* Gallery button */}
              <label
                htmlFor="upload-gallery"
                style={styles.webOptionButtonLabel}
              >
                <Gallery size={20} color={Colors.semiBlack} />
                <ThemedText style={styles.webOptionText}>
                  انتخاب از گالری
                </ThemedText>
              </label>
            </View>

            <ThemedButton
              title="انصراف"
              type="ghost"
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 16 }}
            />
          </View>
        </View>
      </Modal>
      <CameraModalWeb
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onCapture={(blob) => {
          console.log({ blob });
          const file = blobToFile(blob, "photo.jpg");

          upload(file, {
            onSuccess: (url) => field.onChange(url),
            onError: () =>
              showToast({ type: "error", message: "خطا! دوباره تلاش کنید." }),
          });

          setCameraVisible(false);
        }}
      />
    </View>
  );
}

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

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  webModalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  webModalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignSelf: "center",
  },
  webModalTitle: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: "center",
  },
  webOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  webOptionButton: {
    flex: 1,
    padding: 16,
    marginHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    alignItems: "center",
  },
  webOptionText: { marginTop: 10 },
  webOptionButtonLabel: {
    flex: 1,
    padding: 16,
    marginHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    fontFamily: FontType.YekanBakhBold,
  },
});
