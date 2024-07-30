<template>
  <div id="tab">
    <router-view id="view"></router-view>
    <van-tabbar safe-area-inset-bottom :route="true" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item v-for="(tab, i) in tabbar" :key="i" :to="{name: tab.name}" replace :name="tab.name" :icon="tab.meta.icon">{{tab.meta.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import routes from "../../router/routes";
import jsonPath from 'JSONPath'
export default {
  name: "tabbar",
  data(){
    return {
      tabbar: []
    }
  },
  created() {
    const temps = jsonPath.eval(routes,"$..[?(name='tab')]@.children")
    this.tabbar= temps[1]

  }
}
</script>

<style lang="scss">
#view {
  margin-bottom: 50px;
}
.van-tabbar-item__icon{
  font-size: 35px;
}
</style>
