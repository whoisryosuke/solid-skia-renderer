import { CanvasRenderingContext2D, Window } from "skia-canvas/lib";
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
    mouse({button, x, y, target, ctrlKey, altKey, shiftKey, metaKey, pageX, pageY, ...rest}: any, win: Window) {
        let ctx = target.canvas.getContext("2d");
        // const { canvas, ctx } = win;
        if (!shiftKey && button == 0){ // a left click
            ctx.fillStyle = `rgb(${Math.floor(255 * Math.random())},50,0)`
            ctx.beginPath()
            ctx.arc(x, y, 10 + 30 * Math.random(), 0, 2 * Math.PI)
            ctx.fill()
            console.log('left click!', pageX, pageY)
        }

        // Shift and left click!
        if(shiftKey && button == 0) {
            console.log('shift left click!')

        }

        if (button == 1){ // a left click
            console.log('middle click!')
        }

        if (button == 2){ // a left click
            console.log('right click!')
        }

        win.cursor = button === 0 ? 'none' : 'crosshair'
    }
    // @TODO: Handle keyboard events

    keyboard(key: string, target: any) {
        console.log('[BUTTON] Key pressed', key)
        if (key == 'A'){
            // ctx.clearRect(0, 0, target.canvas.width, target.canvas.height)

            // Close window
            target.close()
        }
    }
}