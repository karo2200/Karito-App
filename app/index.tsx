import { ThemedContainer } from "@/components";
import { Colors } from "@/constants/Colors";
import { FontType } from "@/constants/Fonts";
import authCacheStore from "@/stores/authCacheStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";

export default function SplashScreen() {
  const { isLoggedIn, isExpert, isSelectRole } = authCacheStore();

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn) {
        if (isExpert) {
          router?.replace("/(expertTabs)/workList");
        } else {
          router?.replace("/(tabs)/home");
        }
      } else {
        if (isExpert && isSelectRole) {
          router?.replace("/ExpertLoginPage");
        } else if (!isExpert && isSelectRole) {
          router?.replace("/LoginPage");
        } else {
          router?.replace("/(tabs)/home");
        }
      }
    }, 1000);
  }, [isLoggedIn, isExpert, isSelectRole]);

  return (
    <ThemedContainer style={styles.container}>
      <Text style={styles.text}>کاریتو</Text>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.hint500,
  },

  text: {
    fontSize: 48,
    color: Colors.white,
    fontFamily: FontType.YekanBakhFat,
  },
});
