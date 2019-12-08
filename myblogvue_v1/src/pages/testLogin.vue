<template>
  <div id="login" align="center">
    <el-row :gutter="20">
      <el-col :span="7" :offset="8">
        <div class="grid-content bg-purple">
          <h1 align="center">登录界面</h1><br>
        </div>
      </el-col>
      <el-col :span="6" :offset="8">
        <div class="grid-content bg-purple">
 
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="账号" prop="account">
              <el-input type="text" v-model="ruleForm2.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
              <el-button type="success" @click="register">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
 
<script>
 
import { mapMutations } from 'vuex';
 
export default {
  name: 'login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        /*if (this.ruleForm2.pass !== '') {
          this.$refs.ruleForm2.validateField('pass')
        }*/
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户名'))
      } else {
        /* if (this.ruleForm2.account !== '') {
           this.$refs.ruleForm2.validateField('account')
         }*/
        callback()
      }
    }
    return {
      userToken:"",
      ruleForm2: {
        pass: '',
        account: '',
      },
      rules2: {
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        account: [
          {validator: validateAccount, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    submitForm (formName) {
      let _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var data = {
              "username": this.ruleForm2.account,
              "password": this.ruleForm2.pass
            };
          this.$http.post('/v2/auth/signin',data).then(res=>{
            console.log(res.data.data.token);
            _this.userToken = res.data.data.token;
            _this.changeLogin({ Authorization: this.userToken ,username: this.ruleForm2.account});
            this.$router.push('/v2/articles?page=1');
          }).catch(err=>{
            console.log(err);
          });
        } else {
          console.log('用户信息错误')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    register () {
      this.$router.push('/v2/auth/signup');
      console.log('get');
    }
  },
}
</script>