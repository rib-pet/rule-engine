<template>
  <div class="main-wrapper">
    <re-header></re-header>
    <el-container>
      <slide-bar></slide-bar>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ReHeader from "../ReHeader.vue";
import SlideBar from "../SlideBar.vue";
export default {
  components: {
    ReHeader,
    SlideBar
  }
};
</script>

<style lang="less" scoped>
.main {
}
</style>