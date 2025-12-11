import NoOrderIcon from "@/assets/icons/No-Order";
import ThemedText from "@/components/atoms/ThemedText";
import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useExpertHook from "../../Registration/hooks/Expert.hook";

export default function ListEmptyOrder({
  onSeeListPress,
}: {
  onSeeListPress: () => void;
}) {
  const { userAproved, isExpert } = useExpertHook();

  return (
    <View style={styles.flex1}>
      <NoOrderIcon />
      <ThemedText style={styles.title}>
        {!isExpert
          ? " هیچ سفارشی در لیست ندارید!"
          : userAproved
            ? " هیچ سفارشی در لیست ندارید!"
            : "در انتظار تایید از طرف ادمین باشید"}
      </ThemedText>
      {userAproved && (
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={1}
          onPress={onSeeListPress}
        >
          <ThemedText style={styles.txtBtn}>مشاهده لیست خدمات</ThemedText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    width: 177,
    backgroundColor: Colors.hint500,
    alignSelf: "center",
    paddingVertical: 8,
    borderRadius: 6,
  },

  title: {
    textAlign: "center",
    marginTop: 23,
    marginBottom: 70,
  },

  flex1: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: "20%",
  },

  txtBtn: {
    color: "white",
  },
});
