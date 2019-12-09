<template id="tmp1">
    <div>
        <div class="form-group">
            <label>评论人：</label>
            <input type="text" class="form-control" v-model="user">
        </div>
        <div class="form-group">
            <label>评论内容：</label>
            <textarea class="form-control" v-model="content"></textarea>
        </div>
        <div class="form-group">
            <input type="button" value="发表评论" class="btn btn-primary" @click="postComment">
        </div>
    </div>
</template>
<script>
var commentBox={
    template:'#tmp1',
    data(){
        return {
            user:'',
            content:''
        }
    },
    methods:{
        postComment(){
            var comment={id:Date.now(),user:this.user,content:this.content}
            var list=JSON.parse(localStorage.getItem('cmts')||'[]')
            list.unshift(comment)
            localStorage.setItem('cmts',JSON.stringify(list))
            this.user=this.content=''
            this.$emit('func')
        }
    }
}
</script>