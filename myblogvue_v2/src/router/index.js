import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
	scrollBehavior(to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
		if (savePosition) {
			return savePosition;
		} else {
            var top;
            if (window.innerWidth >= 700) {
                 top = 676
            } else {
                 top = 267
            }
			return {
				x: 0,
				y: top
			}
		}
	},
	routes: [{
			path: '/',
			component: resolve => require(['../pages/Login.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'log'
		}, //首页
		{
			path: '/v2/articles',
			component: resolve => require(['../pages/Home.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Home'
		}, //首页
		{
			path: '/v2/article/:id',
			component: resolve => require(['../pages/DetailShare.vue'], resolve),
			meta: {
				auth: true
			},
			name: 'Detailarticle'
		}, //分享详情
		{
			path: '/v2/auth/signin',
			component: resolve => require(['../pages/Login.vue'], resolve),
			meta: {
				auth: false
			},
			name: 'Login'
		}, //注册登录
		{
			path: '/v2/auth/signup',
			component: resolve => require(['../pages/signup.vue'], resolve),
			meta: {
				auth: false
			},
			name: 'signup'
		}
	]
});

router.beforeEach((to, from, next) => {
	if(to.path == '/v2/auth/signin'||to.path=='/v2/auth/signup') {
		next();
	} else {
		let token = localStorage.getItem('Authorization');
		if(token == null || token == '') {
			next('/v2/auth/signin');
		} else {
			next();
		}
	}
});

export default router;
