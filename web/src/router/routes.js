import user from './modules/user';
import role from './modules/role';
import menu from './modules/menu';
import article from './modules/article';
const routes = [
    {
        path: '/login',
        component: () => import('../views/login.vue'),
        meta: { requireAuth: false }
    },
    {
        path: '/',
        component: () => import('../views/view.vue'),
        meta: { requireAuth: true },
        children: [
            { path: '', redirect: '/dashboard' },
            {
                path: '/dashboard',
                component: () => import('../views/children/dashboard/view'),
                meta: { requireAuth: true, menuCode: 'dashboard' }
            },
            ...user,
            ...role,
            ...menu,
            ...article,
            {
                path: '/system/authority',
                component: () => import('../views/children/system/authority/view'),
                meta: { requireAuth: true, menuCode: 'authority' }
            },
            {
                path: '/notAuthority',
                component: () => import('../views/children/noAuthority'),
                meta: { requireAuth: false }
            }
        ]
    },
    {
        path: '*',
        component: () => import('../views/404.vue'),
        meta: { requireAuth: false }
    }
];

export default routes;
