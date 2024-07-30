<template>
  <div class="cont">
    <div>
      <img :src="success" alt="">
    </div>
    <van-popup v-model="show" :overlay="false" round position="bottom" class="address">
      <div class="address-body">
        <div class="row" v-for="(address, i) in addressList" :key="i">
          <div class="left" :style="{'border-color': address.color}"></div>
          <div class="middle">
            <p>
              <strong>{{address.name}}</strong>
            </p>
            <p>{{address.space}} 空余</p>
          </div>
          <div class="right price">{{address.distance}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import success from '../../assets/success.png'
import {getlocation} from '@/utils/location'

export default {
  name: "Success",
  data() {
    return {
      success,
      show: true,
      addressList: [
        {
          name: '南校区',
          space: 10,
          distance: 'CoordinateSystem: 1',
          color: 'yellow'
        },
        {
          name: '北校区',
          space: 30,
          distance: '500 m',
          color: 'blue'
        },
        {
          name: '东校区',
          space: 40,
          distance: '5 km',
          color: 'red'
        }
      ]
    }
  },
  mounted(){
  let self = this;
  getlocation(function(data){
    self.addressList.distance = data.data.CoordinateSystem;
    });
  },
}
</script>

<style scoped lang="scss">
.cont{
  height: 100vh;
  background-color: #e45252;
  .address{
    height: 60%;
    box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.35);
    .address-body {
      padding: 2rem;
      .row{
        margin-bottom: 1.5rem;
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
          p{
            line-height: 0;
            margin-top: .5rem;
            font-size: 1.3rem;
            &:nth-of-type(1) {
              margin-bottom: 2rem;
            }
            &:nth-of-type(2) {
              color: rgba(0,0,0,.5);
            }
          }
        }
      }
    }
  }
}
</style>
