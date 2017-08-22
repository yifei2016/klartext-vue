// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import('./css/main.scss')
Vue.use(VueResource)
Vue.config.productionTip = false
var purecss = require('./css/main.scss')
Vue.use(purecss)
import App from './App'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
})
