import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from "./routes";
import store from '../store'
import {Toast} from "vant";

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const auth=to.meta.auth
  const logined = store.state.logined
  if (auth===false||logined){
    next()
  }else {
    Toast.fail('请先登录！')
    next({name:'login'})
  }
})

router.afterEach(to => {

  const title=typeof to.meta.title=='function'?to.meta.title():to.meta.title
  const showBack=to.meta.showBack!==undefined?to.meta.showBack:true
  store.commit("routeCommit",{title, showBack})
  const {titleColor,backColor}=to.meta
  store.commit('setNavColor', {titleColor,backColor})
  document.title=title
})

export default router
