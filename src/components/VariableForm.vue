<template>
  <el-card class="variable-form-review" shadow="never">
    <div slot="header" class="variable-form-review-title">
      <span>{{ title }}</span>
      <el-button
        v-if="!hideSave"
        type="primary"
        @click="handleSave"
        :disabled="!isModified"
        >Save</el-button
      >
    </div>

    <el-form label-width="80px">
      <el-form-item
        :label="item.description"
        v-for="(item, index) in variableData"
        :key="index"
      >
        <template v-if="item.type === TYPE_RESULT">
          <el-tooltip
            v-if="executeResult"
            class="item"
            effect="dark"
            :content="item.formula"
            placement="top"
          >
            <div class="el-input el-input--small">
              <div class="el-input__inner">
                {{ execRes[item.code] }}
              </div>
            </div>
          </el-tooltip>
          <el-input
            v-else
            v-model="item.formula"
            :readonly="item.readonly"
          ></el-input>
        </template>
        <el-input
          v-else
          v-model="item.value"
          :readonly="item.readonly"
        ></el-input>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { TYPE_RESULT } from "../config/constants";
import _ from "lodash";

export default {
  name: "VariableFormReview",
  props: ["variableChild", "title", "hideSave", "executeResult"],
  data() {
    return {
      TYPE_RESULT,
      variableData: [],
      execRes: {}
    };
  },
  watch: {
    variableChild: {
      deep: true,
      immediate: true,
      handler() {
        this.variableData = _.cloneDeep(this.variableChild);
      }
    },
    variableData: {
      deep: true,
      immediate: true,
      handler() {
        this.executeHandle();
      }
    }
  },
  computed: {
    isModified() {
      return !_.isEqual(this.variableChild, this.variableData);
    }
  },
  methods: {
    handleSave() {
      this.$emit("save", this.variableData);
    },
    executeHandle() {
      if (!this.executeResult) {
        return;
      }
      this.variableData.forEach(item => {
        if (item.type === TYPE_RESULT) {
          let _expression = `"use strict"; return(${item.formula})`;

          this.variableData.forEach(item2 => {
            _expression = _expression.replace(
              new RegExp(`${item2.code}`, "g"),
              item2.value || 0
            );
          });

          this.execRes[item.code] = Function(_expression)();
        }
      });
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
