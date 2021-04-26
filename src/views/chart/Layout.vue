<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-29 11:35:08
 * @FilePath: \datashow\src\views\chart\Layout.vue
 * @descripttion: [图表模块的布局页面Layout]
 * @editor: [lujie]
-->
<template>
  <div class="app-wrap">
    <p class="left-pos">X X档案馆</p>
    <p class="right-pos">X X档案馆</p>
    <p class="app-title">{{ title }}</p>
    <ul class="app-menu fx fx-h-c">
      <li class="m-left"></li>
      <li
        @click="redirectPage(item)"
        :class="[
          'bg-menu-item',
          { 'app-menu-active': $route.name === item.pathname }
        ]"
        v-for="item in menuList"
        :key="item.path"
      >
        {{ item.name }}
      </li>
      <li class="m-right"></li>
    </ul>
    <div class="cont-wrap bg-cont-wrap"><router-view /></div>
    <vue-draggable-resizable className="app-button">
      <el-popover
        placement="left"
        width="400"
        trigger="click"
        popper-class="float-button-popover"
      >
        <el-image
          class="float-image fade-more"
          slot="reference"
          :src="url"
          fit="cover"
        ></el-image>
        <ul class="float-button-list">
          <li v-for="(item, i) in bthList" :key="i" @click="redirectPage(item)">
            <div class="pct-h100 fx fx-v fx-v-c fx-h-c">
              <i class="el-icon-pie-chart"></i>
              <p>{{ item.name }}</p>
            </div>
          </li>
        </ul>
      </el-popover>
    </vue-draggable-resizable>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 导航列表
      menuList: [
        { name: "X X档案", pathname: "chart-home" },
        { name: "数据统计", pathname: "chart-piedetail" },
        { name: "安全运营", pathname: "chart-operative" },
        { name: "运营分析", pathname: "chart-datamanage" },
        { name: "聚合X X", pathname: "chart-together" },
        { name: "虚拟档案馆", pathname: "chart-virtualplace" },
        { name: "鉴定处", pathname: "chart-identify" },
        { name: "整编处", pathname: "chart-reorganize" },
        { name: "利用处", pathname: "chart-use" },
        { name: "保管处", pathname: "chart-certainly" }
      ],
      bthList: [
        { name: "数据统计", pathname: "chart-piedetail" },
        { name: "安全运营", pathname: "chart-operative" },
        { name: "运营分析", pathname: "chart-datamanage" },
        { name: "聚合X X", pathname: "chart-together" },
        { name: "虚拟档案馆", pathname: "chart-virtualplace" },
        { name: "鉴定处", pathname: "chart-identify" },
        { name: "整编处", pathname: "chart-reorganize" },
        { name: "利用处", pathname: "chart-use" },
        { name: "保管处", pathname: "chart-certainly" }
      ],
      // 标题
      title: "",
      // 右下角的悬浮图片
      url:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592034136733&di=5c0a213e0890594eadc0c0634e8545b3&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20190404%2Fec39b0e9b57f4ff49dbbdd7725ecd850.jpeg"
    };
  },

  mounted() {
    const item = this.menuList.find(
      d => d.pathname === this.$store.state.pathname
    );
    if (item) {
      this.title = item.name;
    } else {
      const inner = this.bthList.find(
        d => d.pathname === this.$store.state.pathname
      );
      this.title = inner.name;
    }
  },
  methods: {
    /**
     * @Date: 2020-06-17 11:46:29
     * @description: [跳转页面的方法]
     * @param {type} 当前的item数据
     * @editor: [lujie]
     */
    redirectPage(item) {
      this.title = item.name;
      this.$router.push({ name: item.pathname });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-wrap {
  background: url("~@/assets/images/bg.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 0 30px 30px 30px;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
.app-title {
  font-size: 40px;
  color: $fff;
  top: 0;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.app-menu {
  margin: 14px 0 10px 0;
  height: 32px;
  width: 100%;
  > li {
    width: 138px;
    height: 32px;
    margin-left: -10px;
    font-size: 16px;
    color: $txt-23cefd;
    text-align: center;
    line-height: 32px;
    cursor: pointer;
  }
  &-active {
    background-image: url("~@/assets/images/menu-item-active.png") !important;
    color: $txt-020c18 !important;
  }
}
.m-left {
  background: url("~@/assets/images/m-left.png") no-repeat right center;
}
.m-right {
  background: url("~@/assets/images/m-right.png") no-repeat left center;
}

.cont-wrap {
  padding: 30px;
}
.app-button {
  position: fixed;
  right: 10vw;
  bottom: 10vh;
  width: auto !important;
  height: auto !important;
}
.float-button-list {
  width: 300px;
  > li {
    vertical-align: middle;
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    cursor: pointer;
    i {
      font-size: 30px;
      margin-bottom: 10px;
    }
    &:hover {
      background-color: rgb(19, 158, 168);
    }
  }
}
.float-image {
  width: 8vh;
  height: 8vh;
  border-radius: 8vh;
  box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.3);
}
.fade-more {
  animation: fadeMore 1.5s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  &:hover {
    animation: none;
  }
}
@keyframes fadeMore {
  0% {
    opacity: 0.7;
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.3);
  }
  50% {
    opacity: 1;
    box-shadow: 0 0 10px 8px rgba(255, 255, 255, 0.3);
  }

  100% {
    opacity: 0.7;
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, 0.3);
  }
}
.left-pos {
  position: absolute;
  left: 30px;
  top: 10px;
  font-size: 16px;
  color: #23cefd;
  width: 404px;
  height: 30px;
  padding-left: 20px;
  line-height: 30px;
  background: url("~@/assets/images/pos1.png") no-repeat left top;
  background-size: 100% 100%;
}
.right-pos {
  position: absolute;
  right: 30px;
  top: 10px;
  font-size: 16px;
  color: #23cefd;
  width: 404px;
  height: 30px;
  padding-right: 20px;
  text-align: right;
  line-height: 30px;
  background: url("~@/assets/images/pos2.png") no-repeat left top;
  background-size: 100% 100%;
}
</style>
