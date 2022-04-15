/***
 * Get data from url without cache
 */
async function getDataNoCache(url) {
    console.log('Fetching fresh data (no cache)');
    var result = await fetch(url);
    return result.text();
}

/***
 * Get data from cache or from url and store to cache
 */
async function getData(url) {
    const cacheName = `straumsnu-v.1`;
    let cachedData = await getCachedData(cacheName, url);

    if (cachedData) {
        console.log('Retrieved cached data');
        return cachedData;
    }

    console.log('Fetching fresh data');

    const cacheStorage = await caches.open(cacheName);
    await cacheStorage.add(url);
    cachedData = await getCachedData(cacheName, url);
    await deleteOldCaches(cacheName);

    return cachedData;
}

// Get data from the cache.
async function getCachedData(cacheName, url) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }

    return await cachedResponse.text();
}

// Delete any old caches to respect user's disk space.
async function deleteOldCaches(currentCache) {
    const keys = await caches.keys();

    for (const key of keys) {
        const isOurCache = 'straumsnu-' === key.substring(0, 6);

        if (currentCache === key || !isOurCache) {
            continue;
        }

        caches.delete(key);
    }
}

export default getData;