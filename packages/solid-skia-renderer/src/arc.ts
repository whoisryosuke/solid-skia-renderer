import { VElement } from "./node";
import { SkiaElement } from "./types";

export default class Arc extends SkiaElement {

    mounted = false;

    constructor(parent: VElement|null = null) {
        super('arc', parent);
    }

    setMounted(isMounted: boolean) {
        this.mounted = isMounted;
    }

    render(context: any) {
        let ctx: CanvasRenderingContext2D = context.target.canvas.getContext("2d");
        const {
            x = 0,
            y = 0,
            radius = 10,
            color = 'blue'
        } = this.props;
        
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}