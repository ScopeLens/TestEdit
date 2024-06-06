<template>
  <div class="loginpage">
    <img class="title" src="../assets/icons/iconLogo.png" alt="">
    <div class="demo-login">
      <Login @on-submit="handleSubmit">
        <UserName name="username" />
        <Password name="password" />
        <div class="demo-auto-login">
          <Checkbox v-model="autoLogin" size="large">自动登录</Checkbox>
          <a>忘记密码</a>
        </div>
        <Submit/>
      </Login>
    </div>
  </div>
</template>
<script>
import {Image} from "view-ui-plus";

export default {
  components: {Image},
  data () {
    return {
      autoLogin: true
    }
  },
  methods: {
    handleSubmit (valid, { username, password }) {
      if (valid) {
        if(username==="admin"&&password==="12581"){
          this.$router.push('/main');
        }
        else{
          alert("账号密码错误");
        }
        // this.$Modal.info({
        //   title: '输入的内容如下：',
        //   content: 'username: ' + username + ' | password: ' + password
        // });
      }
    },
  }
}
</script>
<style>
.demo-login{
  width: 400px;
  margin: 0 auto !important;
}
.demo-auto-login{
  margin-bottom: 24px;
  text-align: left;
}
.demo-auto-login a{
  float: right;
}
.title{
  text-align: center;
  padding: 30px;
}
.loginpage{
  background-image: url("../assets/images/Main-Background.jpg");
  width: 100vw;
  height: 100vh;
  padding: 0;
}
</style>
