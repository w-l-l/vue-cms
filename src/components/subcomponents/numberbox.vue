<template>
  <div class="mui-numbox" data-numbox-step="1" data-numbox-min="1">
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input
      class="mui-numbox-input"
      type="number"
      :value="value"
      ref="count"
      @change="updateShopCar"
    />
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js";
export default {
  props: ["maxNumber", "value", "isShopCar", "goodsid"],
  mounted() {
    mui(".mui-numbox").numbox();
    this.isShopCar && this.$refs.count.setAttribute("readonly", "readonly");
  },
  methods: {
    updateShopCar() {
      if (!this.isShopCar) return;
      this.$store.dispatch("updateShopCarCount", {
        id: this.goodsid,
        count: this.$refs.count.value,
      });
    },
  },
  watch: {
    maxNumber(value) {
      mui(".mui-numbox").numbox().setOption("max", value);
    },
  },
};
</script>
<style lang="less" scoped></style>
