<template>
  <div class="cmt-box">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容（最多评论120字）" maxlength="120" v-model="content"></textarea>
    <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
    <ul class="list">
      <li v-for="(item,index) in comments" :key="index">
        <p
          class="title"
        >第{{ index + 1 }}楼 用户：{{ item.user_name }} 发表时间：{{ item.add_time | dateFormat }}</p>
        <p class="body">{{ item.content === 'undefined' ? '此用户什么都没输入' : item.content }}</p>
      </li>
    </ul>
    <mt-button type="danger" size="large" plain @click="loadMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      index: 1,
      comments: [],
      content: "",
    };
  },
  props: ["id"],
  created() {
    this.getComment();
  },
  methods: {
    getComment() {
      this.$http
        .get(`getcomments/${this.id}?pageindex=${this.index}`)
        .then((res) => {
          const data = res.body;
          data.status === 0
            ? (this.comments = this.comments.concat(data.message))
            : Toast("获取评论失败...");
        });
    },
    loadMore() {
      this.index++;
      this.getComment();
    },
    addComment() {
      const content = this.content.trim();
      if (!content) return Toast("评论内容不能为空");
      this.$http.post(`postcomment/${this.id}`, { content }).then((res) => {
        const data = res.body;
        if (data.status === 0) {
          this.comments.unshift({
            add_time: new Date().toISOString(),
            content,
            user_name: "匿名用户",
          });
          this.content = "";
        } else {
          Toast(data.message);
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.cmt-box {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .list {
    margin: 5px 0;
    padding: 0;
    list-style: none;
    p {
      margin: 0;
      color: black;
      line-height: 35px;
      font-size: 13px;
    }
    .title {
      background: #ccc;
    }
    .body {
      text-indent: 2rem;
    }
  }
}
</style>
