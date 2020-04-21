const { override, fixBabelImports } = require('customize-cra');
// const { override, fixBabelImports, addLessLoader, addWebpackPlugin } = require('customize-cra');
// const AntdDayjswebpackPlugin = require('antd-dayjs-webpack-plugin') // 使用 day.js替换 momentjs
// const darkThemeVars = require('antd/dist/dark-theme') // 使用自定义深色主题

module.exports = override(
    // 配置按需加载
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
        // style: ture
    }),
    // 自定义主题：使用 less变量覆盖功能
    // addLessLoader(
    //     addWebpackPlugin(new AntdDayjswebpackPlugin()),
    //     {
    //         javascriptEnabled: true,
    //         modifyVars: { '@primary-color': '#1DA57A' }
    //     }
    // )
)