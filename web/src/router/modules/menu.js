export default [
    {
        path: '/system/menu',
        component: () => import('../../views/children/system/menu/view'),
        meta: { requireAuth: true },
        children: [
            { path: '', redirect: 'list' },
            {
                path: 'list',
                component: () => import('../../views/children/system/menu/children/list'),
                meta: { requireAuth: true, menuCode: 'menu' }
            },
            {
                path: 'add',
                component: () => import('../../views/children/system/menu/children/modify'),
                meta: { requireAuth: true, menuCode: 'menu' }
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/children/system/menu/children/modify'),
                meta: { requireAuth: true, menuCode: 'menu' }
            }
        ]
    }
];
