export default {
    activated() {
        if (this.$route.meta.backSearch && this.$options.refresh) {
            this[this.$options.refresh]();
            delete this.$route.meta.backSearch;
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            const toKey = to.meta.menuCode || to.path;
            const fromKey = from.meta.menuCode || from.path;
            //此处判断是如果返回上一层，你可以根据自己的业务更改此处的判断逻辑，酌情决定是否摧毁本层缓存。
            //如果来去key相同代表是同一个tab下的页面并且具有noCache参数
            // (比如列表跳详情详情页带noCache同一tab下切换会清除详情页缓存)
            // (详情回列表列表没带noCache同一tab下切换不会清除列表缓存)
            //并且store的getIsCloseTab为true表明关闭tab的某一标签页
            if (toKey && fromKey && toKey === fromKey && from.meta.toNoCache) {
                vm.$clearCache(vm);
            }
        });
    },
    beforeRouteLeave(to, from, next) {
        if (from.meta.backSearch) {
            to.meta.backSearch = true;
        }
        next();
    }
};

export function clearCache(that) {
    if (that.$vnode && that.$vnode.data.keepAlive) {
        if (that.$vnode.parent && that.$vnode.parent.componentInstance && that.$vnode.parent.componentInstance.cache) {
            if (that.$vnode.componentOptions) {
                const key =
                    that.$vnode.key == null
                        ? that.$vnode.componentOptions.Ctor.cid +
                          (that.$vnode.componentOptions.tag ? `::${that.$vnode.componentOptions.tag}` : '')
                        : that.$vnode.key;
                const cache = that.$vnode.parent.componentInstance.cache;
                // eslint-disable-next-line no-unused-vars
                let keys = that.$vnode.parent.componentInstance.keys;
                if (Object.keys(cache).some(k => k.split('?')[0] === key.split('?')[0])) {
                    Object.keys(cache)
                        .filter(c => c.split('?')[0] === key.split('?')[0])
                        .forEach(di => {
                            delete cache[di];
                        });
                }
            }
        }
    }
}
