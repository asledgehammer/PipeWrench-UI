import { PWUIElement } from "./elements/PWUIElement";

export type OptionalElementFunction = (element: PWUIElement) => void;
export type ElementFactory = (props: Props, children?: Element[]) => Element;
export type ElementChildren = string | Element | ElementChildren[];
export type Props = {};
export type AnyProps = Props & { [prop: string]: any };
export interface Element {}
export interface ElementConstructor {
  new (props: any, children?: Element[]): Element;
}
