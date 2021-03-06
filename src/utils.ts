// eslint-disable-next-line @typescript-eslint/ban-types
export type ConstructorLike<T extends object> = Omit<Function, 'prototype'> & { prototype: T; };

// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyConstructor<T extends object> = new (...args: any[]) => T;

// eslint-disable-next-line @typescript-eslint/ban-types
export type DefaultConstructor<T extends object> = new () => T;

export type Awaitable<T = unknown> = Promise<T> | T;

export type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

export type DeepPartial<T> =
    T extends Function | null ? T : // eslint-disable-line @typescript-eslint/ban-types
    T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : // eslint-disable-line @typescript-eslint/ban-types
    T;

export type DeepReadonly<T> =
    T extends Function | null ? T : // eslint-disable-line @typescript-eslint/ban-types
    T extends (infer U)[] ? readonly DeepReadonly<U>[] :
    T extends Map<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> :
    T extends Set<infer U> ? ReadonlySet<DeepReadonly<U>> :
    T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]> } : // eslint-disable-line @typescript-eslint/ban-types
    T;

export type AnyRecord = Record<PropertyKey, unknown>;

export type TypedArray = Uint32Array | Uint16Array | Uint8Array | Int32Array | Int16Array | Int8Array | Uint8ClampedArray | Float32Array | Float64Array;

export function defaultFactory<TResult, TParams extends any[]>(constructor: new (...args: TParams) => TResult) {
    return (...args: TParams) => new constructor(...args);
}

export function overwrite<T>(base: T, values: Partial<T>): T {
    return { ...base, ...values };
}

export function getIterableFirstElement<T>(iterable: Iterable<T>): T | undefined {
    const result = iterable[Symbol.iterator]().next();
    if (result.done !== true)
        return result.value;
    return undefined;
}

export function isArray(value: unknown): value is readonly unknown[] {
    return Array.isArray(value);
}

// based on https://stackoverflow.com/a/7616484
export function getStringHashCode(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash |= 0;
    }
    return hash;
}

// based on https://stackoverflow.com/a/1646913
export function combineHashCodes(...values: number[]) {
    let hash = 17;
    for (const value of values)
        hash = (hash * 31 + value) | 0;
    return hash;
}
