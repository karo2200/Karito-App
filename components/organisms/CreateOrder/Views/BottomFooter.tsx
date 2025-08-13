import { Divider, ThemedButton, ThemedView } from "@/components";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomFooterProps = {
  onNextPress?: () => void;
  onBackPress?: () => void;
  nextDisabled?: boolean;
};

export default function BottomFooter({
  onNextPress,
  onBackPress,
  nextDisabled,
}: BottomFooterProps) {
  const insets = useSafeAreaInsets();
  const marginBottom = insets.bottom + 10;

  return (
    <ThemedView style={[styles.bottomView, { marginBottom }]}>
      <ThemedButton
        title="بعدی"
        style={styles.flex1}
        disabled={nextDisabled}
        onPress={onNextPress}
      />
      <Divider height={0} width={8} />
      <ThemedButton
        title="قبلی"
        type="outline"
        style={styles.flex1}
        onPress={onBackPress}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  flex1: { flex: 1 },
});
