import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { Keyboard, Platform, StyleSheet, View, ViewStyle } from "react-native";
import ActionSheet, {
  ActionSheetProps,
  ActionSheetRef,
} from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ThemedText from "./ThemedText";

type Props = {
  children?: ReactNode;
  snackBarBottom?: number;
  minHeight?: ViewStyle["minHeight"];
  maxHeight?: ViewStyle["maxHeight"];
  scrollable?: boolean;
  onClose?: () => void;
  gestureEnabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  containerStyle?: ActionSheetProps["containerStyle"];
  indicatorStyle?: ActionSheetProps["indicatorStyle"];
  loadingColor?: ViewStyle["backgroundColor"];
  indicatorBackgroundColor?: ViewStyle["backgroundColor"];
  mainBackgroundColor?: ViewStyle["backgroundColor"];
  backgroundColor?: ViewStyle["backgroundColor"];
  isLoading?: boolean;
  closeAction?: boolean;
  id?: ActionSheetProps["id"];
};

function ActionSheetContainer(props: Props, ref: any) {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const insets = useSafeAreaInsets();

  const {
    children,
    minHeight,
    scrollable = true,
    onClose,
    gestureEnabled = true,
    style,
    containerStyle = styles.container,
    loadingColor = Colors.hint500,
    indicatorStyle,
    backgroundColor = "white",
    indicatorBackgroundColor = "white",
    isLoading,
    closeAction,
    mainBackgroundColor = "white",
    id,
    maxHeight,
  } = props;

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = useCallback(() => {
    Keyboard.dismiss();
    actionSheetRef.current?.show();
  }, []);

  const closeModal = useCallback(() => {
    Keyboard.dismiss();
    onClose?.();
    actionSheetRef.current?.hide();
  }, []);

  return (
    <ActionSheet
      id={id}
      safeAreaInsets={insets}
      defaultOverlayOpacity={0.7}
      gestureEnabled={gestureEnabled}
      containerStyle={{ ...containerStyle, backgroundColor }}
      enableGesturesInScrollView={scrollable}
      indicatorStyle={{
        ...indicatorStyle,
        backgroundColor: indicatorBackgroundColor,
      }}
      ref={actionSheetRef}
      onClose={closeModal}
    >
      <View style={[style, { minHeight, maxHeight }]}>
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={24}
            color={Colors.mediumGray}
            onPress={() => closeModal()}
          />
          <ThemedText fontType="bold">ورود</ThemedText>
        </View>
        {children}
        {Platform.OS === "android" && <View style={{ bottom: 50 }} />}
      </View>
    </ActionSheet>
  );
}

export default forwardRef(ActionSheetContainer);

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
