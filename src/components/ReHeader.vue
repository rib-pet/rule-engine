<template>
  <div class="header-wrap">
    <div class="header-top">
      <div class="logo">
        <img src="../assets/imgs/aiawhite-logo.png" alt="" />
      </div>
    </div>
    <el-menu
      :default-active="$route.path"
      router
      mode="horizontal"
      background-color="#596C80"
      text-color="#fff"
      active-text-color="#FBBF56"
    >
      <li class="menu-collapse" @click="toggleMenuHandle">
        <i
          :class="
            $store.state.app.isExpand ? 'el-icon-s-unfold' : 'el-icon-s-fold'
          "
        ></i>
      </li>
      <el-menu-item index="/">Dashboard</el-menu-item>
      <li class="execute-btn fr" v-if="$route.path === '/workspace/product'">
        <el-button type="primary">Execute</el-button>
      </li>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    toggleMenuHandle() {
      this.$store.dispatch("toggleSideBar");
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../style/vars.less");
.header-top {
  background-color: @--color-primary;
  padding: 8px;
  img {
    width: 50px;
  }
}
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
  border-right: 1px solid #e6e6e6;
  width: 65px;
  text-align: center;
}
</style>