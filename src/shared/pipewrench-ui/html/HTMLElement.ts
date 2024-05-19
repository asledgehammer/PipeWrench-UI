import { Core, getRenderer, getTextOrNull, UIFont } from "@asledgehammer/pipewrench";
import { CSSRuleset, DisplayValue } from "../css/CSS";
import { CSSReader } from "../css/CSSParser";
import { HTMLImageElement } from "./elements/HTMLImageElement";
import { TextureCache } from "../TextureCache";
import { formatColor, formatNumValue } from "../util/Format";
import { AnyProps, ReactElement, OptionalElementFunction } from "../React";
import { ElementCache, EMPTY_INNER_TEXT } from "../Cache";
import { getGraphics } from "./PZ";
import { AddEventListenerOptions, EventListener, EventTarget, RemoveEventListenerOptions } from "../event/EventTarget";
import { Event } from "../event/Event";

import { tPrint } from "../util/table";
import { HTMLRawText } from "./elements/HTMLRawText";
import { HTMLFont, HTMLFontPool } from "./HTMLFont";
import { RGBA } from "../css/color/RGBA";

export const CSS_DEFAULT_ELEMENT = {
    'background-color': 'transparent',
    'color': 'inherit',
    'display': 'inline',
};

export interface IHTMLElementAttributes {
    style?: string;
    class?: string;
    id?: string;
    onupdate?: OptionalElementFunction;
    onprerender?: OptionalElementFunction;
    onrender?: OptionalElementFunction;
}

export abstract class HTMLElement<T extends string> implements ReactElement, IHTMLElementAttributes, EventTarget {

    tag: T;

    innerText: string;

    /** The class names assigned to the element. */
    class?: string;

    /** The DOM ID of the element. */
    id: string | null = null;

    /** CSS style for the element specifically. */
    cssRuleset: CSSRuleset;
    readonly cssRulesetDefault: { [rule: string]: string };
    style?: string;

    onupdate?: ((element: ReactElement) => void);
    onprerender?: ((element: ReactElement) => void);
    onrender?: ((element: ReactElement) => void);

    /** The children assigned to the element. */
    readonly children: HTMLElement<string>[] = [];

    parent?: HTMLElement<string>;

    private _dirty: boolean = true;

    cache: ElementCache;

    flagToRemove: boolean = false;

    readonly listeners: { [type: string]: EventListener[] } = {};

    constructor(tag: T, defaultCSS: { [rule: string]: string }, props: AnyProps, children: ReactElement[]) {
        this.tag = tag;
        this.cssRulesetDefault = defaultCSS;
        this.cache = new ElementCache(this);

        // if(this.tag == 'img') {
        // print(`img.children: `);
        // print(tPrint(children, 0, 4));
        // throw new Error();
        // }

        // Handle properties.
        if (props['id'] != null) this.id = props['id'];
        if (props['class'] != null) this.class = props['class'];
        if (props['style'] != null) {
            this.style = props['style'] as string;
            this.cssRuleset = CSSReader.parseInline(defaultCSS, this.style!);
        } else {
            this.style = null;
            this.cssRuleset = new CSSRuleset(defaultCSS);
        }
        if (props['onupdate'] != null) this.onupdate = props['onupdate'];
        if (props['onprerender'] != null) this.onprerender = props['onprerender'];
        if (props['onrender'] != null) this.onrender = props['onrender'];

        // Handle children.
        if (children && children.length) {

            if (tag == 'script') {
                if (children.length == 1) {
                    const firstChild = children[0];
                    this.innerText = (firstChild as HTMLRawText).innerText;
                }
            } else {
                for (let index = 0; index < children.length; index++) {
                    const child = children[index] as HTMLElement<string>;
                    // if (child.dispatchEvent == null) {
                    // throw new Error();
                    // }
                    this.appendChild(child);
                }
            }
        }
    }

    /* ******************************************************************************************** */

    /** (Java-side hook into the mock ISUIElement) */
    update2(): void {
        if (this.checkRemovalFlag()) return;
        this.precalculate(false);
        this.calculate(false);
        this.updateInternal();
        if (this.onupdate) this.onupdate(this);
        this.updateChildren();
    }

    protected updateInternal() { }

    /**
     * Check to see if this needs to be removed.
     */
    protected checkRemovalFlag(): boolean {
        if (this.flagToRemove) {
            if (this.parent && this.parent.children.length) {
                const indexOf = this.parent.children.indexOf(this);
                if (indexOf !== -1) this.parent.children.splice(indexOf, 1);
                this.parent = null;
            }
            this.flagToRemove = false;
            return true;
        }
        return false;
    }

    protected updateChildren() {
        if (this.children.length != 0) {
            for (let index = 0; index < this.children.length; index++) {
                const child = this.children[index];
                if (child != null) {
                    // (Update parent reference for manual children assignments third-party..)
                    if (child.parent != this) child.parent = this;
                    if (child.update2 != null) child.update2();
                }
            }
        }
    }

    /* ******************************************************************************************** */

    precalculate(force: boolean) {
        this.precalculateChildren(force);
        this.precalculateInternal(force);

        this.precalculateContents(force);
    }

    precalculateContents(force: boolean) {
        const { cssRuleset } = this;
        if (cssRuleset.display != null) {
            switch (cssRuleset.display) {
                case "block": {
                    // this.precalculateDisplayAsBlock(force);
                    this.precalculateDisplayAsInline(force);
                    break;
                }
                case "flex": {
                    this.precalculateDisplayAsFlex(force);
                    break;
                }
                case "inline": {
                    this.precalculateDisplayAsInline(force);
                    break;
                }
                case "inline-block": {
                    this.precalculateDisplayAsInlineBlock(force);
                    break;
                }
                case "none": {
                    this.precalculateDisplayAsNone(force);
                    break;
                }
            }
        }
    }

    precalculateInternal(force: boolean) { }

    precalculateChildren(force: boolean) {
        if (this.children.length == 0) return;
        for (let index = 0; index < this.children.length; index++) {
            const child = this.children[index];
            child.precalculate(force);
        }
    }

    precalculateDisplayAsBlock(force: boolean) {
        const { children } = this;

        let offsetX = 0;
        let offsetY = 0;
    }

    precalculateDisplayAsFlex(force: boolean) {
        const { children } = this;

        let offsetX = 0;
        let offsetY = 0;
    }

    precalculateDisplayAsInline(force: boolean) {
        const { cache, children } = this;

        let maxWidth = 0;
        let maxHeight = 0;
        let offsetX = 0;
        let offsetY = 0;

        for (let index = 0; index < children.length; index++) {
            const child = children[index];
            if (child.tag == 'rawtext' && (child as any).paginate != null) {
                (child as any).paginate(this.cache.width.value, this.cache.height.value);
            }

            offsetX += child.cache.width.value;

            switch (child.cssRuleset.display) {
                case "none": {
                    break;
                }
                case "block": {
                    if (offsetX > maxWidth) {
                        maxWidth = offsetX;
                    }
                    offsetX = 0;
                    offsetY += child.cache.height.value;
                    break;
                }
                case "inline": {
                    break;
                }
            }
        }

        maxHeight += offsetY;

        cache.width.value = maxWidth;
        cache.height.value = maxHeight;
    }

    precalculateDisplayAsInlineBlock(force: boolean) {
        const { children } = this;

        let offsetX = 0;
        let offsetY = 0;
    }

    precalculateDisplayAsNone(force: boolean) {
        const { children } = this;

        let offsetX = 0;
        let offsetY = 0;
    }

    /* ******************************************************************************************** */

    calculate(force: boolean) {
        this.calculateFont(force);
        this.calculateColor(force);
        this.calculateBackgroundColor(force);
        // Calculate background-image before dimensions for <img> elements.
        this.calculateBackgroundImage(force);
        this.calculateDimensions(force);
        this.calculateInternal(force);
        this.calculateDebug(force);
    }

    calculateDebug(force: boolean) {
        const colorPZDebugOuter = formatColor(this, this.cssRuleset['--pz-debug-color-outer']);
        const colorPZDebugInner = formatColor(this, this.cssRuleset['--pz-debug-color-inner']);
        this.cache["--pz-debug-color-outer"].value = colorPZDebugOuter;
        this.cache["--pz-debug-color-inner"].value = colorPZDebugInner;
    }

    calculateInternal(force: boolean) { }

    calculateFont(force: boolean) {
        const { cache, cssRuleset } = this;

        if (!force && !cache.font.dirty) return;

        if (cssRuleset.font != null) {
            cache.font.value = this.getFont(cssRuleset.font);
            cache.font.dirty = false;
        }

        if (cache.font.value == null) {
            cache.font.value = this.getFont('small');
            cache.font.dirty = false;
        }

        // print(`font: ${tPrint(cache.font.value, 0, 4)}`);
    }

    calculateDimensions(force: boolean) {
        const element = this;
        const { cache, cssRuleset: style, tag } = this;

        // [CSS] - width
        let width = formatNumValue(element, 'width', style.width);
        if (width == null) {
            if (tag == 'img') {
                const img = (element as any) as HTMLImageElement;
                if (img.width != null) {
                    width = img.width;
                }
                else if (cache.backgroundImage.value != null) {
                    width = cache.backgroundImage.value.getWidth();
                } else {
                    width = 0;
                }
            } else {
                width = 0;
            }
        }

        // [CSS] - height
        let height = formatNumValue(element, 'height', style.height);
        if (height == null) {
            if (tag == 'img') {
                const img = (element as any) as HTMLImageElement;
                if (img.height != null) {
                    height = img.height;
                }
                else if (cache.backgroundImage.value != null) {
                    height = cache.backgroundImage.value.getHeight();
                } else {
                    height = 0;
                }
            } else {
                height = 0;
            }
        }

        cache.outer.x2 = cache.outer.x1 + width;
        cache.outer.y2 = cache.outer.y1 + height;
        cache.width.value = width;
        cache.height.value = height;

        // [CSS] - left
        cache.outer.x1 = formatNumValue(element, 'left', style.left);
        if (cache.outer.x1 == null) {
            if (element.parent != null) cache.outer.x1 = element.parent.cache.outer.x1;
            else cache.outer.x1 = 0;
        }

        // [CSS] - top
        cache.outer.y1 = formatNumValue(element, 'top', style.top);
        if (cache.outer.y1 == null) {
            if (element.parent != null) cache.outer.y1 = element.parent.cache.outer.y1;
            else cache.outer.y1 = 0;
        }

        // FIXME - Temporary. Calculate padding.
        cache.inner.x1 = cache.outer.x1;
        cache.inner.y1 = cache.outer.y1;
        cache.inner.x2 = cache.outer.x2;
        cache.inner.y2 = cache.outer.y2;

        // print(`${tPrint(cache.inner, 0, 4)} {'width'=${cache.width.value}, 'height'=${cache.height.value}}`);
    }

    calculateColor(force: boolean) {
        const element = this;
        const { cache, cssRuleset } = this;

        if (!cache.color.dirty && !force) return;

        cache.color.value = formatColor(element, cssRuleset['color']);
        cache.color.dirty = false;
    }

    calculateBackgroundColor(force: boolean) {
        const element = this;
        const { cache, cssRuleset } = this;

        if (!cache.backgroundColor.dirty && !force) return;

        if (force || cache.backgroundColor.dirty) {
            cache.backgroundColor.value = formatColor(element, cssRuleset['background-color']);
            cache.backgroundColor.dirty = false;
        }

    }

    calculateBackgroundImage(force: boolean) {

        const element = this;
        const { cache, cssRuleset, tag } = this;

        if (!cache.backgroundColor.dirty && !force) return;

        let backgroundImage = cssRuleset['background-image'];
        if (backgroundImage != null && backgroundImage.indexOf('url(') !== -1) {
            backgroundImage = backgroundImage.replace('url(', '').replace(')', '');
            cache.backgroundImage.value = TextureCache.getOrLoad(backgroundImage);
        }
        // If <img>, check src="" attribute.
        else if (tag == 'img') {
            const img = (element as any) as HTMLImageElement;
            if (img.src != null && img.src.length != 0) {
                cache.backgroundImage.value = TextureCache.getOrLoad(img.src);
            } else {
                cache.backgroundImage.value = null;
            }
        } else {
            cache.backgroundImage.value = null;
        }
        cache.backgroundImage.dirty = false;
    }

    /* ******************************************************************************************** */

    /**
     * (Executed on the render thread)
     */
    prerender(): void {
        this.prerenderInternal();
        if (this.onprerender) this.onprerender(this);
        this.prerenderChildren();
        this._dirty = false;
    }

    prerenderInternal(): void {

    }

    prerenderChildren(): void {
        if (this.children.length != 0) {
            for (let index = 0; index < this.children.length; index++) {
                const child = this.children[index];
                if (child != null && child.prerender != null) child.prerender();
            }
        }
    }

    /* ******************************************************************************************** */

    /** (Java-side hook into the mock ISUIElement) */
    render(): void {

        const x = this.cache.outer.x1;
        const y = this.cache.outer.y1;
        const w = this.cache.width.value;
        const h = this.cache.height.value;
        // No area to render, or missing data.
        if (x == null || y == null || w == null || w == 0 || h == null || h == 0) {
            // print(`[${this.tag}] => x: ${x}, y: ${y}, w: ${w}, h: ${h}`);
        } else {
            this.renderBackground(x, y, w, h);
            this.renderInnerText();
        }

        this.renderInternal();
        if (this.onrender) this.onrender(this);
        this.renderChildren();

        this.renderDebug();
    }

    renderInternal(): void {

    }

    renderChildren(): void {
        // Render children.
        if (this.children.length != 0) {
            for (let index = 0; index < this.children.length; index++) {
                const child = this.children[index];
                if (child != null && child.render != null) child.render();
            }
        }
    }

    renderDebug(): void {
        const { tag } = this;
        const renderer = getRenderer();
        function drawLineH(x: number, y: number, length: number, thickness: number, r: number, g: number, b: number, a: number) {
            renderer.renderline(null, x, y, x + length, y, r, g, b, a, thickness);
        }
        function drawLineV(x: number, y: number, length: number, thickness: number, r: number, g: number, b: number, a: number) {
            renderer.renderline(null, x, y, x, y + length, r, g, b, a, thickness);
        }
        function drawRectPartial(
            x: number, y: number, width: number, height: number,
            n: boolean, s: boolean, e: boolean, w: boolean,
            r: number, g: number, b: number, a: number,
            thickness: number
        ) {

            if (tag == 'html') {
                print(`[${tag}] => drawRect(x: ${x}, y: ${y}, width: ${width}, height: ${height})`);
            }
            if (n) drawLineH(x, y, width, thickness, r, g, b, a);
            if (s) drawLineH(x, y + height, width, thickness, r, g, b, a);
            if (w) drawLineV(x, y, height, thickness, r, g, b, a);
            if (e) drawLineV(x + width, y, height, thickness, r, g, b, a);
        }
        function drawRect(
            x: number, y: number, w: number, h: number,
            r: number, g: number, b: number, a: number,
            thickness: number
        ) {
            drawRectPartial(x, y, w, h, true, true, true, true, r, g, b, a, thickness);
        }

        const colorOuter = this.cache["--pz-debug-color-outer"].value;
        const { r: or, g: og, b: ob, a: oa } = colorOuter;

        const colorInner = this.cache["--pz-debug-color-inner"].value;
        const { r: ir, g: ig, b: ib, a: ia } = colorInner;

        drawRect(
            this.cache.outer.x1, this.cache.outer.y1,
            this.cache.outer.x2 - this.cache.outer.x1, this.cache.outer.y2 - this.cache.outer.y1,
            or, og, ob, oa,
            1
        );

        drawRect(
            this.cache.inner.x1, this.cache.inner.y1,
            this.cache.inner.x2 - this.cache.inner.x1, this.cache.inner.y2 - this.cache.inner.y1,
            ir, ig, ib, ia,
            1
        );
    }

    protected renderBackground(x: number, y: number, w: number, h: number) {

        const javaObject = getGraphics();

        // Draw the background of the element.
        const { value: backgroundColor } = this.cache.backgroundColor;
        const { value: texture } = this.cache.backgroundImage;

        if (texture != null) {
            // (Only draw if the color isn't fully transparent)
            if (backgroundColor == null || backgroundColor.a != 0) {
                const { r, g, b, a } = backgroundColor;
                javaObject.DrawTextureScaledColor(texture, x, y, w, h, r, g, b, a);
            }
        } else {
            if (backgroundColor == null || backgroundColor.a != 0) {
                const { r, g, b, a } = backgroundColor;
                javaObject.DrawTextureScaledColor(null, x, y, w, h, r, g, b, a);
            }
        }
    }

    protected renderInnerText() {
        const { innerText } = this;
        if (innerText != null && innerText.length != 0 && this.cache.font.value != null) {
            const { r, g, b, a } = this.cache.color.value;
            this.cache.font.value.drawText(this.cache.innerText.value, this.cache.inner.x1, this.cache.inner.x2, r, g, b, a);
        }
    }

    /* ******************************************************************************************** */

    dispatchEvent(event: Event<string>): void {
        let listeners = this.listeners[event._type];

        // Nothing to listen. Nothing to do here.
        if (listeners == null || listeners.length == 0) {
            this.dispatchEventToChildren(event);
            return;
        }

        for (let index = 0; index < listeners.length; index++) {
            if (event.test(this)) {
                listeners[index](event.cloneEvent(this));
            }
        }

        this.dispatchEventToChildren(event);
    }

    dispatchEventToChildren(event: Event<string>): void {
        if (this.children.length == 0) return;
        for (let index = 0; index < this.children.length; index++) {
            const child = this.children[index];
            if (child != null) {

                if (child.dispatchEvent != null) {
                    child.dispatchEvent(event);
                } else {
                    print('NO dispatchEvent() for child !!!');
                    print(child);
                    print(tPrint(child, 0, 1));
                    // print(JSON.stringify(child));
                }
            }
        }
    }

    addEventListener(type: string, listener: EventListener, options?: boolean | AddEventListenerOptions): void {
        let listeners = this.listeners[type];

        // Create a new array to register listeners for this event type.
        if (!listeners) {
            listeners = [];
            this.listeners[type] = listeners;
        } else if (listeners.length != 0) {
            const index = listeners.indexOf(listener);
            if (index != -1) listeners.splice(index, 1);
        }

        // Finally, add the listener.
        listeners.push(listener);
    }

    removeEventListener(type: string, listener: EventListener, options?: boolean | RemoveEventListenerOptions): void {
        const listeners = this.listeners[type];

        // No listener to remove.
        if (!listeners) return;

        // Remove listener. (If present)
        const index = listeners.indexOf(listener);
        if (index != -1) listeners.splice(index, 1);

        // Clean up array for memory efficiency.
        if (listeners.length == 0) delete this.listeners[type];
    }

    /* ******************************************************************************************** */

    appendChild(aChild: HTMLElement<string>) {

        // (Sanity check)
        if (aChild == null) return;

        // If the element is already a child, then remove it and append to the end. 
        if (aChild.parent == this) {
            const index = this.children.indexOf(aChild);
            if (index != -1) this.children.splice(index, 1);
        }

        // First, check the prior parental status.
        if (aChild.parent != null) aChild.parent.removeChild(aChild);

        // Next, add the child to this element.
        aChild.parent = this;
        this.children.push(aChild);
    }

    removeChild(child: HTMLElement<string>) {
        const index = this.children.indexOf(child);
        if (index == -1) throw new Error('Element is not a child.');

        child.parent = null;
        this.children.splice(index, 1);
    }

    /* ******************************************************************************************** */

    /**
     * Sets the CSS for the element specifically.
     *
     * @param style Either a built CSSProfile or a raw string of CSS.
     */
    setStyle(style: CSSRuleset | string) {
        if (style instanceof CSSRuleset) {
            this.cssRuleset = style;
        } else {
            this.cssRuleset = CSSReader.parseInline(this.cssRulesetDefault, style);
        }
        this.setDirty();
    }

    isDirty(): boolean {
        return this._dirty;
    }

    setDirty() {
        this._dirty = true;
    }

    hasParent(): boolean {
        return this.parent != null;
    }

    hasChildren(): boolean {
        return this.children.length !== 0;
    }

    printTree(indent: number): string {
        let s = `${' '.repeat(indent * 4)}[${this.tag}]\n`;
        for (const child of this.children) {
            if (child.tag) {
                s += child.printTree(indent + 1);
            } else {
                s += `${' '.repeat((indent + 1) * 4)}[???]\n`;
            }
        }
        return s;
    }

    protected getFontPool(): HTMLFontPool | null {
        if ((this as any).fonts != null) {
            return (this as any).fonts;
        } else if (this.parent != null) {
            return this.parent.getFontPool();
        } else {
            return null;
        }
    }

    protected getFont(name: string): HTMLFont | null {
        if ((this as any).fonts != null) {
            return (this as any).fonts.getFont(name);
        } else if (this.parent != null) {
            return this.parent.getFont(name);
        } else {
            return null;
        }
    }
} 