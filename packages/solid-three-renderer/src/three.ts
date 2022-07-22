import * as THREE from 'three';
import { VElement } from "./node"

const THREE_ELEMENTS = {
    'scene': "Scene",
    'perspectiveCamera': "PerspectiveCamera",
    'directionalLight': "DirectionalLight",
    'mesh': "Mesh",
    'group': "group",
    'boxBufferGeometry': "BoxBufferGeometry",
}

export type SupportedThreeElements = keyof typeof THREE_ELEMENTS;

/**
 * Creates a ThreeJS element and attaches to virtual node/element system
 * This doesn't add to the node tree, or any scenes
 * @param type 
 * @param props 
 * @returns 
 */
export const createElement = (type: SupportedThreeElements, ...props: any[]): VElement => {
    // Create ThreeJS element
    const elementName = THREE_ELEMENTS[type];
    const newElement = new THREE[elementName](...props)

    // Create Element/Node class and assign ThreeJS element
    const newNode = new VElement(newElement);
    // If this is a scene object, we set the scene property in our node
    // This assures when we add children, they can check the parent for scene to add
    if(type === 'scene') {
        newNode.parentElement = newElement;
    }

    return newNode;
}
