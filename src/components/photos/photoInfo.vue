<template>
  <div class="photo-content">
    <h3>{{ photoInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoInfo.add_time | dateFormat }}</span>
      <span>点击：{{ photoInfo.click }}次</span>
    </p>
    <hr />
    <div class="thoumb">
      <vue-preview :slides="thumbs"></vue-preview>
    </div>
    <div class="content" v-html="photoInfo.content"></div>
    <comment :id="id"></comment>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      thumbs: [],
    };
  },
  components: { comment },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get(`getimageInfo/${this.id}`).then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.photoInfo = data.message[0])
          : Toast("图片详情获取失败...");
      });
    },
    getThumbs() {
      this.$http.get(`getthumimages/${this.id}`).then((res) => {
        const data = res.body;
        if (data.status === 0) {
          data.message.forEach((item) => {
            item.msrc = item.src;
            item.w = 600;
            item.h = 400;
          });
          this.thumbs = data.message;
        } else {
          Toast("缩略图获取失败...");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.photo-content {
  padding: 3px;
  h3 {
    font-size: 15px;
    text-align: center;
    color: #26a2ff;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  //vuepreview图片处理
  .thoumb {
    /deep/ .my-gallery {
      //deep深层作用选择器
      display: flex;
      flex-wrap: wrap;
      figure {
        width: 30%;
        margin: 5px;
        img {
          width: 100%;
          box-shadow: 0 0 8px #999;
          border-radius: 5px;
        }
      }
    }
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
