module.exports = {
    configureWebpack:{
        resolve:{
            alias: {
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'store':'@/store',
                'views':'@/views'
            }
        }
    },
    lintOnSave: false,
    devServer: {
    port: 8080,
    open: true,
    overlay: {
      warning: false,
      errors: false
    }
}
}