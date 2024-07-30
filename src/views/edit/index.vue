<template>
  <div class="background">
    <div class="form">
      <van-form>
        <div class="uploader">
          <van-uploader :after-read="addImg">
            <div class="uploader-add" v-if="!userInfo.headerImg">
              <p style="font-size: 3rem;">
                <van-icon name="add-o"/>
              </p>
            </div>
            <img :src="userInfo.headerImg" v-else alt="">
          </van-uploader>
        </div>
        <p>
          <label for="name">昵称</label>
          <input type="text" v-model="userInfo.nickname" id="name">
        </p>
        <p>
          <label for="press">手机</label>
          <input type="text" v-model="userInfo.phone" id="press">
        </p>
        <p>
          <label for="type">性别</label>
          <input type="text" readonly v-model="userInfo.sex" @click="show=true" id="type">
        </p>
        <p>
          <label>签名</label>
          <textarea v-model="userInfo.motto" style="height: 118px;" id="remark"></textarea>
        </p>
        <div>
          <button @click="sava">确认</button>
        </div>
      </van-form>
    </div>
    <div style="position: absolute; z-index: 2; width: 100%; bottom: 0;">
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
  </div>
</template>

<script>

import {reg} from "@/api/user";

export default {
  name: "Edit",
  data() {
    return {
      show: false,
      actions: [
        {
          name: '男'
        },
        {
          name: '女'
        }
      ],
      userInfo: {
        phone: '',
        nickname: '',
        sex:'',
        headerImg: '',
        motto: '', // 个性签名
      }
    }
  },
  mounted() {
    this.userInfo=this.$store.state.userInfo
  },
  methods: {
    onSelect({name}) {
      this.show=false
      this.userInfo.sex=name
    },
    addImg({content}) {
      this.userInfo.headerImg=content
    },
    sava() {
      reg(this.userInfo)
      this.$store.commit('userInfo', this.userInfo)
      this.$toast.success('保存成功')
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.background {
  min-height: 100vh;
  padding-bottom: 20px;
  background-color: rgb(245,245,245);
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
      width: 7.5rem;
      height: 7.5rem;
      border-radius: 50%;
    }

    .uploader-add {
      width: 7.5rem;
      height: 7.5rem;
      border-radius: 50%;
      display: inline-block;
      font-size: 1.5rem;
      background: rgba(196, 196, 196, 1);
      p {
        text-align: center;
        margin-top: 2.25rem;
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
    font-size: 1.3rem;
    font-weight: bold;
  }

  input, textarea {
    width: 205px;
    height: 32px;
    padding-left: 1rem;
    padding-right: 1rem;
    background: rgba(230, 230, 230, 1);
    border: 1px solid rgba(255, 255, 255, 1);
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    border-radius: 15px;
  }

  button {
    margin-top: 22px;
    color: #fff;
    font-size: 1.5rem;
    padding: .5rem 1.9rem;
    border: none;
    background: rgba(255,21,21,.7);
    border-radius: 16px;
  }
}
</style>
