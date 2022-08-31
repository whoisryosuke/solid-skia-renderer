import { Window as SkiaWindow } from "skia-canvas";
import { children, onCleanup, ParentProps } from "solid-js";

type Props = {}

const Window = (props: ParentProps<Props>) => {

    const childrenMap = children(() => props.children);
    const childrenArray = childrenMap.toArray();
    // const childrenArray = childrenMap.toArray();
    // console.log('[WINDOW] children', props.children, childrenArray[0].render)

    // Initialize Window
    let win = new SkiaWindow(300, 300,{background:'rgba(16, 16, 16, 0.35)'});
    win.title = "Canvas Window";

    const draw = (e) => {
        let ctx: CanvasRenderingContext2D = e.target.canvas.getContext("2d");
        // console.log("test", e.target);
        // ctx.lineWidth = 25 + 25 * Math.cos(e.frame / 10);
        // ctx.beginPath();
        // ctx.arc(150, 150, 50, 0, 2 * Math.PI);
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.arc(150, 150, 10, 0, 2 * Math.PI);
        // ctx.stroke();
        // ctx.fill();

        // console.log('[WINDOW] children', props.children, childrenMap.toArray())
        // Loop through the children and run their render method
        // @TODO: Loop recursively through any container children
        childrenArray.forEach((child) => child?.render?.(e, ctx))
    }

    // Render / infinite loop lifecycle
    win.on("draw", draw);

    win.on('mousemove', (e) => {
        
        childrenArray.forEach((child) => child?.mouse?.(e, win))
    })

    win.on('keydown', ({key, target}) => {
        let ctx = target.canvas.getContext("2d");
        // const { canvas, ctx } = win;
        if (key == 'Escape'){
            // ctx.clearRect(0, 0, target.canvas.width, target.canvas.height)

            // Close window
            target.close()
        }
        childrenArray.forEach((child) => child?.keyboard?.(key, target))
    })

    onCleanup(() => {
        win.off("draw", draw);
    })
}

export default Window