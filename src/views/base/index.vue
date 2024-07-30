<template>
  <div id="header">
    <van-nav-bar
        id="headerBar"
        @click-left="back"
    >
      <template #left>
        <span v-if="showBack">
          <van-icon :style="{color: backColor}" name="arrow-left"/>
        </span>
      </template>
      <template #title>
        <span v-if="title" :style="{color: titleColor}">{{title}}</span>
      </template>
    </van-nav-bar>
    <router-view id="content"></router-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Base",
  data(){
    return {}
  },
  methods:{
    back(){
      this.$router.back()
    }
  },
  computed:mapState([
      'title',
      'showBack',
      'backColor',
      'titleColor'
    ])

}
</script>

<style lang="scss">
#header{
  height: 100%;
  #headerBar{
    position: absolute;
    background-color: unset;
    width: 100%;
    *{
      color: #fff;
    }
  }
  #headerBar:after{
    border: unset;
  }
}
</style>
