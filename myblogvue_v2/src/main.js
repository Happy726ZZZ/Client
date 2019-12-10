// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/style.less'
import store from './store'

import axios from 'axios'
//import './mock/mock.js'
import showdown from 'showdown'

Vue.use(axios)
Vue.prototype.$http=axios;
axios.defaults.baseURL = '/api'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

axios.interceptors.request.use(
  config => {
    if(config.url==='/v2/auth/signin'||config.url==='/v2/auth/signup'){  //如果是登录和注册操作，则不需要携带header里面的token
    }else{
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorizatior = localStorage.getItem('Authorization');
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });
//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('Authorization');
          this.$router.push('/');
      }
    }
  }
)
//异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.path === '/') {//||to.path==='/v2/auth/signin'||to.path==='/v2/auth/signup'
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    console.log("我是浏览器本地缓存的token: "+token);
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
});