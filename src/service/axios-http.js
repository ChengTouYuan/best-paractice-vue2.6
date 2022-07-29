/**
 * axios的简单二次封装，基础api在此配置
 */
import { Loading } from "element-ui";
import Tools from "../utils/tools";

const axios = require("axios");

let setting = {
  baseURL: "",
  headers: {
    "Content-type": "application/json",
    "showLoading":true,//默认展示loading
  },
  timeout: 30000,
};
const server = axios.create(setting);

// 请求前做拦截，用于判断 const requestInterceptor = 
let loadingInstance=null;
let needLoadingRequestCount=0; //保证只有一个loading并且时长为第一个接口开始请求到最后一个接口请求结束
server.interceptors.request.use(
  (config) => {
    // 拦截修改config
    // 返回到请求中配置
    // if (!config.headers.token) {
    //   // headers没有token令牌执行
    //   config.headers.token = "no";
    // }
    // _vue.$toast.loading({ //自定义loading
    //     duration: 0
    // });
    console.log(config)
    if (config.headers.showLoading) {
      if(!loadingInstance && needLoadingRequestCount==0){
        loadingInstance = Loading.service({
          fullscreen: false,
          background: "rgba(0,0,0,0)",
          text: "网络加载...",
        });
      }
      needLoadingRequestCount++;
    }
    
    return config;
  },
  (error) => {
    // 立即执行失败的reject方法
    return Promise.reject(error);
  }
);
// 响应后做拦截，用于修改响应数据 const responseInterceptor =

 server.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    // console.log('对响应数据做点什么',response)
    // error_code: 10000无数据
    // _vue.$toast.clear();
    needLoadingRequestCount--;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0);
    Tools.debounce(()=>{
      if(needLoadingRequestCount==0){
        loadingInstance.close();
      }
    },300);//防抖
    if (
      response.data.error_code == 0 ||
      !response.data.error_code ||
      response.data.error_code == 10000
    ) {
      if (response.headers["content-disposition"]) {
        //post文件下载，用于取文件名
        return response;
      } else {
        return response.data;
      }
    }
    if (
      response.data.error_code == 10001000 ||
      response.data.error_code == 7200
    ) {
      // token丢失，过期
      // window.location = "./#/login";
      // router.replace({ name: "login" });
      return Promise.reject(response.data);
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    needLoadingRequestCount--;
    needLoadingRequestCount = Math.max(needLoadingRequestCount, 0);
    Tools.debounce(()=>{
      if(needLoadingRequestCount==0){
        loadingInstance.close();
      }
    },300);//防抖
    // 立即执行响应的reject方法
    return Promise.reject(error); 
  }
);
// 移除拦截器
// interceptors.request.eject(requestInterceptor);
// interceptors.request.eject(responseInterceptor);


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
    const len =Object.keys(options).length;
    if (len != 0) {
      url += "?";
      Object.keys(options).forEach((key, index) => {
        if(key!="headers"){
          url += key + "=" + options[key];
          if (index != len - 1) {
            url += "&";
          }
        }else{
          url=url.slice(0,url.length-1)//去掉最后一个&
        }
         
      });
    }
    return server.get(url,{headers:options['headers']});
  }

  if (type == "post") {
    return server.post(url, options);
  }

  return null;
};

export default HTTP;
