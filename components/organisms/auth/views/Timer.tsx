import { isWeb } from "@/app/_layout";
import { ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  ActivityIndicator,
  AppState,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
};
const BACKGROUND_TASK_IDENTIFIER = "background-task";

// ✅ Only load BackgroundTask & TaskManager for native platforms
let BackgroundTask: any = null;
let TaskManager: any = null;

if (!isWeb) {
  BackgroundTask = require("expo-background-task");
  TaskManager = require("expo-task-manager");

  // Define background task only once
  if (!TaskManager.isTaskDefined(BACKGROUND_TASK_IDENTIFIER)) {
    TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
      try {
        const now = Date.now();
      } catch (error) {
        return BackgroundTask.BackgroundTaskResult.Failed;
      }
      return BackgroundTask.BackgroundTaskResult.Success;
    });
  }
}

const Timer = forwardRef(
  (
    {
      isSendingCode,
      onSendOtp,
      continueFunc,
    }: { isSendingCode?: boolean; onSendOtp?: any; continueFunc?: any },
    ref
  ) => {
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [status, setStatus] = useState<any | null>(null);

    // Countdown state
    const [seconds, setSeconds] = useState(120); // ⏱️ set your starting countdown time here
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const appState = useRef(AppState.currentState);
    const backgroundTimestamp = useRef<number | null>(null);

    // Update background task status
    const updateAsync = async () => {
      const status = await BackgroundTask.getStatusAsync();
      setStatus(status);
      const isRegistered = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_TASK_IDENTIFIER
      );
      setIsRegistered(isRegistered);
    };

    useEffect(() => {
      if (!isWeb) updateAsync();
    }, []);

    // Start countdown
    const startTimer = () => {
      if (!intervalRef.current && seconds > 0) {
        intervalRef.current = setInterval(() => {
          setSeconds((s) => {
            if (s <= 1) {
              clearInterval(intervalRef.current!);
              intervalRef.current = null;
              setIsTimerActive(false);
              return 0;
            }
            return s - 1;
          });
        }, 1000);
      }
    };

    // Stop countdown
    const stopTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    useImperativeHandle(ref, () => ({
      start: () => {
        setSeconds(10);
        startTimer();
      },
      stop: () => stopTimer(),
    }));

    // Handle app state changes
    useEffect(() => {
      const subscription = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (
            appState.current === "active" &&
            nextAppState.match(/background|inactive/)
          ) {
            // Going background → save time + stop timer
            backgroundTimestamp.current = Date.now();
            stopTimer();
          }

          if (
            appState.current.match(/background|inactive/) &&
            nextAppState === "active"
          ) {
            // Coming foreground → calculate elapsed & subtract
            if (backgroundTimestamp.current) {
              const diff = Math.floor(
                (Date.now() - backgroundTimestamp.current) / 1000
              );
              setSeconds((s) => Math.max(s - diff, 0));
            }
            backgroundTimestamp.current = null;

            // Resume only if timer is not finished
            if (seconds > 0) {
              startTimer();
            }
          }

          appState.current = nextAppState;
        }
      );

      // Start countdown on mount
      if (appState.current === "active" && seconds > 0) {
        startTimer();
      }

      return () => {
        subscription.remove();
        stopTimer();
      };
    }, [seconds]);

    const onOtpSended = () => {
      setSeconds(120);
      setIsTimerActive(true);
      continueFunc?.();
      startTimer();
    };

    return (
      <>
        {isTimerActive ? (
          <ThemedText style={styles.timerTxt}>
            {`${formatTime(seconds)}`}
          </ThemedText>
        ) : (
          <>
            {isSendingCode ? (
              <ActivityIndicator size="small" />
            ) : (
              <TouchableOpacity onPress={() => onSendOtp(onOtpSended)}>
                <ThemedText style={styles.retryTxt}>تلاش مجدد</ThemedText>
              </TouchableOpacity>
            )}
          </>
        )}
      </>
    );
  }
);

export default Timer;

const styles = StyleSheet.create({
  timerTxt: { color: Colors.darkGray, textAlign: "center" },
  retryTxt: {
    color: Colors.hint500,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
