import { Window as SkiaWindow, CanvasRenderingContext2D } from "skia-canvas";
import store, { SkiaDrawEvent } from "./store";
import { render, VElement,  } from "solid-skia-renderer";
import { createSignal, onCleanup,onMount, batch, createMemo } from "solid-js";
import Window from "./components/Window"
import SkiaButton from "./elements/Button";
import { SkiaElement } from "./types";
import { CounterProvider } from "./components/CounterProvider";

type ButtonProps = {
  position: number[];
}

// We can create functional components like we would in Solid/React/Preact
const Button = ({position}: ButtonProps) => {
  const [isMounted, setIsMounted] = createSignal(false);

  console.log('[BUTTON] rendering')
  const { scene, addNode } = store.getState();

  const mountComponent = (component: SkiaElement) => {
    console.log('[BUTTON] Adding node to scene graph')
    addNode(component);
    setIsMounted(true);
  }

  // These don't work
  onMount(() => {
    console.log('[BUTTON] Mounting')
  })
  onCleanup(() => {
    console.log('[BUTTON] Cleaning up')
  })

  // In order to give the end user access to drawing to canvas
  // We return a class that extends VElement with a `render()` method
  // Any `<Window>` will go through it's child components and run that `render()`
  // This is similar to the DOM's `document.createElement('div')`, which happens underneath your `<div>`
  // @TODO: Allow this -- but also let user type `<button>` and get a generic button from Solid universal?
  // const ref = new SkiaButton(position);
  // mountComponent(ref);
  return <button></button>;
}

// Signals work! Only outside components though (aka global state)
const [frames, setFrames] = createSignal(0);

const App = () => {
  // We can use state inside of components

  // But we can't do things like "loops"
  // We get this through the `render` method in our SkiaElement 
  // (which runs every frame, and has context to time)

  // const interval = setInterval(() => {
  //   setFrames((prevFrame) => prevFrame++)
  //   console.log('[APP] looping')
  // }, 100)
  // onCleanup(() => clearInterval(interval));

  // Signal example (fires only once, since app will only ever render once)
  setFrames((prev) => prev + 1)
  console.log('[APP] rendering App component', frames());

  // Any inline conditionals need to be memoized separately
  // This is a SolidJS server issue - it reaches for web APIs
  // Using the `createMemo` function directly circumvents this (albeit not as nice)
  // **Ultimately, this only runs once, so any state/store stuff won't work**
  const optionalButton = createMemo(() => { 
    //@ts-ignore
    return frames() > 50 && <Button position={[100,100]} />
  })

  return (
    // @TODO: Add void and SkiaElement as a return to JSX Elements (in global.d.ts)
    //@ts-ignore
    <Window>
      {/* @ts-ignore */}
      <Button position={[50,50]} />
      {/* @ts-ignore */}
      {optionalButton}
    </Window>
    );
}
const rootEl = new VElement('root');

// Initialize Window
let win = new SkiaWindow(800, 800,{background:'rgba(16, 16, 16, 0.35)'});
win.title = "Canvas Window";

const draw = (e: SkiaDrawEvent) => {
  console.log('draw type', typeof e, Object.keys(e))

    const {syncDraw} = store.getState();
    syncDraw(e);
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
    // childrenArray.forEach((child) => child?.render?.(e, ctx))

    // Render the JSX using SolidJS
    // This basically runs each component like a method
    // The components should:
    // 1) return other components or 
    // 2) create and add an element to the "scene graph" in Zustand store
    // So they can be rendered, process events, etc
    //@ts-ignore
    render(App, rootEl);

    // const {scene, setScene} = store.getState();

    // console.log('scene', scene)

    // Render all nodes in scene graph
    // scene.forEach(node => {
    //   node.render(e);
    // })

    // Clear the scene graph.
    // We do this because SolidJS components can't store state.
    // The element class can -- but since we create a "new" one through the JSX component
    // every frame, it wouldn't work anyway.
    // setScene([])

}

// Render / infinite loop lifecycle
win.on("draw", draw);

win.on('mousemove', (e) => {
    
    // childrenArray.forEach((child) => child?.mouse?.(e, win))
})

win.on('keydown', ({key, target}) => {
    let ctx = target.canvas.getContext("2d");
    // const { canvas, ctx } = win;
    if (key == 'Escape'){
        // ctx.clearRect(0, 0, target.canvas.width, target.canvas.height)

        // Close window
        target.close()
    }
    // childrenArray.forEach((child) => child?.keyboard?.(key, target))
})