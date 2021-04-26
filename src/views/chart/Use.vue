<!--
 * @author: lujie
 * @Date: 2020-06-18 17:04:35
 * @LastEditTime: 2020-07-29 11:42:37
 * @FilePath: \datashow\src\views\chart\Use.vue
 * @descripttion: [利用处页面]
 * @editor: [lujie]
-->
<template>
  <div class="pie">
    <div class="pie-content">
      <div class="pie-left">
        <my-chart
          ref="cx"
          id="cx"
          class="mbvh"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="cx"
        ></my-chart>
        <pie-chart
          ref="fzlx"
          id="fzlx"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="fzlx"
        ></pie-chart>
      </div>
      <div class="pie-center">
        <ul class="pie-msg bg-module-center mbvh">
          <li
            class="pie-msg-item fx-v-c fx fx-h-c fx-v"
            v-for="item in msgList"
            :key="item.id"
          >
            <p class="f16">{{ item.name }}</p>
            <p class="f30 fma fw">
              {{ item.mount }}
            </p>
            <p class="f16">环比 + {{ item.hb }}%</p>
          </li>
        </ul>
        <my-chart
          class="mbvh"
          ref="dtjd"
          id="dtjd"
          bgClass="bg-module-center"
          titleClass="bg-title bg-title-center"
          :options="dtjd"
        ></my-chart>
        <div class="pie-scroll bg-module-center">
          <p class="bg-title bg-title-center">审批日志</p>
          <vue-seamless-scroll class="pie-scroll-inner" :data="listData">
            <ul>
              <li
                class="pie-scroll-item fx fx-v-c"
                v-for="obj in listData"
                :key="obj.id"
              >
                <div class="fx-1 ope-scroll-left f12 fx fx-v-c">
                  <i class="el-icon-document"></i> {{ obj.cont }}
                </div>
                <p class="f12">{{ obj.date }}</p>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="pie-right">
        <pie-chart
          class="mbvh"
          ref="cj"
          id="cj"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="cj"
        ></pie-chart>
        <pie-chart
          ref="user"
          id="user"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="user"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { resizeChart } from "@/utils/common";
export default {
  name: "pie",
  data() {
    return {
      message: {},
      time: 0,
      // 审批日志
      listData: [
        {
          id: 1,
          cont: "接收到X X市民政局移送婚姻登记档案16卷"
        },
        {
          id: 2,
          cont: "接收到X X市人力资源保障局移送工伤认定档案P卷"
        },
        {
          id: 3,
          cont: "接收到X X市第一人民医院移送出生档案34卷"
        },
        {
          id: 4,
          cont: "接收到X X市房产交易中心移送房产登记档案376卷"
        },
        {
          id: 5,
          cont: "接收到张三捐赠xx先水源分布图"
        },
        {
          id: 6,
          cont: "审批日志需要相关领导进行签字和发送"
        }
      ]
    };
  },
  computed: {
    // 利用大厅接待人数
    dtjd() {
      return {
        height: (100 * 250) / 1080 + "vh",
        title: "利用大厅接待人数",
        option: {
          xAxis: {
            name: "日期",
            data: [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20
            ]
          },
          grid: { bottom: "10%", top: "18%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "利用大厅接待人数",
              type: "line",
              data: this.message.lydtjdrs
            }
          ]
        }
      };
    },
    // 利用复制类型
    fzlx() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "利用复制类型",
        option: {
          legend: { bottom: "0" },
          series: [
            {
              top: "-6%",
              name: "利用复制类型",
              type: "pie",
              radius: ["30%", "65%"],
              data: this.message.lyfzlx
            }
          ]
        }
      };
    },
    // 开放档案查阅情况
    cj() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "开放档案查阅情况",
        option: {
          legend: { bottom: "0" },
          series: [
            {
              top: "-6%",
              name: "开放档案查阅情况",
              type: "pie",
              radius: ["30%", "65%"],
              data: this.message.kfdacyqk
            }
          ]
        }
      };
    },
    // 政务数据展示
    msgList() {
      return [
        {
          id: 1,
          name: "馆藏数量",
          mount: this.message.gcs || 0,
          up: true,
          color: "#67c23a",
          hb: this.message.gcs_hb || 0
        },
        {
          id: 2,
          name: "实体调卷总数",
          mount: this.message.stdjzs || 0,
          up: false,
          color: "#e6a23c",
          hb: this.message.stdjzs_hb || 0
        },
        {
          id: 3,
          name: "数字化调卷总数",
          mount: this.message.szhdjzs || 0,
          up: false,
          color: "#409eff",
          hb: this.message.szhdjzs_hb || 0
        },
        {
          id: 4,
          name: "政务已办理",
          mount: this.message.zwybl || 0,
          up: true,
          color: "#67c23a",
          hb: this.message.zwybl_hb || 0
        },
        {
          id: 5,
          name: "处长审批数",
          mount: this.message.czsps || 0,
          up: false,
          color: "#e6a23c",
          hb: this.message.czsps_hb || 0
        },
        {
          id: 6,
          name: "局长审批数",
          mount: this.message.jzsps || 0,
          up: false,
          color: "#409eff",
          hb: this.message.jzsps_hb || 0
        }
      ];
    },
    // 数据查询
    cx() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "数据查询",
        option: {
          tooltip: { trigger: "axis" },
          xAxis: {
            name: "类型",
            data: ["个人取证", "工作查考", "学术研究", "编史修志", "其他"]
          },
          grid: { bottom: "10%", top: "15%" },
          yAxis: { name: "数量" },
          series: [
            {
              name: "档案处",
              type: "bar",
              data: this.message.sjcx
            }
          ]
        }
      };
    },
    // 非开放档案预申请情况
    user() {
      return {
        height: (100 * 334) / 1080 + "vh",
        title: "非开放档案预申请情况",
        option: {
          legend: { bottom: "0" },
          series: [
            {
              top: "-6%",
              name: "非开放档案预申请情况",
              type: "pie",
              radius: ["30%", "65%"],
              data: this.message.fkfdaysqqk
            }
          ]
        }
      };
    }
  },
  mounted() {
    const refs = ["dtjd", "fzlx", "cj", "cx", "user"];
    this.initData(refs, true);
    window.addEventListener("resize", resizeChart(refs, this));
    this.timer = setInterval(() => {
      let resuleRefs = [];
      this.time += 5;
      this.time % 5 === 0 && resuleRefs.push("dtjd");
      this.time % 10 === 0 && resuleRefs.push("fzlx");
      this.time % 15 === 0 && resuleRefs.push("cj");
      this.time % 20 === 0 && resuleRefs.push("cx");
      this.time % 25 === 0 && resuleRefs.push("user");
      this.initData(resuleRefs);
    }, 5000);
  },
  // 销毁定时器和事件
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
      this.$server.chart.use(res => {
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
.pie {
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
    flex-wrap: wrap;
    height: 248px;
    /* padding: 2vh 2vw; */
    &-item {
      color: #ffffff;
      margin-left: 25px;
      /* flex: 1; */
      border-radius: 6px;
      height: 90px;
      width: 180px;
    }
    &-item:nth-child(1) {
      margin-left: 0;
      background-color: #64c5ea;
      > p:nth-child(1) {
        color: #1477aa;
      }
    }
    &-item:nth-child(2) {
      background-color: #eedfc2;
      > p:nth-child(1) {
        color: #a77b36;
      }
    }
    &-item:nth-child(3) {
      background-color: #9ee5ee;
      > p:nth-child(1) {
        color: #36a78d;
      }
    }
    &-item:nth-child(4) {
      margin-left: 0;
      background-color: #eedfc2;
      > p:nth-child(1) {
        color: #a77b36;
      }
    }
    &-item:nth-child(5) {
      background-color: #64c5ea;
      > p:nth-child(1) {
        color: #1477aa;
      }
    }
    &-item:nth-child(6) {
      background-color: #dbb0df;
      > p:nth-child(1) {
        color: #975c8a;
      }
    }
  }

  &-scroll {
    height: 226px;
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
</style>
