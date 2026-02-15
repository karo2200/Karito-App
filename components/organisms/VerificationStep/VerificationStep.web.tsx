import { FontType } from "@/constants/Fonts";
import React, { useEffect, useRef, useState } from "react";
import WebHelpText from "./WebHelpText";
import useVerificationVideoHook from "./verification.hook";

const cameraStyle: React.CSSProperties = {
  width: "100%",
  height: 200,
};

const buttonStyle: React.CSSProperties = {
  width: 200,
  fontFamily: FontType.YekanBakhBold,
  paddingTop: 5,
  paddingBottom: 5,
};

export default function StableWebCameraRecorder() {
  const { textList } = useVerificationVideoHook();
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [recordedURL, setRecordedURL] = useState<string | null>(null);

  useEffect(() => {
    async function initCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;

        const recorder = new MediaRecorder(s, {
          mimeType: "video/webm;codecs=vp8,opus",
        });

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          if (chunksRef.current.length === 0) {
            console.warn("No video data captured");
            return;
          }

          // ساخت blob و نمایش preview
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          setRecordedURL(url);
          chunksRef.current = [];

          // توقف کامل دوربین بعد از ساخت preview
          s.getTracks().forEach((track) => track.stop());
          setStream(null);
        };

        setMediaRecorder(recorder);
      } catch (err) {
        console.error("Cannot access camera/microphone", err);
      }
    }

    initCamera();
  }, []);

  const startRecording = () => {
    if (!mediaRecorder) return;

    chunksRef.current = [];
    setRecordedURL(null);

    mediaRecorder.start(200); // emit data هر 200ms
    setRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorder) return;

    // قطع نمایش زنده دوربین قبل از stop
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    mediaRecorder.stop();
    setRecording(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      {!recording && recordedURL ? (
        <video
          ref={previewRef}
          src={recordedURL}
          controls
          style={cameraStyle}
        />
      ) : (
        <video ref={videoRef} autoPlay playsInline muted style={cameraStyle} />
      )}
      <WebHelpText textList={textList} />
      <div style={{ display: "flex", gap: 10 }}>
        {!recording ? (
          <button onClick={startRecording} style={buttonStyle}>
            {recordedURL ? "ضبط مجدد" : "ضبط ویدیو"}
          </button>
        ) : (
          <button onClick={stopRecording} style={buttonStyle}>
            توقف ویدیو
          </button>
        )}
        <button onClick={stopRecording} style={buttonStyle}>
          ارسال ویدیو
        </button>
      </div>
    </div>
  );
}
