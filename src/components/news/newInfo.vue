<template>
  <div class="newinfo-content">
    <h3 class="title">{{ newInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ newInfo.add_time | dateFormat }}</span>
      <span>点击：{{ newInfo.click }}次</span>
    </p>
    <hr />
    <div class="new-info" v-html="newInfo.content"></div>
    <comment :id="id"></comment>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      newInfo: {},
      id: this.$route.params.id
    };
  },
  components: { comment },
  created() {
    this.getNewInfo();
  },
  methods: {
    getNewInfo() {
      this.$http.get(`getnew/${this.id}`).then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.newInfo = data.message[0])
          : Toast("获取新闻失败...");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.newinfo-content {
  padding: 0 4px;
  .title {
    text-align: center;
    font-size: 16px;
    color: red;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: #226aff;
  }
  .new-info {
    /deep/ img {
      width: 100%;
    }
  }
}
</style>
