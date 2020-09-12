<template>
  <div class="newsinfo-container">
    <!-- 标签 -->
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间:{{newsInfo.add_time | dateFormat}}</span>
      <span>点击：{{newsInfo.click}}次</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content"
         v-html="newsInfo.content"></div>

    <!-- 评论子组件区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Comment from '../subcomponents/comment.vue'

export default {
  data () {
    return {
      //将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      id: this.$route.params.id,
      newsInfo: {},  // 新闻对象
    }
  },
  created () {
    this.getNewsInfo()
  },
  methods: {
    getNewsInfo () {
      this.$http.get('/api/getnew/' + this.id).then(result => {
        //console.log(result)
        if (result.data.status === 0) {
          this.newsInfo = result.data.message[0]
        } else {
          Toast('新闻资讯详情获取失败！')
        }
      })
    }
  },
  components: {  // 用来注册子组件的节点
    "comment-box": Comment
  }
}
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    text-align: center;
    margin: 10px 0;
    font-size: 16px;
  }
  .subtitle {
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
}
</style>