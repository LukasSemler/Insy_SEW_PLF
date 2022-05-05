import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import Login_RegisterView from '../views/Login_RegisterView.vue';
import Comp_Login from '../components/Comp_Login.vue';
import Comp_Register from '../components/Comp_Register.vue';
import NotFoundView from '../views/NotFoundView.vue';
import ShoppingCartView from '../views/ShoppingCartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import AccountView from '../views/AccountView.vue';
import FAQ from '../views/FAQ.vue';
import AboutUsView from '../views/AboutUsView.vue';

import uebersichtSubView from '../views/SubViews/uebersichtSubView.vue';
import accountSubView from '../views/SubViews/accountSubView.vue';
import historySubView from '../views/SubViews/historySubView.vue';
import passwordSubView from '../views/SubViews/passwordSubView.vue';
import changeProductForm from '../views/SubViews/changeProductForm.vue';

import addProductSubView from '../views/SubViews/addProductSubView.vue';
import delProductSubView from '../views/SubViews/delproductSubView.vue';
import changeProductSubView from '../views/SubViews/changeProductSubView.vue';

import { PiniaStore } from '../Store/Store.js';

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
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCartView,
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.aktiverUser) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.aktiverUser) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/account',
      name: 'account',
      children: [
        { path: '', component: uebersichtSubView },
        { path: 'account', component: accountSubView },
        { path: 'password', component: passwordSubView },
        { path: 'history', component: historySubView },
        { path: 'addProduct', component: addProductSubView },
        { path: 'delProduct', component: delProductSubView },
        { path: 'changeproduct', component: changeProductSubView },
        { path: 'changeproductForm', component: changeProductForm },
      ],
      component: AccountView,
      beforeEnter: (to, from, next) => {
        const store = PiniaStore();
        if (store.aktiverUser) {
          next();
        } else {
          next('/');
        }
      },
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ,
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: AboutUsView,
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
