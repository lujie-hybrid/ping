// ajax的封装

import server from "./ajax";
import qs from "qs";

class MYServer {
  constructor(server) {
    this.server = server;
  }
  /**
   * 注册接口
   * @param {模块名 /api/module下的文件名} moduleName
   * @param {当前模块导出的数据 export default} interfaceModuleMsg
   */
  parseRouter(moduleName, interfaceModuleMsg) {
    this[moduleName] = {};
    Object.keys(interfaceModuleMsg).forEach(key => {
      this[moduleName][key] = this.sendInferface.bind(
        this,
        moduleName,
        key,
        interfaceModuleMsg[key]
      );
      this[moduleName][key].state = "ready";
    });
  }
  /**
   * 发送接口
   * @param {模块名 /api/module下的文件名} moduleName
   * @param {当前模块名下每个接口的key} key
   * @param {当前模块名下的key对应的url值} url
   * @param {页面使用时候请求的配置} config
   */
  sendInferface(moduleName, key, url, successFn, config = {}) {
    let innerConfig = {
      type: config.type || "get",
      data: config.data || {},
      success: successFn || (() => {}),
      multi: config.multi || false,
      headers: config.headers || {}
    };
    const callback = res => {
      const dt = res.data;
      this[moduleName][key].state = "ready";
      return dt;
    };
    let method = {
      get: () => {
        const qsResult = qs.stringify(innerConfig.data);
        const qsUrl = qsResult
          ? `${url}?${qs.stringify(innerConfig.data)}`
          : url;
        this.server
          .get(qsUrl, { headers: innerConfig.headers })
          .then(callback)
          .then(innerConfig.success);
      },
      post: () => {
        this.server
          .post(url, innerConfig.data, { headers: innerConfig.headers })
          .then(callback)
          .then(innerConfig.success);
      }
    };
    if (this[moduleName][key].state === "ready") {
      !innerConfig.multi && (this[moduleName][key].state = "pending");
      method[innerConfig.type]();
    }
  }
}

export default new MYServer(server);
