import { ThemedContainer } from "@/components";
import ExpertIncome from "@/components/organisms/expertIncome";
import { commonStyles } from "@/constants/CommonStyles";

export default function IncomePage() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <ExpertIncome />
    </ThemedContainer>
  );
}
