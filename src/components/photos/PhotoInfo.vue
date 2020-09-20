<template>
  <div class="photoInfo-container">
    <h3>{{photoInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
      <span>点击：{{photoInfo.click}}次</span>
    </p>

    <hr>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list"
                   @close="handleClose"
                   tag="img"
                   height="100px"></vue-preview>
    </div>
    <!-- 图片内容区域 -->
    <div class="content"
         v-html="photoInfo.content">
    </div>

    <!-- 评论子组件 -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from '../subcomponents/comment.vue'
export default {
  data () {
    return {
      id: this.$route.params.id,
      photoInfo: {},  // 图片详情
      list: []  // 缩略图的数组
    }
  },
  created () {
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    getPhotoInfo () {  // 获取图片信息
      this.$http.get('/api/getimageInfo/' + this.id).then(result => {
        if (result.data.status === 0) {
          this.photoInfo = result.data.message[0]
        }
      })
    },
    getThumbs () {  //获取缩略图
      this.$http.get('/api/getthumimages/' + this.id).then(result => {
        // console.log(result)
        if (result.data.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          result.data.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
          })
          // 把完整的数据保存到 list中
          this.list = result.data.message
        }
      })
    },
    handleClose () {
      console.log('close event')
    }
  },
  components: {  // 注册子组件
    'cmt-box': comment
  }
}
</script>

<style lang="scss">
.photoInfo-container {
  padding: 3px;
  h3 {
    font-size: 15px;
    color: #226aff;
    margin: 15px 0;
    text-align: center;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs {
    /deep/ .my-gallery {
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>