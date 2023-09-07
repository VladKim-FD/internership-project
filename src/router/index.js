import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/home.vue"
import productCard from "../pages/productCard.vue";
import shoppingCart from "../pages/shoppingCart.vue";
import likedProducts from '../pages/likedProducts.vue';
import productCheckout from '../pages/productCheckout.vue';
const routers = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/productCard/:id", name: "productCard", component: productCard },
    { path: "/shoppingCart", name: 'shoppingCart', component: shoppingCart},
    { path: "/likedProducts", name: 'likedProducts', component: likedProducts},
    { path: "/productCheckout", name: 'productCheckout', component: productCheckout},
    // { path: "/productCheckout", name: 'productCheckout', component: productCheckout},
  ],
});

export default routers;