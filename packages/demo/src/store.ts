import create from "zustand/vanilla";
import { CanvasRenderingContext2D, Window } from "skia-canvas/lib";
import { VNode } from "solid-skia-renderer";
import { SkiaElement } from "./types";

export type SkiaDrawEvent = {target: Window, frame: number, type: "draw"}
export type SkiaDrawContext = Omit<SkiaDrawEvent, 'type'>;

type BearState = {
  context: SkiaDrawContext
  syncDraw: (context: SkiaDrawContext) => void
  
  /**
   * Scene graph
   */
  scene: SkiaElement[];
  setScene: (scene: SkiaElement[]) => void
  addNode: (node: SkiaElement) => void

}
const store = create<BearState>((set) => ({
  context: {
    target: new Window(),
    frame:0,
  },
  syncDraw: (context) => set((state) => ({ context })),

  scene: [],
  setScene: (scene) => set((state) => ({ scene })),
  addNode: (node) => set((state) => ({ scene: [...state.scene, node] })),

}));

export default store;
