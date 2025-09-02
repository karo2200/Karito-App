import {
  Divider,
  ThemedButton,
  ThemedText,
  ThemedView,
  VideoPlayer,
} from "@/components";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import { Colors } from "@/constants/Colors";
import { DeviceHeight } from "@/constants/Dimension";
import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { CameraType } from "expo-image-picker";
import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import useVerificationVideoHook from "./verification.hook";

export default function VerificationStep() {
  const {
    isSendingVideo,
    sendVideo,
    textList,
    stopRecording,
    recordVideo,
    video,
    isRecording,
    cameraRef,
    isPending,
  } = useVerificationVideoHook();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await Camera.requestMicrophonePermissionsAsync();
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenNameWithBack title="مدارک" />
      <View style={styles.flex1}>
        {video && !isRecording ? (
          <VideoPlayer style={styles.camera} videoSource={video} />
        ) : (
          <CameraView
            style={styles.camera}
            mode="video"
            facing={CameraType.front}
            ref={cameraRef}
            onCameraReady={() => console.log("ready")}
            videoQuality="480p"
          />
        )}
        <Divider height={20} />
        <View style={styles.marginTop}>
          {textList?.map((item, index) => (
            <ThemedView key={`${index}`} style={styles.rowView}>
              <ThemedText style={styles.flex1}>
                {index != textList?.length - 1 && (
                  <View style={styles.bullet} />
                )}
                {`   ${item}`}
              </ThemedText>
            </ThemedView>
          ))}
        </View>
        <View style={styles.flex1}>
          <ThemedView style={styles.buttonContainer}>
            {video && (
              <ThemedButton
                title="ارسال ویدیو"
                style={styles.buttonHalf}
                isLoading={isSendingVideo || isPending}
                onPress={sendVideo}
              />
            )}
            <ThemedButton
              title={
                isRecording ? "توقف ویدیو" : video ? "ضبط مجدد" : "ضبط ویدیو"
              }
              style={video ? styles.buttonHalf : styles.fullButton}
              onPress={isRecording ? stopRecording : recordVideo}
              type="outline"
            />
          </ThemedView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    width: "100%",
    height: DeviceHeight / 3,
  },

  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  buttonHalf: { width: "48%" },

  fullButton: { width: "100%" },

  marginTop: { marginTop: 25 },

  bullet: {
    width: 5,
    height: 5,
    backgroundColor: Colors.black,
    borderRadius: 2.5,
    marginRight: 4,
  },

  rowView: {
    flexDirection: "row",
  },

  flex1: { flex: 1 },
});
