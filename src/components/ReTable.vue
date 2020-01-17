<template>
  <el-card
    class="re-table"
    ref="re-table"
    shadow="never"
    :body-style="{ padding: 0 }"
  >
    <div slot="header" class="re-table-title">
      <span>{{ title }}</span>
      <slot name="header"></slot>
    </div>
    <el-table
      ref="table"
      :data="tableData"
      :height="height"
      :highlight-current-row="highlightCurrentRow"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <slot />
      <el-table-column prop="opt" width="55">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleRowEdit(scope)"
            >Edit</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: "RETable",
  props: ["tableData", "title", "highlightCurrentRow", "height"],
  methods: {
    handleCurrentChange(val) {
      this.$emit("current-change", val);
    },
    handleRowEdit(scope) {
      this.$emit("row-edit", scope);
    },
    handleRowDelete(scope) {
      this.$emit("row-delete", scope);
    },
    handleSelectionChange(val) {
      this.$emit("selection-change", val);
    }
  }
};
</script>

<style scoped lang="less">
.re-table {
  margin-bottom: 15px;
}
.re-table-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
