import { createSignal } from "solid-js";
import { CounterContext } from "solid-skia-renderer"
import store from "../store";

export function CounterProvider(props: any) {
const {context} = store.getState();
    
  return (
    //@ts-ignore
    <CounterContext.Provider value={context}>
      {props.children}
    </CounterContext.Provider>
  );
}