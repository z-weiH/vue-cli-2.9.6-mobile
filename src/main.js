// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false


if(process.env.NODE_ENV === 'development') {
  
}

// 样式
import '@/assets/css/index.scss'

// 指令
import './directive'

// axios
import axios from 'axios'
import './axios'
Vue.prototype.$http = axios;

// 引入 store
import store from './store'

// 引入 config
import config from './config'
Vue.prototype.$config = config;

// cookie
import cookie from 'js-cookie'
Vue.prototype.$cookie = cookie;

// 引入 vconsole
//if(process.env.NODE_ENV === 'development') {
  /* let VConsole = require('vconsole');
  const vConsole = new VConsole(); */
//}

// 移除移动端点击延迟
const FastClick = require('fastclick');
FastClick.attach(document.body);

// 校验
import Validator from 'vue-smart-validator'
Vue.use(new Validator());


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
