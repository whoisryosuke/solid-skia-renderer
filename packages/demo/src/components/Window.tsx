import { Window as SkiaWindow } from "skia-canvas";
import { children, ParentProps } from "solid-js";

type Props = {}

const Window = (props: ParentProps<Props>) => {

    const childrenMap = children(() => props.children);
    // const childrenArray = childrenMap.toArray();
    // console.log('[WINDOW] children', props.children, childrenArray[0].render)

    // Initialize Window
    let win = new SkiaWindow(300, 300,{background:'rgba(16, 16, 16, 0.35)'});
    win.title = "Canvas Window";

    // Render / infinite loop lifecycle
    win.on("draw", (e) => {
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
        const childrenArray = childrenMap.toArray();
        childrenArray.forEach((child) => child?.render?.(e, ctx))
    });

    win.on('mousemove', ({button, x, y, target, ctrlKey, altKey, shiftKey, metaKey, pageX, pageY, ...rest}) => {
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
    })

    win.on('keydown', ({key, target}) => {
        let ctx = target.canvas.getContext("2d");
        // const { canvas, ctx } = win;
        if (key == 'Escape'){
            // ctx.clearRect(0, 0, target.canvas.width, target.canvas.height)

            // Close window
            target.close()
        }
    })
}

export default Window