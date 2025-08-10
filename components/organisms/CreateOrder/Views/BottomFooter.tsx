import { Divider, ThemedButton } from "@/components";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  return (
    <SafeAreaView style={styles.bottomView}>
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
    </SafeAreaView>
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
