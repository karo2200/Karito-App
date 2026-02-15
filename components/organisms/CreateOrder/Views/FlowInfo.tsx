import { ThemedText } from "@/components";
import { Colors } from "@/constants/Colors";
import { InfoCircle } from "iconsax-react-native";
import { View } from "react-native";

export default function FlowInfo({
  text,
  marginTop,
  marginBottom,
}: {
  text: string;
  marginTop?: number;
  marginBottom?: number;
}) {
  return (
    <View
      style={{
        height: 36,
        borderRadius: 6,
        borderWidth: 1,
        backgroundColor: Colors.info50,
        borderColor: Colors.info200,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: "row-reverse",
        width: "100%",
        alignItems: "center",
        marginTop,
        marginBottom,
      }}
    >
      <InfoCircle color={Colors.info["500"]} variant="Bold" size={20} />
      <ThemedText
        style={{
          fontSize: 10,
          color: Colors.info900,
          lineHeight: 16,
          marginHorizontal: 8,
        }}
        fontType="regular"
      >
        {text}
      </ThemedText>
    </View>
  );
}
