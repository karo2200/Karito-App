import { ThemedView } from "@/components";
import { ProgressBar } from "@/components/molecules/ProgressBar";
import { StyleSheet } from "react-native";
import BottomFooter from "./Views/BottomFooter";
import { CreateOrderSetup } from "./Views/CreateOrderSetup";
import useCreateOrder from "./createOrder.hook";

export default function CreateOrderOrg() {
  const {
    progressPersent,
    stage,
    configDatas,
    nextDisabled,
    onBackPress,
    onNextPress,
  } = useCreateOrder();

  return (
    <ThemedView style={styles.container}>
      <ProgressBar percent={Math.floor(progressPersent)} />
      <ThemedView style={styles.container}>
        <CreateOrderSetup type={configDatas[stage].type} />
      </ThemedView>
      <BottomFooter
        onNextPress={onNextPress}
        onBackPress={onBackPress}
        nextDisabled={nextDisabled}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },

  flex1: { flex: 1 },
});
