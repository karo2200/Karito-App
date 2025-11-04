import { ThemedText, ThemedView } from "@/components";
import CustomInput from "@/components/atoms/ThemedInput";
import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export default function OrderDescription(props: any) {
  return (
    <ThemedView style={styles.view}>
      <ThemedText type="title" fontType="bold">
        لطفا هر توضیح دیگری که نیاز است متخصص بداند را در این قسمت وارد کنید:
        <ThemedText style={styles.reqTxt} fontType="bold">
          *
        </ThemedText>
      </ThemedText>
      <CustomInput
        name="description"
        textArea
        placeholder="توضیحات"
        rules={{ required: true }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  view: { width: "100%" },

  reqTxt: { color: Colors.darkError, fontSize: 18 },
});
