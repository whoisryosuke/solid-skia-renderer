import { CanvasRenderingContext2D, Window } from "skia-canvas/lib";
import { createSignal } from "solid-js";
import { VElement } from "solid-skia-renderer";
import store, { SkiaDrawContext, SkiaDrawEvent } from "../store"
import { SkiaElement } from "../types";

// We can use signals here too - basically like Zustand store - global-ish state
const [frames, setFrames] = createSignal(0);

export default class SkiaButton extends SkiaElement {

    // Pass in any properties we need access to in our render or input events
    position: number[] = [0,0];

    constructor(position = [0,0]) {
        super('');
        this.position = position;
    }

    // This is called on the `draw` lifecycle (e.g. each frame)
    render(e: SkiaDrawContext) {
        let ctx: CanvasRenderingContext2D = e.target.canvas.getContext("2d");

  
        // ctx.lineWidth = 25 + 25 * Math.cos(e.frame / 10);
        // ctx.beginPath();
        // ctx.arc(this.position[0], this.position[1], 50, 0, 2 * Math.PI);
        // ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();

        // console.log('[BUTTON] Drawing', frames())

        // Solid Signal example
        setFrames((prev) => prev + 1)

        // console.log('parent node', this.parentNode)
    }

    // @TODO: Handle mouse events
    // These events are global (e.g. every component would know every click - instead of only "onClick" events)
    // Ideally this method should only fire when this component is clicked
    // Which can be done using a offscreen target rendering hitboxes, and having a higher class fire appropriate component method
    mouse({button, x, y, target, ctrlKey, altKey, shiftKey, metaKey, pageX, pageY, ...rest}: any, win: Window) {
        // We can access the canvas here if needed
        // But you can't draw to it - that only happens in `render`
        // let ctx = target.canvas.getContext("2d");
        // const { canvas, ctx } = win;

        // Check the mouse event type (left, right, middle click)
        if (!shiftKey && button == 0){ // a left click
            
            // See mouse X/Y ++ Solid Signal example
            console.log('left click!', pageX, pageY, frames())

            // We can use Zustand store here to communicate back to SolidJS layer
            // Or even to the Skia render layer (aka `render()` above)
            // When user left clicks anywhere, increase number of "bears" in app
            // const { increase } = store.getState();
            // increase(1);
        }

        // Shift and left click!
        if(shiftKey && button == 0) {
            console.log('shift left click!')

        }

        // Middle click
        if (button == 1){ 
            console.log('middle click!')
        }

        // Right click
        if (button == 2){ 
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