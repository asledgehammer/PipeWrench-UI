import { Event } from "./Event";

export type EventListener = (event: Event<string>) => void;

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options)
 */
export type AddEventListenerOptions = {

    /**
     * A boolean value indicating that events of this type will be dispatched to the registered
     * listener before being dispatched to any EventTarget beneath it in the DOM tree. If not
     * specified, defaults to false.
     */
    capture?: boolean;

    /**
     * A boolean value indicating that the listener should be invoked at most once after being 
     * added. If true, the listener would be automatically removed when invoked. If not specified,
     * defaults to false.
     */
    once?: boolean;

    /**
     * A boolean value that, if `true`, indicates that the function specified by listener will never
     * call `preventDefault()`. If a passive listener does call `preventDefault()`, the user agent
     * will do nothing other than generate a console warning.
     * 
     * If this option is not specified it defaults to `false` – except that in browsers other than
     * `Safari`, it defaults to `true` for `wheel`, `mousewheel`, `touchstart` and `touchmove`
     * events. See Using passive listeners to learn more.
     */
    passive?: boolean;

    /**
     * An `AbortSignal`. The listener will be removed when the given `AbortSignal` object's
     * `abort()` method is called. If not specified, no `AbortSignal` is associated with the
     * listener.
     */
    signal?: boolean;
}

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#options)
 */
export type RemoveEventListenerOptions = {

    /**
     * A boolean value that specifies whether the event listener to be removed is registered as a
     * capturing listener or not. If this parameter is absent, the default value `false` is assumed.
     */
    capture?: boolean;
}

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
 * 
 * The *EventTarget* interface is implemented by objects that can receive events and may have
 * listeners for them. In other words, any target of events implements the three methods associated
 * with this interface.
 *
 * Element, and its children, as well as [../node/Document.ts] and [../node/Window.ts], are the most
 * common event targets, but other objects can be event targets, too. For example `IDBRequest`,
 * `AudioNode`, and `AudioContext` are also event targets.
 * 
 * Many event targets (including elements, documents, and windows) also support setting event
 * handlers via `onevent` properties and attributes.
 */
export interface EventTarget {
    dispatchEvent(event: Event<string>): void;
    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
     * 
     * Sets up a function that will be called whenever the specified event is delivered to the
     * target.
     * 
     * Common targets are [Element](../node/Element.ts), or its children,
     * [Document](../node/Document.ts), and [Window](../node/Window.ts), but the target may be any
     * object that supports events (such as `IDBRequest`).
     * 
     * @param type A case-sensitive string representing the `event type` to listen for.
     * @param listener The object that receives a notification (an object that implements the 
     * [Event](./Event.ts) interface) when an event of the specified type occurs. This must be
     * `null`, an object with a `handleEvent()` method, or a JavaScript function. See The event
     * listener callback for details on the callback itself.
     * @param options Two value types:
     * - An object that specifies characteristics about the event listener.
     * - A boolean value indicating whether events of this type will be dispatched to the registered
     * `listener` before being dispatched to any `EventTarget` beneath it in the DOM tree. Events 
     * that are bubbling upward through the tree will not trigger a listener designated to use 
     * capture. Event bubbling and capturing are two ways of propagating events that occur in an
     * element that is nested within another element, when both elements have registered a handle
     * for that event. The event propagation mode determines the order in which elements receive the
     * event. See DOM Level 3 Events and JavaScript Event order for a detailed explanation. If not
     * specified, `useCapture` defaults to `false`.
     */
    addEventListener(type: string, listener: Function, options?: AddEventListenerOptions | boolean): void;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
     * 
     * Removes an event listener previously registered with `EventTarget.addEventListener()` from
     * the target. The event listener to be removed is identified using a combination of the event
     * type, the event listener function itself, and various optional options that may affect the
     * matching process; see Matching event listeners for removal.
     * 
     * Calling `removeEventListener()` with arguments that do not identify any currently registered
     * event listener on the `EventTarget` has no effect.
     * 
     * If an event listener is removed from an `EventTarget` while another listener of the target is
     * processing an event, it will not be triggered by the event. However, it can be reattached.
     * 
     * @param type A string which specifies the type of event for which to remove an event listener.
     * @param listener The event listener function of the event handler to remove from the event 
     * target.
     * @param options Two options:
     * - An options object that specifies characteristics about the event listener.
     * - A boolean value that specifies whether the event listener to be removed is registered as a
     * capturing listener or not. If this parameter is absent, the default value `false` is assumed.
     */
    removeEventListener(type: string, listener: Function, options?: RemoveEventListenerOptions | boolean): void;
}