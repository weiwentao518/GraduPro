// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Echarts from 'echarts'
import './assets/css/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import ApiConfig from './config/api-config.js'
import axios from 'axios'


Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts
Vue.prototype.extendApi = ApiConfig;
Vue.prototype.axios = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
