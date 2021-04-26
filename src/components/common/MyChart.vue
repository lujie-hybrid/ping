<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-29 12:31:18
 * @FilePath: \datashow\src\components\common\MyChart.vue
 * @descripttion: [折线图，柱形图等grid的图的基本配置封装]
 * @editor: [lujie]
-->
<template>
  <div
    :class="[bgClass, 'fx fx-v']"
    :style="{ height: `calc(${options.height} + ${titleHeight})` }"
  >
    <p :class="titleClass">{{ this.options.title }}</p>
    <div class="fx-1 fx fx-h-c fx-v-c">
      <div
        :id="id"
        :style="{
          width: this.options.width || '100%',
          height: this.options.height
        }"
      ></div>
    </div>
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
      titleHeight: (100 * 86) / 1080 + "vh",

      //基础配置
      config: {
        xAxis: {
          axisLabel: {
            color: "#ffffff"
          },
          axisTick: {
            lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
          },
          nameTextStyle: {
            color: "#ffffff"
          },
          nameGap: 10,
          nameRotate: 90
        },
        yAxis: {
          axisLabel: {
            color: "#ffffff"
          },
          axisTick: {
            lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
          },
          nameTextStyle: {
            color: "#ffffff",
            padding: [0, 0, 0, 25]
          },
          nameGap: 20
        },
        grid: {
          top: "16%",
          right: "10%"
        }
      }
    };
  },
  methods: {
    /**
     * @Date: 2020-06-17 11:25:21
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
    },
    /**
     * @Date: 2020-06-17 11:25:21
     * @description: [窗口尺寸变化，更新图表]
     * @editor: [lujie]
     */
    updateChart() {
      setTimeout(() => {
        this.chart && this.chart.resize();
      }, 200);
    },
    /**
     * @Date: 2020-06-17 11:25:21
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
