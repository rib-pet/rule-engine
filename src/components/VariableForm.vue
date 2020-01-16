<template>
  <el-card class="variable-form-review" shadow="never">
    <div slot="header" class="variable-form-review-title">
      <span>{{ title }}</span>
      <el-button type="primary" @click="handleSave">Save</el-button>
    </div>

    <el-form label-width="80px">
      <el-form-item
        :label="item.description"
        v-for="(item, index) in variableData"
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
import _ from "lodash";

export default {
  name: "VariableFormReview",
  props: ["variableChild", "title"],
  data() {
    return {
      TYPE_RESULT,
      variableData: []
    };
  },
  watch: {
    variableChild: {
      deep: true,
      immediate: true,
      handler() {
        this.variableData = _.cloneDeep(this.variableChild);
      }
    }
  },
  methods: {
    handleSave() {
      this.$emit("save", this.variableData);
    }
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
