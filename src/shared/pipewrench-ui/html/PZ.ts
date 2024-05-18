import { RadialMenu, UIElement, UIManager } from "@asledgehammer/pipewrench";

let javaObject: UIElement;
let radialMenu: RadialMenu;

export function initPZ(table: any) {
    javaObject = new UIElement(table);
    UIManager.AddUI(javaObject);

    radialMenu = new RadialMenu(0, 0, 0, 0);
    // radialMenu.setTable(table);
    // UIManager.AddUI(radialMenu);
}

export function getGraphics(): UIElement {
    return javaObject;
}

export function getRadialGraphics(): RadialMenu {
    return radialMenu;
}
