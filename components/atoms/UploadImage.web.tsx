// UploadImage.web.tsx
import UploadIcon from "@/assets/icons/Upload";
import { Colors } from "@/constants/Colors";
import { maxWidth } from "@/constants/Dimension";
import { useUploadFile } from "@/graphql/upload";
import { Image } from "expo-image";
import { Camera, Gallery } from "iconsax-react-native";
import React, { useRef, useState } from "react";
import { Control, useController } from "react-hook-form";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ThemedButton from "./ThemedButton";
import ThemedText from "./ThemedText";
import { useToast } from "./Toast";

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  description?: string;
};

export default function UploadImage({
  name,
  control,
  label,
  description,
}: Props) {
  const { field } = useController({ name, control });
  const { showToast } = useToast();
  const { mutate: upload, isPending } = useUploadFile();

  const [modalVisible, setModalVisible] = useState(false);

  // Direct DOM input ref rendered in JSX (web only file so this is safe)
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Trigger input click, optionally enabling camera capture
  const triggerInput = (useCamera: boolean) => {
    const input = inputRef.current;
    if (!input) return;

    // set capture attribute for camera; some browsers respect it
    if (useCamera) input.setAttribute("capture", "environment");
    else input.removeAttribute("capture");

    // reset value so selecting same file again will trigger change
    input.value = "";
    input.click();
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setModalVisible(false);
      return;
    }

    // Pass File directly to your upload hook
    console.log(JSON.stringify({ file }), { e });
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
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleInputChange}
      />

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
            <Text style={styles.webModalTitle}>انتخاب عکس</Text>

            <View style={styles.webOptions}>
              <TouchableOpacity
                style={styles.webOptionButton}
                onPress={() => triggerInput(true)} // camera
              >
                <Camera size={20} color={Colors.semiBlack} />
                <Text style={styles.webOptionText}>گرفتن با دوربین</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.webOptionButton}
                onPress={() => triggerInput(false)} // gallery
              >
                <Gallery size={20} color={Colors.semiBlack} />
                <Text style={styles.webOptionText}>انتخاب از گالری</Text>
              </TouchableOpacity>
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
});
