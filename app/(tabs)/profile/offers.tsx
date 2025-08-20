import { ThemedContainer } from "@/components";
import OffersScreen from "@/components/organisms/offers/OfferScreen";
import { commonStyles } from "@/constants/CommonStyles";

export default function AddressPage() {
  return (
    <ThemedContainer style={commonStyles.container}>
      <OffersScreen />
    </ThemedContainer>
  );
}
