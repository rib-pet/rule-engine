<template>
  <div class="catalog-index">
    <h4 class="page-title el-row--flex is-justify-space-between">
      <span>Product</span>
      <el-button
        type="primary"
        :disabled="!currentProductRow"
        @click="execHandle"
        :loading="isExecuting"
        >Execute</el-button
      >
    </h4>

    <el-container>
      <el-row style="width: 100%;" :gutter="15">
        <el-col :md="10">
          <re-table
            :table-data="productList"
            highlight-current-row
            @current-change="handleCurrentProductChange"
            @selection-change="handleProductSelectionChange"
            @row-edit="handleProductEdit"
            @row-delete="handleProductDelete"
          >
            <template v-slot:header>
              <div class="header-opt">
                <el-button type="primary" @click="handleAddProduct"
                  >Add</el-button
                >
                <el-button
                  type="primary"
                  @click="handleProductDelete"
                  :disabled="!selectedProductRows.length"
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
          <div class="right-panel" v-if="currentProductRowChildren">
            <variable-form
              class="mb-15"
              title="Product Variable Form"
              :variable-child="currentProductRowChildren"
              @save="handleFormSave"
            ></variable-form>

            <re-table
              title="Project Rule"
              :table-data="currentProductRuleList"
              @selection-change="handlePRSelectionChange"
              @row-edit="handlePREdit"
              @row-delete="handlePRDelete"
            >
              <template v-slot:header>
                <div class="header-opt">
                  <el-button type="primary" @click="handleAddPR">Add</el-button>
                  <el-button
                    type="primary"
                    @click="handlePRDelete"
                    :disabled="!selectedPRRows.length"
                    >Delete
                  </el-button>
                </div>
              </template>

              <el-table-column prop="code" label="Code"> </el-table-column>
              <el-table-column label="Rule">
                <template slot-scope="{ row }">
                  {{ row.rule.description }}
                </template>
              </el-table-column>
              <el-table-column label="Product">
                <template slot-scope="{ row }">
                  {{ row.product.description }}
                </template>
              </el-table-column>
              <el-table-column prop="description" label="Description">
              </el-table-column>
              <el-table-column label="Result">
                <template slot-scope="{ row }">
                  <template v-if="typeof execRes[row.code] === 'undefined'">
                    -
                  </template>
                  <template v-else>
                    <i
                      class="el-icon-check el-button--text"
                      v-if="execRes[row.code]"
                    ></i>
                    <i class="el-icon-close el-button--text" v-else></i>
                  </template>
                </template>
              </el-table-column>
            </re-table>
          </div>
          <div v-else class="right-panel">
            Please select.
          </div>
        </el-col>
      </el-row>
    </el-container>

    <el-dialog title="Product Form" :visible.sync="isShowFormDialog">
      <el-form :model="currentProductTmp" label-width="120px">
        <el-form-item label="Code">
          <el-input v-model="currentProductTmp.code" readonly></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="currentProductTmp.description"></el-input>
        </el-form-item>
        <el-form-item label="Variable Catalog">
          <el-select
            v-model="currentProductTmp.variableCatalogCode"
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
        <el-button type="primary" @click="submitAddProduct">YES</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Product Rule Form" :visible.sync="isShowPRFormDialog">
      <el-form :model="currentPRTmp" label-width="120px">
        <el-form-item label="Code">
          <el-input v-model="currentPRTmp.code" readonly></el-input>
        </el-form-item>
        <el-form-item label="Product Code">
          <el-input v-model="currentPRTmp.productCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="currentPRTmp.description"></el-input>
        </el-form-item>
        <el-form-item label="Rule">
          <el-select
            v-model="currentPRTmp.ruleCode"
            placeholder="Please Select"
          >
            <el-option
              v-for="item in $store.getters.ruleList"
              :key="item.code"
              :label="item.description"
              :value="item.code"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowPRFormDialog = false">NO</el-button>
        <el-button type="primary" @click="submitAddPR">YES</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VariableForm from "@/components/VariableForm";
import ReTable from "@/components/ReTable";
import _ from "lodash";
import { TYPE_RESULT } from "../../config/constants";

export default {
  name: "Catalog",
  components: { VariableForm, ReTable },
  data() {
    return {
      isExecuting: false,
      currentProductTmp: {
        code: "",
        description: "",
        variableCatalogCode: ""
      },
      currentPRTmp: {
        code: "",
        ruleCode: "",
        productCode: "",
        description: ""
      },
      isShowFormDialog: false,
      isShowPRFormDialog: false,
      currentProductRow: null,
      selectedPRRows: [],
      selectedProductRows: [],
      execRes: {},
      productList: _.cloneDeep(this.$store.getters.productList)
    };
  },
  computed: {
    currentProductRowChildren() {
      if (
        this.currentProductRow &&
        this.currentProductRow.variableCatalog &&
        this.currentProductRow.variableCatalog.children
      ) {
        return this.currentProductRow.variableCatalog.children;
      }
      return null;
    },
    currentProductRuleList() {
      if (this.currentProductRow && this.currentProductRow.code) {
        return this.$store.getters.productRuleList.filter(
          item => item.productCode === this.currentProductRow.code
        );
      }
      return [];
    }
  },
  methods: {
    execHandle() {
      this.isExecuting = true;
      setTimeout(() => {
        this.currentProductRuleList.forEach(productRule => {
          let children = productRule.rule.variableCatalog.children;
          let productChildren = productRule.product.variableCatalog.children;
          children.forEach(child => {
            if (child.type === TYPE_RESULT) {
              let _expression = `"use strict"; return(${child.formula})`;

              productChildren.forEach(productChild => {
                _expression = _expression.replace(
                  new RegExp(`${productChild.code}`, "g"),
                  productChild.value || 0
                );
              });

              children.forEach(child2 => {
                _expression = _expression.replace(
                  new RegExp(`${child2.code}`, "g"),
                  child2.value || 0
                );
              });

              console.log(_expression);

              this.$set(
                this.execRes,
                productRule.code,
                Function(_expression)()
              );
            }
          });
        });

        this.isExecuting = false;
        this.$message({
          message: "Execute Success!",
          type: "success"
        });
      }, 1000);
    },
    handleFormSave(data) {
      this.currentProductRow.variableCatalog.children = data;
      this.$store.dispatch("updateProducts", this.productList);
    },
    submitAddProduct() {
      let index = this.productList.findIndex(
        item => item.code === this.currentProductTmp.code
      );
      this.currentProductTmp.variableCatalog = {
        ...this.$store.getters.variableCatalogs.find(
          item => item.code === this.currentProductTmp.variableCatalogCode
        )
      };
      if (index !== -1) {
        this.productList.splice(index, 1, _.cloneDeep(this.currentProductTmp));
      } else {
        this.productList.push(_.cloneDeep(this.currentProductTmp));
      }

      this.$store.dispatch("updateProducts", this.productList);
      this.isShowFormDialog = false;
    },
    handleAddProduct() {
      this.currentProductTmp = {
        code: "P_" + _.now(),
        description: "",
        variableCatalogCode: ""
      };
      this.isShowFormDialog = true;
    },
    handleProductSelectionChange(val) {
      this.selectedProductRows = val;
    },
    handleProductEdit({ row }) {
      this.currentProductTmp = _.cloneDeep(row);
      this.isShowFormDialog = true;
    },
    handleCurrentProductChange(val) {
      this.currentProductRow = val;
    },
    handleProductDelete() {
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          this.productList = this.productList.filter(item => {
            return !this.selectedProductRows.some(
              item2 => item2.code === item.code
            );
          });
          this.$store.dispatch("updateProducts", this.productList);
        })
        .catch(() => {});
    },
    handlePRSelectionChange(val) {
      this.selectedPRRows = val;
    },
    handlePREdit({ row }) {
      this.currentPRTmp = _.cloneDeep(row);
      this.isShowPRFormDialog = true;
    },
    handlePRDelete() {
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          this.$store.getters.productRuleList.forEach((item, index) => {
            if (this.selectedPRRows.some(item2 => item2.code === item.code)) {
              this.$store.dispatch("deleteProductRule", index);
            }
          });
        })
        .catch(() => {});
    },
    handleAddPR() {
      this.currentPRTmp = {
        code: "PR_" + _.now(),
        productCode: this.currentProductRow.code,
        ruleCode: "",
        description: "",
        result: ""
      };
      this.isShowPRFormDialog = true;
    },
    submitAddPR() {
      this.$store.dispatch("updateProductRule", this.currentPRTmp);
      this.isShowPRFormDialog = false;
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
