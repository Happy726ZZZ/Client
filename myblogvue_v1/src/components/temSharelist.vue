<!-- 文章列表 -->
<template>
    <el-row class="sharelistBox">
        <el-col :span="24" class="s-item tcommonBox" v-for="(item,index) in data" :key="index">
            <span class="s-round-date">
                <span class="month">{{item.Articles.tag}}</span>
            </span>
            <header>
                <h1>
                    {{item.Articles.name}}
                </h1>
            </header>
            <section></section>
            <div class="viewdetail">
                <a class="tcolors-bg" :href="'#/v2/article/'+item.Articles.id" target="_blank">
                    阅读全文>>
                </a>
            </div>
        </el-col>
        <div class="page-bar">
        <ul>
            <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
            <li v-if="cur==1"><a class="banclick">上一页</a></li>
            <li v-for="index in indexs" v-bind:class="{ 'active': cur == index}">
            <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="cur!=all"><a v-on:click="cur++,pageClick()">下一页</a></li>
            <li v-if="cur == all"><a class="banclick">下一页</a></li>
            <li><a>共<i>{{all}}</i>页</a></li>
        </ul>
        </div>
    </el-row>


</template>

<script>
import comment from '../components/temMessage.vue'
import page from '../components/pagebar.vue'
export default {
    name: 'myblog',
    data() {
        return {
            all: 10, //总页数
            cur: 1,//当前页码
            totalPage: 0,//当前条数

            msg: 'welcome to my blog',
            data:[]
        }
    },
    created:function(){

    },
    mounted:function() {
        var id=this.$route.query.page;
        //console.log(this.$route.query.page);
        //this.getAlldata();
        this.dataListFn(id);
    },
    methods:{
        getAlldata(){
            let that=this;
            this.$http.get('/v2/article')
            .then(function(res){
                that.data=res.data.data;
            })
            .catch(function(err) {
                console.log("error:"+err);
            });
        },
        detail() {
            //console.log("tip");

        },
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
    },
    components:{
        'wbc-comment': comment,
        'wbc-page': page
    },
    computed: {
        //分页
        indexs: function(){
            var left = 1;
            var right = this.all;
            var ar = [];
            if(this.all>= 5){
                if(this.cur > 3 && this.cur < this.all-2){
                    left = this.cur - 2
                    right = this.cur + 2
                }else{
                    if(this.cur<=3){
                        left = 1
                        right = 5
                    }else{
                        right = this.all
                        left = this.all -4
                    }
                }
            }
            while (left <= right){
                ar.push(left)
                left ++
            }
            return ar
        }
    }
}
</script>

<style>
/*分享标题*/
.shareTitle{
    margin-bottom: 40px;
    position: relative;
    border-radius: 5px;
    background: #fff;
    padding:15px;
}
.shareclassTwo{
    width:100%;
}
.shareclassTwo li{
    display: inline-block;
}
.shareclassTwo li a{
    display: inline-block;
    padding:3px 7px;
    margin:5px 10px;
    color:#fff;
    border-radius: 4px;
    background: #64609E;
    border: 1px solid #64609E;
    transition: transform 0.2s linear;
    -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover{
    transform: translate(0,-3px);
    -webkit-transform: translate(0,-3px);
}
.shareclassTwo li a.active{
    background: #fff;
    color:#64609E;

}
/*文章列表*/
    .sharelistBox{
        transition: all 0.5s ease-out;
        font-size: 15px;
    }


    /*.sharelistBox .viewmore a:hover,.s-item .viewdetail a:hover{
        background: #48456C;
    }*/

/*分页*/
.page-bar{
margin:40px auto;
margin-left: 0px;

}
ul,li{
margin: 0px;
padding: 0px;
}
li{
list-style: none
}
.page-bar li:first-child>a {
margin-left: 0px
}
.page-bar a{
border: 1px solid #ddd;
text-decoration: none;
position: relative;
float: left;
padding: 6px 12px;
margin-left: -1px;
line-height: 1.42857143;
color: #5D6062;
cursor: pointer;
margin-right: 20px;
}
.page-bar a:hover{
background-color: #eee;
}
.page-bar a.banclick{
cursor:not-allowed;
}
.page-bar .active a{
color: #fff;
cursor: default;
background-color: #E96463;
border-color: #E96463;
}
.page-bar i{
font-style:normal;
color: #d44950;
margin: 0px 4px;
font-size: 12px;
}
</style>
