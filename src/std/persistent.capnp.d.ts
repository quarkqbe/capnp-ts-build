/**
 * This file is generated by hand in order to bootstrap compiler development. It is intended to be an exact match to
 * compiled output.
 */
import * as capnp from "../index";
import { Struct as __S } from "../index";
export declare const _capnpFileId = "b8630836983feed7";
export declare class Persistent_SaveParams extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    adoptSealFor(value: capnp.Orphan<capnp.Pointer>): void;
    disownSealFor(): capnp.Orphan<capnp.Pointer>;
    getSealFor(): capnp.Pointer;
    hasSealFor(): boolean;
    setSealFor(value: capnp.Pointer): void;
    toString(): string;
}
export declare class Persistent_SaveResults extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    adoptSturdyRef(value: capnp.Orphan<capnp.Pointer>): void;
    disownSturdyRef(): capnp.Orphan<capnp.Pointer>;
    getSturdyRef(): capnp.Pointer;
    hasSturdyRef(): boolean;
    setSturdyRef(value: capnp.Pointer): void;
    toString(): string;
}
export declare class Persistent extends __S {
    static readonly SaveParams: typeof Persistent_SaveParams;
    static readonly SaveResults: typeof Persistent_SaveResults;
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    toString(): string;
}
export declare class RealmGateway extends __S {
    static readonly _capnp: {
        displayName: string;
        id: string;
        size: capnp.ObjectSize;
    };
    toString(): string;
}
