"use strict";
/**
 * @author jdiaz5513
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Float64List = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const list_element_size_1 = require("../list-element-size");
const list_1 = require("./list");
const pointer_1 = require("./pointer");
const trace = (0, debug_1.default)("capnp:list:composite");
trace("load");
class Float64List extends list_1.List {
    get(index) {
        const c = (0, pointer_1.getContent)(this);
        return c.segment.getFloat64(c.byteOffset + index * 8);
    }
    set(index, value) {
        const c = (0, pointer_1.getContent)(this);
        c.segment.setFloat64(c.byteOffset + index * 8, value);
    }
    toString() {
        return `Float64_${super.toString()}`;
    }
}
exports.Float64List = Float64List;
Float64List._capnp = {
    displayName: "List<Float64>",
    size: list_element_size_1.ListElementSize.BYTE_8
};
//# sourceMappingURL=float64-list.js.map