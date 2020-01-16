<template>
  <el-aside :width="isCollapse ? '65px' : '200px'" class="aside">
    <el-menu
      router
      :default-active="$route.path"
      class="slide-bar-menu"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
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
          Varible Wizard
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
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  transition: 500ms all ease-in-out;
}
.slide-bar-menu {
  min-height: calc(~"100vh - 133px");
}
</style>
