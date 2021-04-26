<!--
 * @author: lujie
 * @Date: 2020-06-19 09:00:47
 * @LastEditTime: 2020-07-29 11:40:06
 * @FilePath: \datashow\src\views\chart\Certainly.vue
 * @descripttion: [保管处页面]
 * @editor: [lujie]
-->
<template>
  <div class="ope">
    <div class="ope-content">
      <div class="ope-left">
        <simp-chart
          class="mbvh"
          ref="gcstsj"
          id="gcstsj"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="gcstsj"
        ></simp-chart>
        <my-chart
          ref="ck"
          id="ck"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="ck"
        ></my-chart>
      </div>
      <div class="ope-center">
        <my-chart
          ref="kfwsd"
          class="mbvh"
          id="kfwsd"
          bgClass="bg-module-center"
          titleClass="bg-title bg-title-center"
          :options="kfwsd"
        ></my-chart>
        <div class="ope-scroll bg-module-center">
          <p class="bg-title bg-title-center">报警事件统计</p>
          <vue-seamless-scroll class="ope-scroll-inner" :data="listData">
            <ul>
              <li
                class="ope-scroll-item fx fx-v-c"
                v-for="obj in listData"
                :key="obj.id"
              >
                <div class="fx-1 ope-scroll-left f12 fx fx-v-c">
                  <i class="el-icon-pie-chart"></i>{{ obj.cont }}
                </div>
                <p class="f12">{{ obj.date }}</p>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="ope-right">
        <pie-chart
          ref="nbjy"
          class="mbvh"
          id="nbjy"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="nbjy"
        ></pie-chart>
        <div class="bg-table-wrap bg-module-center">
          <p class="bg-title bg-title-center">报警事件统计</p>
          <split-page-table
            class="chart-tb scrollHide"
            :config="tbConfig"
          ></split-page-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resizeChart } from "@/utils/common";
export default {
  name: "ope",
  data() {
    return {
      message: {},
      // 报警事件列表
      listData: [
        {
          id: 1,
          level: 1,
          cont: "硬盘存储已使用90%",
          date: "2019-08-01"
        },
        {
          id: 2,
          level: 2,
          cont: "CPU温度达到60℃",
          date: "2019-09-01"
        },
        {
          id: 3,
          level: 3,
          cont: "档案库房使用率已超过90%",
          date: "2019-11-01"
        },
        {
          id: 4,
          level: 1,
          cont: "CPU使用率已达80%",
          date: "2020-02-01"
        },
        {
          id: 5,
          level: 3,
          cont: "档案库房已满",
          date: "2020-03-01"
        },
        {
          id: 6,
          level: 3,
          cont: "档案库房已满",
          date: "2020-03-01"
        }
      ],
      time: 0
    };
  },
  computed: {
    // 馆藏实体数据
    gcstsj() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "馆藏实体数据",
        option: {
          tooltip: {},
          radar: {
            radius: "70%",
            center: ["50%", "50%"],
            shape: "circle",
            name: {
              textStyle: {
                color: "#fff",
                backgroundColor: "#999",
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: "文书", max: 100 },
              { name: "科技", max: 100 },
              { name: "专门", max: 100 },
              { name: "声像", max: 100 },
              { name: "实物", max: 100 },
              { name: "光盘", max: 100 }
            ]
          },
          series: [
            {
              name: "馆藏实体数据",
              type: "radar",
              data: [
                {
                  name: "馆藏实体",
                  value: this.message.gcstsj
                }
              ]
            }
          ]
        }
      };
    },
    // 出库
    ck() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "出库",
        option: {
          xAxis: {
            type: "category",
            name: "类型",
            data: ["待出度", "已出度", "已归卷", "待上架", "已上架"]
          },
          grid: { bottom: "10%", top: "15%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "出库",
              type: "bar",
              data: this.message.ck
            }
          ]
        }
      };
    },
    // 内部借阅情况
    nbjy() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "内部借阅情况",
        option: {
          legend: { bottom: "0" },
          series: [
            {
              top: "-5%",
              roseType: "angle",
              name: "内部借阅情况",
              type: "pie",
              radius: "70%",
              data: this.message.nbjyqk
            }
          ]
        }
      };
    },
    tbConfig() {
      return {
        noborder: true,
        height: (100 * 328) / 1080 + "vh",
        columns: [
          { label: "种类", minWidth: 150, prop: "type" },
          { label: "名字", minWidth: 150, prop: "name" },
          { label: "时间", minWidth: 150, prop: "time" }
        ],
        data: [
          { type: "日常检查", name: "张三", time: "2019-03-03" },
          { type: "除虫", name: "李四", time: "2019-04-03" },
          { type: "消毒", name: "王五", time: "2019-05-03" },
          { type: "打扫", name: "小明", time: "2019-06-03" },
          { type: "值班", name: "小苗", time: "2019-07-03" },
          { type: "除草", name: "小缪", time: "2019-08-03" },
          { type: "周末检查", name: "小王", time: "2019-09-03" }
        ]
      };
    },
    // 库房温湿度
    kfwsd() {
      const sd = this.message.kfsd || [0, 0, 0, 0, 0, 0, 0];
      const wd = this.message.kfwd || [0, 0, 0, 0, 0, 0, 0];
      return {
        height: (100 * 456) / 1080 + "vh",
        title: "库房温湿度",
        option: {
          legend: {
            bottom: "0",
            textStyle: { color: "#ffffff" }
          },
          tooltip: {
            trigger: "axis"
          },
          xAxis: {
            name: "时间",
            data: [
              "00:00",
              "04:00",
              "08:00",
              "12:00",
              "16:00",
              "20:00",
              "24:00"
            ],
            nameGap: 30,
            splitLine: { show: false },
            axisTick: {
              lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
            }
          },
          grid: { bottom: "15%", top: "15%" },
          yAxis: [
            {
              name: "温度(℃)",
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                color: "#ffffff"
              },
              nameTextStyle: {
                color: "#ffffff"
              },
              nameGap: 20,
              splitLine: { show: false },
              splitArea: { show: false },
              axisTick: {
                lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
              }
            },
            {
              name: "湿度(RH)",
              min: 0,
              max: 100,
              interval: 10,
              axisLabel: {
                color: "#ffffff"
              },
              nameTextStyle: {
                color: "#ffffff"
              },
              nameGap: 20,
              axisTick: {
                lineStyle: { color: "rgba(255, 255, 255, 0.6)" }
              },
              splitLine: { show: false }
            }
          ],
          series: [
            {
              name: "温度(℃)",
              type: "line",
              data: wd,
              markPoint: {
                label: { fontSize: 18 },
                data: [
                  {
                    name: "温度预警",
                    coord: ["08:00", wd[2]],
                    value: "⚠"
                  }
                ]
              }
            },
            {
              name: "湿度(RH)",
              type: "line",
              yAxisIndex: 1,
              data: sd,
              markPoint: {
                label: { fontSize: 18 },
                data: [
                  {
                    name: "湿度预警",
                    coord: ["16:00", sd[4]],
                    value: "⚠"
                  },
                  {
                    name: "湿度预警",
                    coord: ["20:00", sd[5]],
                    value: "⚠"
                  },
                  {
                    name: "湿度预警",
                    coord: ["24:00", sd[6]],
                    value: "⚠"
                  }
                ]
              }
            }
          ]
        }
      };
    }
  },
  mounted() {
    const refs = ["gcstsj", "ck", "nbjy", "kfwsd"];

    this.initData(refs, true);
    window.addEventListener("resize", resizeChart(refs, this));
    this.timer = setInterval(() => {
      let resuleRefs = [];
      this.time += 5;
      this.time % 5 === 0 && resuleRefs.push("gcstsj");
      this.time % 10 === 0 && resuleRefs.push("ck");
      this.time % 15 === 0 && resuleRefs.push("nbjy");
      this.time % 20 === 0 && resuleRefs.push("kfwsd");
      this.initData(resuleRefs);
    }, 5000);
  },
  // 销毁
  beforeDestroy() {
    window.removeEventListener("resize", window.resizeChart);
    clearInterval(this.timer);
  },
  components: {},
  methods: {
    /**
     * @Date: 2020-06-17 11:39:05
     * @description: [desc]
     * @param {refs} 要更新的图表ref集合
     * @param {isInit} 是否是首次更新
     * @editor: [lujie]
     */
    initData(refs, isInit) {
      this.$server.chart.certainly(res => {
        this.message = res;
        this.$nextTick(() => {
          refs.forEach(r => {
            if (isInit) {
              this.$refs[r].initData();
            } else {
              this.$refs[r].updateChartData();
            }
          });
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.ope {
  &-content {
    margin: 0 auto;
    display: flex;
  }
  &-left {
    width: 27.86vw;
  }
  &-center {
    flex: 1;
    margin: 0 18px;
  }
  &-right {
    width: 27.86vw;
  }
  &-scroll {
    height: 296px;
    display: flex;
    flex-direction: column;
    /* padding: 5vh 3vh 1.5vh 3vh; */
    width: 100%;
    &-inner {
      overflow: hidden;
      height: 100%;
      flex: 1;
    }
    &-item {
      height: 38px;
      padding: 0 12px;
      color: #a5e7f0;
    }
    &-item:nth-child(2n + 1) {
      background-color: #053c61;
    }
    &-left i {
      margin-right: 5px;
      font-size: 18px;
    }
  }
}
.mbvh {
  margin-bottom: 30px;
}
.bg-table-wrap {
  height: 420px;
  > p {
    height: 3vh;
    line-height: 3vh;
    text-align: center;
    font-size: 15px;
    color: #ffffff;
    font-weight: bold;
  }
}
</style>
