import store from '../../store';
import * as $account from '../../store/modules/account/types';
import { getNode } from '../../common/getNode';

export default router => {
    router.beforeEach(async (to, from, next) => {
        if (to.path !== '/login' && to.path !== '/notAuthority' && to.path !== '/404' && to.matched[0].path !== '*') {
            const menu = store.getters[`${$account.namespace}/${$account.getters.menu}`];
            console.log(to.meta.menuCode, menu);
            const node = getNode(to.meta.menuCode, menu, 'menuCode');
            if (!node) {
                return notAuthority(router);
            } else {
                return next();
            }
        } else {
            next();
        }
    });
};

function notAuthority(router) {
    router
        .push({
            path: '/notAuthority'
        })
        .catch(e => e);
}
