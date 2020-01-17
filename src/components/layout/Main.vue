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
  },
  methods: {
    toggleMenuHandle() {
      this.$store.dispatch("toggleSideBar");
    }
  }
};
</script>

<style lang="less">
.execute-btn {
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
}
.menu-collapse {
  height: 60px;
  line-height: 60px;
  float: left;
  color: #fff;
  border-right: 1px solid #909090;
  width: 65px;
  text-align: center;
  outline: none;
}
</style>
