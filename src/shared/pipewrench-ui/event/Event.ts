import { HTMLElement } from "../html/HTMLElement";
import { EventTarget } from "./EventTarget";

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event)
 * 
 * The *Event* interface represents an event which takes place on an
 * [EventTarget](./EventTarget.ts).
 */
export abstract class Event<Type extends string> {

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase#event.none_0)
     * 
     * The event is not being processed at this time.
     */
    static readonly NONE = 0;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase#event.capturing_phase_1)
     * 
     * The event is being propagated through the target's ancestor objects. This process starts with
     * the `Window`, then `Document`, then the `HTMLHtmlElement`, and so on through the elements 
     * until the target's parent is reached. `Event` listeners registered for capture mode when 
     * `EventTarget.addEventListener()` was called are triggered during this phase.
     */
    static readonly CAPTURING_PHASE = 1;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase#event.at_target_2)
     * 
     * The event has arrived at the event's target. Event listeners registered for this phase are 
     * called at this time. If `Event.bubbles` is `false`, processing the event is finished after
     * this phase is complete.
     */
    static readonly AT_TARGET = 2;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase#event.bubbling_phase_3)
     * 
     * The event is propagating back up through the target's ancestors in reverse order, starting 
     * with the parent, and eventually reaching the containing `Window`. This is known as bubbling,
     * and occurs only if `Event.bubbles` is `true`. `Event` listeners registered for this phase are
     * triggered during this process.
     */
    static readonly BUBBLING_PHASE = 3;

    readonly _type: Type;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles)
     * 
     * Indicates whether the event bubbles up through the DOM tree or not.
     */
    readonly bubbles: boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/cancelable)
     * 
     * Indicates whether the event can be canceled, and therefore prevented as if the event never
     * happened.
     */
    readonly cancelable: boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/composed)
     * 
     * A boolean value which indicates whether or not the event will propagate across the shadow
     * DOM boundary into the standard DOM.
     */
    readonly composed: boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)
     * 
     * Identifies the element to which the event handler has been attached.
     * 
     * This will not always be the same as the element on which the event was fired, because the
     * event may have fired on a descendant of the element with the handler, and then bubbled up to 
     * the element with the handler. The element on which the event was fired is given by 
     * `Event.target`.
     */
    readonly currentTarget: EventTarget;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/defaultPrevented)
     * 
     * Returns a boolean value indicating whether or not the call to Event.preventDefault() canceled
     * the event.
     */
    readonly defaultPrevented: boolean;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/eventPhase)
     * 
     * Indicates which phase of the event flow is currently being evaluated.
     */
    readonly eventPhase: number;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)
     * 
     * A reference to the object onto which the event was dispatched. It is different from
     * `Event.currentTarget` when the event handler is called during the bubbling or capturing phase
     * of the event.
     */
    readonly target: EventTarget;

    readonly timeStamp: number;

    constructor(_type: Type) {
        this._type = _type;
    }

    abstract cloneEvent(target: HTMLElement<string>): Event<string>;

    abstract test(target: HTMLElement<string>): boolean;
}
