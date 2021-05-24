export default [
    {
        path: '/system/user',
        component: () => import('../../views/children/system/user/view'),
        meta: { requireAuth: true },
        children: [
            { path: '', redirect: 'list' },
            {
                path: 'list',
                component: () => import('../../views/children/system/user/children/list'),
                meta: { requireAuth: true, menuCode: 'user' }
            },
            {
                path: 'detail/:id',
                component: () => import('../../views/children/system/user/children/detail'),
                meta: { requireAuth: true, menuCode: 'user' }
            },
            {
                path: 'add',
                component: () => import('../../views/children/system/user/children/modify'),
                meta: { requireAuth: true, menuCode: 'user' }
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/children/system/user/children/modify'),
                meta: { requireAuth: true, menuCode: 'user' },
                props: true
            }
        ]
    }
];
