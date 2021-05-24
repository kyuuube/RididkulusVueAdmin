import { isPlainObject } from 'lodash';

export default function createProxy(obj, config = {}) {
    const proxy = Object.assign({}, obj);

    Object.keys(proxy).forEach(key => {
        Object.defineProperty(proxy, key, {
            get() {
                return config.get ? config.get(obj, key) : obj[key];
            },
            set(value) {
                config.set ? config.set(obj, key, value) : (obj[key] = value);
            }
        });

        const value = obj[key];
        if (config.deep && isPlainObject(value)) {
            obj[key] = createProxy(value, config);
        }
    });

    return proxy;
}
