import { ThemedContainer } from "@/components";
import ServiceOrg from "@/components/organisms/service/ServiceOrg";
import { commonStyles } from "@/constants/CommonStyles";

export default function ServicePage() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <ServiceOrg />
    </ThemedContainer>
  );
}
