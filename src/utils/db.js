
/**
 * 获取缓存对象
 * @param {string} name 缓存名称
 * @returns {Object} 缓存对象
 */
export function getTable(name) {
    return JSON.parse(sessionStorage.getItem(name))
}

/**
 * 覆盖指定缓存
 * @param {string} name 缓存名称
 * @param {Object} data 新数据
 */
export function save(name, data) {
    sessionStorage.setItem(name, JSON.stringify(data))
}

/**
 * 添加或覆盖缓存某个记录
 * @param {string} name 缓存名称
 * @param {string} key 记录的key
 * @param {Object} data 新记录
 */
export function saveOne(name, key, data) {
    let table = getTable(name)
    if (table) {
        table[key] = data
    } else {
        table = {
            [key]: data
        }
    }
    save(name, table)
}

/**
 * 获取缓存中某个记录
 * @param {string} name 缓存名称
 * @param {string} key 记录的key
 * @returns {*|undefined}
 */
export function getOne(name, key) {
    const table = getTable(name)
    return table ? table[key] : undefined
}

/**
 * 缓存中是否有key
 * @param name
 * @param key
 * @returns {boolean}
 */
export function hasKey(name, key) {
    return getOne(name, key) !== undefined
}

/**
 *
 * 删除某个key
 * @param {string} name
 * @param {string} key
 */
export function deleteKey(name, key) {
    const tab = getTable(name)
    delete tab[key]
    save(name,tab)
}

/**
 * 初始化指定名称的缓存
 * @param name
 * @param data
 */
export function initData(name, data) {
    if (!getTable(name)) {
        save(name,data)
    }
}
