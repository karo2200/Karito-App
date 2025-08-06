import { CustomImage, ThemedText, ThemedView } from "@/components";
import { Colors } from "@/constants/Colors";

export type HeaderItemProps = {
  Icon?: any;
  title?: string;
  imagePath?: string;
};

export default function HeaderItem({
  Icon,
  title,
  imagePath,
}: HeaderItemProps) {
  return (
    <ThemedView style={{ alignItems: "center", marginLeft: 34 }}>
      <ThemedView
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.gray50,
          overflow: "hidden",
        }}
      >
        {imagePath ? (
          <CustomImage src={imagePath} />
        ) : Icon ? (
          <Icon color={Colors.hint500} size={24} />
        ) : (
          <></>
        )}
      </ThemedView>
      <ThemedText>{title}</ThemedText>
    </ThemedView>
  );
}
