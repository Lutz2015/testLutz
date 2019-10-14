module.exports = {
    dirname: __dirname,
    // 当需要部署到bun框架时，这里可以设为true
    isbun: false,
    entry: {
        index: './src/entry/index.js'
    },
    output: './build/static',
    template: './src/template/index.html',
    appname: 'singera-fe',
    // bun r --dev时使用localStaticDomain
    localStaticDomain: '//localhost:80/',
    // bun r --test时使用testStaticDomain
    testStaticDomain: '//www.singera.cn:8011/',
    // bun r时使用publicStaticDomain
    publicStaticDomain: '//www.singera.cn/static/',
    manifest: false,
    /**
     * 分离模式
     * commons 是否需要提取公共文件（2次以上引入，仅限js）优先级低于commons
     * vendors 是否需要提取node_modules中的模块（包含css） 优先级低于libs
     * libs
     */
    cacheGroups: ['vendors', 'commons'],
    libs: [], // 需要额外打包的公共库
    uglifyJs: true, // 开发模式下无效
    optimizeCSS: true, // 开发模式下无效
    supportFileType: ['vue', 'less'], // 需要支持的文件格式
    globalPath: {
        '@common': './src/app/common',
        '@assets': './src/app/assets',
        '@': './src',
        '@components': './src/app/components'
    },
    definePlugin: {
        // 是否为生产环境
        PRODUCTION: JSON.stringify(false),
        // 提现功能开关
        WITHDRAW_FEATURE: JSON.stringify(true)
    },
    // 全局引入的公共style文件，支持less，sass
    globalStyle: [],
    /**
     * 预留方法，可自定义修改webpackconfig
     * @params config webpack配置
     * @return config 更改后的webpack配置
     */
    configureWebpack: config => {
        return config;
    },
    // 当isbun为true时，dev配置无效
    dev: {
        port: '80', // 端口号
        autoOpenBrowser: true, // 是否自动打开浏览器
        openUrlPath: '/myapp', // 自动打开的页面地址
        // 代理
        proxyTable: {
            '/website': {
                target: '//www.singera.cn', // 请求远程服务器
                changeOrigin: true,
                secure: false,
                pathRewrite: {}
            },
            '/u': {
                target: '//www.singera.cn', // 请求远程服务器
                changeOrigin: true,
                secure: false,
                pathRewrite: {}
            }
        },
        assetsPublicPath: '/', // mock服务静态文件地址
        assetsSubDirectory: 'static', // mock服务静态文件夹名称
        mockDir: './mock' // mock数据的路径
    }
};
