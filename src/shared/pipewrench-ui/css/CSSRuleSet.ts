import { SelectorBlock } from './CSSParser';
import { CSSRule } from './CSSRule';

export class CSSRuleset {
  ///////////////////////////////////////////////////////
  // position
  private readonly _position = new CSSRule('auto');
  get position(): string {
    return this._position.value;
  }
  set position(value: string) {
    this._position.value = value;
  }
  ///////////////////////////////////////////////////////
  // display
  private readonly _display = new CSSRule('block');
  get display(): string {
    return this._display.value;
  }
  set display(value: string) {
    this._display.value = value;
  }
  ///////////////////////////////////////////////////////
  // top
  private readonly _top = new CSSRule('0');
  get top(): string {
    return this._top.value;
  }
  set top(value: string) {
    this._top.value = value;
  }
  ///////////////////////////////////////////////////////
  // left
  private readonly _left = new CSSRule('0');
  get left(): string {
    return this._left.value;
  }
  set left(value: string) {
    this._left.value = value;
  }
  ///////////////////////////////////////////////////////
  // width
  private readonly _width = new CSSRule('0');
  get width(): string {
    return this._width.value;
  }
  set width(value: string) {
    this._width.value = value;
  }
  ///////////////////////////////////////////////////////
  // height
  private readonly _height = new CSSRule('0');
  get height(): string {
    return this._height.value;
  }
  set height(value: string) {
    this._height.value = value;
  }
  ///////////////////////////////////////////////////////
  // min-width
  private readonly _minWidth = new CSSRule('0');
  get minWidth(): string {
    return this._minWidth.value;
  }
  set minWidth(value: string) {
    this._minWidth.value = value;
  }
  ///////////////////////////////////////////////////////
  // min-height
  private readonly _minHeight = new CSSRule('0');
  get minHeight(): string {
    return this._minHeight.value;
  }
  set minHeight(value: string) {
    this._minHeight.value = value;
  }
  ///////////////////////////////////////////////////////
  // max-width
  private readonly _maxWidth = new CSSRule('none');
  get maxWidth(): string {
    return this._maxWidth.value;
  }
  set maxWidth(value: string) {
    this._maxWidth.value = value;
  }
  ///////////////////////////////////////////////////////
  // max-height
  private readonly _maxHeight = new CSSRule('none');
  get maxHeight(): string {
    return this._maxHeight.value;
  }
  set maxHeight(value: string) {
    this._maxHeight.value = value;
  }

  ///////////////////////////////////////////////////////
  // background-color
  private readonly _backgroundColor = new CSSRule('none');
  get backgroundColor(): string {
    return this._backgroundColor.value;
  }
  set backgroundColor(value: string) {
    this._backgroundColor.value = value;
  }
  ///////////////////////////////////////////////////////
  // background-image
  private readonly _backgroundImage = new CSSRule('none');
  get backgroundImage(): string {
    return this._backgroundImage.value;
  }
  set backgroundImage(value: string) {
    this._backgroundImage.value = value;
  }
  ///////////////////////////////////////////////////////
  // background-repeat
  private readonly _backgroundRepeat = new CSSRule('repeat');
  get backgroundRepeat(): string {
    return this._backgroundRepeat.value;
  }
  set backgroundRepeat(value: string) {
    this._backgroundRepeat.value = value;
  }
  ///////////////////////////////////////////////////////
  // background-origin
  private readonly _backgroundOrigin = new CSSRule('auto');
  get backgroundOrigin(): string {
    return this._backgroundOrigin.value;
  }
  set backgroundOrigin(value: string) {
    this._backgroundOrigin.value = value;
  }
  ///////////////////////////////////////////////////////
  // background-position
  private readonly _backgroundPosition = new CSSRule('auto');
  get backgroundPosition(): string {
    return this._backgroundPosition.value;
  }
  set backgroundPosition(value: string) {
    this._backgroundPosition.value = value;
  }
  ///////////////////////////////////////////////////////
  // background-position-x
  private readonly _backgroundPositionX = new CSSRule('auto');
  get backgroundPositionX(): string {
    return this._backgroundPositionX.value;
  }
  set backgroundPositionX(value: string) {
    this._backgroundPositionX.value = value;
  }
  ///////////////////////////////////////////////////////
  // background-position-y
  private readonly _backgroundPositionY = new CSSRule('auto');
  get backgroundPositionY(): string {
    return this._backgroundPositionY.value;
  }
  set backgroundPositionY(value: string) {
    this._backgroundPositionY.value = value;
  }
  ///////////////////////////////////////////////////////
  // background-size
  private readonly _backgroundSize = new CSSRule('auto');
  get backgroundSize(): string {
    return this._backgroundSize.value;
  }
  set backgroundSize(value: string) {
    this._backgroundSize.value = value;
  }

  constructor(raw?: SelectorBlock) {
    if (raw != null) {
      for (const property of Object.keys(raw)) {
        print(`property: ${property}`);
        (this as any)[property] = raw[property];
      }
    }
  }

  asInline(): CSSRuleset {
    const copy = new CSSRuleset();
    copy.position = this.position;
    copy.display = this.display;
    copy.top = this.top;
    copy.left = this.left;
    copy.width = this.width;
    copy.height = this.height;
    copy.minWidth = this.minWidth;
    copy.minHeight = this.minHeight;
    copy.maxWidth = this.maxWidth;
    copy.maxHeight = this.maxHeight;
    copy.backgroundColor = this.backgroundColor;
    copy.backgroundImage = this.backgroundImage;
    copy.backgroundRepeat = this.backgroundRepeat;
    return copy;
  }

  setRules(other: CSSRuleset) {
    this.position = other.position;
    this.display = other.display;
    this.top = other.top;
    this.left = other.left;
    this.width = other.width;
    this.height = other.height;
    this.minWidth = other.minWidth;
    this.minHeight = other.minHeight;
    this.maxWidth = other.maxWidth;
    this.maxHeight = other.maxHeight;
    this.backgroundColor = other.backgroundColor;
    this.backgroundImage = other.backgroundImage;
    this.backgroundRepeat = other.backgroundRepeat;
  }
}
