<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-29 11:39:34
 * @FilePath: \datashow\src\views\chart\Operative.vue
 * @descripttion: [安全运营的页面]
 * @editor: [lujie]
-->
<template>
  <div class="ope">
    <div class="ope-content">
      <div class="ope-left">
        <my-chart
          class="mbvh"
          ref="gc"
          id="gc"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="gc"
        ></my-chart>
        <my-chart
          ref="hyd"
          id="hyd"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="hyd"
        ></my-chart>
      </div>
      <div class="ope-center">
        <ul class="ope-msg bg-module-center mbvh">
          <li
            class="ope-msg-item fx-v-c fx fx-h-c fx-v"
            v-for="item in msgList"
            :key="item.id"
          >
            <p class="f16">{{ item.name }}</p>
            <p class="f34 mt6 fma fw">
              {{ item.mount }}
            </p>
            <p class="f16">环比 + {{ item.hb }}%</p>
          </li>
        </ul>
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
          ref="cc"
          class="mbvh"
          id="cc"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="cc"
        ></pie-chart>
        <pie-chart
          ref="kf"
          id="kf"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="kf"
        ></pie-chart>
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
    // 硬件运营
    gc() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "硬件运营",
        option: {
          tooltip: {},
          xAxis: {
            name: "分类",
            axisLabel: {
              rotate: 15
            },
            data: [
              "CPU占有率(%)",
              "内存使用率(%)",
              "负载占有率(%)",
              "事务响应时间(s)"
            ]
          },
          grid: { bottom: "15%", top: "15%" },
          yAxis: { name: "数值" },
          series: [
            {
              name: "硬件",
              type: "bar",
              data: this.message.yjyy
            }
          ]
        }
      };
    },
    // 软件活跃度
    hyd() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "软件活跃度",
        option: {
          tooltip: { trigger: "axis" },
          legend: {
            bottom: "1%",
            textStyle: { color: "#ffffff" }
          },
          grid: { bottom: "18%", top: "10%" },
          xAxis: {
            type: "category",
            data: ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"]
          },
          series: [
            {
              name: "电子档案",
              type: "line",
              data: this.message.rjhyd_dzda
            },
            {
              name: "档案管理",
              type: "line",
              data: this.message.rjhyd_dagl
            },
            {
              name: "政务内网",
              type: "line",
              data: this.message.rjhyd_zwnw
            },
            {
              name: "政务外网",
              type: "line",
              data: this.message.rjhyd_zwww
            },
            {
              name: "互联网查询",
              type: "line",
              data: this.message.rjhyd_hlwcx
            }
          ]
        }
      };
    },
    // 硬盘总存储700T
    cc() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "硬盘总存储700T",
        option: {
          tooltip: { formatter: `{b}：{c}%` },
          legend: { bottom: "0" },
          series: [
            {
              top: "-5%",
              roseType: "angle",
              name: "硬盘总存储",
              type: "pie",
              radius: "70%",
              data: this.message.ypzcc,
              label: {
                formatter: `{b}：{c}%`
              }
            }
          ]
        }
      };
    },
    // 库房使用率
    kf() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "库房使用率",
        option: {
          tooltip: { formatter: `{b}：{c}%` },
          legend: { bottom: "0" },
          series: [
            {
              top: "-5%",
              roseType: "angle",
              name: "库房使用率",
              type: "pie",
              radius: ["40%", "70%"],
              data: this.message.kfsyl,
              label: {
                formatter: `{b}：{c}%`
              }
            }
          ]
        }
      };
    },
    // 库房温湿度
    kfwsd() {
      const sd = this.message.kf_sd || [0, 0, 0, 0, 0, 0, 0];
      const wd = this.message.kf_wd || [0, 0, 0, 0, 0, 0, 0];
      return {
        height: (100 * 250) / 1080 + "vh",
        title: "库房温湿度",
        option: {
          legend: {
            bottom: "-1%",
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
          grid: { bottom: "22%", top: "18%" },
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
    },
    // CPU 硬盘数据展示
    msgList() {
      return [
        {
          id: 1,
          name: "CPU温度",
          mount: `${this.message.cpuwd || 0}℃`,
          up: true,
          color: "#67c23a",
          hb: this.message.cpuwdhb || 0
        },
        {
          id: 2,
          name: "硬盘温度",
          mount: `${this.message.ypwd || 0}℃`,
          up: false,
          color: "#e6a23c",
          hb: this.message.ypwdhb || 0
        }
      ];
    }
  },
  mounted() {
    const refs = ["gc", "hyd", "cc", "kf", "kfwsd"];

    this.initData(refs, true);
    window.addEventListener("resize", resizeChart(refs, this));
    this.timer = setInterval(() => {
      let resuleRefs = [];
      this.time += 5;
      this.time % 5 === 0 && resuleRefs.push("gc");
      this.time % 10 === 0 && resuleRefs.push("hyd");
      this.time % 15 === 0 && resuleRefs.push("cc");
      this.time % 20 === 0 && resuleRefs.push("kf");
      this.time % 25 === 0 && resuleRefs.push("kfwsd");
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
      this.$server.chart.safe(res => {
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
  &-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 178px;
    /* padding: 2vh 2vw; */
    &-item {
      color: #ffffff;
      margin-left: 40px;
      /* flex: 1; */
      border-radius: 6px;
      height: 110px;
      width: 178px;
    }
    &-item:nth-child(1) {
      margin-left: 0;
      background-color: #64c5ea;
      > p:nth-child(1) {
        color: #1477aa;
      }
    }
    &-item:nth-child(2) {
      background-color: #dbb0df;
      > p:nth-child(1) {
        color: #975c8a;
      }
    }
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
.lv1 {
  color: #67c23a;
}
.lv2 {
  color: #e6a23c;
}
.lv3 {
  color: #f56c6c;
}
</style>
