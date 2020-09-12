<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>

    <textarea placeholder="请输入要BB的内容(最多120字)"
              maxlength="120"></textarea>

    <mt-button type="primary"
               size="large">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item"
           v-for="(item,i) in comments"
           :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间: {{item.add_time | dateFormat}}
          <div class="cmt-body">
            {{item.content}}
          </div>
        </div>
      </div>
    </div>
    <mt-button type="danger"
               size="large"
               plain
               @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data () {
    return {
      pageIndex: 1, // 默认显示第一页
      comments: [] // 评论的数据
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    getComment () {
      this.$http.get('/api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
        //    console.log(result)
        if (result.data.status === 0) {
          // this.comments = result.data.message
          // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接新数据
          this.comments = this.comments.concat(result.data.message)
        } else {
          Toast('获取评论失败！')
        }
      })
    },
    getMore () {
      this.pageIndex++;
      this.getComment()
    }
  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 14px;
      .cmt-title {
        background-color: #ccc;
        line-height: 30px;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
        background-color: #fff;
      }
    }
  }
}
</style>