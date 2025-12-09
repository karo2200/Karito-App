import { ThemedContainer } from "@/components";
import AddressMap from "@/components/organisms/CreateOrder/CreateAddress";
import { commonStyles } from "@/constants/CommonStyles";

export default function CreateAddress() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <AddressMap />
    </ThemedContainer>
  );
}
