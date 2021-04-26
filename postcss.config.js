/*
 * @author: lujie
 * @Date: 2020-07-09 10:36:09
 * @LastEditTime: 2020-07-09 10:36:47
 * @FilePath: \datashow\postcss.config.js
 * @descripttion: [desc]
 * @editor: [your git name]
 */

module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      unitToConvert: "px",
      viewportWidth: 1080,
      unitPrecision: 5,
      propList: ["*"],
      viewportUnit: "vh",
      fontViewportUnit: "vh",
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false
    }
  }
};
