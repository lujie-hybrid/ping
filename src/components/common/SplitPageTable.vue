<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-27 14:15:34
 * @FilePath: \datashow\src\components\common\SplitPageTable.vue
 * @descripttion: [全局的简单分页+Table的封装组件]
 * @editor: [lujie]
-->
<template>
  <div class="fx-1">
    <el-table
      fit
      :border="!config.noborder"
      :height="config.height ? config.height : 'auto'"
      :data="config.data"
    >
      <template v-for="(item, i) in config.columns">
        <el-table-column
          v-if="item.isIndex"
          :key="i"
          type="index"
          :label="item.label"
          :width="item.minWidth"
        >
        </el-table-column>
        <el-table-column
          v-if="!item.isIndex"
          :key="i"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
        >
        </el-table-column>
      </template>
    </el-table>
    <div class="fx table-page fx-h-end" v-if="config.page">
      <el-pagination
        background
        :small="page.small"
        :layout="page.layout"
        :total="page.total"
        :page-sizes="page.size"
        @current-change="handleCurrentChange"
        :current-page="page.current"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * @Date: 2020-06-17 11:17:19
   * @description: [当前组件的配置]
   * @param {height} 表格的高度，用于固定高度的表格滚动
   * @param {columns} 表格列的数据，参照elementui
   * @editor: [lujie]
   */
  props: {
    config: Object
  },
  computed: {
    // 分页组件的配置 参照elementui
    page() {
      const defaultPageConfig = {
        total: 0,
        size: [10, 20, 50],
        current: 1,
        layout: "prev, pager, next",
        small: false
      };
      return {
        ...defaultPageConfig,
        ...this.config.page
      };
    }
  },
  methods: {
    /**
     * @Date: 2020-06-17 11:18:32
     * @description: [分页当前页的变化]
     * @param {val} 当前页
     * @editor: [lujie]
     */
    handleCurrentChange(val, cc) {
      console.log(cc);
      this.$emit("update:page", val);
      this.$emit("refresh");
    }
  }
};
</script>

<style lang="scss" scoped>
.table-page {
  margin-top: 10px;
}
</style>
