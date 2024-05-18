import { Element } from '@asledgehammer/pipewrench';
import { HTMLElement, CSS_DEFAULT_ELEMENT, IHTMLElementAttributes } from '../HTMLElement';
import { Props } from '../../React';
import { tPrint } from '../../util/table';

export const CSS_DEFAULT_SPAN = {
  ...CSS_DEFAULT_ELEMENT,
  'display': 'inline',
  'background-color': 'transparent',
};

export interface SpanAttributes extends IHTMLElementAttributes { }

export type SpanProps = Props & {};

export class HTMLSpanElement extends HTMLElement<'span'> {
  constructor(props: SpanProps, children: Element[], text: string) {
    super('span', CSS_DEFAULT_SPAN, props, children);
    this.innerText = text;
    print('children.length = ' + tostring(children.length));
    if(children.length == 1) {
      print(tPrint(children, 0, 4));
    }
  }
}
