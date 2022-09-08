import { Window } from "skia-canvas/lib";
import { VElement } from "solid-skia-renderer";
import { SkiaDrawContext } from "./store";

export abstract class SkiaElement extends VElement {
    render(e: SkiaDrawContext) {}
    mouse({button, x, y, target, ctrlKey, altKey, shiftKey, metaKey, pageX, pageY, ...rest}: any, win: Window) {}
    keyboard(key: string, target: any) {}
}