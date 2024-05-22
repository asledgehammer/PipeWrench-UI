import { Node } from "./Node";

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#callback)
 */
export type NodeListForEachCallback
    = (currentValue: Node, currentIndex: number, listObj: NodeList) => void;

/**
 * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
 */
export class NodeList {

    /** (Our private array of nodes) */
    private readonly _entries: Node[] = [];

    /**
     * The number of nodes in the NodeList.
     */
    length: number = 0;


    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/item)
     * 
     * @param index The index of the [Node](./Node.ts) to be fetched. The index is zero-based.
     * 
     * @return The indexth [Node](./Node.ts) in the list.
     */
    item(index: number) {
        return this._entries[index];
    }

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/entries)
     * 
     * @return An iterator.
     */
    entries(): Node[] {
        // Shallow-copy
        return [...this._entries];
    }

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)
     * 
     * Calls the callback given in parameter once for each value pair in the list, in insertion 
     * order.
     * 
     * @param callback A function to execute on each element of someNodeList.
     * @param thisArg A Value to use as this when executing callback.
     */
    forEach(callback: NodeListForEachCallback, thisArg?: any) {
        for (let index = 0; index < this._entries.length; index++) {
            callback(this._entries[index], index, thisArg);
        }
    }

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/keys)
     * 
     * @returns An iterator allowing to go through all keys contained in this object. The keys are
     * unsigned integer.
     */
    keys(): number[] {
        return Object.keys(this._entries).map((value) => tonumber(value));
    }

    /**
     * [Read more](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/values)
     * 
     * @returns An iterator allowing to go through all values contained in this object. The values 
     * are Node objects.
     */
    values(): Node[] {
        return Object.values(this._entries);
    }
}
