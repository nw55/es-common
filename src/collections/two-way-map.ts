export class TwoWayMap<K, V> {
    private _map1 = new Map<K, V>();
    private _map2 = new Map<V, K>();

    constructor(items?: Iterable<[K, V]>) {
        if (items !== undefined) {
            for (const [key, value] of items)
                this.set(key, value);
        }
    }

    get size() {
        return this._map1.size;
    }

    getValue(key: K) {
        return this._map1.get(key);
    }

    getKey(value: V) {
        return this._map2.get(value);
    }

    hasKey(key: K) {
        return this._map1.has(key);
    }

    hasValue(value: V) {
        return this._map2.has(value);
    }

    set(key: K, value: V) {
        if (this._map2.has(value))
            this._map1.delete(this._map2.get(value)!);
        if (this._map1.has(key))
            this._map2.delete(this._map1.get(key)!);
        this._map1.set(key, value);
        this._map2.set(value, key);
        return this;
    }

    delete(key: K) {
        const value = this._map1.get(key);
        if (this._map1.delete(key)) {
            this._map2.delete(value!);
            return true;
        }
        return false;
    }

    deleteValue(value: V) {
        const key = this._map2.get(value);
        if (this._map2.delete(value)) {
            this._map1.delete(key!);
            return true;
        }
        return false;
    }

    clear() {
        this._map1.clear();
        this._map2.clear();
    }

    [Symbol.iterator]() {
        return this.entries();
    }

    entries() {
        return this._map1.entries();
    }

    inverseEntries() {
        return this._map2.entries();
    }

    keys() {
        return this._map1.keys();
    }

    values() {
        return this._map2.keys();
    }

    forEach(cb: (key: K, value: V, map: this) => void) {
        this._map1.forEach((value, key) => cb(key, value, this));
    }
}
