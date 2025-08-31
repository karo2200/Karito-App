import { Divider, ThemedButton, ThemedText, ThemedView } from "@/components";
import ScreenNameWithBack from "@/components/atoms/ScreenNameWithBack";
import { Colors } from "@/constants/Colors";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function VerificationStep() {
  const [isRecording, setIsRecording] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const [video, setVideo] = useState<any>();
  const cameraRef = useRef<any>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const textList = [
    "تمام رخ روبروی دوربین جلوی گوشی قرار بگیرید.",
    "کارت ملی خود را رو به دوربین در دست نگه دارید طوری که واضح دیده شود ولی صورت شما را نپوشاند.",
    "سپس دکمه ضبط ویديو را بزنید و وارد صفحه بعد شوید.",
    "متن زیر را به صورت شمرده بخوانید.",
    "من رضا یوسفی تمامی قوانین کاریتو را پذیرفته و تعهد کامل نسبت به انجام آن‌ها دارم.",
  ];

  const recordVideo = async () => {
    console.log("mmmm");
    setIsRecording(true);
    let options = {
      quality: "480p",
      maxDuration: 120,
      mute: false,
    };
    console.log("nnn");
    try {
      cameraRef?.current?.recordAsync(options)?.then((ss: any) => {
        setVideo(ss);
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const stopRecording = () => {
    console.log("---");
    setIsRecording(false);
    cameraRef.current.stopRecording();
    console.log("+++");
  };
  console.log({ video });
  return (
    <View style={styles.container}>
      <ScreenNameWithBack title="مدارک" />
      <CameraView
        style={styles.camera}
        mode="video"
        ref={cameraRef}
        onCameraReady={() => console.log("ready")}
      />
      <Divider height={20} />
      <ThemedButton
        title={isRecording ? "Stop Recording" : "Record Video"}
        onPress={isRecording ? stopRecording : recordVideo}
      />
      <View style={styles.marginTop}>
        {textList?.map((item, index) => (
          <ThemedView key={`${index}`} style={styles.rowView}>
            <ThemedText style={styles.flex1}>
              {" "}
              {index != textList?.length - 1 && <View style={styles.bullet} />}
              {`   ${item}`}
            </ThemedText>
          </ThemedView>
        ))}
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
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 64,
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

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
