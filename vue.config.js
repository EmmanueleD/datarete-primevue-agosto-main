const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    externals: {
      // only define the dependencies you are NOT using as externals!
      canvg: "canvg",
      html2canvas: "html2canvas",
      dompurify: "dompurify",
    },
  },
});
