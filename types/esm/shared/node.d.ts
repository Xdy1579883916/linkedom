export function isConnected({ ownerDocument, parentNode }: {
    ownerDocument: any;
    parentNode: any;
}): boolean;
export function parentElement({ parentNode }: {
    parentNode: any;
}): any;
export function previousSibling({ [PREV]: prev }: {
    "__@PREV@21597": any;
}): any;
export function nextSibling(node: any): any;
import { PREV } from "./symbols.js";
