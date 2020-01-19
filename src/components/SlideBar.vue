<template>
  <el-aside :width="isCollapse ? '65px' : '220px'" class="aside">
    <el-menu
      :collapse-transition="false"
      router
      :default-active="$route.path"
      class="slide-bar-menu"
      :collapse="isCollapse"
    >
      <li class="menu-title" v-if="!isCollapse">MAIN NAVIGATION</li>
      <el-menu-item index="/dashboard">
        <i class="el-icon-monitor"></i>
        <span>Dashboard</span>
      </el-menu-item>
      <el-submenu index="/workspace">
        <template slot="title">
          <i class="el-icon-files"></i>
          <span slot="title">Workspace</span>
        </template>
        <el-menu-item index="/workspace/product">Products</el-menu-item>
        <el-menu-item index="/workspace/rules">Rules</el-menu-item>
      </el-submenu>
      <el-submenu index="/catalog">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span slot="title">Catalog</span>
        </template>
        <el-menu-item index="/catalog/varible-wizard">
          Varible Master
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "SlideBar",
  computed: {
    isCollapse() {
      return this.$store.state.app.isExpand;
    }
  }
};
</script>

<style lang="less" scoped>
.menu-title {
  background-color: #eee;
  line-height: 24px;
  font-size: 12px;
  text-align: center;
  color: #666;
}
.slide-bar-menu {
  min-height: calc(~"100vh - 65px");
}
</style>
