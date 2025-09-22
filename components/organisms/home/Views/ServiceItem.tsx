import CustomImage from "@/components/atoms/CustomImage";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { ServiceTypeDto } from "@/generated/graphql";
import { hideSheet, showSheet } from "@/hooks/useShowSheet";
import authCacheStore from "@/stores/authCacheStore";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

export default function ServiceItem({
  item,
  style,
}: {
  item: ServiceTypeDto;
  style: ViewStyle | undefined;
}) {
  const router = useRouter();
  const { isLoggedIn } = authCacheStore();
  return (
    <View style={[styles.container, style]}>
      <CustomImage style={styles.image} src={item?.logo} resizeMode="cover" />
      <ThemedText type="default" style={styles.title} numberOfLines={1}>
        {item?.name}
      </ThemedText>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          isLoggedIn
            ? router.push(
                `/CreateOrderPage/CreateOrderPage?sub=${item?.id}&name=${item?.name}&price=${item?.basePrice}`
              )
            : showSheet("confirmation-action", {
                payload: {
                  hasLoading: false,
                  showToastInActionSheet: false,
                  title: "ورود",

                  onClose: () => {
                    hideSheet("confirmation-action");
                  },
                },
              })
        }
      >
        <ThemedText style={styles.buttonText}>سفارش</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 12,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },

  title: {
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 16,
  },

  image: {
    width: 186,
    height: 186,
    borderRadius: 4,
  },

  buttonText: {
    color: "white",
  },

  btn: {
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.hint500,
    height: 36,
    width: "100%",
    justifyContent: "center",
  },
});
