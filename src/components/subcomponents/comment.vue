<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>

    <textarea placeholder="请输入要BB的内容(最多120字)"
              maxlength="120"></textarea>

    <mt-button type="primary"
               size="large"
               @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item"
           v-for="(item,i) in comments"
           :key="i">
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
      comments: [], // 评论的数据
      msg: " "
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
    getMore () {  // 加载更多
      this.pageIndex++;
      this.getComment()
    },
    postComment () {  // 发表评论
      if (this.msg.trim() === 0) {
        return Toast("评论内容不能为空！")
      }

      // 发表评论
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(function (result) {
          if (result.data.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
        });
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