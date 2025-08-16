import BackArrowIcon from "@/assets/icons/BackArrow";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

export default function ScreenNameWithBack({
  title,
  onBackPress,
}: {
  title: string;
  onBackPress?: () => void;
}) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ThemedText fontType="bold" style={styles.title}>
        {title}
      </ThemedText>
      <Pressable
        onPress={() => (onBackPress ? onBackPress?.() : router.back())}
        style={styles.backBtn}
      >
        <BackArrowIcon />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "black",
  },

  backBtn: { paddingLeft: 8 },

  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
  },
});
