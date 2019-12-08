### 任务要求
使用vue框架完成前端的设计。

### 实现过程
1.	首先安装nodejs与vue
	
	
	```
	npm install -g vue-cli
	```
2.	创建并启动项目
	
	
	```
	vue init webpack vue-client
	npm run dev
	```
3.	设计完成后对项目打包
	
	
	```
	npm run build
	```

### 在src文件目录下完成各个页面组件的添加与设计
由于对前端美术的不熟悉，所以主要在网上找的各种html与css样式。
整体的路由页面设计如下：（router/index.js）

```javascript
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

```

1.	设计登陆与注册页面
	首先编写出（copy）页面
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206113140189.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206113156744.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	然后对按钮点击事件进行处理，这里使用到了token来进行身份的验证。
	

	```javascript
	this.$http.post('/v2/auth/signin',info).then(res=>{
	  console.log(res.data.data.token);
	  that.userToken = res.data.data.token;
	  that.changeLogin({ Authorization: this.userToken ,username: this.username});
	  this.$router.push('/v2/articles?page=1');
	}).catch(err=>{
	  console.log(err);
	});
	```
	通过返回的token来调用changeLogin函数对token进行储存，下面对token的使用进行介绍。
	首先新建一个store文件夹，在里面创建文件index.js，编写函数使用localStorage对token进行储存。
	

	```javascript
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
	```
	这里也顺便将登陆的用户名储存在localStorage中，这样在后面就记住了当前用户。除此之外，还需要在router/index.js中对网页的请求进行拦截。
	

	```javascript
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
	```
	这样实现了当没有token的时候只能在登陆页面，不能访问博客信息页面。
	这样就实现了登陆页面，对于注册页面更加的简单，只需要post注册输入的用户名和密码即可。
	

	```javascript
	gotoHome:function(){//用户注册
        var that = this;
        var info={
            username: '',
            password: ''
        }
        info.username=that.username;
        info.password=that.password;
        //console.log(this.password);
        this.$http.post('/v2/auth/signup',info);
        this.$router.replace('/v2/auth/signin');
    },
	```

2.	文章列表页面
	此页面用于显示文章的标题以及用户的用户名。
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206143641327.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206143652880.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	这里使用到的数据是用mock随机生成的，每个文章的显示有左上角的标签tag与标题，点击“阅读全文”进入文章的详细页面。
	在登陆成功之后会自动跳转至第一页，分页跳转的实现函数如下：
	

	```javascript
		//请求数据
	   dataListFn: function(index){
	        console.log(index);
	        this.$http.get('/v2/articles?page='+index,
	        {
	            params:{
	                page: index,
	                limit:'10',
	                state: 0
	            }
	        }).then((res) => {
	            this.data=res.data.data;
	            //console.log(this.data);
	        });
	    },
	    //分页
	    btnClick: function(data){//页码点击事件
	        if(data != this.cur){
	            this.cur = data
	        }
	        //根据点击页数请求数据
	        var id=this.cur.toString();
	        this.dataListFn(id);
	        //id++;
	        this.$router.replace('/v2/articles?page='+id);
	    },
	    pageClick: function(){
	        //根据点击页数请求数据
	        var id=this.cur.toString();
	        this.dataListFn(this.cur.toString());
	        this.dataListFn(id);
	        this.$router.replace('/v2/articles?page='+id);
	    }
	```
	通过向后台发送带page参数的url请求获取到相应的文章，然后显示出来。页数使用一个变量cur来计算。
	在页面的右方有一张图片与一个用户名的信息，实现很简单，只需要调用localStorage里面的username即可。
	

	```javascript
	 methods:{
	        ...mapMutations(['getusername']),
	        getAlldata(){
	            let that=this;
	            that.data=localStorage.getItem('username');
	        }
	    }
	```

3.	文章详情页面的设计
	文章详情页面包含了文章的所有信息，以及用户评论模块。
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206145808359.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	文章的信息通过向后台发送获取文章的url获取：
	

	```javascript
	routeChange:function(){
        var id=this.$route.params.id;
        //console.log(id);
        let that=this;
        this.$http.get('/v2/article/'+id)
        .then(function(res){
            //console.log("getdata");
            that.detailObj=res.data.data;
            console.log(that.detailObj);
        })
        .catch(function(err) {
            console.log("error:"+err);
        });
    }
	```
	下面介绍评论模块。
	同样通过向后台发送当前文章的id请求当前文章的评论信息，得到后依次显示在下方。
	

	```javascript
	getcommentdata() {
      var id=this.$route.params.id;
      var path='/v2/article/';
      path+=id;
      path+='/comments';
      console.log(path);
      let that = this;
      this.$http.get(path)
      .then(function(res){
          that.commentList=res.data.data;
          //console.log(that.commentList);
      })
      .catch(function(err) {
          console.log("error:"+err);
      });
    }
	```
	用户评论之后点击发送按钮将评论post到后台数据库储存起来。
	

	```javascript
	sendMsg:function(){//留言
        var that = this;
        if(that.textarea){
            //that.sendTip = '咻~~';
            var id=this.$route.params.id;
            //console.log(that.textarea);
            var obj={
              content: '',
              author: '',
            }
            obj.content=that.textarea;
            obj.author = localStorage.getItem('username');
            this.$http.post('/v2/article/'+id+'/comment',obj);
            that.textarea = '';
        }else{
            that.sendTip = '内容不能为空~'
            var timer = setTimeout(function(){
                that.sendTip = '发送~';
                clearTimeout(timer);
            },3000)
        }
    },
	```
	至此页面的设计完成。

### 使用mock前后端分离测试
创建mock文件夹编写mock.js文件。

```javascript
const Mock = require('mockjs');

const Random = Mock.Random;

const producedata=function(opt) {
	let articles=[];
	let writer=Random.csentence(5,10);
	for(let i = 0;i < 10;i++) {
		let obj = {
			title: Random.csentence(10,20),
			image: Random.dataImage('600*600','pic'),
			description: Random.csentence(10,20),
			tag: Random.csentence(1,5),
			id: Random.int(1,100),
			username: Random.csentence(5,10),
		}
		articles.push(obj)
	}
	//console.log(articles);
	return {
		data: articles
	}
}

const writerdata=function(opt) {
	let writer=Random.csentence(5,10);
	return {
		data: writer
	}
}


Mock.mock(/v2\/article\/[1-9][0-9]*\/comment/, 'post', function(data) {//向后台发送评论内容
	console.log('post comment: '+data.body);
});


Mock.mock(/v2\/article\/[1-9][0-9]*\/comments/,'get', function(opt) {//获取文章评论信息
	let comments=[];
	//console.log("getcomment");
	for(let i = 0;i < 10;i++) {
		let obj = {
			contents: {
				date: '2019年'+Random.int(1,12)+'月'+Random.int(1,28)+'日',
				content: Random.csentence(10,100),
				author: Random.csentence(5,10),
				articleId: Random.int(1,100),
			}
		}
		comments.push(obj)
	}
	//console.log(articles);
	return {
		data: comments
	}
});

Mock.mock(/v2\/article\/[1-9][0-9]*/, 'get', function(data) {//得到文章内容
	//console.log(data);
	//解析url获取文章信息
	let obj = {
		content: Random.csentence(100,300),
		tag: {
			'name': Random.csentence(1,5),
		},
		id: Random.int(1,100),
		name: Random.csentence(5,10),
		date: '2019年'+Random.int(1,12)+'月'+Random.int(1,28)+'日',
	}
	//console.log(articles);
	return {
		data: obj
	}
});

Mock.mock(/v2\/articles\?page=\d/, 'get', function(opt) {//得到某一页的文章内容
	let articles=[];
	for(let i = 0;i < 10;i++) {
		let obj = {
			Articles: {
				tag: Random.csentence(1,5),
				name: Random.csentence(10,20),
				id: Random.int(1,100),
			}
		}
		articles.push(obj)
	}
	//console.log(articles);
	return {
		data: articles
	}
});

Mock.mock(/v2\/article/, 'get', producedata);



Mock.mock(/v2\/auth\/signin/, 'post', function(opt) {//向后台发送登陆信息，验证登陆
	var obj = {
		token: 'auth'
	}
	return {
		data: obj
	}
})

Mock.mock(/v2\/auth\/signup/, 'post', function(opt) {//向后台发送注册信息
	//console.log(opt);
})



export default Mock;
```
1.	登陆页面的测试
	在mock.js文件中更改如下：
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151234104.png)
	输出相应用户信息。
	![在这里插入图片描述](https://img-blog.csdnimg.cn/2019120615114727.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151200630.png)
	可以看到成功抓取到信息。

2.	注册页面的测试
	更改mock.js文件：
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151433265.png)
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151508744.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151528788.png)

3.	文章列表页面
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151615717.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	从显示就可以看出从mock处得到了随机生成的文章信息。

4. 文章详细页面
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151725205.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151736491.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
5. 评论留言
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151906502.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NvZGlmZmVyZW50,size_16,color_FFFFFF,t_70)
页面console处可以看到
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191206151920941.png)


