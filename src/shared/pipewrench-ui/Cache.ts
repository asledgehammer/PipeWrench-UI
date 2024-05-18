import { Texture } from "@asledgehammer/pipewrench";
import { RGBA, asRGBA } from "./css/color/RGBA";
import { HTMLElement } from "./html/HTMLElement";
import { HTMLFont, MeasuredText, POOL_UIFONTS } from "./html/HTMLFont";

export interface Cached {
    dirty: boolean;
}

export class CachedValue<Type> implements Cached {
    value: Type;
    dirty: boolean;
    constructor(value: Type) {
        this.value = value;
        this.dirty = true;
    }
}

export class CachedRectangle implements Cached {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    dirty: boolean;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

export const EMPTY_INNER_TEXT: MeasuredText = {
    raw: '',
    lines: [''],
    size: {
        width: 0,
        height: 0,
    },
    widths: [],
    heights: [],
};

export class ElementCache {
    element: HTMLElement<string>;

    innerText: CachedValue<MeasuredText> = new CachedValue(EMPTY_INNER_TEXT);

    /* (Dimensions) */
    inner: CachedRectangle = new CachedRectangle(0, 0, 0, 0);
    outer: CachedRectangle = new CachedRectangle(0, 0, 0, 0);
    width: CachedValue<number> = new CachedValue(0);
    height: CachedValue<number> = new CachedValue(0);

    /* (Colors) */
    font: CachedValue<HTMLFont> = new CachedValue(POOL_UIFONTS['small']);
    color: CachedValue<RGBA> = new CachedValue(asRGBA(0, 0, 0, 1, '1'));
    backgroundColor: CachedValue<RGBA> = new CachedValue(asRGBA(0, 0, 0, 0, '1'));

    backgroundImage: CachedValue<Texture> = new CachedValue(null);

    constructor(element: HTMLElement<string>) {
        this.element = element;
    }
}