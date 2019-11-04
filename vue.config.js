const path = require("path");

module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        data: `@import "@/scss/_global.scss";`
      },
    },
  },
  devServer: {
    proxy: 'http://localhost:8080'
  }
}
