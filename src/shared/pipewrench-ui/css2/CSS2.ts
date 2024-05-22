export interface CSSFontFace {
    'font-family': string;
    'src'?: string;
}

export interface CSSPropertyDefinition {
    readonly id: string;
    readonly defaultValue: string;
    readonly inherited: boolean;
    readonly animatable: boolean;
}

export class CSSPropertyGroup {
    private _array: { [id: string]: string } = {};
}

export interface CSSRuleAssignment {

}

export interface CSSRule {
    raw: string;
}

export interface CSSProperty {

}

export interface CSSNode {
    rule: CSSRule;
    properties: { [property: string]: CSSProperty };
}


export class CSSPool {



    constructor() {

    }

}

////////////////////////////////////////////////////
// ########  ##     ## ##       ########  ######  //
// ##     ## ##     ## ##       ##       ##    ## //
// ##     ## ##     ## ##       ##       ##       //
// ########  ##     ## ##       ######    ######  //
// ##   ##   ##     ## ##       ##             ## //
// ##    ##  ##     ## ##       ##       ##    ## //
// ##     ##  #######  ######## ########  ######  //
////////////////////////////////////////////////////

export const CSS_PROPERTIES: { [id: string]: CSSPropertyDefinition } = {};

export function registerCSSProperty(property: CSSPropertyDefinition): void {
    CSS_PROPERTIES[property.id.toLowerCase()] = property;
};

// https://www.w3schools.com/cssref/pr_class_position.php
registerCSSProperty({
    id: 'position',
    defaultValue: 'static',
    inherited: false,
    animatable: false,
});

// https://www.w3schools.com/cssref/pr_class_display.php
registerCSSProperty({
    id: 'display',
    defaultValue: 'inline',
    inherited: false,
    animatable: false,
});

// https://www.w3schools.com/cssref/pr_pos_top.php
registerCSSProperty({
    id: 'top',
    defaultValue: 'auto',
    inherited: false,
    animatable: true,
});

// https://www.w3schools.com/cssref/pr_pos_left.php
registerCSSProperty({
    id: 'left',
    defaultValue: 'auto',
    inherited: false,
    animatable: true,
});

// https://www.w3schools.com/cssref/pr_pos_bottom.php
registerCSSProperty({
    id: 'bottom',
    defaultValue: 'auto',
    inherited: false,
    animatable: true,
});

// https://www.w3schools.com/cssref/pr_pos_right.php
registerCSSProperty({
    id: 'right',
    defaultValue: 'auto',
    inherited: false,
    animatable: true,
});

// https://www.w3schools.com/cssref/pr_background-color.php
registerCSSProperty({
    id: 'background-color',
    defaultValue: 'transparent',
    inherited: false,
    animatable: true,
});

// https://www.w3schools.com/cssref/pr_background-image.php
registerCSSProperty({
    id: 'background-image',
    defaultValue: 'none',
    inherited: false,
    animatable: false,
});

// https://www.w3schools.com/cssref/pr_background-image.php
registerCSSProperty({
    id: 'font',
    defaultValue: 'small', /* (PZ-Specific) */
    inherited: true,
    animatable: true,
});

///////////////////////////////////////////////////
// ########  #######  ##    ## ########  ######  //
// ##       ##     ## ###   ##    ##    ##    ## //
// ##       ##     ## ####  ##    ##    ##       //
// ######   ##     ## ## ## ##    ##     ######  //
// ##       ##     ## ##  ####    ##          ## //
// ##       ##     ## ##   ###    ##    ##    ## //
// ##        #######  ##    ##    ##     ######  //
///////////////////////////////////////////////////

export const CSS_FONT_FACES: { [id: string]: CSSFontFace } = {};

export function registerCSSFontFace(fontFace: CSSFontFace): void {
    CSS_FONT_FACES[fontFace['font-family'].toLowerCase()] = fontFace;
}

registerCSSFontFace({ "font-family": "small" });
registerCSSFontFace({ "font-family": "medium" });
registerCSSFontFace({ "font-family": "large" });
registerCSSFontFace({ "font-family": "massive" });
registerCSSFontFace({ "font-family": "mainmenu1" });
registerCSSFontFace({ "font-family": "mainmenu2" });
registerCSSFontFace({ "font-family": "cred1" });
registerCSSFontFace({ "font-family": "cred2" });
registerCSSFontFace({ "font-family": "newsmall" });
registerCSSFontFace({ "font-family": "newmedium" });
registerCSSFontFace({ "font-family": "newlarge" });
registerCSSFontFace({ "font-family": "code" });
registerCSSFontFace({ "font-family": "mediumnew" });
registerCSSFontFace({ "font-family": "autonormsmall" });
registerCSSFontFace({ "font-family": "autonormmedium" });
registerCSSFontFace({ "font-family": "autonormlarge" });
registerCSSFontFace({ "font-family": "dialogue" });
registerCSSFontFace({ "font-family": "intro" });
registerCSSFontFace({ "font-family": "handwritten" });
registerCSSFontFace({ "font-family": "debugconsole" });
registerCSSFontFace({ "font-family": "title" });
