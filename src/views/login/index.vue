<template>
  <div>
    <div class="top">
      <img :src="background" alt="">
      <h1>欢迎登陆</h1>
    </div>
    <van-form @submit="login">
      <van-field
          v-model="user.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="user.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block color="#ee0a24" type="primary" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <div style="margin: 16px">
      <van-button type="info" block id="reg" round plain :to="{name: 'reg'}">注册</van-button>
    </div>
  </div>
</template>

<script>
import background from '@/assets/background.jpg'

export default {
  name: "Login",
  data(){
    return {
      background,
      user:{
        username:'',
        password:''
      }
    }
  },
  methods:{
    login(values){
      this.$store.dispatch('login',values)
    }
  }
}
</script>

<style scoped lang="scss">
  .top{
    h1{
      position: absolute;
      display: inline-block;
      top: 50px;
      left: 30px;
      color: white;
    }
    img{
      display: block;
    }
  }
</style>

<style lang="scss">
#reg{
  margin-top: .5rem;
}

</style>
