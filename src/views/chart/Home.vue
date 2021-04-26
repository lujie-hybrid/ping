<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-27 09:57:52
 * @FilePath: \datashow\src\views\chart\Home.vue
 * @descripttion: [X X档案页面]
 * @editor: [lujie]
-->
<template>
  <div class="home">
    <!-- <div class="home-title">X X市大数据展示平台</div> -->
    <div class="home-content">
      <div class="home-left">
        <home-desc></home-desc>
        <my-chart
          ref="rjyy"
          id="rjyy"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="rjyy"
        ></my-chart>
      </div>
      <div class="home-center">
        <!-- <div class="home-video"><div id="video"></div></div> -->
        <simp-chart
          class="home-video"
          ref="xr"
          id="xr"
          bgClass="bg-module-center"
          titleClass="bg-title bg-title-center"
          :options="xr"
        ></simp-chart>
        <!-- <detail-msg :list="dataList"></detail-msg> -->

        <!-- <div class="dm bg-module-center">
          <p class="bg-title bg-title-center">运维温控</p>
         
        </div> -->
        <my-chart
          ref="ywwk"
          id="ywwk"
          bgClass="bg-module-center"
          titleClass="bg-title bg-title-center"
          :options="ywwk"
        ></my-chart>
      </div>
      <div class="home-right">
        <pie-chart
          class="mbvh"
          ref="sj"
          id="sj"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
          :options="sj"
        ></pie-chart>
        <my-chart
          ref="yy"
          id="yy"
          :options="yy"
          bgClass="bg-module-common"
          titleClass="bg-title bg-title-left"
        ></my-chart>
      </div>
      <!-- <div id="aa" class="vd-hide"></div> -->
    </div>
  </div>
</template>

<script>
import HomeDesc from "@/components/business/home/Desc";
// import DetailMsg from "@/components/business/home/DetailMsg";
import { resizeChart } from "@/utils/common";
import xrData from "@/api/xr";
export default {
  name: "Home",
  data() {
    return {
      poster: "",
      message: {},
      time: 0,
      // 数据接入分布
      xr: {
        title: "数据接入分布",
        height: (100 * 354) / 1080 + "vh",
        option: {
          tooltip: {
            trigger: "item",
            triggerOn: "mousemove"
          },
          series: {
            type: "tree",
            data: [xrData],
            top: "21%",
            bottom: "17%",
            layout: "radial",
            initialTreeDepth: 3,
            label: { color: "#fff" },
            animationDurationUpdate: 750
          }
        }
      }
    };
  },
  computed: {
    // 数据交互情况
    rjyy() {
      return {
        title: "数据交互情况",
        height: (100 * 319) / 1080 + "vh",
        option: {
          tooltip: {},
          xAxis: {
            name: "活跃度",
            axisLabel: {
              rotate: 40
            },
            data: [
              "档案室管理",
              "档案移交",
              "档案接收",
              "馆藏档案",
              "档案查阅利用",
              "档案开放鉴定",
              "档案编研",
              "单点登录",
              "机构人员管理",
              "电子档案保存库",
              "信息共享平台",
              "业务指导平台"
            ]
          },
          grid: { bottom: "25%" },
          yAxis: { name: "数据利用情况" },
          series: [
            {
              name: "数据利用情况",
              type: "bar",
              data: this.message.rjyy
            }
          ]
        }
      };
    },
    // 数字化比例
    sj() {
      return {
        title: "数字化比例",
        height: (100 * 354) / 1080 + "vh",
        option: {
          tooltip: {},
          series: [
            {
              name: "数据展示",
              type: "pie",
              radius: "60%",
              data: this.message.sjzs
            }
          ]
        }
      };
    },
    // 运营数据流向
    yy() {
      return {
        title: "运营数据流向",
        height: (100 * 319) / 1080 + "vh",
        option: {
          tooltip: {},
          xAxis: {
            name: "运营",
            axisLabel: {
              rotate: 40
            },
            data: [
              "市民政局",
              "市农委",
              "人力和社保",
              "人民政府",
              "人保局",
              "安全委",
              "人口计委",
              "住房局",
              "工商局",
              "物价局"
            ]
          },
          yAxis: { name: "数据流向" },
          series: [
            {
              name: "数据流向",
              type: "line",
              data: this.message.yysjlx
            }
          ]
        }
      };
    },
    // 运维温控
    dataList() {
      const list = this.message.sjly || [];
      return list;
    },

    ywwk() {
      // const jy = this.message.dwsjjy || [0, 0, 0, 0];
      // const cx = this.message.dwsjcx || [0, 0, 0, 0];
      const list = this.message.sjly || [
        { wd: 0, sd: 0 },
        { wd: 0, sd: 0 },
        { wd: 0, sd: 0 },
        { wd: 0, sd: 0 }
      ];
      return {
        title: "运维温控",
        height: (100 * 319) / 1080 + "vh",
        option: {
          legend: {
            top: "1%",
            textStyle: { color: "#ffffff" }
          },
          dataset: {
            source: [
              ["wd", "sd", "name"],
              [list[0].wd, list[0].sd, list[0].name],
              [list[1].wd, list[1].wd, list[1].name],
              [list[2].wd, list[2].wd, list[2].name],
              [list[3].wd, list[3].wd, list[3].name]
            ]
          },
          tooltip: {},
          xAxis: {
            name: "数值"
          },
          grid: { right: "6%", bottom: "10%" },
          yAxis: { name: "类别", type: "category" },
          series: [
            {
              type: "bar",
              name: "温度",
              encode: {
                x: "wd",
                y: "name"
              }
            },
            {
              type: "bar",
              name: "湿度",
              encode: {
                x: "sd",
                y: "name"
              }
            }
          ]
        }
      };
    }
  },
  mounted() {
    const refs = ["rjyy", "sj", "yy", "ywwk", "xr"];
    this.initData(refs, true);
    window.addEventListener("resize", resizeChart(refs, this));
    // const vd = document.getElementById("video");
    // this.captureImage(vd, "/1.mp4", () => {
    //   this.player = new this.$player({
    //     id: "video",
    //     url: "/1.mp4",
    //     width: "100%",
    //     playsinline: true,
    //     height: "44vh",
    //     autoplay: true,
    //     lang: "zh-cn",
    //     poster: this.poster
    //   });
    // });
    this.timer = setInterval(() => {
      let resuleRefs = [];
      this.time += 5;
      this.time % 5 === 0 && resuleRefs.push("rjyy");
      this.time % 10 === 0 && resuleRefs.push("sj");
      this.time % 15 === 0 && resuleRefs.push("yy");
      this.time % 20 === 0 && resuleRefs.push("ywwk");
      this.initData(resuleRefs);
    }, 5000);
  },
  // 销毁
  beforeDestroy() {
    window.removeEventListener("resize", window.resizeChart);
    clearInterval(this.timer);
  },
  components: {
    HomeDesc
  },
  methods: {
    /**
     * @Date: 2020-06-17 11:39:05
     * @description: [desc]
     * @param {refs} 要更新的图表ref集合
     * @param {isInit} 是否是首次更新
     * @editor: [lujie]
     */
    initData(refs, isInit) {
      this.$server.chart.screen(res => {
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
    // redirectPage(url) {
    //   this.$router.push({ name: url });
    // },
    // captureImage(vd, url, fn) {
    //   console.log(vd.clientHeight);
    //   const newEle = document.getElementById("aa");
    //   var innerVideo = document.createElement("video"); // 创建一个画布
    //   innerVideo.setAttribute("src", url);
    //   innerVideo.setAttribute("controls", "controls");
    //   innerVideo.setAttribute("preload", "auto");

    //   newEle.appendChild(innerVideo);
    //   var canvas = document.createElement("canvas"); // 创建一个画布
    //   canvas.width = vd.clientWidth;
    //   canvas.height = parseInt(document.documentElement.clientHeight * 0.44);
    //   innerVideo.addEventListener("loadeddata", () => {
    //     setTimeout(() => {
    //       canvas
    //         .getContext("2d")
    //         .drawImage(innerVideo, 0, 0, canvas.width, canvas.height); // getContext:设置画布环境；drawImage:画画

    //       this.poster = canvas.toDataURL("image/png");
    //       newEle.remove();
    //       fn();
    //     }, 100);
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.home {
  &-content {
    margin: 0 auto;
    display: flex;
  }
  &-left {
    width: 26.3vw;
  }
  &-center {
    flex: 1;
    margin: 0 18px;
  }
  &-right {
    width: 26.3vw;
  }
  &-video {
    /* width: 100%; */
    margin-bottom: 25px;
  }
}
.mbvh {
  margin-bottom: 25px;
}
.dm {
  height: 405px;
}
</style>
