<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-29 09:57:21
 * @FilePath: \datashow\src\views\chart\Together.vue
 * @descripttion: [聚合X X的页面]
 * @editor: [lujie]
-->

<template>
  <div class="tg">
    <div class="fx">
      <ul class="tg-tab fx fx-h-c">
        <li
          @click="tabChange(`${t + 1}`)"
          v-for="(tb, t) in tabList"
          :key="t"
          :class="[
            'tg-tab-item rel cur',
            { 'tg-tab-item-active': tabValue === `${t + 1}` }
          ]"
        >
          {{ tb.name }}
          <p v-show="tabValue === `${t + 1}`" class="tg-tab-arrow"></p>
        </li>
      </ul>
      <div class="fx-1 fx fx-h-end">
        <el-input
          class="tg-search"
          placeholder="请输入查询内容"
          v-model="searchMsg"
        >
          <el-button
            @click="resetSearch"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </div>
    </div>
    <div class="tg-center fx">
      <div class="tg-left tg-bg-center">
        <div class="left-wrap" v-if="tabValue === '1'">
          <vue-seamless-scroll class="pct-h100 ovh" :data="szData">
            <ul v-if="szData && szData.length > 0">
              <li class="fx fx-v-c" v-for="sz in szData" :key="sz.id">
                <div class="left-wrap-cont fx-1">
                  <p>时间：{{ sz.modifyDate }}</p>
                  <p>{{ sz.title }}</p>
                  <p>来源：{{ sz.source }}</p>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
        <div class="left-wrap" v-if="tabValue === '2'">
          <vue-seamless-scroll class="pct-h100 ovh" :data="xwData">
            <ul v-if="xwData && xwData.length > 0">
              <li class="fx fx-v-c" v-for="xw in xwData" :key="xw.id">
                <div class="left-wrap-cont fx-1">
                  <p>时间：{{ xw.modifyDate }}</p>
                  <p>{{ xw.title }}</p>
                  <p>来源：{{ xw.source }}</p>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
        <div class="left-wrap" v-if="tabValue === '3'">
          <vue-seamless-scroll class="pct-h100 ovh" :data="tsData">
            <ul v-if="tsData && tsData.length > 0">
              <li class="fx fx-v-c" v-for="ts in tsData" :key="ts.id">
                <div class="left-wrap-cont fx-1">
                  <p>时间：{{ ts.modifyDate }}</p>
                  <p>{{ ts.title }}</p>
                  <p>来源：{{ ts.source }}</p>
                </div>
              </li>
            </ul>
          </vue-seamless-scroll>
        </div>
      </div>
      <div class="tg-right tg-bg-center">
        <vue-seamless-scroll class="pct-h100 ovh" :data="listObj.data">
          <ul v-if="listObj.data && listObj.data.length > 0">
            <li class="fx fx-v-c" v-for="jh in listObj.data" :key="jh.id">
              <a
                class="pct-w100 bk line-hide fx"
                :href="jh.url"
                target="_blank"
              >
                <div class="tg-right-cont fx-1">
                  <p>{{ jh.title }}</p>
                  <p>{{ jh.desc }}</p>
                </div>
                <div class="rel cur ml30" v-if="jh.source === 2">
                  <p class="tg-shadow">
                    <i class="el-icon-video-play"></i>
                  </p>
                  <img class="tg-right-img" :src="jh.poster" />
                </div>
              </a>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchMsg: "X X",
      tabList: [
        { name: "时政", checked: true },
        { name: "新闻", checked: false },
        { name: "地方特色", checked: false }
      ],
      //右边列表
      listObj: {
        page: 0,
        path: "",
        data: []
      },
      tabValue: "1",
      //时政，新闻，地方特色的接口typeid
      types: [
        "28303ac5-6c0c-49ce-811d-bade85d639fe",
        "3771087e-f6e5-4088-845d-ed92b63389fe",
        "4eb351b4-dd00-4cd2-8326-502c4656ed62"
      ],
      // 时政列表
      szData: [],
      szPage: 0,
      xwPage: 0,
      tsPage: 0,
      // 新闻列表
      xwData: [],
      // 地方特色列表
      tsData: []
    };
  },
  mounted() {
    this.initData();
    this.getTableData(this.types[0], ++this.szPage);
    this.getTableData(this.types[0], ++this.szPage);
  },
  methods: {
    /**
     * @Date: 2020-06-17 11:58:32
     * @description: [获取左边时政，新闻，地方特色的数据]
     * @param {type} 当前获取的接口的typeid
     * @param {current} 获取的当前页
     * @editor: [lujie]
     */
    getTableData(type, current) {
      this.$server.chart.tbTypeData(
        res => {
          switch (type) {
            case this.types[0]:
              this.szData = this.szData.concat(res.list || []);
              break;
            case this.types[1]:
              this.xwData = this.xwData.concat(res.list || []);
              break;
            case this.types[2]:
              this.tsData = this.tsData.concat(res.list || []);
              break;
            default:
              break;
          }
        },
        {
          multi: true,
          data: {
            page: current,
            typeId: type,
            title: this.searchMsg ? this.searchMsg : "X X"
          }
        }
      );
    },
    /**
     * @Date: 2020-06-17 11:59:39
     * @description: [搜索]
     * @editor: [lujie]
     */
    resetSearch() {
      this.listObj.page = 0;
      this.listObj.path = "";
      this.szData = [];
      this.xwData = [];
      this.tsData = [];
      this.szPage = 0;
      this.xwPage = 0;
      this.tsPage = 0;
      this.initData();
      this.tabChange(this.tabValue);
    },
    /**
     * @Date: 2020-06-17 12:30:13
     * @description: [tab改变的时候的触发事件]
     * @param {tab} 当前的tab对象 参照elementui
     * @editor: [lujie]
     */
    tabChange(tab) {
      this.tabValue = tab;
      switch (tab) {
        case "1":
          this.getTableData(this.types[0], ++this.szPage);
          this.getTableData(this.types[0], ++this.szPage);
          break;
        case "2":
          this.getTableData(this.types[1], ++this.xwPage);
          this.getTableData(this.types[1], ++this.xwPage);
          break;
        case "3":
          this.getTableData(this.types[2], ++this.tsPage);
          this.getTableData(this.types[2], ++this.tsPage);
          break;
        default:
          break;
      }
    },
    /**
     * @Date: 2020-06-17 11:39:05
     * @description: [desc]
     * @param {refs} 要更新的图表ref集合
     * @param {isInit} 是否是首次更新
     * @editor: [lujie]
     */
    initData() {
      this.listObj.page++;
      this.loading = true;
      this.$server.chart.nt(
        res => {
          this.loading = false;
          this.listObj.data = res.list || [];
          this.listObj.path = res.path;
        },
        {
          data: {
            path: this.listObj.path,
            key: this.searchMsg ? this.searchMsg : "X X",
            page: this.listObj.page
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.tg {
  &-search ::v-deep {
    width: 560px;
    .el-input__inner {
      background-color: rgba(1, 211, 255, 0.2);
      color: #05d7ff;
      border: none;
      font-size: 14px;
      &::placeholder {
        color: #999999;
      }
    }
    .el-input-group__append,
    .el-input-group__prepend {
      background-color: rgba(1, 211, 255, 0.2);
      border: none;
      i {
        font-weight: bold;
        color: #05d7ff;
        font-size: 20px;
      }
    }
  }
  &-center {
    display: flex;
  }
  &-left {
    width: 48.17vw;
    height: 814px;
    padding: 32px;
  }
  &-right {
    flex: 1;
    margin-left: 28px;
    height: 814px;
    padding: 32px;
    li {
      background-color: rgba(1, 211, 255, 0.2);
      margin-top: 20px;
      padding: 20px;
    }
    &-img {
      width: 200px;
      height: 130px;
      object-fit: cover;
    }
    &-cont {
      color: #ffffff;
      font-weight: normal;
      > p:nth-child(1) {
        font-size: 24px;
      }
      > p:nth-child(2) {
        margin-top: 12px;
        font-size: 16px;
      }
    }
  }
  &-shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    > i {
      color: #ffffff;
      font-size: 48px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
    }
  }
  .mr1vw {
    margin-right: 1vw;
  }
  .left-wrap {
    height: 744px;
    li {
      background-color: rgba(1, 211, 255, 0.2);
      margin-top: 20px;
      padding: 20px;
    }
    &-cont {
      color: #ffffff;
      > p:nth-child(1) {
        font-size: 16px;
        color: #a5e7f0;
      }
      > p:nth-child(2) {
        margin-top: 20px;
        font-size: 24px;
        color: #ffffff;
      }
      > p:nth-child(3) {
        margin-top: 20px;
        font-size: 14px;
        color: #a5e7f0;
      }
    }
  }
  &-tab {
    width: 925px;
    &-item {
      width: 152px;
      height: 42px;
      margin-bottom: 14px;
      text-align: center;
      line-height: 42px;
      border-radius: 21px;
      font-size: 18px;
      border: solid 1px #01d4ff;
      color: #ffffff;
      margin-left: 60px;
      background-color: rgba(1, 211, 255, 0.2);
      &-active {
        background-color: #05d7ff;
        color: #020b17;
        border: none;
      }
      &:nth-child(1) {
        margin-left: 0;
      }
    }
    &-arrow {
      position: absolute;
      left: 50%;
      top: 42px;
      transform: translate(-50%, 0);
      width: 0;
      height: 0;
      border-width: 10px;
      border-style: solid;
      border-color: #05d7ff transparent transparent transparent;
    }
  }
}
</style>
