import { Window as SkiaWindow } from "skia-canvas";
import { children, onCleanup, ParentProps } from "solid-js";
import store, { SkiaDrawEvent } from "../store";

type Props = {}

const Window = (props: ParentProps<Props>) => {

    const childrenMap = children(() => props.children);
    const childrenArray = childrenMap.toArray();

    const {context} = store.getState();

    childrenArray.forEach((child) => child?.render?.(context))


}

export default Window