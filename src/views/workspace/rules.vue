<template>
  <div class="catalog-index">
    <h4 class="page-title">Rules</h4>

    <el-container>
      <el-row style="width: 100%;" :gutter="15">
        <el-col :md="10">
          <re-table
            :table-data="ruleList"
            highlight-current-row
            @current-change="handleCurrentRuleChange"
            @selection-change="handleRuleSelectionChange"
            @row-edit="handleRuleEdit"
            @row-delete="handleRuleDelete"
          >
            <template v-slot:header>
              <div class="header-opt">
                <el-button type="primary" @click="handleAddRule">Add</el-button>
                <el-button
                  type="primary"
                  @click="handleRuleDelete"
                  :disabled="!selectedRuleRows.length"
                  >Delete
                </el-button>
              </div>
            </template>

            <el-table-column prop="code" label="Code"> </el-table-column>
            <el-table-column prop="description" label="Description">
            </el-table-column>
            <el-table-column label="Variable Catalog">
              <template slot-scope="{ row }">
                {{ row.variableCatalog.description }}
              </template>
            </el-table-column>
          </re-table>
        </el-col>
        <el-col :md="14">
          <div class="right-panel" v-if="currentRuleRowChildren">
            <variable-form
              :execute-result="true"
              title="Variable Form"
              :variable-child="currentRuleRowChildren"
              @save="handleFormSave"
            ></variable-form>
          </div>
          <div v-else class="right-panel">
            Please select.
          </div>
        </el-col>
      </el-row>
    </el-container>

    <el-dialog title="Rule Form" :visible.sync="isShowFormDialog">
      <el-form :model="currentRuleTmp" ref="ruleForm" label-width="120px">
        <el-form-item label="Code">
          <el-input v-model="currentRuleTmp.code" readonly></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="currentRuleTmp.description"></el-input>
        </el-form-item>
        <el-form-item label="Variable Catalog">
          <el-select
            v-model="currentRuleTmp.variableCatalogCode"
            placeholder="Please Select"
          >
            <el-option
              v-for="item in $store.getters.variableCatalogs"
              :key="item.code"
              :label="item.description"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowFormDialog = false">NO</el-button>
        <el-button type="primary" @click="submitAddRule">YES</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VariableForm from "@/components/VariableForm";
import ReTable from "@/components/ReTable";
import _ from "lodash";

export default {
  name: "Catalog",
  components: { VariableForm, ReTable },
  data() {
    return {
      currentRuleTmp: {
        code: "",
        description: "",
        variableCatalogCode: ""
      },
      isShowFormDialog: false,
      currentRuleRow: null,
      selectedVariableRows: [],
      selectedRuleRows: [],
      ruleList: _.cloneDeep(this.$store.getters.ruleList)
    };
  },
  computed: {
    currentRuleRowChildren() {
      if (
        this.currentRuleRow &&
        this.currentRuleRow.variableCatalog &&
        this.currentRuleRow.variableCatalog.children
      ) {
        return this.currentRuleRow.variableCatalog.children;
      }
      return null;
    }
  },
  methods: {
    handleFormSave(data) {
      this.currentRuleRow.variableCatalog.children = data;
      this.$store.dispatch("updateRules", this.ruleList);
    },
    submitAddRule() {
      let index = this.ruleList.findIndex(
        item => item.code === this.currentRuleTmp.code
      );
      this.currentRuleTmp.variableCatalog = {
        ...this.$store.getters.variableCatalogs.find(
          item => item.code === this.currentRuleTmp.variableCatalogCode
        )
      };
      if (index !== -1) {
        this.ruleList.splice(index, 1, _.cloneDeep(this.currentRuleTmp));
      } else {
        this.ruleList.push(_.cloneDeep(this.currentRuleTmp));
      }

      this.$store.dispatch("updateRules", this.ruleList);

      this.isShowFormDialog = false;
    },
    handleAddRule() {
      this.currentRuleTmp = {
        code: "R_" + _.now(),
        description: "",
        variableCatalogCode: ""
      };
      this.isShowFormDialog = true;
    },
    handleRuleSelectionChange(val) {
      this.selectedRuleRows = val;
    },
    handleRuleEdit({ row }) {
      this.currentRuleTmp = _.cloneDeep(row);
      this.isShowFormDialog = true;
    },
    handleSelectionChange(val) {
      this.selectedVariableRows = val;
    },
    handleCurrentRuleChange(val) {
      this.currentRuleRow = val;
    },
    handleRuleDelete() {
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          this.ruleList = this.ruleList.filter(item => {
            return !this.selectedRuleRows.some(
              item2 => item2.code === item.code
            );
          });
          this.$store.dispatch("updateRules", this.ruleList);
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.right-panel {
  padding: 15px;
  background-color: #faf9f3;
  min-height: calc(~"100vh - 262px");
  border-left: 1px solid #f1f1f1;
}
</style>
