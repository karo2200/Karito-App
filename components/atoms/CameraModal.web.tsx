// CameraModal.web.tsx
import React, { useEffect, useRef } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraModalWeb({ visible, onClose, onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (visible) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [visible]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      alert("Browser cannot access camera");
      onClose();
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      onCapture(blob);
      onClose();
    }, "image/jpeg");
  };

  return (
    <Modal visible={visible} transparent>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <video ref={videoRef} style={styles.video} />

          <TouchableOpacity style={styles.captureBtn} onPress={handleCapture}>
            <Text style={styles.captureText}>Capture</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    height: "80%",
    backgroundColor: "#000",
    borderRadius: 12,
    overflow: "hidden",
  },
  video: { width: "100%", height: "100%" },
  captureBtn: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    padding: 14,
    backgroundColor: "white",
    borderRadius: 60,
  },
  captureText: { fontWeight: "bold" },
  closeBtn: { position: "absolute", top: 20, right: 20, padding: 10 },
});
