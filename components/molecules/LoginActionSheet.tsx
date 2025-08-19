import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import useUserStore from "@/stores/loginStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { memo } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import Modal from "react-native-modal";

const { height, width } = Dimensions.get("screen");

const LoginActionSheet = () => {
  const {
    setIsExpert,
    isExpert,
    setIsSelectRole,
    isModalUserLoggedInVisible,
    setIsModalUserLoggedInVisible,
  } = useUserStore();

  const closeActionSheet = () => {
    setIsModalUserLoggedInVisible(false);
  };

  const loginAsExpert = () => {
    setIsExpert(true);
    setIsSelectRole(true);
    closeActionSheet();
  };

  const loginAsCustomer = () => {
    setIsExpert(false);
    setIsSelectRole(true);
    closeActionSheet();
  };

  return (
    <Modal
      isVisible={isModalUserLoggedInVisible}
      onBackdropPress={closeActionSheet}
      onBackButtonPress={closeActionSheet}
      style={styles.modal}
      useNativeDriver
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            name="close"
            size={24}
            color={Colors.mediumGray}
            onPress={() => closeActionSheet()}
          />
          <ThemedText fontType="bold">ورود</ThemedText>
        </View>
        <View style={styles.contentView}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={isExpert ? styles.selected : styles.btn}
            onPress={loginAsExpert}
          >
            <ThemedText
              type="text"
              style={[styles.title, isExpert && { color: Colors.hint500 }]}
            >
              ورود به عنوان
            </ThemedText>
            <ThemedText
              fontType="bold"
              style={[styles.text, isExpert && { color: Colors.hint500 }]}
            >
              متخصص
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={!isExpert ? styles.selected : styles.btn}
            onPress={loginAsCustomer}
          >
            <ThemedText
              type="text"
              style={[styles.title, !isExpert && { color: Colors.hint500 }]}
            >
              ورود به عنوان
            </ThemedText>
            <ThemedText
              fontType="bold"
              style={[styles.text, !isExpert && { color: Colors.hint500 }]}
            >
              مشتری
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default memo(LoginActionSheet);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  btn: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.grayMedium,
    marginBottom: 8,
    width: "48%",
  },

  text: { color: Colors.gray900 },

  title: {
    marginBottom: 2,
  },

  contentView: {
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 61,
  },

  selected: {
    borderColor: Colors.hint500,
    borderWidth: 2,
    backgroundColor: Colors.hint50,
    borderRadius: 12,
    paddingVertical: 11,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    width: "48%",
  },
  container: {
    minHeight: height / 3.5,
    width: Platform.OS === "web" ? Math.min(width, 480) : "100%",
    backgroundColor: "white",
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },

  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
