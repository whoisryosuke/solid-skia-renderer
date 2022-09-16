import { Window } from "skia-canvas/lib";
import { VElement } from "solid-skia-renderer";

export type SkiaDrawEvent = {target: Window, frame: number, type: "draw"}
export type SkiaDrawContext = Omit<SkiaDrawEvent, 'type'>;

export abstract class SkiaElement extends VElement {
    mounted: boolean;
    render(e: SkiaDrawContext) {}
    mouse({button, x, y, target, ctrlKey, altKey, shiftKey, metaKey, pageX, pageY, ...rest}: any, win: Window) {}
    keyboard(key: string, target: any) {}
    setMounted(isMounted: boolean) {}
}