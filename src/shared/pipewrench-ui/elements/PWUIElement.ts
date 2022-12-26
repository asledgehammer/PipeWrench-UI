import { CSSReader } from '../css/CSSParser';
import { UIElement, UIManager } from '@asledgehammer/pipewrench';
import { AnyProps, Element, OptionalElementFunction } from '../PipeWrenchUI';
import { ElementCache } from './ElementCache';
import { CSSRuleset } from '../css/CSSRuleSet';

export interface I_PWUIElement {
  style?: string;
  class?: string;
  id?: string;
  'on-update'?: OptionalElementFunction;
  'on-prerender'?: OptionalElementFunction;
  'on-render'?: OptionalElementFunction;
}

/**
 * **PWUIElement is the generic root-element that all PWUI components derive.
 *
 * @author JabDoesThings
 */
export class PWUIElement implements Element {
  /** The element's static-type ID. */
  readonly type: string = 'element';

  /** The internal Java Object that is the handle in Project Zomboid's UI engine. */
  javaObject: UIElement;

  /** The class names assigned to the element. */
  class: string[] = [];

  /** The DOM ID of the element. */
  id: string | null = null;

  parent: PWUIElement | null = null;

  /** The children assigned to the element. */
  children: PWUIElement[] = [];

  /** CSS style for the element specifically. */
  style: CSSRuleset;

  cache: ElementCache;

  protected _style: string | null = null;

  private _dirty: boolean = true;

  constructor(props: AnyProps, children: (PWUIElement | Element)[]) {
    this.cache = new ElementCache(this);

    // Handle properties.
    if (props['id'] != null) this.id = props['id'];
    if (props['class'] != null) this.class = props['class'];
    if (props['style'] != null) {
      this._style = props['style'];
      this.style = CSSReader.parseInline(this._style!);
    } else {
      this._style = null;
      this.style = new CSSRuleset();
    }
    if (props['on-update'] != null) this.onUpdate = props['on-update'];
    if (props['on-prerender'] != null) this.onPreRender = props['on-prerender'];
    if (props['on-render'] != null) this.onRender = props['on-render'];

    // Handle children.
    for (const child of children) {
      if (child instanceof PWUIElement) {
        this.children.push(child);
        child.parent = this;
      } else {
        // Reserved for special elements.
      }
    }

    this.javaObject = new UIElement(this);
  }

  /** (Java-side hook into the mock ISUIElement) */
  update2(): void {
    // Calculate the values used by the element to position & render.
    this.cache.calculate(true);
    if (this.onUpdate != null) this.onUpdate(this);
  }

  /** (Java-side hook into the mock ISUIElement) */
  prerender(): void {
    if (this.onPreRender != null) this.onPreRender(this);
    this._dirty = false;
  }

  /** (Java-side hook into the mock ISUIElement) */
  render(): void {
    const x = this.cache.x;
    const y = this.cache.y;
    const w = this.cache.width;
    const h = this.cache.height;

    // print(`${x} ${y} ${w} ${h}`);

    // Set dimensions.
    this.javaObject.setX(x);
    this.javaObject.setY(y);
    this.javaObject.setWidth(w);
    this.javaObject.setHeight(h);

    this.javaObject.setStencilRect(x, y, Math.max(0, w), Math.max(0, h));
    this.javaObject.suspendStencil();

    this.renderBackground(x, y, w, h);

    if (this.onRender != null) this.onRender(this);
  }

  protected renderBackground(x: number, y: number, w: number, h: number) {
    // Draw the background of the element.
    const { backgroundColor, backgroundImage: tex } = this.cache;

    if (backgroundColor != null) {
      const { r, g, b, a } = backgroundColor;
      this.javaObject.DrawTextureScaledColor(null, x, y, w, h, r, g, b, a);
    }

    if (backgroundColor != null && backgroundColor.a !== 0) {
      // (Only draw if the color isn't fully transparent)
      // const { r, g, b, a } = backgroundColor;
      // print(`${r} ${g} ${b} ${a}`)

      if (tex != null) {
        const { style } = this;
        const { backgroundRepeat: repeatRule } = style;

        this.javaObject.resumeStencil();
        if (repeatRule === 'repeat') {
          this.javaObject.DrawTextureTiled(tex, x, y, w, h, 1, 1, 1, 1);
        } else if (repeatRule === 'round') {
          this.javaObject.DrawTextureScaledColor(tex, x, y, w, h, 1, 1, 1, 1);
        } else if (repeatRule === 'repeat-x') {
          this.javaObject.DrawTextureTiledX(tex, x, y, w, h, 1, 1, 1, 1);
        } else if (repeatRule === 'repeat-y') {
          this.javaObject.DrawTextureTiledY(tex, x, y, w, h, 1, 1, 1, 1);
        } else if (repeatRule === 'no-repeat') {
          this.javaObject.DrawTextureAngle(tex, x + tex.getWidth() / 2, y + tex.getHeight() / 2, 45, 1, 1, 1, 1);
          // this.javaObject.DrawTextureColor(tex, 0, 0, 1, 1, 1, 1);
        }
        this.javaObject.suspendStencil();
      }
    }
  }

  /**
   * (Hook from UIElement when a resize occurs)
   */
  onResize() {
    this._dirty = true;
  }

  addToUIManager() {
    UIManager.AddUI(this.javaObject);
  }

  /**
   * Sets the CSS for the element specifically.
   *
   * @param style Either a built CSSProfile or a raw string of CSS.
   */
  setStyle(style: CSSRuleset | string) {
    if (style instanceof CSSRuleset) {
      this.style = style;
    } else {
      this.style = CSSReader.parseInline(style);
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

  protected onUpdate(element: PWUIElement) {}
  protected onPreRender(element: PWUIElement) {}
  protected onRender(element: PWUIElement) {}
}
