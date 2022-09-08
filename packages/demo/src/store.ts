import create from "zustand/vanilla";
import { CanvasRenderingContext2D, Window } from "skia-canvas/lib";

export type SkiaDrawEvent = {target: Window, frame: number, type: "draw"}
export type SkiaDrawContext = Omit<SkiaDrawEvent, 'type'>;

type BearState = {
  context: SkiaDrawContext
  syncDraw: (context: SkiaDrawContext) => void
}
const store = create<BearState>((set) => ({
  context: {
    target: new Window(),
    frame:0,
  },
  syncDraw: (context) => set((state) => ({ context })),
}));

export default store;
