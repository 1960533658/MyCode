const path = require("path");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        path.join(__dirname, "src", "assets", "styles", "variable.less"),
        path.join(__dirname, "src", "assets", "styles", "mixin.less"),
      ],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 10000 }));
  },
};
