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
			name: Random.csentence(1,5)
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
	console.log(opt.body);
	var obj = {
		token: 'auth'
	}
	return {
		data: obj
	}
})

Mock.mock(/v2\/auth\/signup/, 'post', function(opt) {//向后台发送注册信息
	console.log(opt.body);
})



export default Mock;