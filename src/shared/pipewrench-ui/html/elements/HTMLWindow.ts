import { Core } from "@asledgehammer/pipewrench";
import { Event } from "../../event/Event";
import { getGraphics, initPZ } from "../PZ";
import { HTMLMouse } from "../../input/HTMLMouse";

import { HTMLElement } from "../HTMLElement";
import { HTMLDocument } from "./HTMLDocument";
import { HTMLFontPool } from "../HTMLFont";

const DEFAULT_CSS_WINDOW: { [rule: string]: string } = {
    'background-color': 'white',
    'color': 'black',
    '--pz-debug-color-outer': 'purple',
    '--pz-debug-color-inner': 'purple',
};

export class HTMLWindow extends HTMLElement<'window'> {

    mouse: HTMLMouse;
    document: HTMLDocument;
    fonts: HTMLFontPool = new HTMLFontPool();

    constructor() {
        super('window', DEFAULT_CSS_WINDOW, {}, []);
        this.mouse = new HTMLMouse();
        this.document = new HTMLDocument({}, []);
        this.appendChild(this.document);
    }

    protected updateInternal(): void {

        const javaObject = getGraphics();
        if (javaObject == null) initPZ(this);

        this.mouse.update();

        if (this.mouse.moved) {
            this.triggerEvent(this.mouse.newMoveEvent(this.document));
        }
    }

    calculateDimensions(force: boolean): void {
        this.cache.inner.x1 =  this.cache.outer.x1;
        this.cache.inner.y1 =  this.cache.outer.y1;
        this.cache.inner.x2 =  this.cache.outer.x2;
        this.cache.inner.y2 =  this.cache.outer.y2;
    }

    precalculateInternal(force: boolean): void {

        const core = Core.getInstance();
        const width = core.getScreenWidth();
        const height = core.getScreenHeight();

        this.cache.outer.x1 = 0;
        this.cache.outer.y1 = 0;
        this.cache.outer.x2 = this.cache.content.width = this.cache.width.value = width;
        this.cache.outer.y2 = this.cache.content.height = this.cache.height.value = height;
    }

    protected renderBackground(x: number, y: number, w: number, h: number): void {
        const javaObject = getGraphics();
        const { r, g, b, a } = this.cache.backgroundColor.value;

        // Draw the default white screen.
        javaObject.DrawTextureScaledColor(null, x, y, w, h, r, g, b, a);
    }

    triggerEvent(event: Event<string>) {
        this.document.dispatchEvent(event);
        // print(JSON.stringify(event));
    }
}
