<template>
  <div class="goodsInfo-container">

    <transition @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter">
      <div class="ball"
           v-if="ballFlag"
           ref="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiprt :lunbotulist="lunbotu"></swiprt>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <p>数量：<numbox @getCount="getSelectedCount"
                    :max="goodsInfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary"
                       size="small">立即购买</mt-button>
            <mt-button type="danger"
                       size="small"
                       @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车时候,拿到 选择的数量 -->
            <!-- 涉及到 子组件向父组件传值了(事件调用机制) -->
            <!-- 事件调用本质: 父向子传递方法，子调用这个方法，同时把 数据当作参数 传递给这个方法 -->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{goodsInfo.goods_no}}</p>
          <p>库存情况:{{goodsInfo.stock_quantity}}件</p>
          <p>上架时间:{{goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary"
                   size="large"
                   plain
                   @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger"
                   size="large"
                   plain
                   @click="goComment(id)">商品讨论</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
import swiprt from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/numbox.vue'

export default {
  data () {
    return {
      id: this.$route.params.id,//将路由参数对象中的 id 挂载到 data，方便后期调用
      lunbotu: [], //获取轮播图的数据
      goodsInfo: {}, //获取到的商品的信息
      ballFlag: false,  // 控制小球的隐藏和显示的标识符
      selectedCount: 1  // 默认选择的数量
    }
  },
  created () {
    this.getLunBoTu(),
      this.getGoodsInfo()
  },
  methods: {
    getLunBoTu () {
      this.$http.get('/api/getthumimages/' + this.id).then(result => {
        if (result.data.status === 0) {
          result.data.message.forEach(item => {
            item.img = item.src
          })
          this.lunbotu = result.data.message
        }
      })
    },
    getGoodsInfo () {
      this.$http.get('/api/goods/getinfo/' + this.id).then(result => {
        if (result.data.status == 0) {
          this.goodsInfo = result.data.message[0]
        }
      })
    },
    goDesc (id) {
      this.$router.push({ name: 'goodsdesc', params: { id } })
    },
    goComment (id) {
      this.$router.push({ name: 'goodscomment', params: { id } })
    },
    addToShopCar () {
      // 添加到购物车
      this.ballFlag = !this.ballFlag
    },
    beforeEnter (el) {
      el.style.transform = "translate(0,0)"
    },
    enter (el, done) {
      el.offsetWidth;
      // 小球优化
      // 先得到 徽标的 横纵坐标，再得到 小球的 横纵坐标，然后让 y值 求差，x值也同理
      // domObject.getBoundingClientRect()

      // 获取小球 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect()
      // 获取 徽标 在页面中的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect()

      const xDist = badgePosition.left - ballPosition.left
      const yDist = badgePosition.top - ballPosition.top

      el.style.transform = `translate(${xDist}px,${yDist}px)`
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
      done()
    },
    afterEnter (el) {
      this.ballFlag = !this.ballFlag
    },
    getSelectedCount (count) {
      this.selectedCount = count
      console.log('父组件拿到的数量为：' + this.selectedCount)
    }
  },
  components: {
    'swiprt': swiprt,
    numbox
  }

}
</script>

<style lang="scss" scoped>
.goodsInfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
}
.ball {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  z-index: 99;
  top: 342px;
  left: 120px;
}
</style>