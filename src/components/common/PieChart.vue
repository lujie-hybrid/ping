<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-09 10:58:55
 * @FilePath: \datashow\src\components\common\PieChart.vue
 * @descripttion: [图标饼图的基本配置封装]
 * @editor: [lujie]
-->
<template>
  <div :class="bgClass">
    <p :class="titleClass">{{ this.options.title }}</p>
    <div
      :style="{
        width: this.options.width || '100%',
        height: this.options.height
      }"
      :id="id"
    ></div>
  </div>
</template>

<script>
import { mergeObject } from "@/utils/common";
export default {
  props: {
    id: String,
    options: Object,
    bgImage: String,
    bgClass: String,
    titleClass: String
  },
  data() {
    return {
      chart: null,

      //基础配置
      config: {
        legend: {
          bottom: "5%",
          textStyle: { color: "#ffffff" }
        }
      }
    };
  },
  methods: {
    /**
     * @Date: 2020-06-17 11:20:58
     * @description: [初始化图表]
     * @editor: [lujie]
     */
    initData() {
      let cont = this.options.option;
      mergeObject(this.config, cont);
      this.chart = this.$chart.init(
        document.getElementById(this.id),
        "macarons"
      );
      this.chart.setOption(this.config);
      this.chart.on("click", params => {
        this.$emit("operate", params);
      });
    },
    /**
     * @Date: 2020-06-17 11:20:58
     * @description: [窗口尺寸变化，更新图表]
     * @editor: [lujie]
     */
    updateChart() {
      setTimeout(() => {
        this.chart && this.chart.resize();
      }, 150);
    },
    /**
     * @Date: 2020-06-17 11:20:58
     * @description: [数据变化，更新图表]
     * @editor: [lujie]
     */
    updateChartData() {
      let cont = this.options.option;
      mergeObject(this.config, cont);
      this.chart.setOption(this.config);
    }
  }
};
</script>

<style lang="scss" scoped></style>
