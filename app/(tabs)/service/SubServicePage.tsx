import { SubServiceOrg, ThemedContainer } from "@/components";
import { commonStyles } from "@/constants/CommonStyles";

export default function SubServicePage() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <SubServiceOrg />
    </ThemedContainer>
  );
}
