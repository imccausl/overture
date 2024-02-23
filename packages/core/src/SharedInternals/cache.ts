type CurrentCache = any
interface Cache {
    current: null | CurrentCache
}

export const Cache: Cache = {
    current: null,
}
