/*
 * @author: lujie
 * @Date: 2020-06-12 15:22:11
 * @LastEditTime: 2020-07-09 10:59:35
 * @FilePath: \datashow\src\utils\common.js
 * @descripttion: [desc]
 * @editor: [your git name]
 */

/**
 * 合并图表的基础配置和目标配置
 * 目标配置如果是数组，直接替换
 * @param {基础配置} obj
 * @param {目标配置} targetObj
 */
export const mergeObject = (obj, targetObj) => {
  const keys = new Set([...Object.keys(obj), ...Object.keys(targetObj)]);
  const allKeys = [...keys];
  allKeys.forEach(k => {
    if (obj[k]) {
      const type = Object.prototype.toString.call(obj[k]) === "[object Object]";
      if (Array.isArray(targetObj[k])) {
        obj[k] = targetObj[k];
      } else {
        if (type) {
          mergeObject(obj[k] || {}, targetObj[k] || {});
        } else {
          obj[k] = targetObj[k] ? targetObj[k] : obj[k];
        }
      }
    } else {
      obj[k] = targetObj[k];
      console.log(targetObj[k]);
    }
  });
};

/**
 *
 * @param {*} refList 需要根据窗口变化刷新的图表的ref集合
 * @param {*} global 当前组件的this
 */
export const resizeChart = (refList, global) => {
  window.resizeChart = () => {
    refList.forEach(r => {
      global.$refs[r].updateChart();
    });
  };
  return window.resizeChart;
};
