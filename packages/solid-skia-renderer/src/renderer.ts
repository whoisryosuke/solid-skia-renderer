// example custom dom renderer
import { createRenderer } from "solid-js/universal";
import { VElement } from "./node"
// import { createElement as createThreeElement, SupportedThreeElements } from "./three"

const log = (...args: any) => {
  console.log(`[RENDERER] `, ...args);
}

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
  createElement(string: string): VElement {
    log('creating element', string);
    // return createThreeElement(string);

    return new VElement('text');
  },
  createTextNode(value: string): VElement {
    // @TODO: Figure out Text in ThreeJS
    // return createTextElement(value);
    return new VElement('text');
  },
  replaceText(textNode: VElement, value) {
    textNode.content = value;
  },
  setProperty(node: VElement, name: string, value: any) {
    node.setAttribute(name, value);
  },
  insertNode(parent: VElement, node: VElement, anchor: VElement) {
    log('render', {parent, node})
    if(!parent){
      log('no parent found!', node, node.content, node.childNodes)
    }
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