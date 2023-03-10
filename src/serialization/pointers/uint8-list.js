"use strict";
/**
 * @author jdiaz5513
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint8List = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const list_element_size_1 = require("../list-element-size");
const list_1 = require("./list");
const pointer_1 = require("./pointer");
const trace = (0, debug_1.default)("capnp:list:composite");
trace("load");
class Uint8List extends list_1.List {
    get(index) {
        const c = (0, pointer_1.getContent)(this);
        return c.segment.getUint8(c.byteOffset + index);
    }
    set(index, value) {
        const c = (0, pointer_1.getContent)(this);
        c.segment.setUint8(c.byteOffset + index, value);
    }
    toString() {
        return `Uint8_${super.toString()}`;
    }
}
exports.Uint8List = Uint8List;
Uint8List._capnp = {
    displayName: "List<Uint8>",
    size: list_element_size_1.ListElementSize.BYTE
};
//# sourceMappingURL=uint8-list.js.map