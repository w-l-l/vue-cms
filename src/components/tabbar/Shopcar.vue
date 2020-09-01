<template>
  <div class="shopcar-content">
    <div class="goods-list">
      <div class="mui-card" v-for="(item,index) in shopCarList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="getCarSelectCount[item.id].selected"
              @change="updateShopCarSelected({id:item.id,selected:getCarSelectCount[item.id].selected})"
            ></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p class="inner">
                <span class="price">￥{{ item.sell_price }}</span>
                <numberbox
                  :value="getCarSelectCount[item.id].count"
                  :isShopCar="true"
                  :goodsid="item.id"
                ></numberbox>
                <a href="#" @click.prevent="delShopCarItem(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner account">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>
              已勾选商品
              <span class="red">{{ getCarAccount.count }}</span> 件，总价
              <span class="red">￥{{ getCarAccount.totalPrice }}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numberbox from "../subcomponents/numberbox.vue";
import { Toast } from "mint-ui";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      shopCarList: null,
    };
  },
  computed: {
    ...mapGetters(["getCarSelectCount", "getCarAccount"]),
  },
  components: { numberbox },
  created() {
    this.getShopCarList();
  },
  methods: {
    ...mapActions(["updateShopCarSelected", "delShopCar"]),
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
    delShopCarItem(id, index) {
      this.shopCarList.splice(index, 1);
      this.delShopCar(id);
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
  .account {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
</style>
