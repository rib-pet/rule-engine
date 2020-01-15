<template>
  <div class="catalog-index">
    <h4 class="page-title">Varible Wizard</h4>

    <el-container>
      <el-row style="width: 100%;">
        <el-col :md="8">
          <el-table
            :data="variableCatalogs"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column prop="code" label="Code"> </el-table-column>
            <el-table-column prop="description" label="Description">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :md="16">
          <div class="right-panel" v-if="currentVariableRowChildren">
            <el-card
              class="variable-children-table"
              shadow="never"
              :body-style="{ padding: 0 }"
            >
              <div slot="header" class="variable-table-title">
                <span>{{ currentVariableRow.description }}</span>
                <el-button type="primary">Add</el-button>
              </div>
              <el-table
                ref="table"
                :data="currentVariableRowChildren"
                :height="300"
              >
                <el-table-column prop="code" label="Code"> </el-table-column>
                <el-table-column prop="description" label="Description">
                </el-table-column>
                <el-table-column prop="formula" label="Formula">
                </el-table-column>
                <el-table-column prop="type" label="Type"> </el-table-column>
                <el-table-column prop="readonly" label="Readonly">
                </el-table-column>
                <el-table-column prop="opt">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      size="small"
                      @click="handleVariableEdit(scope)"
                      >Edit</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="handleVariableDelete(scope)"
                      >Delete</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </el-card>

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
// import { mapGetters } from "vuex";
export default {
  name: "Catalog",
  components: { VariableFormReview },
  data() {
    return {
      isShowEditDialog: false,
      currentVariableRow: null,
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
    handleCurrentChange(val) {
      this.currentVariableRow = val;
    },
    handleVariableEdit({ row }) {
      console.log(row);
    },
    handleVariableDelete({ $index }) {
      this.$confirm("The item will be deleted forever?", "Warning", {
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
      })
        .then(() => {
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
.variable-children-table {
  margin-bottom: 15px;
}
.variable-table-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
