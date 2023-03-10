"use strict";
/**
 * @author jdiaz5513
 */
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segment = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const util_1 = require("../util");
const pointers_1 = require("./pointers");
const trace = (0, debug_1.default)("capnp:segment");
trace("load");
class Segment {
    constructor(id, message, buffer, byteLength = 0) {
        this[_a] = "Segment";
        this.id = id;
        this.message = message;
        this.buffer = buffer;
        this._dv = new DataView(buffer);
        this.byteOffset = 0;
        this.byteLength = byteLength;
    }
    /**
     * Attempt to allocate the requested number of bytes in this segment. If this segment is full this method will return
     * a pointer to freshly allocated space in another segment from the same message.
     *
     * @param {number} byteLength The number of bytes to allocate, will be rounded up to the nearest word.
     * @returns {Pointer} A pointer to the newly allocated space.
     */
    allocate(byteLength) {
        trace("allocate(%d)", byteLength);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let segment = this;
        byteLength = (0, util_1.padToWord)(byteLength);
        if (byteLength > constants_1.MAX_SEGMENT_LENGTH - 8) {
            throw new Error((0, util_1.format)(errors_1.SEG_SIZE_OVERFLOW, byteLength));
        }
        if (!segment.hasCapacity(byteLength)) {
            segment = segment.message.allocateSegment(byteLength);
        }
        const byteOffset = segment.byteLength;
        segment.byteLength = segment.byteLength + byteLength;
        trace("Allocated %x bytes in %s (requested segment: %s).", byteLength, this, segment);
        return new pointers_1.Pointer(segment, byteOffset);
    }
    /**
     * Quickly copy a word (8 bytes) from `srcSegment` into this one at the given offset.
     *
     * @param {number} byteOffset The offset to write the word to.
     * @param {Segment} srcSegment The segment to copy the word from.
     * @param {number} srcByteOffset The offset from the start of `srcSegment` to copy from.
     * @returns {void}
     */
    copyWord(byteOffset, srcSegment, srcByteOffset) {
        const value = srcSegment._dv.getFloat64(srcByteOffset, constants_1.NATIVE_LITTLE_ENDIAN);
        this._dv.setFloat64(byteOffset, value, constants_1.NATIVE_LITTLE_ENDIAN);
    }
    /**
     * Quickly copy words from `srcSegment` into this one.
     *
     * @param {number} byteOffset The offset to start copying into.
     * @param {Segment} srcSegment The segment to copy from.
     * @param {number} srcByteOffset The start offset to copy from.
     * @param {number} wordLength The number of words to copy.
     * @returns {void}
     */
    copyWords(byteOffset, srcSegment, srcByteOffset, wordLength) {
        const dst = new Float64Array(this.buffer, byteOffset, wordLength);
        const src = new Float64Array(srcSegment.buffer, srcByteOffset, wordLength);
        dst.set(src);
    }
    /**
     * Quickly fill a number of words in the buffer with zeroes.
     *
     * @param {number} byteOffset The first byte to set to zero.
     * @param {number} wordLength The number of words (not bytes!) to zero out.
     * @returns {void}
     */
    fillZeroWords(byteOffset, wordLength) {
        new Float64Array(this.buffer, byteOffset, wordLength).fill(0);
    }
    getBigInt64(byteOffset, littleEndian) {
        return this._dv.getBigInt64(byteOffset, littleEndian);
    }
    getBigUint64(byteOffset, littleEndian) {
        return this._dv.getBigUint64(byteOffset, littleEndian);
    }
    /**
     * Get the total number of bytes available in this segment (the size of its underlying buffer).
     *
     * @returns {number} The total number of bytes this segment can hold.
     */
    getCapacity() {
        return this.buffer.byteLength;
    }
    /**
     * Read a float32 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getFloat32(byteOffset) {
        return this._dv.getFloat32(byteOffset, true);
    }
    /**
     * Read a float64 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getFloat64(byteOffset) {
        return this._dv.getFloat64(byteOffset, true);
    }
    /**
     * Read an int16 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getInt16(byteOffset) {
        return this._dv.getInt16(byteOffset, true);
    }
    /**
     * Read an int32 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getInt32(byteOffset) {
        return this._dv.getInt32(byteOffset, true);
    }
    /**
     * Read an int64 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getInt64(byteOffset) {
        return this._dv.getBigInt64(byteOffset, true);
    }
    /**
     * Read an int8 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getInt8(byteOffset) {
        return this._dv.getInt8(byteOffset);
    }
    /**
     * Read a uint16 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getUint16(byteOffset) {
        return this._dv.getUint16(byteOffset, true);
    }
    /**
     * Read a uint32 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getUint32(byteOffset) {
        return this._dv.getUint32(byteOffset, true);
    }
    /**
     * Read a uint64 value (as a bigint) out of this segment.
     * NOTE: this does not copy the memory region, so updates to the underlying buffer will affect the returned value!
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getUint64(byteOffset) {
        return this._dv.getBigUint64(byteOffset, true);
    }
    /**
     * Read a uint8 value out of this segment.
     *
     * @param {number} byteOffset The offset in bytes to the value.
     * @returns {number} The value.
     */
    getUint8(byteOffset) {
        return this._dv.getUint8(byteOffset);
    }
    hasCapacity(byteLength) {
        trace("hasCapacity(%d)", byteLength);
        // capacity - allocated >= requested
        return this.buffer.byteLength - this.byteLength >= byteLength;
    }
    /**
     * Quickly check the word at the given offset to see if it is equal to zero.
     *
     * PERF_V8: Fastest way to do this is by reading the whole word as a `number` (float64) in the _native_ endian format
     * and see if it's zero.
     *
     * Benchmark: http://jsben.ch/#/Pjooc
     *
     * @param {number} byteOffset The offset to the word.
     * @returns {boolean} `true` if the word is zero.
     */
    isWordZero(byteOffset) {
        return this._dv.getFloat64(byteOffset, constants_1.NATIVE_LITTLE_ENDIAN) === 0;
    }
    /**
     * Swap out this segment's underlying buffer with a new one. It's assumed that the new buffer has the same content but
     * more free space, otherwise all existing pointers to this segment will be hilariously broken.
     *
     * @param {ArrayBuffer} buffer The new buffer to use.
     * @returns {void}
     */
    replaceBuffer(buffer) {
        trace("replaceBuffer(%p)", buffer);
        if (this.buffer === buffer)
            return;
        if (buffer.byteLength < this.byteLength) {
            throw new Error(errors_1.SEG_REPLACEMENT_BUFFER_TOO_SMALL);
        }
        this._dv = new DataView(buffer);
        this.buffer = buffer;
    }
    setBigInt64(byteOffset, value, littleEndian) {
        this._dv.setBigInt64(byteOffset, value, littleEndian);
    }
    /** WARNING: This function is not yet implemented.  */
    setBigUint64(byteOffset, value, littleEndian) {
        this._dv.setBigUint64(byteOffset, value, littleEndian);
    }
    /**
     * Write a float32 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setFloat32(byteOffset, val) {
        this._dv.setFloat32(byteOffset, val, true);
    }
    /**
     * Write an float64 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setFloat64(byteOffset, val) {
        this._dv.setFloat64(byteOffset, val, true);
    }
    /**
     * Write an int16 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setInt16(byteOffset, val) {
        this._dv.setInt16(byteOffset, val, true);
    }
    /**
     * Write an int32 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setInt32(byteOffset, val) {
        this._dv.setInt32(byteOffset, val, true);
    }
    /**
     * Write an int8 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setInt8(byteOffset, val) {
        this._dv.setInt8(byteOffset, val);
    }
    /**
     * Write an int64 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {bigint} val The value to store.
     * @returns {void}
     */
    setInt64(byteOffset, val) {
        this._dv.setBigInt64(byteOffset, val, true);
    }
    /**
     * Write a uint16 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setUint16(byteOffset, val) {
        this._dv.setUint16(byteOffset, val, true);
    }
    /**
     * Write a uint32 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setUint32(byteOffset, val) {
        this._dv.setUint32(byteOffset, val, true);
    }
    /**
     * Write a uint64 value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {bigint} val The value to store.
     * @returns {void}
     */
    setUint64(byteOffset, val) {
        this._dv.setBigUint64(byteOffset, val, true);
    }
    /**
     * Write a uint8 (byte) value to the specified offset.
     *
     * @param {number} byteOffset The offset from the beginning of the buffer.
     * @param {number} val The value to store.
     * @returns {void}
     */
    setUint8(byteOffset, val) {
        this._dv.setUint8(byteOffset, val);
    }
    /**
     * Write a zero word (8 bytes) to the specified offset. This is slightly faster than calling `setUint64` or
     * `setFloat64` with a zero value.
     *
     * Benchmark: http://jsben.ch/#/dUdPI
     *
     * @param {number} byteOffset The offset of the word to set to zero.
     * @returns {void}
     */
    setWordZero(byteOffset) {
        this._dv.setFloat64(byteOffset, 0, constants_1.NATIVE_LITTLE_ENDIAN);
    }
    toString() {
        return (0, util_1.format)("Segment_id:%d,off:%a,len:%a,cap:%a", this.id, this.byteLength, this.byteOffset, this.buffer.byteLength);
    }
}
exports.Segment = Segment;
_a = Symbol.toStringTag;
//# sourceMappingURL=segment.js.map