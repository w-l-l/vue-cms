<template>
  <div class="goods-content">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="getGoodInfo(item.id)">
      <img :src="item.img_url" alt />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1,
      goodsList: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$http.get(`getgoods?pageindex=${this.pageindex}`).then((res) => {
        const data = res.body;
        data.status === 0
          ? (this.goodsList = this.goodsList.concat(data.message))
          : Toast("商品列表获取失败");
      });
    },
    loadMore() {
      this.pageindex++;
      this.getGoodsList();
    },
    getGoodInfo(id) {
      //this.$router.push(`/home/goodInfo/${id}`);
      //this.$router.push({ path: `/home/goodInfo/${id}` });
      this.$router.push({ name: "goodInfo", params: { id } });
    },
  },
};
</script>
<style lang="less" scoped>
.goods-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 7px;
  .goods-item {
    border: 1px solid #ccc;
    width: 49%;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-size: 16px;
          font-weight: bold;
        }
        .old {
          font-size: 12px;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
