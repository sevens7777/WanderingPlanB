<template>
  <div class="body">
    <div class="top">
      <img :src="background">
      <div class="title">
        <div class="title1" v-if="!status">
          <p>无酒御寒虽寡况，有书供读且资身。</p>
          <h2>流浪书柜欢迎你</h2>
        </div>
        <div class="title2" v-else-if="status==='1'">
          <p v-if="bookName">投放二维码已生成，请扫码开柜</p>
          <h1 v-else>投放成功！</h1>
        </div>
        <div class="title2" v-else-if="status==='2'">
          <p v-if="bookName">开柜二维码已生成，位置：{{position}}</p>
          <h1 v-else>购买成功！</h1>
        </div>
        <div class="qr" v-if="bookName">
          <img :src="qr" alt="" @click="qrClick">
        </div>
      </div>
    </div>
    <div class="books">
      <p><strong>最新上架</strong></p>
      <v-touch @swipeup="next" @swipedown="pre" v-if="bookList && bookList.length > 0" class="wrapper">
        <div class="book">
          <book-card :book-name="bookList[i].name" :show-user="true" class="one"/>
        </div>
      </v-touch>
    </div>
    <search />
  </div>
</template>

<script>
import background from '@/assets/background.jpg'
import {mapState} from "vuex";
import {bookList, bookPush} from "@/api/book";
import BookCard from "@/components/BookCard";
import Search from "@/components/Search";

export default {
  name: "Home",
  components: {Search, BookCard},
  data(){
    return {
      background,
      qr: 'https://img.js.design/assets/img/61b1f9b7b4e2f6321a9a1fd0.png',
      bookList: [],
      i: 0
    }
  },
  computed: {
    ...mapState([
        'status',
        'bookName',
        'position'
    ])
  },
  mounted() {
    this.bookList=bookList()
  },
  methods: {
    qrClick() {
      if (this.status === '1') {
        bookPush(this.bookName)
        this.bookList=bookList()
      }
      this.$store.commit('setBookName', {bookName: null})
    },
    next() {
      if (this.i < this.bookList.length) {
        this.i++;
      } else {
        this.$toast.fail('没有更多了')
      }
    },
    pre() {
      if (this.i > 0) {
        this.i--;
      } else {
        this.$toast.fail('已经到头了')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.body{
  height: calc(100vh - 50px);
  background-color: white;
  .books{
    padding-top: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;
    p{
      font-size: 1.5rem;
    }
    .book{
      width: 328px;
      height: 221px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 11px 28px rgba(0, 0, 0, 0.2923);
      border-radius: 8px;
      .one{
        transform-origin: 50% 0;
        transform: rotate(5deg);
      }
    }
  }
  .top{
    color: white;
    &>img{
      display: block;
    }
    &>.title{
      position: absolute;
      top: 26px;
      left: 2rem;

      &>.title1{
        h2{
          font-size: 1.7rem;
        }
      }
      p{
        color: rgba(255,255,255,.7);
      }
      &>.title2{
        color: rgba(255,255,255,.7);
        p{
          font-size: 1.3rem;
        }
        h1{
          font-size: 2.5rem;
        }
      }
      .qr {
        img {
          left: 50px;
          top: 100px;
          width: 138px;
          height: 138px;
          border: 10px solid rgba(166, 166, 166, 1);
        }
      }
    }
  }
}
</style>
