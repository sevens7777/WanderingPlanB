import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import VueTouch from 'vue-touch'
import {initUser} from "@/api/user";
import {initBook} from "@/api/book";
import Axios from 'axios'
import _axios from './plugins/_axios'

// 初始化数据
const users = {
  // 每个对象的key必须和username相同
  'test001':{
    username:'test001', //不能重复
    password:'123456',
    phone: '',
    nickname: '新用户',
    sex:'男',
    // 用户头像必须是网络url或者是base64
    headerImg: 'https://ds.js.design/assets/img/5f192edd6a4e3848dfeaf36c.png',
    money: 100,
    buyCount: 0, // 交易次数
    motto: '你若安好，便是晴天', // 个性签名
    credit: 100 // 信用分
  }
}
initUser(users)
const books = {
  // 每个对象的key必须和name相同
  '电路分析基础（第五版）':{
    // 书本照片，同用户头像要求
    img: 'https://img.js.design/assets/img/61cc0d313b43161d8d17f928.png',
    name: '电路分析基础（第五版）', // 不能重复
    press: '人民出版社',
    price: 11, // 价格
    type: '教材', // 书本类型，可选值：教材、习题册和其他
    remark: '人民出版社的，书上有笔记', // 备注
    position: 'xxx', // 书本位置
    username: 'test001', // 上传者用户名，用户名必须存在于users对象中
    dateTime: new Date(), // 投放时间，不需要修改
    // 投放状态 0：已登记未投放 1：代表已投放
    status: '1',
    lookCount: 0 // 浏览量
  }
}
initBook(books)

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(Axios,_axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
