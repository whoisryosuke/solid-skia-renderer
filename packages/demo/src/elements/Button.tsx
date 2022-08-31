import { CanvasRenderingContext2D } from "skia-canvas/lib";
import { VElement } from "solid-skia-renderer";

export default class SkiaButton extends VElement {
    // This is called on the `draw` lifecycle (e.g. each frame)
    render(e: any, ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = 25 + 25 * Math.cos(e.frame / 10);
        ctx.beginPath();
        ctx.arc(150, 150, 50, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(150, 150, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }

    // @TODO: Handle mouse events
    // @TODO: Handle keyboard events
}