import { SelectorBlock as SelectorBlock } from './CSSParser';
import { parseHEX } from './color/HEX';
import { RGBA } from './color/RGBA';

function hex(hex: string): RGBA {
  return parseHEX(hex, '1');
}

export const COLOR_MAP: { [id: string]: RGBA } = {
  'transparent': { r: 0, g: 0, b: 0, a: 0, format: '1' },

  /* https://www.w3schools.com/cssref/css_colors.php */
  'aliceblue': hex('#F0F8FF'),
  'antiquewhite': hex('#FAEBD7'),
  'aqua': hex('#00FFFF'),
  'aquamarine': hex('#7FFFD4'),
  'azure': hex('#F0FFFF'),
  'beige': hex('#F5F5DC'),
  'bisque': hex('#FFE4C4'),
  'black': hex('#000000'),
  'blanchedalmond': hex('#FFEBCD'),
  'blue': hex('#0000FF'),
  'blueviolet': hex('#8A2BE2'),
  'brown': hex('#A52A2A'),
  'burlywood': hex('#DEB887'),
  'cadetblue': hex('#5F9EA0'),
  'chartreuse': hex('#7FFF00'),
  'chocolate': hex('#D2691E'),
  'coral': hex('#FF7F50'),
  'cornflowerblue': hex('#6495ED'),
  'cornsilk': hex('#FFF8DC'),
  'crimson': hex('#DC143C'),
  'cyan': hex('#00FFFF'),
  'darkblue': hex('#00008B'),
  'darkcyan': hex('#008B8B'),
  'darkgoldenrod': hex('#B8860B'),
  'darkgray': hex('#A9A9A9'),
  'darkgrey': hex('#A9A9A9'),
  'darkgreen': hex('#006400'),
  'darkkhaki': hex('#BDB76B'),
  'darkmagenta': hex('#8B008B'),
  'darkolivegreen': hex('#556B2F'),
  'darkorange': hex('#FF8C00'),
  'darkorchid': hex('#9932CC'),
  'darkred': hex('#8B0000'),
  'darksalmon': hex('#E9967A'),
  'darkseagreen': hex('#8FBC8F'),
  'darkslateblue': hex('#483DB8'),
  'darkslategray': hex('#2F4F4F'),
  'darkslategrey': hex('#2F4F4F'),
  'darkturquoise': hex('#00CED1'),
  'darkviolet': hex('#9400D3'),
  'deeppink': hex('#FF1493'),
  'deepskyblue': hex('#00BFFF'),
  'dimgray': hex('#696969'),
  'dimgrey': hex('#696969'),
  'dodgerblue': hex('#1E90FF'),
  'firebrick': hex('#B22222'),
  'floralwhite': hex('#FFFAF0'),
  'forestgreen': hex('#228B22'),
  'fuchsia': hex('#FF00FF'),
  'gainsboro': hex('#DCDCDC'),
  'ghostwhite': hex('#F8F8FF'),
  'gold': hex('#FFD700'),
  'goldenrod': hex('#DAA520'),
  'gray': hex('#808080'),
  'grey': hex('#808080'),
  'green': hex('#008000'),
  'greenyellow': hex('#ADFF2F'),
  'honeydew': hex('#F0FFF0'),
  'hotpink': hex('#FF69B4'),
  'indianred': hex('#CD5C5C'),
  'indigo': hex('4B0082'),
  'ivory': hex('#FFFFF0'),
  'khaki': hex('#F0E68C'),
  'lavender': hex('#E6E6FA'),
  'lavenderblush': hex('#FFF0F5'),
  'lawngreen': hex('#7CFC00'),
  'lemonchiffon': hex('#FFFACD'),
  'lightblue': hex('#ADD8E6'),
  'lightcoral': hex('#F08080'),
  'lightcyan': hex('#E0FFFF'),
  'lightgoldenrodyellow': hex('#FAFAD2'),
  'lightgray': hex('#D3D3D3'),
  'lightgrey': hex('#D3D3D3'),
  'lightgreen': hex('#90EE90'),
  'lightpink': hex('#FFB6C1'),
  'lightsalmon': hex('#FFA07A'),
  'lightseagreen': hex('#20B2AA'),
  'lightskyblue': hex('#87CEFA'),
  'lightslategray': hex('#778899'),
  'lightslategrey': hex('#778899'),
  'lightsteelblue': hex('#B0C4DE'),
  'lightyellow': hex('#FFFFE0'),
  'lime': hex('#00FF00'),
  'limegreen': hex('#32CD32'),
  'linen': hex('#FAF0E6'),
  'magenta': hex('#FF00FF'),
  'maroon': hex('#800000'),
  'mediumaquamarine': hex('#66CDAA'),
  'mediumblue': hex('#0000CD'),
  'mediumorchid': hex('#BA55D3'),
  'mediumpurple': hex('#9370DB'),
  'mediumseagreen': hex('#3CB371'),
  'mediumslateblue': hex('#7B68EE'),
  'mediumspringgreen': hex('#00FA9A'),
  'mediumturquoise': hex('#48D1CC'),
  'mediumvioletred': hex('#C71585'),
  'midnightblue': hex('#191970'),
  'mintcream': hex('#F5FFFA'),
  'mistyrose': hex('#FFE4E1'),
  'moccasin': hex('#FFE4B5'),
  'navajowhite': hex('#FFDEAD'),
  'navy': hex('#000080'),
  'oldlace': hex('#FDF5E6'),
  'olive': hex('#808000'),
  'olivedrab': hex('#6B8E23'),
  'orange': hex('#FFA500'),
  'orangered': hex('#FF4500'),
  'orchid': hex('#DA70D6'),
  'palegoldenrod': hex('#EEE8AA'),
  'palegreen': hex('#98FB98'),
  'paleturquoise': hex('#AFEEEE'),
  'palevioletred': hex('#DB7093'),
  'papayawhip': hex('#FFEFD5'),
  'peachpuff': hex('#FFDAB9'),
  'peru': hex('#CD853F'),
  'pink': hex('#FFC0CB'),
  'plum': hex('#DDA0DD'),
  'powderblue': hex('#B0E0E6'),
  'purple': hex('#800080'),
  'rebeccapurple': hex('#663399'),
  'red': hex('#FF0000'),
  'rosybrown': hex('#BC8F8F'),
  'royalblue': hex('#4169E1'),
  'saddlebrown': hex('#8B4513'),
  'salmon': hex('#FA8072'),
  'sandybrown': hex('#8B4513'),
  'seagreen': hex('#2E8B57'),
  'seashell': hex('#FFF5EE'),
  'sienna': hex('#A0522D'),
  'silver': hex('#C0C0C0'),
  'skyblue': hex('#87CEEB'),
  'slateblue': hex('#6A5ACD'),
  'slategray': hex('#708090'),
  'slategrey': hex('#708090'),
  'snow': hex('#FFFAFA'),
  'springgreen': hex('#00FF7F'),
  'steelblue': hex('#4682B4'),
  'tan': hex('#D2B48C'),
  'teal': hex('#008080'),
  'thistle': hex('#D8BFD8'),
  'tomato': hex('#FF6347'),
  'turquoise': hex('#40E0D0'),
  'violet': hex('#EE82EE'),
  'wheat': hex('#F5DEB3'),
  'white': hex('#FFFFFF'),
  'whitesmoke': hex('#F5F5F5'),
  'yellow': hex('#FFFF00'),
  'yellowgreen': hex('#9ACD32'),
}

/**
 * https://www.w3schools.com/cssref/pr_class_position.php
 *
 * | Rule     | Description                                                                                                                                                                                                                                                                             |
 * | :--      | :--                                                                                                                                                                                                                                                                                     |
 * | static   | Default value. Elements render in order, as they appear in the document flow.                                                                                                                                                                                                           |
 * | absolute | The element is positioned relative to its first positioned (not static) ancestor element.                                                                                                                                                                                               |
 * | fixed    | The element is positioned relative to the browser window.                                                                                                                                                                                                                               |
 * | relative | The element is positioned relative to its normal position, so "left:20px" adds 20 pixels to the element's LEFT position.                                                                                                                                                                |
 * | sticky   | The element is positioned based on the user's scroll position. A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed). |
 * | initial  | Sets this property to its default value.                                                                                                                                                                                                                                                |
 * | inherit  | Inherits this property from its parent element.                                                                                                                                                                                                                                         |
 */
export type PositionValue =
  | 'static'
  | 'absolute'
  | 'fixed'
  | 'relative'
  | 'sticky'
  | 'initial'
  | 'inherit';

/**
 * https://www.w3schools.com/cssref/pr_class_display.php
 *
 * | Rule         | Description                                                                                                                                              |
 * | :--          | :--                                                                                                                                                      |
 * | block        | Displays an element as a block element (like <p>). It starts on a new line, and takes up the whole width.                                                |
 * | flex         | Displays an element as a block-level flex container.                                                                                                     |
 * | inline       | Displays an element as an inline element (like <span>). Any height and width properties will have no effect.                                             |
 * | inline-block | Displays an element as an inline-level block container. The element itself is formatted as an inline element, but you can apply height and width values. |
 * | none         | The element is completely removed.                                                                                                                       |
 */
export type DisplayValue =
  | 'block'
  | 'flex'
  | 'inline'
  | 'inline-block'
  | 'none';

/**
 * https://www.w3schools.com/cssref/pr_pos_top.php
 *
 * | Rule    | Description                                                                         |
 * | :--     | :--                                                                                 |
 * | auto    | Lets the browser calculate the top edge position. This is default.                  |
 * | length  | Sets the top edge position in px, cm, etc. Negative values are allowed.             |
 * | %       | Sets the top edge position in % of containing element. Negative values are allowed. |
 * | initial | Sets this property to its default value.                                            |
 * | inherit | Inherits this property from its parent element.                                     |
 */
export type TopValue = 'auto' | 'initial' | 'inherit';

/**
 * https://www.w3schools.com/cssref/pr_pos_left.php
 *
 * | Rule    | Description                                                                          |
 * | :--     | :--                                                                                  |
 * | auto    | Lets the browser calculate the left edge position. This is default.                  |
 * | length  | Sets the left edge position in px, cm, etc. Negative values are allowed.             |
 * | %       | Sets the left edge position in % of containing element. Negative values are allowed. |
 * | initial | Sets this property to its default value.                                             |
 * | inherit | Inherits this property from its parent element.                                      |
 */
export type LeftValue = 'auto' | 'initial' | 'inherit';

/**
 * https://www.w3schools.com/cssref/pr_dim_width.php
 *
 * | Rule    | Description                                                |
 * | :--     | :--                                                        |
 * | auto    | Default value. The browser calculates the width.           |
 * | length  | Defines the width in px, cm, etc. Read about length units. |
 * | %       | Defines the width in percent of the containing block.      |
 * | initial | Sets this property to its default value.                   |
 * | inherit | Inherits this property from its parent element.            |
 */
export type WidthRule = 'auto' | 'initial' | 'inherit';

/**
 * https://www.w3schools.com/cssref/pr_dim_height.php
 *
 * | Rule    | Description                                                 |
 * | :--     | :--                                                         |
 * | auto    | Default value. The browser calculates the height.           |
 * | length  | Defines the height in px, cm, etc. Read about length units. |
 * | %       | Defines the height in percent of the containing block.      |
 * | initial | Sets this property to its default value.                    |
 * | inherit | Inherits this property from its parent element.             |
 */
export type HeightRule = 'auto' | 'initial' | 'inherit';

/**
 * https://www.w3schools.com/cssref/pr_dim_min-width.php
 *
 * | Rule    | Description                                                   |
 * | :--     | :--                                                           |
 * | length  | Default value is 0. Defines the minimum width in px, cm, etc. |
 * | %       | Defines the minimum width in percent of the containing block. |
 * | initial | Sets this property to its default value.                      |
 * | inherit | Inherits this property from its parent element.               |
 */
export type MinWidthRule = 'initial' | 'inherit';

/**
 * https://www.w3schools.com/cssref/pr_dim_min-height.php
 *
 * | Rule    | Description                                                   |
 * | :--     | :--                                                           |
 * | length  | Default value is 0. Defines the minimum width in px, cm, etc. |
 * | %       | Defines the minimum width in percent of the containing block. |
 * | initial | Sets this property to its default value.                      |
 * | inherit | Inherits this property from its parent element.               |
 */
export type MinHeightRule = 'initial' | 'inherit';

/**
 * https://www.w3schools.com/cssref/pr_dim_max-width.php
 *
 * | Rule    | Description                                                   |
 * | :--     | :--                                                           |
 * | none    | No maximum width. This is default.                            |
 * | length  | Defines the maximum width in px, cm, etc.                     |
 * | %       | Defines the maximum width in percent of the containing block. |
 * | initial | Sets this property to its default value.                      |
 * | inherit | Inherits this property from its parent element.               |
 */
export type MaxWidthRule = 'initial' | 'inherit' | 'none';

/**
 * https://www.w3schools.com/cssref/pr_dim_max-height.php
 *
 * | Rule    | Description                                                    |
 * | :--     | :--                                                            |
 * | none    | No maximum height. This is default.                            |
 * | length  | Defines the maximum height in px, cm, etc.                     |
 * | %       | Defines the maximum height in percent of the containing block. |
 * | initial | Sets this property to its default value.                       |
 * | inherit | Inherits this property from its parent element.                |
 */
export type MaxHeightRule = 'initial' | 'inherit' | 'none';

export class CSSRuleset {
  'position': PositionValue = 'relative';
  'display': DisplayValue = 'block';
  'top': TopValue = 'auto';
  'left': LeftValue = 'auto';
  'width': WidthRule | string = 'auto';
  'height': HeightRule | string = 'auto';
  'min-width': MinWidthRule | string = '0';
  'min-height': MinHeightRule | string = '0';
  'max-width': MaxWidthRule | string = 'none';
  'max-height': MaxHeightRule | string = 'none';

  'color': string = 'black';

  'font': string = null;

  'background-color': string = 'white';
  'background-image': string = 'none';

  constructor(...rawBlocks: SelectorBlock[]) {
    if (rawBlocks.length != 0) {
      for (const raw of rawBlocks) {
        if (raw != null) {
          for (const property of Object.keys(raw)) {
            (this as any)[property] = raw[property];
            // print(`${property} => ${raw[property]}`);
          }
        }
      }
    }
  }

  asInline(): CSSRuleset {
    const copy = new CSSRuleset();
    copy['position'] = this['position'];
    copy['display'] = this['display'];
    copy['top'] = this['top'];
    copy['left'] = this['left'];
    copy['width'] = this['width'];
    copy['height'] = this['height'];
    copy['min-width'] = this['min-width'];
    copy['min-height'] = this['min-height'];
    copy['max-width'] = this['max-width'];
    copy['max-height'] = this['max-height'];
    copy['background-color'] = this['background-color'];
    return copy;
  }

  setRules(other: CSSRuleset) {
    this['position'] = other['position'];
    this['display'] = other['display'];
    this['top'] = other['top'];
    this['left'] = other['left'];
    this['width'] = other['width'];
    this['height'] = other['height'];
    this['min-width'] = other['min-width'];
    this['min-height'] = other['min-height'];
    this['max-width'] = other['max-width'];
    this['max-height'] = other['max-height'];
    this['background-color'] = other['background-color'];
  }
}
