import { ThemedText } from "@/components";
import { useToast } from "@/components/atoms/Toast";
import { Colors } from "@/constants/Colors";
import * as Clipboard from "expo-clipboard";
import { Copy } from "iconsax-react-native";
import { Pressable, StyleSheet, View } from "react-native";

export default function OfferCard({ item }: { item: any }) {
  const { showToast } = useToast();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("این متن برای کپی شدن است");
    showToast({
      message: "کد تخفیف کپی شد.",
      type: "warning",
    });
  };

  return (
    <Pressable onPress={copyToClipboard} style={styles.container}>
      <ThemedText fontType="medium" style={{ color: Colors.label }}>
        ورود به کاریتو
      </ThemedText>
      <View style={styles.rowView}>
        <ThemedText fontType="medium" style={styles.code}>
          CMYKHNN
        </ThemedText>
        <Copy size={24} color={Colors.label} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row-reverse",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayMedium,
    paddingVertical: 16,
  },

  rowView: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
  },

  code: { color: Colors.label, marginLeft: 8, alignSelf: "center" },
});
