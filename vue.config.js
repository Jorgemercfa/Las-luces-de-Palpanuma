const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',

  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'Octavio Miranda';
      return args;
    });
  },

  configureWebpack: {
    plugins: [
      new (require('webpack').DefinePlugin)({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
  },
});