import { AngelCodeFont, UIFont, getTextManager } from "@asledgehammer/pipewrench";
import { getGraphics } from "./PZ";

export type HTMLFontMap = { [name: string]: HTMLFont };

export type MeasuredText = {
    raw: string;
    lines: string[];
    widths: number[];
    heights: number[];
    size: {
        width: number;
        height: number;
    }
};

export class HTMLFont {

    font: UIFont | AngelCodeFont;

    constructor(font: UIFont | AngelCodeFont) {
        this.font = font;
    }

    drawText(text: MeasuredText, x: number, y: number, red: number, green: number, blue: number, alpha: number): void {
        let yOffset = 0;
        if (this.isCustomFont()) {
            for (let index = 0; index < text.lines.length; index++) {
                const line = text.lines[index];
                (this.font as AngelCodeFont).drawString(x, y + yOffset, line, red, green, blue, alpha);
                yOffset += text.heights[index];
            }
        } else {
            const graphics = getGraphics();
            for (let index = 0; index < text.lines.length; index++) {
                const line = text.lines[index];
                graphics.DrawText(this.font as UIFont, line, x, y + yOffset, red, green, blue, alpha);
                yOffset += text.heights[index];
            }
        }
    }

    measureText(text: string, containerWidth: number, containerHeight: number): MeasuredText | null {
        if (text == '') return null;

        const textManager = getTextManager();

        let lines: string[] = [];
        let line = '';
        let offsetX = 0;
        let textSplit = text.split(' ').reverse();
        for (let index = 0; index < textSplit.length; index++) {

            // (Our next block to append to the current line)
            let prepender = (offsetX > 0 ? ' ' : '');
            const block = textSplit[index];
            const blockWidth = this.measureLineWidth(prepender + block);

            // We have met the edge of the line.
            if (offsetX + blockWidth > containerWidth) {
                // Extreme cases where the block is > the width of the parent's inner-space.
                if (line == '') lines.push(block);
                else lines.push(line);
                line = '';
                prepender = '';
            }
            // We have space. Append to line.
            else line += prepender + block;
        }

        // Go through and set the boundary for the text.
        const textWidths: number[] = [];
        const textHeights: number[] = [];
        const size = { width: 0, height: 0 };
        for (let index = 0; index < lines.length; index++) {
            const line = lines[index];
            const nextWidth = this.measureLineWidth(line);
            const nextHeight = this.measureLineHeight(line);
            textWidths.push(nextWidth);
            textHeights.push(nextHeight);
            if (size.width < nextWidth) size.width = nextWidth;
            size.height += nextHeight;
        }

        return {
            raw: text,
            lines,
            widths: textWidths,
            heights: textHeights,
            size
        };
    }

    measureLineWidth(text: string): number {
        if (this.isCustomFont()) {
            return (this.font as AngelCodeFont).getWidth(text);
        } else {
            return getTextManager().MeasureStringX(this.font as UIFont, text);
        }
    }

    measureLineHeight(text: string): number {
        if (this.isCustomFont()) {
            return (this.font as AngelCodeFont).getHeight(text);
        } else {
            return getTextManager().MeasureStringY(this.font as UIFont, text);
        }
    }

    isCustomFont(): boolean {
        return (this.font as AngelCodeFont).drawString != null;
    }
}

export const POOL_UIFONTS: HTMLFontMap = {
    'small': new HTMLFont(UIFont.Small),
    'medium': new HTMLFont(UIFont.Medium),
    'large': new HTMLFont(UIFont.Large),
    'massive': new HTMLFont(UIFont.Massive),
    'mainmenu1': new HTMLFont(UIFont.MainMenu1),
    'mainmenu2': new HTMLFont(UIFont.MainMenu2),
    'cred1': new HTMLFont(UIFont.Cred1),
    'cred2': new HTMLFont(UIFont.Cred2),
    'newsmall': new HTMLFont(UIFont.NewSmall),
    'newmedium': new HTMLFont(UIFont.NewMedium),
    'newlarge': new HTMLFont(UIFont.NewLarge),
    'code': new HTMLFont(UIFont.Code),
    'mediumnew': new HTMLFont(UIFont.MediumNew),
    'autonormsmall': new HTMLFont(UIFont.AutoNormSmall),
    'autonormmedium': new HTMLFont(UIFont.AutoNormMedium),
    'autonormlarge': new HTMLFont(UIFont.AutoNormLarge),
    'dialogue': new HTMLFont(UIFont.Dialogue),
    'intro': new HTMLFont(UIFont.Intro),
    'handwritten': new HTMLFont(UIFont.Handwritten),
    'debugconsole': new HTMLFont(UIFont.DebugConsole),
    'title': new HTMLFont(UIFont.Title),
};

export class HTMLFontPool {

    pool: HTMLFontMap;

    constructor() {
        this.pool = { ...POOL_UIFONTS };
    }

    registerFont(name: string, font: HTMLFont) {
        this.pool[name.toLowerCase()] = font;
    }

    unregisterFont(name: string): HTMLFont | null {
        const font = this.getFont(name);
        if (font == null) return null; // (Force 'null' not 'undefined')
        delete this.pool[name.toLowerCase()];
        return font;
    }

    getFont(name: string): HTMLFont | null {
        const font = this.pool[name.toLowerCase()];
        if (font == null) return null; // (Force 'null' not 'undefined')
        return font;
    }

}