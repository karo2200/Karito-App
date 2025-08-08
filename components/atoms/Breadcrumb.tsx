import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import ThemedText from "./ThemedText";

interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  items: Crumb[];
}

export default function Breadcrumb({ items }: Props) {
  const router = useRouter();

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
      horizontal
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.crumbContainer}>
            {!isLast && <ThemedText style={styles.separator}>/</ThemedText>}
            {!isLast ? (
              <Pressable onPress={() => item.href && router.push(item.href)}>
                <ThemedText style={styles.link}>{item.label}</ThemedText>
              </Pressable>
            ) : (
              <ThemedText style={styles.current}>{item.label}</ThemedText>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },

  crumbContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  link: {
    color: Colors.gray500,
  },

  current: {
    color: Colors.label,
  },

  separator: {
    color: Colors.unfilledText,
    marginHorizontal: 5,
    alignSelf: "center",
  },

  contentContainer: {
    flexDirection: "row-reverse",
    width: "100%",
  },
});
