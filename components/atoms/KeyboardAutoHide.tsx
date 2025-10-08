import { commonStyles } from "@/constants/CommonStyles";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

export default function KeyboardAutoHide(props: any) {
  const handlePress = () => {
    if (Platform.OS !== "web") {
      Keyboard.dismiss();
    }
  };

  return (
    <Pressable onPress={handlePress} style={commonStyles.flex1}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={commonStyles.flex1}
      >
        {
          //@ts-ignore
          props.children
        }
      </KeyboardAvoidingView>
    </Pressable>
  );
}
