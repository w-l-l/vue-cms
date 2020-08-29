<template>
  <div class="mui-numbox" data-numbox-step="1" data-numbox-min="1">
    <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
    <input class="mui-numbox-input" type="number" />
    <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
  </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        mui('.mui-numbox').numbox()
    }
};
</script>
<style lang="less" scoped></style>
