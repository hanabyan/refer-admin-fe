const routes = [
  {
    path: '/',
    component: () => import('layouts/Default.vue'),
    children: [
      { path: '', component: () => import('pages/PageDashboard.vue') },
      { path: 'clients', component: () => import('pages/PageClients.vue') },
      { path: 'product', component: () => import('pages/PageProduct.vue') },
      { path: 'voucher', component: () => import('pages/PageVoucher.vue') },
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
