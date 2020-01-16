<template>
  <div class="catalog-index">
    <h4 class="page-title">Varible Wizard</h4>

    <el-container>
      <el-row style="width: 100%;">
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
                <el-button type="primary">Add</el-button>
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
                  <el-button type="primary">Add</el-button>
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

            <variable-form-review
              :variable-child="currentVariableRowChildren"
            ></variable-form-review>
          </div>
          <div v-else class="right-panel">
            Please select.
          </div>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import VariableFormReview from "@/components/VariableFormReview";
import ReTable from "@/components/ReTable";
// import { mapGetters } from "vuex";
export default {
  name: "Catalog",
  components: { VariableFormReview, ReTable },
  data() {
    return {
      isShowEditDialog: false,
      currentVariableRow: null,
      selectedVariableRows: [],
      selectedVariableCatalogRows: [],
      variableCatalogs: JSON.parse(
        JSON.stringify(this.$store.getters.variableCatalogs)
      )
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
    handleCatalogSelectionChange(val) {
      this.selectedVariableCatalogRows = val;
    },
    handleVariableCatalogEdit() {},
    handleSelectionChange(val) {
      this.selectedVariableRows = val;
    },
    handleCurrentChange(val) {
      this.currentVariableRow = val;
    },
    handleVariableEdit({ row }) {
      console.log(row);
    },
    handleVariableCatalogDelete() {
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {})
        .catch(() => {});
    },
    handleVariableDelete(scope) {
      let { $index } = scope;
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
          // console.log($index);

          this.currentVariableRow.children.splice($index, 1);
          this.$store.dispatch("updateVariable", this.currentVariableRow);
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.right-panel {
  margin-left: 15px;
  padding: 15px;
  background-color: #faf9f3;
  min-height: calc(~"100vh - 262px");
  border-left: 1px solid #f1f1f1;
}
</style>
