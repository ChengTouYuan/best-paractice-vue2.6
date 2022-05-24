module.exports = {
  chainWebpack: (config) => {
    config.entry("app").clear().add("./src/main.js");

    config.resolve.extensions
      .clear()
      .add(".ts")
      .add(".mjs")
      .add(".js")
      .add(".jsx")
      .add(".vue")
      .add(".json")
      .add(".wasm")
      .end();
  },

  devServer: {
    proxy: {
      "/api/xxx": {
        target:"http://xxx.xx.xx.xx:8080",
        screen: false,
        changeOrigin: true,
      //   pathRewrite:{ //将api替换成空，以满足本地的接口
      //     '^/api':''
      // } 
      },
     
    },
  },
  configureWebpack: {
    devtool: "source-map"
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/static/variables.scss";`//公共样式位置，additionalData可能会有变化，以官网为准
      }
    } 
  },
  publicPath: './',
  assetsDir: "static",
  outputDir: "dist/best-paractice-vue2.6"//设置打包路径以及名称
};
