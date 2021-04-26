<!--
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-09 10:39:07
 * @FilePath: \datashow\src\components\business\home\DetailMsg.vue
 * @descripttion: [X X档案的运维温控]
 * @editor: [lujie]
-->
<template>
  <div class="dm bg-module-center">
    <p class="bg-title bg-title-center">运维温控</p>
    <ul class="dm-wrap">
      <li v-for="item in list" :key="item.id">
        <p class="dm-title">{{ item.name }}</p>
        <div class="dm-cont">
          <div class="dm-item" v-if="item.wd">
            <p class="dm-pct10">温度：</p>
            <el-progress
              class="dm-progress ml5"
              :percentage="item.wd"
              :color="customColors[0]"
              :show-text="false"
            ></el-progress>
            <p class="ml10 dm-pct10">{{ item.wd }}℃</p>
          </div>
          <div class="dm-item" v-if="item.sd">
            <p class="dm-pct10">湿度：</p>
            <el-progress
              class="dm-progress ml5"
              :percentage="item.sd"
              :color="customColors[1]"
              :show-text="false"
            ></el-progress>
            <p class="ml10 dm-pct10">{{ item.sd }}</p>
          </div>
          <div class="dm-item" v-if="item.fz">
            <p class="dm-pct10">负载：</p>
            <el-progress
              class="dm-progress ml5"
              :percentage="item.fz"
              :color="customColors[2]"
              :show-text="false"
            ></el-progress>
            <p class="ml10 dm-pct10">{{ item.fz }}%</p>
          </div>
          <div class="dm-item" v-if="item.cpu">
            <p class="dm-pct10">CPU：</p>
            <el-progress
              class="dm-progress ml5"
              :percentage="item.cpu"
              :color="customColors[3]"
              :show-text="false"
            ></el-progress>
            <p class="ml10 dm-pct10">{{ item.cpu }}%</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      customColors: ["#f56c6c", "#e6a23c", "#5cb87a", "#1989fa"]
    };
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.dm {
  height: 405px;
  &-wrap {
    height: 100%;
  }
  &-top {
    position: absolute;
    top: 1.2vh;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    width: 100%;
    left: 0;
    font-size: 15px;
  }
  li {
    background: rgba(1, 202, 217, 0.2);
    height: calc(22% - 10px);
    display: flex;
    color: #ffffff;
    margin-top: 10px;
  }
  &-title {
    font-size: 16px;
    font-weight: 600;
    width: 16%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-cont {
    flex: 1;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
  }
  &-item {
    width: 80%;
    display: flex;
    align-items: center;
  }
  &-progress {
    flex: 1;
  }
  &-pct10 {
    width: 10%;
  }
}
.ml10 {
  margin-left: 10px;
}
.ml5 {
  margin-left: 5px;
}
</style>
