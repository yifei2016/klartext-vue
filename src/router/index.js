import Vue from 'vue'
import Router from 'vue-router'
import Search from '../components/Search.vue'
import Signup from '../components/Signup.vue'
import Signin from '../components/Signin.vue'
import Mypage from '../components/Mypage.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/home',
      component: Search
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/me',
      component: Mypage
    }
  ]
})
