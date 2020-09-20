<template>
  <div class="goods-list">
    <div class="goods-item"
         v-for="item in goodslist"
         :key="item.id"
         @click="goDetail(item.id)">
      <img :src="item.img_url"
           alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger"
               size="large"
               @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      goodslist: [],  //商品列表数据
      pageindex: 1
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    getGoodsList () {
      this.$http.get('/api/getgoods?pageindex=' + this.index).then(result => {
        console.log(result.data.message)
        if (result.data.status === 0) {
          //   this.goodslist = result.data.message
          this.goodslist = this.goodslist.concat(result.data.message)
        }
      })
    },
    getMore () {
      this.pageindex++;
      this.getGoodsList()
    },
    goDetail (id) {
      this.$router.push('/home/goodsInfo/' + id)  //编程式导航
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 193px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          margin-left: 10px;
          font-size: 13px;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>