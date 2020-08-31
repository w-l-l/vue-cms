<template>
  <div class="shopcar-content">
    <div class="goods-list">
      <div class="mui-card" v-for="item in shopCarList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="getCarSelectCount[item.id].selected"></mt-switch>
            <img :src="item.thumb_path" alt />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p class="inner">
                <span class="price">￥{{ item.sell_price }}</span>
                <numberbox :value="getCarSelectCount[item.id].count" :isShopCar="true" :goodsid="item.id"></numberbox>
                <a href="#">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等</div>
      </div>
    </div>
  </div>
</template>
<script>
import numberbox from "../subcomponents/numberbox.vue";
import { Toast } from "mint-ui";
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      shopCarList: null,
    };
  },
  computed:{
    ...mapGetters(['getCarSelectCount'])
  },
  components: { numberbox },
  created() {
    this.getShopCarList();
  },
  methods: {
    getShopCarList() {
      const ids = this.$store.state.car.reduce((ids, item) => {
        ids.push(item.id);
        return ids;
      }, []);
      if (!ids.length) return;
      this.$http.get(`goods/getshopcarlist/${ids.join(",")}`).then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.shopCarList = data.message)
          : Toast("购物车列表获取失败");
      });
    },
  },
};
</script>
<style lang="less" scoped>
.shopcar-content {
  background: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      img {
        width: 60px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: 13px;
        }
        .inner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          .price {
            color: red;
            font-weight: bold;
          }
          .mui-numbox {
            height: 25px;
          }
        }
      }
    }
  }
}
</style>
