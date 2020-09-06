<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotulist"
                     :key="item.url">
        <img :src="item.img"
             alt="">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 将 九宫格 改造为 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img :src="menu1"
               alt="">
          <div class="mui-media-body">新闻资讯</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img :src="menu2"
               alt="">
          <div class="mui-media-body">图片分享</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img :src="menu3"
               alt="">
          <div class="mui-media-body">商品购买</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img :src="menu4"
               alt="">
          <div class="mui-media-body">留言反馈</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img :src="menu5"
               alt="">
          <div class="mui-media-body">视频专区</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img :src="menu6"
               alt="">
          <div class="mui-media-body">联系我们</div>
        </a></li>
    </ul>

  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import menu1 from "../../images/menu1.png"
import menu2 from "../../images/menu2.png"
import menu3 from "../../images/menu3.png"
import menu4 from "../../images/menu4.png"
import menu5 from "../../images/menu5.png"
import menu6 from "../../images/menu6.png"


export default {
  data () {
    return {
      lunbotulist: [],  //保存轮播图的数组
      menu1: menu1,
      menu2: menu2,
      menu3: menu3,
      menu4: menu4,
      menu5: menu5,
      menu6: menu6
    }
  },
  created () {
    this.getLunbotu()
  },
  methods: {
    getLunbotu () {
      // 获取轮播图数据的方法
      this.$http.get("/api/getlunbo").then(result => {
        // console.log(result.data)
        if (result.data.status == 0) {
          // 成功了
          this.lunbotulist = result.data.message
        } else {
          // 失败了
          Toast('加载轮播图失败！')
        }
      }).catch(err => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 150px;

  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: pink;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view,
mui-grid-9 {
  background-color: #fff;
  border: none;
  img {
    height: 60px;
    width: 60px;
  }

  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>