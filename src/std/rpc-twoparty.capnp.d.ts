/**
 * This file is generated by hand in order to bootstrap compiler development. It is intended to be an exact match to
 * compiled output.
 */
import * as capnp from "../index";
import { Struct as __S } from "../index";
export declare const _capnpFileId = "a184c7885cdaf2a1";
export declare enum Side {
    SERVER = 0,
    CLIENT = 1
}
export declare class VatId extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    getSide(): Side;
    setSide(value: Side): void;
    toString(): string;
}
export declare class ProvisionId extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    getJoinId(): number;
    setJoinId(value: number): void;
    toString(): string;
}
export declare class RecipientId extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    toString(): string;
}
export declare class ThirdPartyCapId extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    toString(): string;
}
export declare class JoinKeyPart extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    getJoinId(): number;
    setJoinId(value: number): void;
    getPartCount(): number;
    setPartCount(value: number): void;
    getPartNum(): number;
    setPartNum(value: number): void;
    toString(): string;
}
export declare class JoinResult extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    getJoinId(): number;
    setJoinId(value: number): void;
    getSucceeded(): boolean;
    setSucceeded(value: boolean): void;
    adoptCap(value: capnp.Orphan<capnp.Pointer>): void;
    disownCap(): capnp.Orphan<capnp.Pointer>;
    getCap(): capnp.Pointer;
    hasCap(): boolean;
    setCap(value: capnp.Pointer): void;
    toString(): string;
}
