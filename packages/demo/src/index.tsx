import store from "./store";
import { render, VElement } from "solid-skia-renderer";
import { createSignal, onCleanup, batch } from "solid-js";
import Window from "./components/Window"
import SkiaButton from "./elements/Button";

const Button = () => {
  console.log('[BUTTON] rendering')
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
  //@ts-ignore
  return <testelement>
  {/* @ts-ignore  */}
    <Window frames={frames()}>
      <Button />
    </Window>
  {/* @ts-ignore  */}
  </testelement>;
}
const rootEl = new VElement('root');
//@ts-ignore
render(App, rootEl);
