import { ThemedContainer } from "@/components";
import AddressScreen from "@/components/organisms/address/AddressScreen";
import { commonStyles } from "@/constants/CommonStyles";

export default function AddressPage() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <AddressScreen />
    </ThemedContainer>
  );
}
