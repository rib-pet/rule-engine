<template>
  <el-card class="variable-form-review" shadow="never">
    <div slot="header" class="variable-form-review-title">
      <span>Variable Form Review</span>
      <el-button type="primary">Save</el-button>
    </div>

    <el-form label-width="80px">
      <el-form-item
        :label="item.description"
        v-for="(item, index) in variableChild"
        :key="index"
      >
        <el-input
          v-if="item.type === TYPE_RESULT"
          v-model="item.formula"
        ></el-input>
        <el-input v-else v-model="item.value"></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { TYPE_RESULT } from "../config/constants";

export default {
  name: "VariableFormReview",
  props: ["variableChild"],
  data() {
    return {
      TYPE_RESULT
    };
  }
};
</script>

<style scoped lang="less">
.variable-form-review-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>