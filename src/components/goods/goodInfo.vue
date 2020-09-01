<template>
  <div class="goodinfo-content">
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :list="goodInfoThums" :isFull="false"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{ goodInfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价：
            <span class="mark-price">￥{{ goodInfo.market_price }}</span>&nbsp;&nbsp;销售价：
            <span class="now-price">￥{{ goodInfo.sell_price }}</span>
          </p>
          <p class="number-box">
            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
              <span class="ball" v-if="isShow"></span>
            </transition>购买数量：
            <numberbox :maxNumber="goodInfo.stock_quantity" ref="numberbox" :isShopCar="false"></numberbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodInfo.goods_no }}</p>
          <p>库存情况：{{ goodInfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodInfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" plain size="large" @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import swiper from "../subcomponents/swiper.vue";
import numberbox from "../subcomponents/numberbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodInfoThums: null,
      goodInfo: {},
      isShow: false,
    };
  },
  props: ["badge"],
  components: { swiper, numberbox },
  created() {
    this.getGoodInfoThums();
    this.getGoodInfo();
  },
  methods: {
    getGoodInfoThums() {
      this.$http.get(`getthumimages/${this.id}`).then((res) => {
        const data = res.body;
        if (data.status === 0) {
          data.message.forEach((item) => (item.img = item.src));
          this.goodInfoThums = data.message;
        } else {
          Toast("商品轮播图获取失败");
        }
      });
    },
    getGoodInfo() {
      this.$http.get(`goods/getinfo/${this.id}`).then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.goodInfo = data.message[0])
          : Toast("商品信息获取失败");
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodInfoDesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodComment", params: { id } });
    },
    addToShopCar() {
      this.isShow = !this.isShow;
      const goodInfo = {
        id: this.id >> 0,
        price: parseFloat(this.goodInfo.sell_price),
        count: this.$refs.numberbox.$refs.count.value >> 0,
        selected: true,
      };
      this.$store.dispatch("addToCar", goodInfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballObj = el.getBoundingClientRect();
      const badgeObj = this.badge.getBoundingClientRect();
      const x = badgeObj.left - ballObj.left;
      const y = badgeObj.top - ballObj.top;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = "all .5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.isShow = !this.isShow;
    },
  },
};
</script>
<style lang="less" scoped>
.goodinfo-content {
  background: #eee;
  &::before {
    content: "";
    display: table;
  }
  &::after {
    content: "";
    display: table;
  }
  .mui-card {
    overflow: visible;
    .mark-price {
      text-decoration: line-through;
    }
    .now-price {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
    .number-box {
      position: relative;
      .ball {
        background: red;
        width: 18px;
        height: 18px;
        position: absolute;
        border-radius: 50%;
        z-index: 90;
        left: 123px;
        top: 8px;
      }
    }
    .mui-card-footer {
      display: block;
      button {
        margin: 15px 0;
      }
    }
  }
}
</style>
