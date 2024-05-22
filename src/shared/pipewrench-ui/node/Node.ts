import { Element } from "@asledgehammer/pipewrench";
import { Document } from "./Document";
import { NodeList } from "./NodeList";
import { AddEventListenerOptions, EventTarget, RemoveEventListenerOptions } from "../event/EventTarget";
import { Event } from "../event/Event";

/**
 * Root-options for the method `Node.getRootNode()`.
 */
export type RootNodeOptions = {

    /**
     * A boolean value that indicates whether the shadow root should be returned (`false`, the
     * default), or a root node beyond shadow root (`true`).
     */
    composed: boolean;
};

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node)
 * 
 * The DOM Node interface is an abstract base class upon which many other DOM API objects are based,
 * thus letting those object types to be used similarly and often interchangeably. As an abstract
 * class, there is no such thing as a plain Node object. All objects that implement Node 
 * functionality are based on one of its subclasses. Most notable are [Document](./Document.ts),
 * [Element](./Element.ts), and [DocumentFragment](./DocumentFragment.ts).
 */
export abstract class Node implements EventTarget {

    /** An [Element](./Element.ts) node like `<p>` or `<div>`. */
    static readonly ELEMENT_NODE = 1;

    /** An [Attribute](./Attribute.ts) of an [Element](./Element.ts). */
    static readonly ATTRIBUTE_NODE = 2;

    /** The actual [Text](./Text.ts) of an [Element](./Element.ts). */
    static readonly TEXT_NODE = 3;

    /** A [CDATASection](./CDATASection.ts), such as `<!CDATA[[ .. ]]>`. */
    static readonly CDATA_SECTION_NODE = 4;

    /** 
     * A [ProcessingInstruction](./ProcessingInstruction.ts) of an XML doxument, such as 
     * `<?xml-stylesheet .. ?>`.
     */
    static readonly PROCESSING_INSTRUCTION_NODE = 7;

    /** A [Comment](./Comment.ts) node, such as `<!-- .. -->`. */
    static readonly COMMENT_NODE = 8;

    /** A [Document](./Document.ts) node. */
    static readonly DOCUMENT_NODE = 9;

    /** A [DocumentType](./DocumentType.ts) node, such as `<!DOCTYPE html>`. */
    static readonly DOCUMENT_TYPE_NODE = 10;

    /** A [DocumentFragment](./DocumentFragment.ts) node. */
    static readonly DOCUMENT_FRAGMENT_NODE = 11;

    /**
     * Both nodes are in different documents or different trees in the same document.
     */
    static readonly DOCUMENT_POSITION_DISCONNECTED = 1;

    /**
     * otherNode precedes the node in either a pre-order depth-first traversal of a tree containing
     * both (e.g., as an ancestor or previous sibling or a descendant of a previous sibling or
     * previous sibling of an ancestor) or (if they are disconnected) in an arbitrary but consistent
     * ordering.
     */
    static readonly DOCUMENT_POSITION_PROCEDING = 2;

    /**
     * otherNode follows the node in either a pre-order depth-first traversal of a tree containing 
     * both (e.g., as a descendant or following sibling or a descendant of a following sibling or
     * following sibling of an ancestor) or (if they are disconnected) in an arbitrary but
     * consistent ordering.
     */
    static readonly DOCUMENT_POSITION_FOLLOWING = 4;

    /**
     * otherNode is an ancestor of the node.
     */
    static readonly DOCUMENT_POSITION_CONTAINS = 8;

    /**
     * otherNode is a descendant of the node.
     */
    static readonly DOCUMENT_POSITION_CONTAINED_BY = 16;

    /**
     * The result relies upon arbitrary and/or implementation-specific behavior and is not
     * guaranteed to be portable.
     */
    static readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/baseURI)
     * 
     * The absolute base URL of the document containing the node.
     * 
     * The base URL is used to resolve relative URLs when the browser needs to obtain an absolute
     * URL, for example when processing the HTML <img> element's src attribute or the xlink:href 
     * Deprecated or href attributes in SVG.
     */
    readonly baseURI: string;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/childNodes)
     * 
     * A **live** NodeList of child nodes of the given element where the first child node is assigned 
     * index 0. Child nodes include elements, text and comments.
     */
    readonly childNodes: NodeList;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/firstChild)
     * 
     * @returns a [Node](./Node.ts) representing the first direct child node of the node, or `null`
     * if the node has no child.
     */
    readonly firstChild: Node | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected)
     * 
     * Returns a boolean indicating whether the node is connected (directly or indirectly) to a
     * [Document](./Document.ts) object.
     */
    readonly isConnected: boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild)
     * 
     * @returns a [Node](./Node.ts) representing the last direct child node of the node, or `null`
     * if the node has no child.
     */
    readonly lastChild: Node | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/nextSibling)
     * 
     * The node immediately following the specified one in their parent's childNodes, or returns 
     * null if the specified node is the last child in the parent element.
     */
    readonly nextSibling: Node | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeValue)
     * 
     * Returns or sets the value of the current node.
     */
    readonly nodeValue: any;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName)
     * 
     * The name of the current node as a string.
     */
    readonly nodeName: string;

    /**
     * An unsigned short representing the type of the node.
     */
    readonly nodeType: number;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/ownerDocument)
     * 
     * The top-level document object of the node. If this property is used on a node that is a
     * [Document](./Document.ts), the value is null.
     */
    readonly ownerDocument: Document | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentNode)
     * 
     * The parent of the specified node in the DOM tree. Document and DocumentFragment nodes can 
     * never have a parent, so parentNode will always return null. It also returns null if the node
     * has just been created and is not yet attached to the tree.
     */
    readonly parentNode: Node;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement)
     * 
     * The DOM node's parent [Element](./Element.ts), or null if the node either has no parent, or 
     * its parent isn't a DOM Element.
     */
    readonly parentElement: Element | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/previousSibling)
     * 
     * The node immediately preceding the specified one in its parent's childNodes list, or null if 
     * the specified node is the first in that list.
     */
    readonly previousSibling: Node | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
     * 
     * The text content of the node and its descendants.
     */
    readonly textContent: string | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
     * 
     * Adds a node to the end of the list of children of a specified parent node.
     * 
     * @param aChild The node to append to the given parent node (commonly an element).
     * 
     * @returns A [Node](./Node.ts) that is the appended child (aChild), except when aChild is a 
     * [DocumentFragment](./DocumentFragment.ts), in which case the empty DocumentFragment is 
     * returned.
     */
    abstract appendChild(aChild: Node): void;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)
     * 
     * @param deep If true, then the node and its whole subtree, including text that may be in child
     * Text nodes, is also copied. If false, only the node will be cloned. The subtree, including 
     * any text that the node contains, is not cloned.
     * 
     * @returns A duplicate of the node on which this method was called. Its parameter controls if
     * the subtree contained in a node is also cloned or not.
     */
    abstract cloneNode(deep: boolean): Node;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition)
     * 
     * Reports the position of its argument node relative to the node on which it is called.
     * 
     * @param otherNode The [Node](./Node.ts) for which position should be reported, relative to the
     * node.
     * 
     * @returns An integer value representing otherNode's position relative to node as a bitmask 
     * combining the constant properties of [Node](./Node.ts).
     */
    abstract compareDocumentPosition(otherNode: Node): number;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains)
     * 
     * @param otherNode The Node to test with.
     * 
     * @returns A boolean value indicating whether a node is a descendant of a given node, that is
     * the node itself, one of its direct children (childNodes), one of the children's direct
     * children, and so on.
     */
    abstract contains(otherNode: Node): boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode#return_value)
     * 
     * @param options An object that sets options for getting the root node.
     * 
     * @returns The context object's root, which optionally includes the shadow root if it is
     * available.
     */
    abstract getRootNode(options: RootNodeOptions): Node | null;


    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)
     * 
     * @returns A boolean value indicating whether the given Node has child nodes or not.
     */
    abstract hasChildNodes(): boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/isDefaultNamespace)
     * 
     * Accepts a namespace URI as an argument.
     * 
     * @returns A boolean value that is `true` if the namespace is the default namespace on the
     * given node and `false` if not.
     */
    abstract isDefaultNamespace(): boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/isEqualNode)
     * 
     * Tests whether two nodes are equal. Two nodes are equal when they have the same type, defining
     * characteristics (for elements, this would be their ID, number of children, and so forth), its
     * attributes match, and so on. The specific set of data points that must match varies depending
     * on the types of the nodes.
     * 
     * @param otherNode The Node to compare equality with.
     * 
     * @returns A boolean value that is `true` if the two nodes are equals, or `false` if not.
     * If `otherNode` is null, `isEqualNode()` always return `false`.
     */
    abstract isEqualNode(otherNode: Node): boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/isSameNode)
     * 
     * A legacy alias the for the `===` strict equality operator. That is, it tests whether two
     * nodes are the same (in other words, whether they reference the same object).
     * 
     * @param otherNode The Node to test against.
     * 
     * @returns A boolean value that is `true` if both nodes are strictly equal, `false` if not.
     */
    abstract isSameNode(otherNode: Node): boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupNamespaceURI)
     * 
     * @param prefix The prefix to look for.
     * 
     * @returns A string containing the namespace URI corresponding to the prefix. If the prefix is
     * not found, it returns `null`. If the requested `prefix` is null, it returns the default
     * namespace URI.
     */
    abstract lookupNamespaceURI(prefix: string | null): string | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/lookupPrefix)
     * 
     * @param namespace A string containing the namespace to look the prefix up.
     * 
     * @returns A string containing the prefix for a given namespace URI, if present, and `null` if
     * not. When multiple prefixes are possible, the first prefix is returned.
     */
    abstract lookupPrefix(namespace: string | null): string | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize)
     * 
     * Puts the specified node and all of its sub-tree into a normalized form. In a normalized
     * sub-tree, no text nodes in the sub-tree are empty and there are no adjacent text nodes.
     */
    abstract normalize(): void;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild)
     * 
     * Removes a child node from the DOM and returns the removed node.
     * 
     * @param child A Node that is the child node to be removed from the DOM.
     * 
     * @returns The removed node.
     */
    abstract removeChild(child: Node): Node;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild)
     * 
     * Replaces a child node within the given (parent) node.
     * 
     * @param newChild The new node to replace `oldChild`.
     * @param oldChild The child to be replaced.
     * 
     * @returns The replaced Node. This is the same node as `oldChild`.
     */
    abstract replaceChild(newChild: Node, oldChild: Node): void;

    abstract dispatchEvent(event: Event<string>): void;

    abstract addEventListener(
        type: string,
        listener: Function,
        options?: boolean | AddEventListenerOptions
    ): void;

    abstract removeEventListener(
        type: string,
        listener: Function,
        options?: boolean | RemoveEventListenerOptions
    ): void;
}