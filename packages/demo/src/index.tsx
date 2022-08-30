import store from "./store";
import { render, VElement } from "solid-skia-renderer";
import { createSignal, onCleanup, batch } from "solid-js";
import Window from "./components/Window"

const [frames, setFrames] = createSignal(0);

const App = () => {

  const interval = setInterval(() => {
    setFrames((prevFrame) => prevFrame++)
    console.log('[APP] looping')
  }, 100)

  onCleanup(() => clearInterval(interval));

  const newElement = new VElement('app')
  console.log('[APP] rendering App component', frames());
  //@ts-ignore
  // return (<div></div>);
  return <Window />;
}
//@ts-ignore
render(App, null);
