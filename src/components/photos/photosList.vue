<template>
  <div>
    <div class="mui-slider">
      <div
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id ===0 ? 'mui-active' : '']"
            v-for="item in imgCategory"
            :key="item.id"
            @tap="getPhotosList(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link :to="'/home/photoInfo/' + item.id" tag="li" v-for="item in photosList" :key="item.id">
        <img v-lazy="item.img_url" />
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      imgCategory: [{ id: 0, title: "全部" }],
      photosList: null,
    };
  },
  created() {
    this.getImgCategory();
    this.getPhotosList(0);
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getImgCategory() {
      this.$http.get("getimgcategory").then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.imgCategory = this.imgCategory.concat(data.message))
          : Toast("图片分类获取失败...");
      });
    },
    getPhotosList(cateid) {
      this.$http.get(`getimages/${cateid}`).then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.photosList = data.message)
          : Toast("图片列表获取失败...");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px 10px 0 10px;
  li {
    background: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    overflow: hidden;
  }
  img[lazy="loaded"] {
    width: 100%;
    vertical-align: middle;
  }
  img[lazy="loading"] {
    width: 40px;
    height: 300px;
    margin: auto;
  }
  .info {
    color: white;
    text-align: left;
    position: absolute;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    max-height: 84px;
    .info-title {
      font-size: 14px;
    }
    .info-body {
      font-size: 13px;
    }
  }
}
</style>
