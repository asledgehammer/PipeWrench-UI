import { HTMLElement, IHTMLElementAttributes } from '../HTMLElement';
import { AnyProps, ReactElement } from '../../React';
import { HTMLBodyElement } from './HTMLBodyElement';

export interface IPWUIHtmlAttributes extends IHTMLElementAttributes { }

export const CSS_DEFAULT_HTML = {
  'display': 'block',
  'width': '100%',
  'height': '100%',
};

export class HTMLDocument extends HTMLElement<'html'> implements IPWUIHtmlAttributes {

  readonly body: HTMLBodyElement;
  debug: boolean = false;

  constructor(props: AnyProps, children: ReactElement[]) {
    super('html', CSS_DEFAULT_HTML, props, children);

    this.body = new HTMLBodyElement({}, []);
    this.children.push(this.body);
  }
  
  // prerender(): void {
  //   const javaObject = getGraphics();
  //   javaObject.setTable(this);
  //   javaObject.setX(0);
  //   javaObject.setY(0);
  //   javaObject.setWidth(Core.getInstance().getScreenWidth());
  //   javaObject.setHeight(Core.getInstance().getScreenHeight());
  // }

  // calculateDimensions(force: boolean) {
  //   const element = this;
  //   const { cache, cssRuleset: style, tag } = this;

  //   // [CSS] - width
  //   let width = formatNumValue(element, 'width', style.width);
  //   if (width == null) {
  //     width = Core.getInstance().getScreenWidth();
  //   }

  //   // [CSS] - height
  //   let height = formatNumValue(element, 'height', style.height);
  //   if (height == null) {
  //     height = Core.getInstance().getScreenHeight();
  //   }

  //   cache.outer.x2 = cache.outer.x1 + width;
  //   cache.outer.y2 = cache.outer.y1 + height;
  //   cache.width.value = width;
  //   cache.height.value = height;

  //   // [CSS] - left
  //   cache.outer.x1 = formatNumValue(element, 'left', style.left);
  //   if (cache.outer.x1 == null) {
  //     if (element.parent != null) cache.outer.x1 = element.parent.cache.outer.x1;
  //     else cache.outer.x1 = 0;
  //   }

  //   // [CSS] - top
  //   cache.outer.y1 = formatNumValue(element, 'top', style.top);
  //   if (cache.outer.y1 == null) {
  //     if (element.parent != null) cache.outer.y1 = element.parent.cache.outer.y1;
  //     else cache.outer.y1 = 0;
  //   }

  //   // print(`width: ${width} height: ${height}`);
  // }

  getElementsByClassName(): HTMLElement<string> | null {
    // TODO: Implement.
    throw new Error('Method not implemented.');
  }

  getElementById(id: string): HTMLElement<string> | null {

    let found: HTMLElement<string> | null = null;

    const recurse = function (children: HTMLElement<string>[]): void {
      for (let index = 0; index < children.length; index++) {
        if (found != null) break;
        const child = children[index];
        if (child != null && child.id == id) {
          found = child;
          break;
        }
        if (child.children != null) recurse(child.children);
      }
    }

    recurse(this.children);
    return found;
  }
}
