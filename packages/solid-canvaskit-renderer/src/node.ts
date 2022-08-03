import * as THREE from 'three';
/**
 * Types of Virtual Nodes
 * Generic types to describe the different content types inside nodes
 * Based off DOM Node.nodeType
 * @see: https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
 */
enum VNodeTypes {
    /**
     * Any element (mesh, group, etc)
     */
    ELEMENT,
    /**
     * Attribute of elements (not sure if we'll need this)
     */
    ATTRIBUTE,
    /**
     * Text node (separated so we can accomodate rendering - text is always special)
     */
    TEXT,
    /**
     * Comments inside code (separated so we don't render)
     */
    COMMENT,
}

type ThreeParents = THREE.Scene | THREE.Object3D;

/**
 * Virtual node based on DOM Node
 */
export class VNode {
    // Node properties
    /**
     * Reference to the content (e.g. Mesh class in ThreeJS)
     */
    content: any;
    parentNode: VNode | null;
    nextSibling: VNode;
    prevSibling: VNode;
    childNodes: VNode[];
    firstChild: VNode;
    // Convenience type to know what underlying content is
    // So renderer can detect things like text and handle accordingly
    type: VNodeTypes;

    // ThreeJS specific
    // We keep track of the parent element (scene, group, mesh, etc)
    // so we can add object to ThreeJS Scene (or nest it appropriately)
    parentElement: ThreeParents;

    constructor(content: any, parent = null, type = VNodeTypes.ELEMENT, parentElement?: THREE.Scene | THREE.Object3D) {
        // super();
        this.content = content;
        this.childNodes = [];
        this.type = type;
        if(parent) this.parentNode = parent;
        if(parentElement) this.parentElement = parentElement;
    }

    // Methods for exposing private properties to parents
    updateNextSibling(node: VNode) {
        this.nextSibling = node;
    }

    updatePreviousSibling(node: VNode) {
        this.prevSibling = node;
    }

    appendChild(node: VNode) {
        this.childNodes = [
            ...this.childNodes,
            node,
        ]
    }

    setParentNode(node: VNode) {
        this.parentNode = node;
    }

    setParentElement(node: ThreeParents) {
        this.parentElement = node;
    }

    // Inserts node before the anchor node
    // If no node is provided, node is inserted as last child
    insertBefore(node: VNode, anchor: VNode | null) {
        // Set this node as the parent to the incoming node
        console.log('inserting before', node.setParentNode, node.content)
        node.setParentNode(this);
        node.setParentElement(this.parentElement);
        // ThreeJS: Set the scene from parent node

        // Find anchor and insert node using anchor index 
        // (aka before, since it will push anchor index forward)
        if(anchor) {
            const anchorIndex = this.childNodes.findIndex((childNode) => childNode === anchor);

            if(anchorIndex >= 0){
                this.childNodes = this.childNodes.splice(anchorIndex, 0, node);

                // Update neighbors and inform them of their new sibling
                // Left side
                if(anchorIndex > 0) {
                    const previousSibling = this.childNodes[anchorIndex - 1];
                    previousSibling.updateNextSibling(node);
                    node.updatePreviousSibling(previousSibling);
                }
                // Right side
                const nextSibling = this.childNodes[anchorIndex + 1];
                if(nextSibling) {
                    node.updateNextSibling(nextSibling);
                    nextSibling.updatePreviousSibling(node);
                }

                // If the index is 0, we need to also update firstChild property
                if(anchorIndex === 0) this.firstChild = node;

                // ThreeJS: Add element to Scene
                node.addToParentElement();

                return this;
            }
        }
        this.childNodes = [
            ...this.childNodes,
            node,
        ]

        // ThreeJS: Add element to Scene
        node.addToParentElement();

        return this;
    }

    removeChild(node: VNode) {
        this.childNodes = this.childNodes.filter((childNode) => node != childNode);

        // ThreeJS: Remove from Scene
        node.removeFromParentElement();

        return this;
    }

    // ThreeJS specific
    addToParentElement() {
        this.parentElement.add(this.content);
    }
    removeFromParentElement() {
        this.parentElement.remove(this.content);
    }

    // Maybe not necessary
    hasChildNodes() {
        return this.childNodes.length > 0;
    }


}

/**
 * Virtual Element - based on DOM Element.
 * Should be used for most things on a page.
 */
export class VElement extends VNode {
    readonly attributes = {};

    setAttribute(name: string, value: string) {
        this.attributes[name] = value;
    }
    getAttribute(name: string) {
        this.attributes[name];
    }
}