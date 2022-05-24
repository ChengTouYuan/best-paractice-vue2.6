/**
 * axios的简单二次封装，基础api在此配置
 */

const axios = require("axios");

let setting = {
  baseURL: "",
};
const server = axios.create(setting);
server.interceptors.response.use((response) => {
  if (response.status === 200) {
    if (response.headers["content-disposition"]) {
      //post文件下载，用于取文件名
      return response;
    } else {
      return response.data;
    }
  } else {
    throw new Error("接口出错");
  }
});

/**
 * 
 * @param {*} type "get","post"
 * @param {*} url  "xxxx/xxx/"
 * @param {*} options  {a:"",b:""}
 * @returns 
 * 例：HTTP("get","api/xxx/xxx").then(res=>{
    console.log(res,'res');
})
 */

const HTTP = (type, url, options = {}) => {
  if (type == "get") {
    const len = Object.keys(options).length;
    if (len != 0) {
      url += "?";
      Object.keys(options).forEach((key, index) => {
        url += key + "=" + options[key];
        if (index != len - 1) {
          url += "&";
        }
      });
    }
    return server.get(url);
  }

  if (type == "post") {
    return server.post(url, options);
  }

  return null;
};

export default HTTP;
