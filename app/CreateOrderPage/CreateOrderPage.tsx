import { ThemedContainer } from "@/components";
import CreateOrderOrg from "@/components/organisms/CreateOrder";
import { commonStyles } from "@/constants/CommonStyles";

export default function CreateOrderPage() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <CreateOrderOrg />
    </ThemedContainer>
  );
}
