<template>
  <div class="book" @click="go">
    <div class="top">
      <img :src="book.img" alt="" class="book-img">
      <div class="type">{{book.type}}</div>
    </div>
    <div class="middle" v-if="showUser">
      <user :username="book.username"/>
    </div>
    <div class="bottom">
      <h3>【{{book.type}}】 {{book.name}}</h3>
    </div>
  </div>
</template>

<script>
import {getBook} from "@/api/book";
import User from "@/components/User";

export default {
  name: "BookCard",
  components: {User},
  props: {
    bookName: {
      type: String,
      default: ''
    },
    showUser: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      book: {
        img: '',
        name: '',
        type: '',
        username: ''
      }
    }
  },
  mounted() {
    this.book = getBook(this.bookName)
  },
  watch: {
    bookName() {
      this.book = getBook(this.bookName)
    }
  },
  methods: {
    go() {
      this.$router.push({name: 'Detail', query: {name: this.bookName}})
    }
  }
}
</script>

<style scoped lang="scss">
.book{
  width: 328px;
  height: 221px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 11px 28px rgba(0, 0, 0, 0.2923);
  border-radius: 8px;
  padding: 7px 15px;
  .top{
    position: relative;
    margin-bottom: 15px;
    .book-img{
      width: 100%;
      height: 141px;
      display: block;
    }
    .type{
      display: inline-block;
      position: absolute;
      background-color: white;
      top: -3px;
      left: -3px;
      color: rgba(112, 112, 112, 1);
      padding: .7rem;
      border-radius: 10px;
    }
  }
  .middle{
    text-align: right;
    padding-right: 1rem;
  }
  .bottom{
    h3{
      margin-top: 5px;
    }
  }
}
</style>
