import store from '../../store';
import * as $tabs from '../../store/modules/tabs/types';

export default router => {
    router.afterEach(async to => {
        if (to.meta && to.meta.requireAuth) {
            let tabMap = store.getters[`${$tabs.namespace}/${$tabs.getters.tabMap}`];
            await updateTabUrl(tabMap, to);
            await updateTabMap(tabMap, to);
        }
    });
};

// 更新tab中的路由
async function updateTabUrl(tabMap, to) {
    let tabList = JSON.parse(JSON.stringify(store.getters[`${$tabs.namespace}/${$tabs.getters.tabList}`]));
    if (tabMap.has(to.meta.menuCode)) {
        tabList.forEach(tab => {
            if (tab.menuCode === to.meta.menuCode) {
                tab.url = to.fullPath;
            }
        });
        await store.dispatch(`${$tabs.namespace}/${$tabs.actions.setTabList}`, tabList);
    }
}

// 更新map
async function updateTabMap(tabMap, to) {
    tabMap.set(to.meta.menuCode, to);
    await store.dispatch(`${$tabs.namespace}/${$tabs.actions.setTabMap}`, tabMap);
}
