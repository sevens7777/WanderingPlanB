<template>
  <div>
    <img :src="user.headerImg" alt="">
    <span>{{user.nickname}}</span>
  </div>
</template>

<script>
import {getUser} from "@/api/user";

export default {
  name: "User",
  props:{
    username: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      user: {
        nickname: '',
        headerImg: ''
      }
    }
  },
  mounted() {
    if (this.username) {
      this.user = getUser(this.username)
    }
  },
  watch: {
    username() {
      this.user = getUser(this.username)
    }
  }
}
</script>

<style scoped lang="scss">
div{
  display: inline-block;
  img,span{
    vertical-align: middle;
  }
  img{
    margin-right: 5px;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }
}
</style>
