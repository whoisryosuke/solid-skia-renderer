import create from "zustand/vanilla";
import { CanvasRenderingContext2D } from "skia-canvas/lib";

interface BearState {
  context: CanvasRenderingContext2D | null
  setContext: (context: CanvasRenderingContext2D) => void
}
const store = create<BearState>((set) => ({
  context: null,
  setContext: (context) => set((state) => ({ context })),
}));

export default store;
