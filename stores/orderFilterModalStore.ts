import { ServiceRequestDtoFilterInput } from "@/generated/graphql";
import { create } from "zustand";

interface OrderFilterModalState {
  appliedFilter?: ServiceRequestDtoFilterInput;
  unAppliedFilter?: Record<string, any>;

  setAppliedFilter: (appliedFilter: ServiceRequestDtoFilterInput) => void;
  setUnAppliedFilter: (unAppliedFilter: Record<string, any>) => void;

  clear: () => void;
  clearUnAppliedFilter: () => void;
}

const useOrderFilterModalStore = create<OrderFilterModalState>((set) => ({
  appliedFilter: undefined,
  unAppliedFilter: undefined,

  setAppliedFilter: (appliedFilter) => set(() => ({ appliedFilter })),

  setUnAppliedFilter: (unAppliedFilter) => set(() => ({ unAppliedFilter })),

  clear: () => set(() => ({ appliedFilter: undefined })),

  clearUnAppliedFilter: () => set(() => ({ unAppliedFilter: undefined })),
}));

export default useOrderFilterModalStore;
