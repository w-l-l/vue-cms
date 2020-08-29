<template>
  <div class="gooddesc-content">
      <h3>{{ goodDesc.title }}</h3>
      <hr>
      <div class="content" v-html="goodDesc.content "></div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodDesc: {},
    };
  },
  created() {
    this.getGoodDesc();
  },
  methods: {
    getGoodDesc() {
      this.$http.get(`goods/getdesc/${this.id}`).then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.goodDesc = data.message[0])
          : Toast("图文介绍获取失败");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.gooddesc-content{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        margin: 15px 0;
        text-align: center;
    }
    .content{
        /deep/ table,/deep/ img{
            width: 100%;
        }
    }
}
</style>
