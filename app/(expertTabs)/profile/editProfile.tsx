import { ThemedContainer } from "@/components";
import PersonalInfo from "@/components/organisms/PersonalInfo/PersonalInfo";

export default function editProfilePage() {
  return (
    <ThemedContainer style={{ paddingHorizontal: 15 }}>
      <PersonalInfo />
    </ThemedContainer>
  );
}
