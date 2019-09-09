const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.Default.vue'),
    children: [
      { path: '', component: () => import('pages/PageDashboard.vue') },
      { path: 'clients', component: () => import('pages/Clients/PageClients.vue') },
      { path: 'product', component: () => import('pages/Product/PageProduct.vue') },
      { path: 'categories', component: () => import('pages/Categories/PageCategory.vue') },
      {
        path: 'promo',
        component: () => import('layouts/Layout.Promo.vue'),
        children: [
          { path: '', component: () => import('pages/Promo/PagePromo.vue') },
          { path: ':id?/product', component: () => import('pages/Promo/PagePromoProduct.vue') },
        ],
      },
      { path: 'claim-reward', component: () => import('pages/Promo/PagePromoClaim') },
      { path: 'users', component: () => import('pages/User/PageUsers.vue') },
      { path: 'voucher', component: () => import('pages/PageVoucher.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/Layout.Auth.vue'),
    children: [
      { path: 'login', component: () => import('components/auth/Login.vue') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
