<template>
  <comment :id="$route.params.id" />
</template>
<script>
import comment from "../subcomponents/comment.vue";
export default {
  components: { comment },
};
</script>
<style lang="less" scoped></style>
