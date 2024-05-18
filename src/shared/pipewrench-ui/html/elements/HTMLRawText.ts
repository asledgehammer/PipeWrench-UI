import { HTMLElement, CSS_DEFAULT_ELEMENT } from '../HTMLElement';

export const CSS_DEFAULT_RAWTEXT = {
  ...CSS_DEFAULT_ELEMENT,
  'display': 'inline',
  'background-color': 'transparent',
}

export class HTMLRawText extends HTMLElement<''> {
  constructor(text: string) {
    super('', CSS_DEFAULT_ELEMENT, {}, []);
    this.innerText = text;
  }

  calculate(force: boolean): void {
    super.calculate(force);

    if (this.parent != null) {

      // FIXME - Temporary. Will block out items later on with measured assignments.
      this.cache.outer.x1 = this.parent.cache.inner.x1;
      this.cache.outer.y1 = this.parent.cache.inner.y1;
      this.cache.width.value = this.cache.innerText.value.size.width;
      this.cache.height.value = this.cache.innerText.value.size.height;
      this.cache.outer.x2 = this.cache.outer.x1 + this.cache.width.value;
      this.cache.outer.y2 = this.cache.outer.y1 + this.cache.height.value;

      // NOTE: Raw texts have no padding so inner = outer.
      this.cache.inner.x1 = this.cache.outer.x1;
      this.cache.inner.y1 = this.cache.outer.y1;
      this.cache.inner.x2 = this.cache.outer.x2;
      this.cache.inner.y2 = this.cache.outer.y2;
    }
  }
}
