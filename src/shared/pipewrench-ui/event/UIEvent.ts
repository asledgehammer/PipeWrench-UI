import { InputDeviceCapabilities } from "../input/InputDeviceCapabilities";
import { Window } from "../node/Window";
import { Event } from "./Event";

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent)
 * 
 * The UIEvent interface represents simple user interface events.
 * 
 * `UIEvent` derives from [Event](./Event.ts). Although the `UIEvent.initUIEvent()` method is kept
 * for backward compatibility, you should create a `UIEvent` object using the `UIEvent()`
 * constructor.
 * 
 * Several interfaces are direct or indirect descendants of this one: `MouseEvent`, `TouchEvent`, 
 * `FocusEvent`, `KeyboardEvent`, `WheelEvent`, `InputEvent`, and `CompositionEvent`.
 */
export abstract class UIEvent<Type extends string> extends Event<Type> {

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail)
     * 
     * When non-zero, provides the current (or next, depending on the event) click count.
     * 
     * For `click` or `dblclick` events, `UIEvent.detail` is the current click count. 
     * 
     * For `mousedown` or `mouseup` events, `UIEvent.detail` is `1` plus the current click count.
     * 
     * For all other `UIEvent` objects, `UIEvent.detail` is always zero.
     */
    readonly detail: number;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/sourceCapabilities)
     * 
     * Returns an instance of the InputDeviceCapabilities interface which provides information about
     * the physical device responsible for generating a touch event. If no input device was
     * responsible for the event, it returns `null`.
     */
    readonly sourceCapabilities: InputDeviceCapabilities | null;

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/view)
     * 
     * Returns the `WindowProxy` object from which the event was generated. In browsers, this is the 
     * `Window` object the event happened in.
     */
    readonly view: Window; 

    constructor(type: Type) {
        super(type);
    }
}