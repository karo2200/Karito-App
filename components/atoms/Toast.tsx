import DangerIcon from "@/assets/icons/DangerIcon";
import SuccessIcon from "@/assets/icons/SuccessIcon";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, {
  createContext,
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import ThemedText from "./ThemedText";

type ToastOptions = Omit<ToastProps, "style">;

type ToastContextType = {
  showToast: (options: ToastOptions) => void;
};

type ToastProps = {
  style?: any;
  message: string;
  title?: string;
  timeout?: number;
  type?: "success" | "error";
  containerStyle?: ViewStyle;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastOptions, setToastOptions] = useState<ToastOptions | null>(null);
  const [toastKey, setToastKey] = useState(0);

  const showToast = (options: ToastOptions) => {
    setToastKey((prev) => prev + 1);
    setToastOptions(options);
  };

  useEffect(() => {
    if (toastOptions) {
      const timer = setTimeout(
        () => setToastOptions(null),
        toastOptions.timeout || 5000
      );
      return () => clearTimeout(timer);
    }
  }, [toastOptions]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastOptions && <Toast {...toastOptions} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

function Toast({
  message,
  title,
  style = {},
  timeout = 5000,
  type,
  ...props
}: ToastProps) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
    const hideTimer = setTimeout(() => setOpacity(0), timeout - 500);
    return () => clearTimeout(hideTimer);
  }, [message]);

  return (
    <View style={styles.toast}>
      <View
        style={[
          type === "success"
            ? styles.successContainer
            : type === "error"
            ? styles.errorContainer
            : styles.container,
          { opacity, ...style },
        ]}
        {...props}
      >
        {type === "success" ? (
          <Fragment>
            <SuccessIcon />
            <View style={styles.margin}>
              {title && (
                <ThemedText fontType="bold" style={styles.title}>
                  {title}
                </ThemedText>
              )}
              <ThemedText
                fontType="bold"
                style={styles.title}
                numberOfLines={2}
              >
                {message}
              </ThemedText>
            </View>
            <Ionicons name="close" size={10} color={Colors.iconGreen} />
          </Fragment>
        ) : type === "error" ? (
          <Fragment>
            <DangerIcon />
            <View style={styles.margin}>
              {title && (
                <ThemedText fontType="bold" style={styles.errorTitle}>
                  {title}
                </ThemedText>
              )}
              <ThemedText
                fontType="bold"
                style={styles.errorTitle}
                numberOfLines={2}
              >
                {message}
              </ThemedText>
            </View>
          </Fragment>
        ) : (
          <ThemedText fontType="bold" style={styles.text}>
            {message}
          </ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.danger500,
    padding: 12,
    justifyContent: "center",
    flexDirection: "row",
  },

  successContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: Colors.backGreen,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.borderGreen,
  },

  errorContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    backgroundColor: Colors.danger50,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.danger200,
  },

  toast: {
    position: "absolute",
    top: 70,
    left: 10,
    right: 10,
    zIndex: 1000,
  },

  title: {
    fontSize: 16,
    color: Colors.titleGreen,
  },

  margin: {
    marginHorizontal: 16,
    flex: 1,
  },

  errorTitle: {
    fontSize: 16,
    color: Colors.danger900,
  },

  text: {
    fontSize: 20,
    color: "white",
  },
});
