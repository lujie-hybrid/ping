/**
 * 大屏数据，保存title的方法,在路由里面注入
 * @param {要去的页面对象} to
 * @param {vuex的store} store
 */
export const saveTitle = (to, store) => {
  store.commit("changeState", {
    val: to.name,
    prop: "pathname"
  });
};
