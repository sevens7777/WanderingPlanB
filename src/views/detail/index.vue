<template>
  <div class="box">
    <div class="top">
      <img :src="book.img" alt="" class="book-img">
    </div>
    <div class="body">
      <div class="data">
        <div class="row">
          <div class="left" :style="{'border-color': 'red'}"></div>
          <div class="middle">
            <div class="p">
              <strong>书名：{{book.name}}</strong>
            </div>
          </div>
          <div class="right" style="color: yellow;">
            <van-icon name="star" />
          </div>
        </div>
        <div class="line"></div>
        <div class="row">
          <div class="left" :style="{'border-color': 'yellow'}"></div>
          <div class="middle">
            <div class="p">
              <strong>出版社：{{book.press}}</strong>
            </div>
          </div>
          <div class="right" style="color: deepskyblue;">
            <van-icon name="location"/>
          </div>
        </div>
        <div class="line"></div>
        <div class="row">
          <div class="left" :style="{'border-color': 'blue'}"></div>
          <div class="middle">
            <div class="p">
              <strong>备注：{{book.remark}}</strong>
            </div>
          </div>
          <div class="right" style="color: red;">
            <van-icon name="like"/>
          </div>
        </div>
      </div>
      <div class="types">
        <div class="type" :class="{selected: book.type === '习题册'}">
          <span class="icon" style="color: gainsboro;"><van-icon name="todo-list" /></span>
          <span class="label">习题册</span>
        </div>
        <div class="type" :class="{selected: book.type === '教材'}">
          <span class="icon" style="color: gainsboro;"><van-icon name="column" /></span>
          <span class="label">教材</span>
        </div>
        <div class="type" :class="{selected: book.type === '其他'}">
          <span class="icon" style="color: plum;"><van-icon name="coupon" /></span>
          <span class="label">其他</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <van-icon name="point-gift" />
      </div>
      <div class="center">
        <div class="money">
          <strong>价格：{{book.price}}积分</strong>
        </div>
        <div class="price">书本位置：{{book.position}}</div>
      </div>
      <div class="right">
        <button @click="buy">确认购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import {deleteBook, getBook, saveBook} from "@/api/book";
import {mapState} from "vuex";
import {getUser, update} from "@/api/user";

export default {
  name: "Detail",
  data() {
    return {
      book: {
        img: '',
        name: '',
        press: '',
        price: '',
        type: '',
        remark: '',
        position: '',
        username: '',
        dateTime: '',
        // 投放状态 0：已登记未投放 1：代表已投放
        status: '0',
        lookCount: 0
      }
    }
  },
  computed: mapState([
     'userInfo'
  ]),
  mounted() {
    this.book=getBook(this.$route.query.name)
    this.book.lookCount++
    saveBook(this.book)
  },
  methods: {
    buy() {
      if (this.userInfo.money >= this.book.price) {
        const newMoney = this.userInfo.money - this.book.price
        let buyCount = 1
        if (this.userInfo.buyCount !== undefined) {
          buyCount = this.userInfo.buyCount + 1
        }
        update(this.userInfo.username, newMoney, 'money')
        update(this.userInfo.username, buyCount, 'buyCount')
        this.$store.commit('setStatus', {status: '2'})
        this.$store.commit('setBookName', {bookName: this.book.name})
        this.$store.commit('setPosition', {position: this.book.position})
        this.$store.commit('userInfo', getUser(this.userInfo.username))
        deleteBook(this.book.name)
        this.$router.push({name: 'home'})
      } else {
        this.$toast.fail('积分不足')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.box{
  min-height: 100vh;
  background-color: white;
  padding-top: 46px;
  .top{
    .book-img{
      width: 100vw;
    }
  }
  .bottom{
    position: fixed;
    background-color: white;
    bottom: 0;
    padding: 1.5rem;
    width: 80%;
    &>div {
      display: inline-block;
      vertical-align: middle;
    }
    .left{
      font-size: 2rem;
      margin-right: .5rem;
    }
    .center{
      .money{
        font-size: 1.3rem;
      }
      .price{
        font-size: 1.1rem;
        opacity: .5;
      }
    }
    .right{
      float: right;
      button{
        padding: .5rem 1rem;
        color: white;
        font-size: 1.2rem;
        background-color: rgb(241,22,22);
        border: none;
        border-radius: 20px;
      }
    }
  }
  .body{
    padding: 2rem;
    .types {
      margin-bottom: 3.2rem;
      text-align: center;
      padding: 1.5rem 0;
      border-bottom: gainsboro 1px solid;
      border-top: gainsboro 1px solid;
      .selected{
        background-color: rgba(241,92,92,.2);
      }
      .type {
        padding: .7rem 1.1rem;
        border-radius: 20px;
        display: inline-block;
        font-size: 1.3rem;
        .icon,.label{
          vertical-align: middle;
        }
        .icon{
          margin-right: .3rem;
          font-size: 1.7rem;
          line-height: 1rem;
        }
      }
    }
    .data{
      margin-bottom: 1.5rem;
      .line{
        height: 1.5rem;
        border-left: gainsboro 1px solid;
        margin-left: .5rem;
        margin-bottom: .5rem;
      }
      .row{
        &>div{
          display: inline-block;
          vertical-align: top;
        }
        .left{
          width: 1rem;
          height:  1rem;
          border: 1px solid;
          border-radius: .3rem;
        }
        .right{
          float: right;
          font-weight: bold;
          font-size: 1.3rem;
        }
        .middle{
          margin-left: 1rem;
          max-width: calc(100% - 4rem);
          .p{
            font-size: 1.3rem;
          }
        }
      }
    }
  }
}
</style>
