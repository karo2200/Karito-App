import { Divider, ThemedButton, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { formatPrice } from "@/services/ParseData";
import { toPersianNumber } from "@/services/helper";
import { InfoCircle } from "iconsax-react-native";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomFooterProps = {
  onNextPress?: () => void;
  onBackPress?: () => void;
  nextDisabled?: boolean;
  nextLoading?: boolean;
  totalPrice?: number;
};

export default function BottomFooter({
  onNextPress,
  onBackPress,
  nextDisabled,
  nextLoading,
  totalPrice,
}: BottomFooterProps) {
  const insets = useSafeAreaInsets();
  const marginBottom = insets.bottom + 10;

  return (
    <ThemedView style={[styles.container, { marginBottom }]}>
      <ThemedView
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <ThemedText
          fontType="semiBold"
          style={{ fontSize: 16, color: Colors.black }}
        >
          {`${toPersianNumber(formatPrice(totalPrice))} `}
          <ThemedText style={{ fontSize: 12 }} fontType="regular">
            تومان
          </ThemedText>
        </ThemedText>
        <ThemedText
          style={{
            flex: 1,
            fontSize: 12,
            color: Colors.gray500,
            marginHorizontal: 6,
          }}
        >
          هزینه تمام شده تا این مرحله
        </ThemedText>
        <InfoCircle size={14} color={Colors.gray500} />
      </ThemedView>
      <ThemedView style={[styles.bottomView]}>
        <ThemedButton
          title="بعدی"
          style={styles.flex1}
          disabled={nextDisabled}
          onPress={onNextPress}
          isLoading={nextLoading}
        />
        <Divider height={0} width={8} />
        <ThemedButton
          title="قبلی"
          type="outline"
          style={{ flex: 0.5 }}
          onPress={onBackPress}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bottomView: {
    flexDirection: "row",
  },

  flex1: { flex: 1 },

  container: {
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: Colors.gray300,
    shadowColor: "rgba(10, 13, 18, 0.06)",
    elevation: 10,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0,
    shadowOffset: { width: 10, height: 8 },
    margin: 2,
  },
});
