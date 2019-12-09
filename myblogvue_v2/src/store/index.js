import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
  loading: false,
  UserList: [111,222,333], //用户列表
  themeObj: 0,//主题
  aboutmeObj:'',//关于我的信息
  host:"http://"+window.location.host+"/port/",//接口路径
  keywords:'',//关键词
  errorImg: 'this.onerror=null;this.src="' + require('../../static/img/tou.jpg') +'"'
}

export default new Vuex.Store({
    state: {
    	Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    	username: localStorage.getItem('username') ? localStorage.getItem('username') : ''
    },
    mutations: {
    	changeLogin(state, user) {
    		state.Authorization = user.Authorization;
    		state.username = user.username;
    		localStorage.setItem('Authorization', user.Authorization);
    		localStorage.setItem('username', user.username);
    		console.log('username '+user.username);
    	},
    	getusername(state) {
    		return state.username;
    	}
    }
});
