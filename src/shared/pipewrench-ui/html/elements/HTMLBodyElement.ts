import { HTMLElement, IHTMLElementAttributes } from '../HTMLElement';
import { AnyProps, ReactElement } from '../../React';

export interface BodyAttributes extends IHTMLElementAttributes { }

export const CSS_DEFAULT_BODY = {
    'display': 'block',
    'margin': '8px',
};

export class HTMLBodyElement extends HTMLElement<'body'> implements BodyAttributes {
    constructor(props: AnyProps, children: ReactElement[]) {
        super('body', CSS_DEFAULT_BODY, props, children);
    }
}
