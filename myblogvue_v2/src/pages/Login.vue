<!-- 登录注册 -->
<template>
    <div>
        <div class="container">
            <h1 class="loginTitle">
                <a href="#/">{{"博客"}}</a>
            </h1>
            <!-- 登录注册 -->
            <div class="">
                <div class="loginBox">
                    <div class="lr-title">
                        <h1>登录</h1>
                        <p>
                            新用户<a href="#/v2/auth/signup" class="tcolors">注册</a>
                        </p>
                    </div>
                    <el-alert
                        v-show="loginErr"
                        :title="loginTitle"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
                    <el-input
                        type="text"
                        placeholder="用户名"
                        v-model="username">
                    </el-input>
                    <el-alert
                        v-show="usernameErr"
                        title="请输入用户名"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
                    <el-input
                            type="password"
                          placeholder="密码"
                           @keyup.enter.native="loginEnterFun"
                          v-model="password">
                    </el-input>
                    <el-alert
                        v-show="passwordErr"
                        title="请输入密码"
                        type="error"
                        show-icon  :closable="false">
                    </el-alert>
                    <div class="lr-btn tcolors-bg" @click="gotoHome">登录</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {getRegister,UserLogin} from '../utils/server.js'
    export default {
        name: 'Login',
        data() { //选项 / 数据
            return {
                username: '',//用户名
                password: '',//密码
                loginErr: false,//登录错误
                loginTitle:'用户名或密码错误',
                passwordErr: '',
                usernameErr: '',

            }
        },
        methods: { //事件处理器
            ...mapMutations(['changeLogin']),
            routeChange:function(){

            },
            loginEnterFun: function(e){
                var keyCode = window.event? e.keyCode:e.which;
                // console.log('回车登录',keyCode,e);
                if(keyCode == 13 ){
                    this.gotoHome();
                }
            },
            gotoHome:function(){//用户登录
                var that = this;
                var info={
                    username: '',
                    password: ''
                }
                info.username=that.username;
                info.password=that.password;
                this.$http.post('http://localhost:8080/v2/auth/signin',info).then(res=>{
                    var d =  eval('(' + res + ')');
                    console.log(d.data.data.token);
                    that.userToken = d.data.data.token;
                    that.changeLogin({ Authorization: this.userToken ,username: this.username});
                    this.$router.push('/v2/articles?page=1');
                  }).catch(err=>{
                    console.log(err);
                  });
                //console.log(this.password);
                //this.$http.post('/v2/auth/signin',info);
                this.$router.replace('/v2/articles?page=1');
            },
            registerEnterFun: function(e){
                var keyCode = window.event? e.keyCode:e.which;
                // console.log('回车注册',keyCode,e);
                if(keyCode == 13 ){
                    this.newRegister();
                }
            },
        },
        components: { //定义组件

        },
        watch: {
           // 如果路由有变化，会再次执行该方法
           '$route':'routeChange'
         },
        created() { //生命周期函数
            var that = this;
            that.routeChange();
        }
    }
</script>

<style>
/*登录注册标题*/
.loginTitle{
    text-align: center;
    font-size: 26px;
    padding-top:50px;
    margin-bottom: 20px;
}
.loginBox ,.registerBox{
    background: #fff;
    padding:40px;
    max-width:320px;
    margin:0 auto;
}
.loginBox{
    padding-bottom:0;
}
.lr-title{
    position: relative;
    height:32px;
    line-height: 32px;
    margin-bottom: 20px;
}
.lr-title h1{
    font-size: 24px;
    color:#666;
    font-weight: bold;
    /*width:50%;*/
}
.lr-title p{
    font-size: 12px;
    color:#999;
    position: absolute;
    right:0;
    top:0;
}
.lr-btn{
    color:#fff;
    text-align: center;
    letter-spacing: 5px;
    padding:8px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 30px;
}
.loginBox .el-input,.registerBox .el-input{
    margin-bottom: 20px;
}
.loginBox .el-alert ,.registerBox .el-alert{
    top:-18px;
    background-color: #888;
}
.loginBox .el-input input,.registerBox .el-input input{
    border-radius: 4px;
}
.loginBox h3,.registerBox h3{
    text-align: right;
    margin-bottom: 20px;
}
.loginBox h3 a,.registerBox h3 a{
    font-size: 13px;
    color:#999;
}
.loginBox .otherLogin{
    max-width:320px;
    padding:30px 40px;
    background: #ddd;
    text-align: center;
    margin-left:-40px;
    margin-right: -40px;
    visibility: hidden;
}
.loginBox .otherLogin p{
    margin-bottom:20px;
    font-size: 16px;
}
.loginBox .otherLogin a i{
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    font-size: 18px;
    border-radius: 50%;
    color:#fff;
    margin: 0 10px;
}
.loginBox .otherLogin a i.fa-wechat{
    background: #7bc549;
}
.loginBox .otherLogin a i.fa-qq{
    background: #56b6e7;
}
.loginBox .otherLogin a i.fa-weibo{
    background: #ff763b;
}

/*登录成功*/
.registerSuc{
    padding: 40px;
    margin: 0 auto;
}
.registerSuc .sucIcon{
    text-align: center;
    margin-bottom: 30px;
    padding-left:60px;
}
.registerSuc .sucContent{
    line-height: 1.5;
    font-size: 15px;
    text-align: center;
}
.registerSuc .sucContent p{
    margin-top: 10px;
    font-size: 13px;
    color: #999;
}
.registerSuc .sucContent .lastbtn{
    display: inline-block;
    font-size: 14px;
    padding: 3px 10px;
    border-radius: 5px;
    color:#fff;
    cursor: pointer;
}
.registerSuc .sucContent  .el-icon-close{
    fong-size: 13px;
}
</style>
