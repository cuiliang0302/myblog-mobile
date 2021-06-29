const path = require('path');
module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 自定义vant样式
          // 'button-primary-background-color': '#111',
          hack: `true; @import "${path.join(
            __dirname,
            "./src/assets/style/vant-var.less"//这个import 的路径必须是绝对路径
          )}";`
        },
      },
    },
  },
}
