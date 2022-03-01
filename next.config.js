const withAntdLess = require("next-plugin-antd-less");

module.exports = withAntdLess({
  // optional: you can modify antd less variables directly here
  modifyVars: { "@primary-color": "#ff8a00" },
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 0,
  },
  webpack(config) {
    return config;
  },
  future: {
    webpack5: true,
  },
});
