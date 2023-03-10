/**
 * @author jdiaz5513
 */
import { Pointer } from "./pointer";
/**
 * This is used as the return value for `Pointer.prototype.initPointer`. Turns out using a class in V8 for multiple
 * return values is faster than using an array or anonymous object.
 *
 * http://jsben.ch/#/zTdbD
 *
 * @export
 * @class PointerAllocationResult
 */
export declare class PointerAllocationResult {
    readonly offsetWords: number;
    readonly pointer: Pointer;
    constructor(pointer: Pointer, offsetWords: number);
}
