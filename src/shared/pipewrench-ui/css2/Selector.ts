/*
 * https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
 */

import { onMainMenuEnter } from "@asledgehammer/pipewrench-events";
import * as JSON from '../util/JSON';

export type PseudoType = 'class' | 'function';

export type NodeTarget = 'at' | 'after' | 'child-of' | 'nested-in';

/**
 * * universal - All patterns. (E.G: `div *` selects everything inside of a div)
 * * id - The ID of an element. (E.G: `#my-div` selects the node with the assigned ID `id="my-div"`)
 * * class - The Class assigned to any element. (E.G: `.my-class` selects all nodes with the assigned class `class="my-class"`)
 * * tag - All DOM tags of a certain type. (E.G: `p` selects all `<p>..</p>` tags)
 * 
 * [Read More](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics#different_types_of_selectors)
 */
export type NodeType = 'universal' | 'id' | 'class' | 'tag';

/**
 * There are two types of clauses in CSS selectors: 
 * * Combinators
 * * Separators
 * 
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors#combinators_and_separators)
 */
export type NodeClauseType = 'combinator' | 'separator';

/**
 * * next-sibling: `Node + Sibling` [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator)
 * * child: `Node > Child` [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator)
 * * column: `Node || Column` [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/Column_combinator)
 * * subsequent: `Node ~Node` [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/Subsequent-sibling_combinator)
 * * descendant: `Node SubNode` [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator)
 */
export type CombinatorOperation = '+' | '>' | '||' | '~' | ' ' | '';

/**
 * * namespace: `Namespace | Node` [Read More](https://developer.mozilla.org/en-US/docs/Web/CSS/Namespace_separator) 
 * 
 * [\@NameSpace Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/\@namespace)
 */
export type SeparatorOperation = '|';

export type NodeOperation = CombinatorOperation | SeparatorOperation;

export interface Typed<Type extends string> {
    __type: Type;
}

export interface PseudoComponent extends Typed<'pseudo-component'> {
    raw: string;
    name: string;
    delimiter: ':' | '::';

    /** If undefined, no function-call. If empty, empty function-call. */
    args: string[];
}

export interface Node extends Typed<'node'> {
    type: NodeType;
    raw: string;
    name: string;

    /** 
     * The specified element(s), but only when in the specified state. (For example, when a cursor hovers over a link) 
     * 
     * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors#selectors
     */
    pseudo?: PseudoComponent;
}

export interface NodeSelectorClause {
    type: NodeClauseType;
};

export interface NodeCombinator extends Typed<'combinator'> {
    left: Selection;
    right: Selection;
    operator: CombinatorOperation;
    raw: string;
}

export interface NodeSeparator extends Typed<'separator'> {
    left: Selection;
    right: Selection;
    operator: SeparatorOperation;
    raw: string;
}

export type Selection = NodeCombinator | NodeSeparator | Node;

export interface Selector {
    raw: string,
    selections: Selection[];
}


export function parseNode(rawSelection: string): Node {
    rawSelection = rawSelection.trim();
    let name: string = rawSelection;
    let type: NodeType = 'tag';
    if (rawSelection.indexOf('#') == 0) {
        type = 'id';
        name = rawSelection.substring(1, rawSelection.length);
    } else if (rawSelection.indexOf('.') == 0) {
        type = 'class';
        name = rawSelection.substring(1, rawSelection.length);
    } else if (rawSelection.indexOf('*') == 0) {
        if (rawSelection.length != 1) {
            throw new Error('Cannot have non-character node contain \'*\'');
        }
        type = 'universal';
        name = '*';
    }

    let pseudo: PseudoComponent = null;

    // Presence of Pseudo-entity.
    if (name.indexOf(':') != -1) {
        // Pseudo-element
        if (name.indexOf('::') != -1) {
            const split = name.split('::');
            name = split[0];
            const rawPseudo = split[1];
            pseudo = {
                __type: 'pseudo-component',
                delimiter: '::',
                raw: rawPseudo,
                name: rawPseudo,
                args: undefined,
            };
        }
        // Pseudo-class
        else {
            const split = name.split(':');
            name = split[0];
            const rawPseudo = split[1].trim();
            let pseudoClassName = rawPseudo;
            let args: string[] | undefined = undefined;

            let firstIndex = pseudoClassName.indexOf('(');

            if (firstIndex != -1) {
                // Has no args but is function-call.
                if (pseudoClassName.indexOf('()') != -1) {
                    pseudoClassName = rawPseudo.substring(0, pseudoClassName.length - 2).trim();
                    args = [];
                }
                // Has args.
                else {
                    pseudoClassName = pseudoClassName.substring(0, firstIndex);
                    const argsString = rawPseudo.split('(')[1].split(')')[0];
                    if (argsString.indexOf(',') !== -1) {
                        args = argsString.split(',');
                        args.forEach((value) => value.trim());
                    } else {
                        args = [argsString.trim()];
                    }
                }
            }

            pseudo = {
                __type: 'pseudo-component',
                raw: rawPseudo,
                name: pseudoClassName,
                delimiter: ':',
                args
            };
        }
    }

    return {
        __type: 'node',
        raw: rawSelection,
        name,
        type,
        pseudo,
    };
};

export function parseSelector(raw: string): Selector {

    const selections: Selection[] = [];

    function parseSelection(rawSelection: string): Selection {
        rawSelection = rawSelection.trim();
        const tokens: string[] = [];
        let token = '';
        let inSpace = false;
        let foundSymbol = false;
        function push() {
            if (token.length != 0) {
                tokens.push(token);
                token = '';
            }
        }
        function add(token: string) {
            tokens.push(token);
        }
        for (let i = 0; i < rawSelection.length; i++) {
            const c0 = rawSelection[i];
            const c1 = rawSelection[i + 1];
            if (!inSpace) {
                if (c0 == ' ') {
                    if (!inSpace) {
                        inSpace = true;
                        push();
                    }
                }
                else if (c0 == '#' || c0 == '.') {
                    push();
                    add('');
                    token += c0;
                }
                else token += c0;
            } else {
                if (c0 == '+') {
                    push();
                    add('+');
                    foundSymbol = true;
                } else if (c0 == '>') {
                    push();
                    add('>');
                    foundSymbol = true;
                } else if (c0 == '|') {
                    push();
                    if (c1 == '|') {
                        i++;
                        add('||');
                    } else add('|');
                    foundSymbol = true;
                } else if (c0 == '~') {
                    push();
                    add('~');
                    foundSymbol = true;
                } else if (c0 != ' ') {
                    inSpace = false;
                    if (!foundSymbol) add(' ');
                    foundSymbol = false;
                    token += c0;
                }
            }
        }

        // Push any remaining token being built at the end of the selection.
        push();

        // Even-index: Node.
        // Odd-index: Relation to next node.
        let even = true;
        let last: Selection = null;
        let lastOp: NodeCombinator | NodeSeparator = null;
        let selection: Selection = null;

        for (let index = 0; index < tokens.length; index++) {
            const token = tokens[index];
            if (even) {
                const n = parseNode(token);
                if (last != null) {
                    if (last.__type === 'combinator' || last.__type == 'separator') {
                        last.right = n;
                    }
                }
                last = n;
            } else {
                switch (token) {
                    case '':
                    case '+':
                    case '>':
                    case '||':
                    case '~':
                    case ' ': {
                        last = {
                            __type: 'combinator',
                            left: last,
                            right: null,
                            operator: token,
                            raw: ''
                        };
                        break;
                    }
                    case '|': {
                        last = {
                            __type: 'separator',
                            left: last,
                            right: null,
                            operator: token,
                            raw: '',
                        }
                        break;
                    }
                    default: {
                        throw new Error();
                    }
                }
                if (lastOp != null) {
                    lastOp.right = last;
                }
                lastOp = (last as any);
            }
            even = !even;

            // (If 0, node. If 1, first operation)
            if (index <= 1) selection = last;
        }

        function getRawString(next: Selection) {
            switch (next.__type) {
                case "combinator": {
                    switch (next.operator) {
                        case "": {
                            next.raw = `${getRawString(next.left)}${getRawString(next.right)}`;
                            break;
                        }
                        case " ": {
                            next.raw = `${getRawString(next.left)} ${getRawString(next.right)}`;
                            break;
                        }
                        case "+":
                        case ">":
                        case "||":
                        case "~": {
                            next.raw = `${getRawString(next.left)} ${next.operator} ${getRawString(next.right)}`;
                            break;
                        }
                    }
                    break;
                }
                case "separator": {
                    switch (next.operator) {
                        case '|': {
                            next.raw = `${getRawString(next.left)} ${next.operator} ${getRawString(next.right)}`;
                            break;
                        }
                    }
                    break;
                }
                case "node": {
                    switch (next.type) {
                        case "universal": {
                            next.raw = '*';
                            break;
                        }
                        case "tag": {
                            next.raw = next.name;
                            break;
                        }
                        case "id":
                        case "class": {
                            next.raw = `${next.type}${next.name}`;
                            break;
                        }
                    }
                    if (next.pseudo != null) {
                        next.raw += `${next.pseudo.delimiter}${next.pseudo.raw}`;
                    }
                }
            }
            return next.raw;
        }

        getRawString(selection);

        return selection;
    }

    if (raw.indexOf(',') !== -1) {
        const split = raw.split(',');
        for (let index = 0; index < split.length; index++) {
            const nextRaw = split[index].trim();
            selections.push(parseSelection(nextRaw));
        }
    } else {
        selections.push(parseSelection(raw.trim()));
    }

    return { raw, selections };
}
