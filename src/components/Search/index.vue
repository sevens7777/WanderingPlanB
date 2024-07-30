<template>
  <div class="search">
    <div>
      <strong>搜索</strong>
      <input type="text" v-model="word">
    </div>
    <van-icon name="search" class="search-icon" @click.native="search" />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      word: ''
    }
  },
  mounted() {
    if (this.$route.query.word){
      this.word=this.$route.query.word
    }
  },
  methods: {
    search() {
      this.$router.push({name: 'Search', query: {word: this.word}})
    }
  }
}
</script>

<style scoped lang="scss">
.search{
  padding: 2rem;
  position: absolute;
  bottom: 50px;
  strong{
    font-size: 1.5rem;
  }
  input{
    margin-left: 1rem;
    width: 17.5rem;
    height: 32px;
    background: rgba(230, 230, 230, 1);
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }
  .search-icon{
    position: absolute;
    right: 2.8rem;
    bottom: 2.3rem;
    transform: rotate(90deg);
  }
}
</style>
