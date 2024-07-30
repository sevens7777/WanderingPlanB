<template>
  <div class="background">
    <div class="form">
      <van-form>
        <div class="uploader">
          <van-uploader :after-read="addImg">
            <div class="uploader-add" v-if="!book.img">
              <p>
                <van-icon style="font-size: 3rem; font-weight: bold" name="add-o"/>
              </p>
              <p>添加图片</p>
            </div>
            <img :src="book.img" v-else alt="">
          </van-uploader>
        </div>
        <p>
          <label for="name">书名</label>
          <input type="text" v-model="book.name" id="name">
        </p>
        <p>
          <label for="press">出版社</label>
          <input type="text" v-model="book.press" id="press">
        </p>
        <p>
          <label for="price">价格</label>
          <input type="number" v-model.number="book.price" id="price">
        </p>
        <p>
          <label for="type">类别</label>
          <input type="text" readonly v-model="book.type" @click="show=true" id="type">
        </p>
        <p>
          <label>备注</label>
          <textarea v-model="book.remark" style="height: 118px;" id="remark"></textarea>
        </p>
        <div>
          <button @click="addBook">确认</button>
        </div>
      </van-form>
    </div>
    <div style="position: absolute; z-index: 2; width: 100%; bottom: 0;">
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>

<script>
import {hasBook, saveBook} from "@/api/book";

export default {
  name: "Add",
  data() {
    return {
      show: false,
      actions: [
        {
          name: '习题册'
        },
        {
          name: '教材'
        },
        {
          name: '其他'
        }
      ],
      book: {
        img: '',
        name: '',
        press: '',
        price: '',
        type: '',
        remark: '',
        position: 'xxx',
        username: '',
        dateTime: '',
        // 投放状态 0：已登记未投放 1：代表已投放
        status: '0',
        lookCount: 0
      }
    }
  },
  watch: {
    'book.name': function () {
      if (hasBook(this.book.name)) {
        this.$toast.fail('书名已存在')
      }
    }
  },
  methods: {
    onSelect({name}) {
      this.show=false
      this.book.type=name
    },
    addImg({content}) {
      this.book.img=content
    },
    addBook() {
      if (!this.book.img) {
        this.$toast.fail('请添加照片')
      } else if (hasBook(this.book.name)) {
        this.$toast.fail('书名已存在')
      } else if (!this.book.name) {
        this.$toast.fail('请输入书名')
      } else if (!this.book.press) {
        this.$toast.fail('请输入出版社')
      } else if (!this.book.price) {
        this.$toast.fail('请输入价格')
      } else if (!this.book.type) {
        this.$toast.fail('请选择类别')
      } else if (!this.book.remark) {
        this.$toast.fail('请输入备注')
      } else {
        this.book.username=this.$store.state.userInfo.username
        saveBook(this.book)
        this.$store.commit('setStatus', {status: '1'})
        this.$store.commit('setBookName', {bookName: this.book.name})
        this.$router.push({name: 'Success'})
      }
    }
  }
}
</script>

<style scoped lang="scss">
.background {
  height: calc(100vh - 50px);
  padding-bottom: 20px;
  background-color: rgb(225,81,81);
  overflow: scroll;
}

.form {
  display: inline-block;
  text-align: center;
  position: relative;
  margin-top: 5rem;
  left: 50%;
  transform: translate(-50%);


  .uploader {
    display: inline-block;
    margin-bottom: 30px;

    img{
      width: 228px;
      height: 159px;
    }

    .uploader-add {
      width: 228px;
      height: 159px;
      display: inline-block;
      font-size: 1.5rem;
      background: rgba(196, 196, 196, 1);
      border: 10px solid rgba(255, 255, 255, 1);
      p {
        text-align: center;
        line-height: 20px;
      }
    }
  }

  p {
    text-align: right;
  }

  label, input, textarea {
    vertical-align: middle;
  }

  label {
    margin-right: 1.5rem;
    text-align: right;
    color: rgba(3, 3, 3, 1);
    font-size: 2rem
  }

  input, textarea {
    width: 205px;
    height: 32px;
    padding-right: 1rem;
    padding-left: 1rem;
    background: rgba(230, 230, 230, 1);
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }

  button {
    width: 147px;
    height: 52px;
    margin-top: 22px;
    background: rgba(143, 143, 143, 1);
    border: 3px solid rgba(255, 255, 255, 1);
    border-radius: 60px;

  }
}
</style>
