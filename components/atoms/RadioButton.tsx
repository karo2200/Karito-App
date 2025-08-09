import { Colors } from "@/constants/Colors";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ThemedText from "./ThemedText";

export const RadioButton = ({
  label,
  selected,
  onPress,
}: {
  label?: string;
  selected: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
      <View style={[styles.radioCircle, selected && styles.selectedCircle]}>
        {selected && <View style={styles.innerView} />}
      </View>
      {label && <ThemedText style={styles.radioLabel}>{label}</ThemedText>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.mediumGray,
    marginLeft: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedCircle: {
    borderColor: Colors.hint500,
  },
  radioLabel: {
    color: Colors.semiBlack,
  },

  innerView: {
    height: 12,
    width: 12,
    borderRadius: 24,
    backgroundColor: Colors.hint500,
    alignSelf: "center",
  },
});
