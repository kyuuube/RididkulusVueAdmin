export default [
    // {
    //     path: '/article',
    //     component: () => import('../../views/children/article/view'),
    //     meta: { requireAuth: true },
    //     children: [
    //         { path: '', redirect: 'list' },
    //         {
    //             path: 'list',
    //             component: () => import('../../views/children/article/children/list'),
    //             meta: { requireAuth: true, menuCode: 'article', keepAlive: true }
    //         },
    //         {
    //             path: 'add',
    //             component: () => import('../../views/children/article/children/modify'),
    //             meta: { requireAuth: true, menuCode: 'article', keepAlive: true }
    //         },
    //         {
    //             path: 'edit/:id',
    //             component: () => import('../../views/children/article/children/modify'),
    //             meta: { requireAuth: true, menuCode: 'article', keepAlive: true }
    //         }
    //     ]
    // }
    {
        path: '/article',
        component: () => import('../../views/children/article/children/list'),
        meta: { requireAuth: true, menuCode: 'article', keepAlive: true, toNoCache: true }
    },
    {
        path: '/article/add',
        component: () => import('../../views/children/article/children/modify'),
        meta: { requireAuth: true, menuCode: 'article', keepAlive: true, backSearch: true }
    },
    {
        path: '/article/edit/:id',
        component: () => import('../../views/children/article/children/modify'),
        meta: { requireAuth: true, menuCode: 'article', keepAlive: true, backSearch: true }
    }
];
