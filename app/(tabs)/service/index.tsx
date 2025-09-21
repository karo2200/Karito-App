import { ThemedContainer } from "@/components";
import BeComeExpert from "@/components/organisms/Registration/BeComeExpert";
import { commonStyles } from "@/constants/CommonStyles";

export default function ServicePage() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <BeComeExpert />
    </ThemedContainer>
  );
}
