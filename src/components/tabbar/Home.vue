<template>
  <div>
    <swiper :list="list" :isFull="true"></swiper>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="images/menu1.png" alt="新闻资讯" />
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photosList">
          <img src="images/menu2.png" alt="图片分享" />
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="images/menu3.png" alt="商品购买" />
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="images/menu4.png" alt="留言反馈" />
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="images/menu5.png" alt="视频专区" />
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="images/menu6.png" alt="联系我们" />
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
export default {
  data() {
    return {
      list: null,
    };
  },
  components: { swiper },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http.get("getlunbo").then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.list = data.message)
          : Toast("加载轮播图失败...");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.mui-grid-view.mui-grid-9 {
  background: #fff;
  border: 0;
  .mui-table-view-cell {
    border: 0;
    &:hover .mui-media-body {
      color: #007aff;
    }
    img {
      width: 60px;
      height: 60px;
    }
    .mui-media-body {
      font-size: 12px;
    }
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell.mui-active {
  background: #fff;
}
</style>
