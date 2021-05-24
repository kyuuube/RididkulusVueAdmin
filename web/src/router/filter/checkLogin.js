import store from '../../store';
import * as $account from '../../store/modules/account/types';

export default router => {
    router.beforeEach(async (to, from, next) => {
        if (to.meta && !to.meta.requireAuth) {
            // 不需要登录,直接跳过
            next();
            return;
        }
        let currentUser = store.getters[`${$account.namespace}/${$account.getters.user}`];
        if (!currentUser) {
            return notLogin(router, to);
        }
        if (currentUser) {
            // 已登录
            return next();
        }
    });
};

function notLogin(router, to) {
    // 未登录
    router
        .replace({
            path: '/login',
            query: to.fullPath === '/' ? {} : { redirect: to.fullPath }
        })
        .catch(e => e);
}
