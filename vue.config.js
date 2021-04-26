module.exports = {
  configureWebpack: config => {
    config.optimization.splitChunks.cacheGroups.echartVendor = {
      name: "echart",
      test: /[\\/]node_modules[\\/](echarts)[\\/]/,
      priority: -5,
      chunks: "all",
      reuseExistingChunk: true
    };
  },
  devServer: {
    proxy: "http://127.0.0.1:22010"
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        prependData: `@import "@/assets/scss/variable.scss"`
      },
      scss: {
        prependData: `@import "@/assets/scss/variable.scss";`
      }
    }
  }
};
