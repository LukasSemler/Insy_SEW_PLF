import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import Login_RegisterView from '../views/Login_RegisterView.vue';
import Comp_Login from '../components/Comp_Login.vue';
import Comp_Register from '../components/Comp_Register.vue';
import NotFoundView from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/productDetail',
      name: 'productDetail',
      component: ProductDetailView,
    },
    {
      path: '/loginregister',
      name: 'loginregister',
      component: Login_RegisterView,
      children: [
        { path: '', component: Comp_Login },
        { path: 'register', component: Comp_Register },
      ],
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPageView.vue'),
    },
    { path: '/:pathmatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
});

export default router;
