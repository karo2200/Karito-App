import { commonStyles } from "@/constants/CommonStyles";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";

export default function KeyboardAutoHide(props: any) {
  return (
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      style={commonStyles.flex1}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={commonStyles.flex1}
      >
        {
          //@ts-ignore
          props.children
        }
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
