<template>
  <div class="content">
    <mt-header fixed title="Vue-cms项目">
      <span slot="left" @click="tabBack" v-if="isShow">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
    <transition>
      <router-view :badge="badge"></router-view>
    </transition>
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" ref="badge">{{ $store.getters.getCarAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      badge: null,
      isShow: true,
    };
  },
  mounted() {
    this.badge = this.$refs.badge;
    this.isShow = this.$route.path !== "/home"
  },
  methods: {
    tabBack() {
      this.$router.back();
    },
  },
  watch: {
    "$route.path": function (newValue) {
      this.isShow = newValue !== "/home";
    },
  },
};
</script>
<style lang="less" scoped>
.mint-header {
  z-index: 99;
}
.content {
  padding: 40px 0 50px 0;
  overflow-x: hidden;
  position: relative;
  min-height: 100%;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-leave-active {
  position: absolute;
}
.mui-bar-tab .mui-tab-item-llb {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(146, 146, 146);
}
.mui-bar-tab .mui-tab-item-llb .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-llb.mui-active {
  color: #007aff;
}
</style>
