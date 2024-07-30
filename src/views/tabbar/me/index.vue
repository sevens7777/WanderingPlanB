<template>
  <div class="container">
    <div class="top">
      <div class="user-row">
        <img :src="userInfo.headerImg" class="header" alt="">
        <div class="user-base">
          <p>
            <strong>{{userInfo.nickname}}</strong>
            <img :src="userInfo.sex === '女' ? woman : man" class="sex" alt="">
          </p>
          <p>
            <strong v-if="userInfo.motto" class="price">{{userInfo.motto}}</strong>
            <span v-else style="color: gray;">暂无签名</span>
          </p>
        </div>
        <router-link :to="{name: 'Edit'}">
          <button>编辑</button>
        </router-link>
      </div>
      <div class="buy-data">
        <div class="block">
          <div class="price">{{userInfo.credit}}</div>
          <div class="label">信用分</div>
        </div>
        <div class="block">
          <div class="price">{{userInfo.buyCount}}</div>
          <div class="label">交易数</div>
        </div>
        <div class="block">
          <div class="price">{{userInfo.money}}</div>
          <div class="label">积分</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="group">
        <div class="title">
          <h3>我的交易情况</h3>
          <div>
            <span>更多</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="list">
          <div class="row">
            <p class="price">2021年：氓之蚩蚩,抱布贸丝</p>
            <p>
              <span class="price">{{userInfo.buyCount}}</span>
              <span>次成功交易</span>
            </p>
          </div>
        </div>
      </div>
      <div class="group">
        <div class="title">
          <h3>等待交易</h3>
          <div>
            <span>更多</span>
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="list">
          <router-link class="row" v-for="(book, i) in bookList" :key="i" :to="{name: 'Detail', query: {name: book.name}}" tag="div">
            <img :src="book.img" alt="">
            <div class="book-data">
              <div class="name">
                {{book.name}}
              </div>
              <p>{{book.remark}}</p>
            </div>
            <label class="count">
              <van-icon name="eye" class="eye" />
              <span>{{book.lookCount}}</span>
            </label>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {myBooks} from "@/api/book";
import woman from '@/assets/sex/woman.png'
import man from '@/assets/sex/man.png'

export default {
  name: "Me",
  data() {
    return {
      bookList: [],
      woman,
      man
    }
  },
  computed:mapState([
      'userInfo'
  ]),
  mounted() {
    this.bookList = myBooks(this.userInfo.username)
  }
}
</script>

<style scoped lang="scss">
.container{
  .top{
    padding: 46px 1.7rem 1rem;
    background-color: white;
    .user-row{
      &>div{
        display: inline-block;
      }
      .user-base,.header{
        vertical-align: middle;
      }
      .header{
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin-right: 1rem;
      }
      .user-base{
        p{
          margin: 0;
          &:nth-of-type(1) {
            margin-bottom: 1rem;
            font-size: 1.3rem;
            .sex{
              width: 1rem;
              height: 1rem;
              transform: rotate(30deg);
              margin-left: .5rem;
            }
          }
        }
      }
      button{
        float: right;
        padding: .4rem 1.3rem;
        color: white;
        font-size: 1.1rem;
        background-color: rgba(241,21,21,.7);
        border: none;
        border-radius: 20px;
      }
    }
    .buy-data{
      text-align: center;
      font-size: 1.2rem;
      .block{
        display: inline-block;
        margin-top: 2rem;
        margin-bottom: 1rem;
        &:nth-of-type(2) {
          margin: 0 4rem;
        }
        .price{
          font-weight: bold;
        }
      }
    }
  }
  .body {
    padding: 1rem 1.7rem;
    .group {
      margin-bottom: 1.5rem;
      .title {
        h3, & > div {
          display: inline-block;
          vertical-align: middle;
        }
        & > div {
          color: gray;
          float: right;
          margin-top: 1rem;
        }
      }
      .list {
        .row {;
          background: white;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
          border-radius: 8px;
        }
      }
    }
    & > .group:nth-of-type(1) {
      .row {
        padding: .1rem 0;
        p.price {
          font-size: 1.1rem;
          opacity: .6;
        }
        p {
          margin: 1rem 2rem;

          .price {
            font-size: 2rem;
            margin-right: 1.5rem;
          }
          .price, .price + span {
            vertical-align: middle;
          }
        }
      }
    }
    & > .group:nth-of-type(2) {
      .row{
        font-size: 1rem;
        margin-bottom: 1.1rem;
        padding: 1rem;
        position: relative;
        &>div{
          display: inline-block;
          width: calc(100% - 9rem);
          p{
            margin:.5rem 0;
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
          }
          &>div{
            overflow:hidden;
            white-space:nowrap;
            text-overflow:ellipsis;
            font-size: 1.1rem;
            font-weight: bold;
          }
        }
        &>img,&>div{
          vertical-align: top;
        }
        .count,p{
          color: gray;
          opacity: .7;
        }
        .count{
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          .eye,span{
            vertical-align: middle;
          }
          .eye{
            margin-right: .7rem;
          }
        }
        &>img{
          width: 6.5rem;
          height: 6.5rem;
          margin-right: 1.4rem;
        }
      }
    }
  }
}
</style>
