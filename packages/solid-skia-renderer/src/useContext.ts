import { createSignal, createContext, useContext } from "solid-js";

export const CounterContext = createContext();

export function useCounter() { return useContext(CounterContext); }