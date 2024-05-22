import { HTMLElement } from "../../../html/HTMLElement";
import { Event } from "../../Event";
import { EventTarget } from "../../EventTarget";
import { MouseData, MouseEvent } from "./MouseEvent";
import { MouseExitEvent } from "./MouseExitEvent";
import { RelatableEvent } from "./RelateableEvent";

export class MouseEnterEvent extends MouseEvent<'mouseenter'> implements RelatableEvent<MouseExitEvent> {

    relatedTarget?: MouseExitEvent;

    constructor(mouse: MouseData, target: HTMLElement<string>) {
        super('mouseenter', mouse, target);
    }

    cloneEvent(target: HTMLElement<string>): Event<string> {
        return new MouseEnterEvent({ ...this, dx: this.movementX, dy: this.movementY }, target);
    }

    test(target: HTMLElement<string>): boolean {
        return false;
    }

    composedPath(): EventTarget[] {
        throw new Error("Method not implemented.");
    }
    
    preventDefault(): void {
        throw new Error("Method not implemented.");
    }
    
    stopImmediatePropagation(): void {
        throw new Error("Method not implemented.");
    }
    
    stopPropagation(): void {
        throw new Error("Method not implemented.");
    }
}