import Vue from 'vue'
import Vuex from 'vuex'
import {login,update} from "@/api/user";
import {Toast} from "vant";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: '',
    showBack: false,
    logined: sessionStorage.getItem('logined')==='true',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
    // 主页状态 1：投放，2：购买
    status: sessionStorage.getItem('status'),
    // 投放或购买的书名
    bookName: sessionStorage.getItem('bookName'),
    // 书柜位置
    position: sessionStorage.getItem('position'),
    backColor: '#fff',
    titleColor: '#fff'
  },
  mutations: {
    routeCommit(state,{ title,showBack}){
      state.title = title
      state.showBack = showBack
    },
    logined(state,{logined}){
      sessionStorage.setItem('logined',logined)
      state.logined=logined
    },
    userInfo(state,userInfo){
      if (userInfo) {
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
      }else {
        sessionStorage.removeItem('userInfo')
      }
      state.userInfo = userInfo
    },
    setTitle(state, {title}){
      state.title=title
    },
    setStatus(state, {status}) {
      if (status) {
        sessionStorage.setItem('status', status)
      } else {
        sessionStorage.removeItem('status')
      }
      state.status = status
    },
    setBookName(state, {bookName}) {
      if (bookName) {
        sessionStorage.setItem('bookName', bookName)
      } else {
        sessionStorage.removeItem('bookName')
      }
      state.bookName = bookName
    },
    setPosition(state, {position}) {
      if (position) {
        sessionStorage.setItem('position', position)
      } else {
        sessionStorage.removeItem('position')
      }
      state.position = position
    },
    setNavColor(state,{backColor, titleColor}) {
      let bc = backColor
      let tc = titleColor
      if (!bc) {
        bc = '#fff'
      }
      if (!tc) {
        tc = '#fff'
      }
      state.backColor = bc
      state.titleColor = tc
    }
  },
  actions: {
    login(context,user){
      const data = login(user)
      if (data) {
        Toast.clear()
        context.commit('logined', {logined: true})
        context.commit('userInfo', data)
        Toast.success('登录成功')
        router.back()
      } else {
        Toast.fail('用户名或密码错误')
      }
    },
    updateUser(context,{value,fieldName,callback}){
      Toast.loading({
        duration: 0,
        message: '正在修改...',
        forbidClick: true
      })
      update(context.state.userInfo.id,value,fieldName).then(()=>{
        Toast.clear()
        Toast.success('修改成功')
        if (callback){
          callback()
        }
        const userInfo=context.state.userInfo
        if (fieldName!='password'){
          userInfo[fieldName]=value
          context.commit('userInfo',userInfo)
        }
      }).catch(Toast.clear)
    }
  },
  modules: {
  }
})
