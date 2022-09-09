import { VElement } from "./node";
import { useCounter } from "./useContext";

export default class Button extends VElement {
    // Pass in any properties we need access to in our render or input events
    position: number[] = [0,0];

    constructor(position = [0,0]) {
        super('');
        this.position = position;
    }


    render() {
        const context: any = useCounter();
        console.log('Button element - Context!!', context)

        let ctx: CanvasRenderingContext2D = context.target.canvas.getContext("2d");
        
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
    }
}