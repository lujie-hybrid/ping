import Vue from "vue";
import store from "./store";
import router from "./router";
//element-ui
import "element-ui/lib/theme-chalk/index.css";
import "./utils/elementui";
//全局组件
import GlobalComponent from "./components";
Vue.use(GlobalComponent);
//chart 主题
import chartTheme from "@/utils/theme";
import chart from "echarts";
chart.registerTheme("macarons", chartTheme);
Vue.prototype.$chart = chart;

// 自动滚动插件
import VueScroll from "vue-seamless-scroll";
Vue.use(VueScroll);

import VueDraggableResizable from "vue-draggable-resizable";
// import "vue-draggable-resizable/dist/VueDraggableResizable.css";
Vue.component("vue-draggable-resizable", VueDraggableResizable);

//视频插件
// import Player from "xgplayer";
// Vue.prototype.$player = Player;
// api接口ajax配置
import server from "@/api";
Vue.use(server);

import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
