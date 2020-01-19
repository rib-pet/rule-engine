<template>
  <div class="catalog-index">
    <h4 class="page-title">Variable Master</h4>

    <el-container>
      <el-row style="width: 100%;" :gutter="15">
        <el-col :md="8">
          <re-table
            :table-data="variableCatalogs"
            highlight-current-row
            @current-change="handleCurrentChange"
            @selection-change="handleCatalogSelectionChange"
            @row-edit="handleVariableCatalogEdit"
            @row-delete="handleVariableCatalogDelete"
          >
            <template v-slot:header>
              <div class="header-opt">
                <el-button type="primary" @click="showVariableCatalogDialog"
                  >Add</el-button
                >
                <el-button
                  type="primary"
                  @click="handleVariableCatalogDelete"
                  :disabled="!selectedVariableCatalogRows.length"
                  >Delete</el-button
                >
              </div>
            </template>

            <el-table-column prop="code" label="Code"> </el-table-column>
            <el-table-column prop="description" label="Description">
            </el-table-column>
          </re-table>
        </el-col>
        <el-col :md="16">
          <div class="right-panel" v-if="currentVariableRowChildren">
            <re-table
              :table-data="currentVariableRowChildren"
              :title="currentVariableRow.description"
              @selection-change="handleSelectionChange"
              @row-edit="handleVariableEdit"
              @row-delete="handleVariableDelete"
            >
              <template v-slot:header>
                <div class="header-opt">
                  <el-button type="primary" @click="showVairableFormDialog"
                    >Add</el-button
                  >
                  <el-button
                    type="primary"
                    @click="handleVariableDelete"
                    :disabled="!selectedVariableRows.length"
                    >Delete</el-button
                  >
                </div>
              </template>

              <el-table-column prop="code" label="Code"> </el-table-column>
              <el-table-column prop="description" label="Description">
              </el-table-column>
              <el-table-column prop="formula" label="Formula">
              </el-table-column>
              <el-table-column prop="type" label="Type"> </el-table-column>
              <el-table-column prop="readonly" label="Readonly">
                <template slot-scope="{ row }">
                  <i class="el-icon-check" v-if="row.readonly"></i>
                  <i class="el-icon-close" v-else></i>
                </template>
              </el-table-column>
            </re-table>

            <variable-form
              hide-save
              title="Variable Form Review"
              :variable-child="currentVariableRowChildren"
            ></variable-form>
          </div>
          <div v-else class="right-panel">
            Please select.
          </div>
        </el-col>
      </el-row>
    </el-container>

    <el-dialog title="Variable Catalog Form" :visible.sync="isShowFormDialog">
      <el-form :model="variableCatalogTmp" ref="ruleForm" label-width="120px">
        <el-form-item label="Code">
          <el-input v-model="variableCatalogTmp.code" readonly></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="variableCatalogTmp.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowFormDialog = false">NO</el-button>
        <el-button type="primary" @click="submitAddVariableCatalog"
          >YES</el-button
        >
      </div>
    </el-dialog>

    <el-dialog
      title="Variable Parameter Form"
      :visible.sync="isShowVairableFormDialog"
    >
      <el-form :model="variableTmp" ref="ruleForm" label-width="120px">
        <el-form-item label="Code">
          <el-input v-model="variableTmp.code"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="variableTmp.description"></el-input>
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="variableTmp.type" placeholder="Please Select">
            <el-option
              v-for="item in TYPE"
              :key="item.key"
              :label="item.key"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Formula" v-if="variableTmp.type === TYPE_RESULT">
          <el-input v-model="variableTmp.formula"></el-input>
        </el-form-item>
        <el-form-item label="Readonly">
          <el-switch v-model="variableTmp.readonly"> </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowVairableFormDialog = false">NO</el-button>
        <el-button type="primary" @click="submitVariableParameter"
          >YES</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VariableForm from "@/components/VariableForm";
import ReTable from "@/components/ReTable";
import _ from "lodash";
import { TYPE, TYPE_RESULT } from "@/config/constants";

export default {
  name: "Catalog",
  components: { VariableForm, ReTable },
  data() {
    return {
      isShowFormDialog: false,
      isShowVairableFormDialog: false,
      currentVariableRow: null,
      TYPE,
      TYPE_RESULT,
      variableCatalogTmp: {
        code: "",
        description: "",
        children: []
      },
      variableTmp: {
        code: "",
        description: "",
        formula: "",
        sequence: 0,
        value: "",
        type: "",
        readonly: false
      },
      selectedVariableRows: [],
      selectedVariableCatalogRows: [],
      variableCatalogs: _.cloneDeep(this.$store.getters.variableCatalogs)
    };
  },
  computed: {
    currentVariableRowChildren() {
      if (this.currentVariableRow && this.currentVariableRow.children) {
        return this.currentVariableRow.children;
      }
      return null;
    }
  },
  methods: {
    showVairableFormDialog() {
      this.isShowVairableFormDialog = true;
      this.variableTmp = {
        code: "",
        description: "",
        formula: "",
        value: "",
        type: "",
        readonly: false
      };
    },
    // show Variable Catalog form dialog
    showVariableCatalogDialog() {
      this.variableCatalogTmp = {
        code: "VC_" + _.now(),
        description: "",
        children: []
      };
      this.isShowFormDialog = true;
    },
    handleCatalogSelectionChange(val) {
      this.selectedVariableCatalogRows = val;
    },
    submitAddVariableCatalog() {
      let index = this.variableCatalogs.findIndex(
        item => item.code === this.variableCatalogTmp.code
      );
      if (index !== -1) {
        this.variableCatalogs.splice(
          index,
          1,
          _.cloneDeep(this.variableCatalogTmp)
        );
      } else {
        this.variableCatalogs.push(_.cloneDeep(this.variableCatalogTmp));
      }
      this.$store.dispatch("updateVariableCatalog", this.variableCatalogs);
      this.isShowFormDialog = false;
    },
    submitVariableParameter() {
      let index = this.currentVariableRow.children.findIndex(
        item => item.code === this.variableTmp.code
      );
      if (index !== -1) {
        this.currentVariableRow.children.splice(
          index,
          1,
          _.cloneDeep(this.variableTmp)
        );
      } else {
        this.currentVariableRow.children.push(_.cloneDeep(this.variableTmp));
      }
      this.$store.dispatch("updateVariableCatalog", this.variableCatalogs);
      this.isShowVairableFormDialog = false;
    },
    handleVariableCatalogEdit({ row }) {
      this.variableCatalogTmp = _.cloneDeep(row);
      this.isShowFormDialog = true;
    },
    handleSelectionChange(val) {
      this.selectedVariableRows = val;
    },
    handleCurrentChange(val) {
      this.currentVariableRow = val;
    },
    handleVariableEdit({ row }) {
      this.variableTmp = _.cloneDeep(row);
      this.isShowVairableFormDialog = true;
    },
    handleVariableCatalogDelete() {
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          this.variableCatalogs = this.variableCatalogs.filter(item => {
            return !this.selectedVariableCatalogRows.some(
              item2 => item2.code === item.code
            );
          });
          this.$store.dispatch("updateVariable", this.variableCatalogs);
        })
        .catch(() => {});
    },
    handleVariableDelete() {
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          this.currentVariableRow.children = this.currentVariableRow.children.filter(
            item => {
              return !this.selectedVariableRows.some(
                item2 => item2.code === item.code
              );
            }
          );
          this.$store.dispatch("updateVariable", this.variableCatalogs);
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
