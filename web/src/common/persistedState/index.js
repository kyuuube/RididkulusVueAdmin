import createProxy from '../createProxy';

export default function persistedState(storeKey, storeState, state) {
    let item = window.localStorage.getItem(storeKey);
    if (item !== undefined) {
        item = JSON.parse(item);
        Object.keys(storeState).forEach(key => {
            storeState[key] = item && item[key] !== undefined ? item[key] : storeState[key];
        });
    }
    const storeStateProxy = createProxy(storeState, {
        deep: true,
        set(obj, key, value) {
            obj[key] = value;
            window.localStorage.setItem(storeKey, JSON.stringify(storeState));
        }
    });

    const proxyState = createProxy(Object.assign({}, storeStateProxy, state), {
        get(obj, key) {
            return key in storeStateProxy ? storeStateProxy[key] : state[key];
        },
        set(obj, key, value) {
            key in storeStateProxy ? (storeStateProxy[key] = value) : (state[key] = value);
        }
    });
    return proxyState;
}
