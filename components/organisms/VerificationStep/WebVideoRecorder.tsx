// WebVideoRecorder.tsx
import React, { useEffect, useRef, useState } from "react";
import { Button, Platform, Text, View } from "react-native";

export default function WebVideoRecorder({ onFinish }) {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const enableStream = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(userStream);

        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
        }
      } catch (error) {
        console.log("Camera error:", error);
      }
    };

    enableStream();
  }, []);

  const startRecording = () => {
    if (!stream) return;

    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current = recorder;
    setChunks([]);

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        setChunks((prev) => [...prev, e.data]);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      onFinish(blob); // خروجی به والد منتقل می‌شود
    };

    recorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  if (Platform.OS !== "web") {
    return (
      <View>
        <Text>Web Recorder only works on the browser.</Text>
      </View>
    );
  }

  return (
    <View style={{ width: "100%" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{
          width: "100%",
          height: 300,
          backgroundColor: "black",
        }}
      />

      <View style={{ marginTop: 20 }}>
        {!recording ? (
          <Button title="شروع ضبط" onPress={startRecording} />
        ) : (
          <Button title="توقف ضبط" onPress={stopRecording} />
        )}
      </View>
    </View>
  );
}
