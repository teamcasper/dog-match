const MAX_CACHE_SIZE = 100;

class Cache {
    constructor(initialCache = {}) {
        this.store = Object.keys(initialCache).reduce((acc, key) => {
            acc[key] = { value: initialCache[key], created: new Date() };
            return acc;
        }, {});
    }

    get(key) {
        console.log(key);
        const cacheItem = this.store[key];
        if(cacheItem) return cacheItem.value;
        return null;
    }

    set(key, val) {
        const keys = Object.keys(this.store).sort((a, b) => a.created - b.created);
        if(key > MAX_CACHE_SIZE) {
            const toRemove = keys[0];
            delete this.store[toRemove];
        }
        this.store[key] = { value: val, created: new Date() };
    }
}

module.exports = Cache;
