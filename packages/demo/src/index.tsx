import store from "./store";
import { render, VElement, } from "solid-skia-renderer";
import { createSignal, onCleanup, batch, createMemo } from "solid-js";
import Window from "./components/Window"
import SkiaButton from "./elements/Button";

type ButtonProps = {
  position: number[];
}

const Button = ({position}: ButtonProps) => {
  console.log('[BUTTON] rendering')

  // In order to give the end user access to drawing to canvas
  // We return a class that extends VElement with a `render()` method
  // Any `<Window>` will go through it's child components and run that `render()`
  return new SkiaButton(position);
}

// Signals work! Kinda.
const [frames, setFrames] = createSignal(0);

const App = () => {
  // We can use state inside of components
  const { bears } = store.getState();

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

    //@ts-ignore
  const optionalButton = createMemo(() => bears > 1 && <Button position={[10,10]} />)
  return (
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
