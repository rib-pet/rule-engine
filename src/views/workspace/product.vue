<template>
  <div class="catalog-index">
    <h4 class="page-title">Product</h4>

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
              title="Variable Form"
              :variable-child="currentProductRowChildren"
              @save="handleFormSave"
            ></variable-form>
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
      currentProductTmp: {
        code: "",
        description: "",
        variableCatalogCode: ""
      },
      isShowFormDialog: false,
      currentProductRow: null,
      selectedVariableRows: [],
      selectedProductRows: [],
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
    }
  },
  methods: {
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
        code: _.uniqueId("P_"),
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
    handleSelectionChange(val) {
      this.selectedVariableRows = val;
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
