
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/home',
    children: [
      { path: 'home',name:"home", component: () => import('pages/IndexPage.vue') },
      { path: 'favs', component: () => import('pages/FavoritesPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
