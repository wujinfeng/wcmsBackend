// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/css/main.css'
import '@/assets/css/normalize.css'
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import App from './App'
import router from './router'
import DatePicker from '@/components/DatePicker'
import Pagination from '@/components/Pagination.vue'

Vue.use(ElementUI, {size: 'small'})
Vue.use(mavonEditor)
Vue.use(Vuex)

Vue.component('date-picker', DatePicker)
Vue.component('pagination', Pagination)

axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
