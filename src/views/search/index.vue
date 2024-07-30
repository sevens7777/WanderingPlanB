<template>
  <div class="page">
    <div class="top">
      <img :src="library" alt="" class="library">
      <div class="data">
        <h1>搜索</h1>
        <p>
          <router-link :to="{name: 'me'}">
            <user :username="userInfo.username" class="me"/>
          </router-link>
          <label class="count">
            <van-icon name="eye" class="eye" />
            <span>{{bookList.length}}条结果</span>
          </label>
        </p>
      </div>
    </div>
    <div class="books">
      <book-card v-for="(book,i) in bookList" :book-name="book.name" :key="i" class="book"/>
    </div>
    <search class="se"/>
  </div>
</template>

<script>
import Search from "@/components/Search";
import BookCard from "@/components/BookCard";
import {searchBook} from "@/api/book";
import library from '@/assets/library.png'
import {mapState} from "vuex";
import User from "@/components/User";

export default {
  name: "SearchPage",
  components: {User, BookCard, Search},
  data() {
    return {
      bookList: [],
      library
    }
  },
  computed: {
    ...mapState([
        'userInfo'
    ])
  },
  mounted() {
    this.bookList = searchBook(this.$route.query.word)
  },
  watch: {
    '$route.query.word': function () {
      this.bookList = searchBook(this.$route.query.word)
    }
  }
}
</script>

<style scoped lang="scss">
.page{
  min-height: 100vh;
  background-color: white;
  .top{
    position: relative;
    .library{
      width: 100vw;
      display: block;
    }
    .data{
      position: absolute;
      top: 0;
      padding: 0 22px;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.3);
      color: white;
      h1{
        margin-top: 170px;
      }
      p{
        .me,.count{
          vertical-align: middle;
        }
        .count{
          float: right;
          margin-right: 45px;
          .eye{
            margin-right: .3rem;
          }
          .eye,span{
            vertical-align: middle;
          }
        }
      }
    }
  }
  .books {
    padding: 10px;
    .book{
      margin-bottom: 20px;
      margin-top: 20px;
      margin-left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

<style>
.se{
  bottom: 0 !important;
}
</style>
