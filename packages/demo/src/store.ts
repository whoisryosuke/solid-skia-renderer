import create from "zustand/vanilla";

interface BearState {
  bears: number
  increase: (by: number) => void
}
const store = create<BearState>((set) => ({
  bears: 1,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

export default store;
