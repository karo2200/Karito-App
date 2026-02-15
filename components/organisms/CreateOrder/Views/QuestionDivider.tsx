import { ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";
import { DeviceWidth } from "@/constants/Dimension";

export default function QuestionDivider({
  marginBottom = 24,
  marginTop = 8,
}: {
  marginBottom?: number;
  marginTop?: number;
}) {
  return (
    <ThemedView
      style={{
        overflow: "hidden",
        flexDirection: "row",
        width: DeviceWidth * 0.9,
        marginBottom,
        marginTop,
      }}
    >
      {Array.from({ length: 60 }).map((item, index) => {
        return (
          <ThemedView
            key={`${index}`}
            style={{
              width: 3,
              height: 1,
              marginHorizontal: 3,
              backgroundColor: Colors.gray300,
            }}
          />
        );
      })}
    </ThemedView>
  );
}
