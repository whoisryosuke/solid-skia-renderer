import store from "./store";
import { render, VElement, } from "solid-skia-renderer";
import { createSignal, onCleanup, batch, createMemo } from "solid-js";
import Window from "./components/Window"
import SkiaButton from "./elements/Button";

type ButtonProps = {
  position: number[];
}

// We can create functional components like we would in Solid/React/Preact
const Button = ({position}: ButtonProps) => {
  console.log('[BUTTON] rendering')

  // In order to give the end user access to drawing to canvas
  // We return a class that extends VElement with a `render()` method
  // Any `<Window>` will go through it's child components and run that `render()`
  // This is similar to the DOM's `document.createElement('div')`, which happens underneath your `<div>`
  // @TODO: Allow this -- but also let user type `<button>` and get a generic button from Solid universal?
  return new SkiaButton(position);
}

// Signals work! 
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
    const { bears } = store.getState();
    //@ts-ignore
    return bears > 1 && <Button position={[100,100]} />
  })

  return (
    // @TODO: Add void and SkiaElement as a return to JSX Elements (in global.d.ts)
    //@ts-ignore
    <Window>
      {/* @ts-ignore */}
      <Button position={[50,50]} />
      {optionalButton}
    </Window>
    );
}
const rootEl = new VElement('root');
//@ts-ignore
render(App, rootEl);
