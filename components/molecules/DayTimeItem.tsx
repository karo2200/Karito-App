import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "..";

export default function DayTimeItem({
  title,
  subtitle,
  width,
  height,
  checked,
}) {
  return (
    <ThemedView
      style={[
        checked ? styles.selectedContainer : styles.deSelectedContainer,
        { width, height },
      ]}
    >
      {subtitle && (
        <ThemedText
          type="subtitle"
          style={checked ? styles.selectedText : styles.deSelectedText}
        >
          {subtitle}
        </ThemedText>
      )}
      <ThemedText
        fontType="bold"
        type="title"
        style={checked ? styles.selectedText : styles.deSelectedText}
      >
        {title}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  selectedContainer: {
    borderColor: Colors.hint500,
    backgroundColor: Colors.hint50,
    borderWidth: 2,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  deSelectedContainer: {
    borderColor: Colors.grayMedium,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderRadius: 12,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedText: { color: Colors.hint500 },
  deSelectedText: { color: Colors.semiBlack },
});
