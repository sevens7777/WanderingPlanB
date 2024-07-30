<template>
  <div>
    <div class="top">
      <img :src="background" alt="">
      <h1>欢迎注册</h1>
    </div>
    <van-form @submit="regUser">
      <van-field
          v-model="user.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' },{validator: existsUser, message: '用户名已存在'}]"
      />
      <van-field
          v-model="user.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="passwordAgain"
          type="password"
          name="passwordAgain"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请再次填写密码' },{validator:samePassword, message: '密码不相同'}]"
      />
      <div style="margin: 16px;">
        <van-button round block color="#ee0a24" type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {exist,reg} from "../../api/user";
import background from '@/assets/background.jpg'
import qs from 'querystring'


export default {
  name: "Reg",
  data(){
    return {
      user:{
        username:"",
        password:"",
        phone: '',
        nickname: "新用户",
        sex:"男",
        headerImg: "https://ds.js.design/assets/img/5f192edd6a4e3848dfeaf36c.png",
        money: 100,
        buyCount: 0, // 交易次数
        motto: "你若安好，便是晴天", // 个性签名
        credit: 100 // 信用分
      },
      passwordAgain: '',
      background
    }
  },
  methods:{
    samePassword(password){
      return this.user.password===password
    },
    regUser() {
      this.$toast.loading({
        duration: 0,
        message: '正在注册。。。',
        forbidClick: true
      })
      reg(this.user)
      this.$axios.get('http://47.96.173.8:3000?'+qs.stringify(this.user))
      this.$toast.clear()
      this.$toast.success('注册成功')
      this.$router.back()
    },
    existsUser(username){
      return new Promise(resolve => {
          resolve(!exist(username))
      })
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
