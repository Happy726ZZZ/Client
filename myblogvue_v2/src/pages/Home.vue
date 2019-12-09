<!-- 首页 -->
<template>
    <div>
    <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
    </el-col>
        <div class="container">
            <el-row  :gutter="30">
                <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
                    <wbc-sharelist></wbc-sharelist>
                </el-col>
                <el-col :sm="24"  :md="8" >
                    <wbc-rightlist></wbc-rightlist>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import temSharelist from '../components/temSharelist.vue'
import temRightlist from '../components/temRightlist.vue'
import page from '../components/pagebar.vue'
    export default {
        name:'Home',
        data() { //选项 / 数据
            return {

            }
        },
        methods: { //事件处理器

        },
        components: { //定义组件
            'wbc-sharelist':temSharelist,
            'wbc-rightlist':temRightlist,
            'wbc-page':page
        },
        created() { //生命周期函数

        }
    }
</script>

<style>

</style>
