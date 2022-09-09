// example custom dom renderer
import { createRenderer } from "solid-js/universal";
import Button from "./button";
import { VElement } from "./node"
import { useCounter } from "./useContext";
// import { createElement as createThreeElement, SupportedThreeElements } from "./three"


const log = (...args: any) => {
  console.log(`[RENDERER] `, ...args);
}

log('renderer running!')


export const {
  render,
  effect,
  memo,
  createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps
} = createRenderer({
  createElement(elementName: string): VElement {
    log('creating element', elementName);
    console.log('creating element', elementName)

    return new Button([100, 100]);
  },
  createTextNode(elementName: string): VElement {
    log('creating text element', elementName);
    // @TODO: Figure out Text in ThreeJS
    // return createTextElement(value);
    return new VElement(elementName);
  },
  replaceText(textNode: VElement, value) {
    textNode.content = value;
  },
  setProperty(node: VElement, name: string, value: any) {
    node.setAttribute(name, value);
  },
  insertNode(parent: VElement, node: VElement, anchor: VElement) {
    log('inserting node', {parent, node})
    //@ts-ignore
    node.render?.();
    if(!parent){
      log('no parent found!', node, node.content, node.childNodes)
    }
    node.setParentNode(parent);
  },
  isTextNode(node: VElement) {
    return node.type === 3;
  },
  removeNode(parent: VElement, node: VElement) {
    parent.removeChild(node);
  },
  getParentNode(node: VElement) {
    return node.parentNode;
  },
  getFirstChild(node: VElement) {
    return node.firstChild;
  },
  getNextSibling(node: VElement) {
    return node.nextSibling;
  }
});

// Forward Solid control flow
export {
  For,
  Show,
  Suspense,
  SuspenseList,
  Switch,
  Match,
  Index,
  ErrorBoundary
} from "solid-js";