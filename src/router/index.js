import { createRouter, createWebHistory } from 'vue-router'
import CartPage from '../pages/cart/index.vue'
import MainPage from '../pages/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainPage
    },
    {
      path: '/cart',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CartPage
    }
  ]
})

export default router
