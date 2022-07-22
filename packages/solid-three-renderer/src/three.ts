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

// The scene and renderer are initialized together
const newScene = (...props: any[]) => {
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // SSR Warning: We assume DOM here
    document.body.appendChild( renderer.domElement );

    return [scene, renderer];
}

// Handle special cases for initializing ThreeJS elements
const threeHandler = (type: SupportedThreeElements, ...props: any[]) => {
    switch(type) {
        case 'scene':
            const scene = newScene(...props);
            return scene;
        default:
            const elementName = THREE_ELEMENTS[type];
            const newElement = new THREE[elementName](...props)
            return newElement;
    }
}

/**
 * Creates a ThreeJS element and attaches to virtual node/element system
 * This doesn't add to the node tree, or any scenes
 * @param type 
 * @param props 
 * @returns 
 */
export const createElement = (type: SupportedThreeElements, ...props: any[]): VElement => {
    // Create ThreeJS element
    const newElement = threeHandler(type, ...props)

    // Create Element/Node class and assign ThreeJS element
    const newNode = new VElement(newElement);
    // If this is a scene object, we set the scene property in our node
    // This assures when we add children, they can check the parent for scene to add
    if(type === 'scene') {
        newNode.parentElement = newElement;
    }

    console.log('created threejs element', newNode)
    return newNode;
}
