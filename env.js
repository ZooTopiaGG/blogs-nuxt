/*
 * @Author: dengpeng
 * @Date: 2019-08-23 22:59:01
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-07-04 19:55:38
 */

module.exports = {
  dev: {
    MODE: "development",
    ENV_API: "http://localhost:8088/api/" //测试服务器地址
  },
  pro: {
    MODE: "production",
    ENV_API: "https://api.55lover.com/api/" // 正式服务器地址
  }
};
