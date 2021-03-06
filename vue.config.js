module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader');
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/_sass/global.sass"',
      },
    },
  },
  lintOnSave: false,
};
