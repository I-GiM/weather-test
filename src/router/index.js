import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import Cookies from 'js-cookie'
import WeatherView from '@/views/WeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/sign-up',
      name: 'Signup',
      component: SignupView,
    },
    {
      path: '/weather',
      name: 'Weather',
      component: WeatherView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/WeatherView.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/sign-up']
  const isAuthenticated = await Cookies.get('access_token')

  if (publicPages.includes(to.path)) {
    if (isAuthenticated) {
      return next({ name: 'Weather' })
    }

    return next()
  }

  if (to.path === '/weather' && !isAuthenticated) {
    return next({ name: 'Login' })
  } else return next()
})

export default router
