<template>
  <div class="header-wrap">
    <div class="logo">
      <img src="../assets/imgs/aiawhite-logo.png" alt="" />
      <span>Rule Enginer</span>
    </div>
    <div class="header-cont">
      <el-button
        class="toggle-menu-btn"
        type="primary"
        @click="toggleMenuHandle"
      >
        <i
          :class="
            $store.state.app.isExpand ? 'el-icon-s-unfold' : 'el-icon-s-fold'
          "
        ></i>
      </el-button>
    </div>
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
.header-wrap {
  background-color: @--color-primary;
  display: flex;
  align-items: center;
}
.logo {
  width: 220px;
  height: 60px;
  margin-right: 10px;
  line-height: 60px;
  color: #909399;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-right: 1px solid #bd4b69;
  span {
    color: #fff;
    font-size: 18px;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}

.header-wrap {
  /deep/ .el-menu-item.is-active {
    background-color: rgb(169, 14, 55) !important;
    border-bottom: 0 !important;
  }
}

.toggle-menu-btn {
  font-size: 18px;
  padding: 0.4em;
  border-radius: 0;
}
</style>
