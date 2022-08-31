import store from "./store";
import { render, VElement } from "solid-skia-renderer";
import { createSignal, onCleanup, batch } from "solid-js";
import Window from "./components/Window"
import SkiaButton from "./elements/Button";

const Button = () => {
  console.log('[BUTTON] rendering')

  // In order to give the end user access to drawing to canvas
  // We return a class that extends VElement with a `render()` method
  // Any `<Window>` will go through it's child components and run that `render()`
  return new SkiaButton('button');
}

const [frames, setFrames] = createSignal(0);

const App = () => {

  const interval = setInterval(() => {
    setFrames((prevFrame) => prevFrame++)
    console.log('[APP] looping')
  }, 100)

  onCleanup(() => clearInterval(interval));

  console.log('[APP] rendering App component', frames());
  return <testelement>
    <Window frames={frames()}>
      <Button />
      <Button />
    </Window>
  </testelement>;
}
const rootEl = new VElement('root');
//@ts-ignore
render(App, rootEl);
