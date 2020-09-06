const path = require('path')
// 导入在内存中生成 HTML 页面的插件 html-webpack-plugin
// 只要是插件，都一定要放到 plugin 节点中去
const htmlWebpackPlugin = require('html-webpack-plugin')
// 这个插件的两个作用：
// 1.自动在内存中根据 指定页面生成一个内存的页面
// 2.自动，把打包好的 bundle.js 追加到页面中去
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    // mode: 'development',
    entry: path.join(__dirname, './src/main.js'), //入口文件
    output: {
        filename: 'bundle.js',  //输出文件
        path: path.join(__dirname, 'dist')//指定打包的文件输出到哪个目录
    },
    mode: 'development',
    devtool: 'inline-source-map',  // 加上对应的配置
    devServer: {
        open: true, //自动打开浏览器
        port: 3000, //设置启动时候的运行端口
        contentBase: 'src', //指定托管的根目录
        hot: true //启动热更新
    },
    plugins: [//插件数组
        new htmlWebpackPlugin({ //创建一个在内存中生成html页面插件的配置对象
            template: path.join(__dirname, './src/index.html'),    //指定模版页面生成内存中的hmtl
            filename: 'index.html'   //指定生成的页面名称
        }),
        new VueLoaderPlugin()
    ],
    module: {  // 这个节点，用于配置 所有 第三方模块 加载器
        rules: [  //所有第三方模块的 匹配规则
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.vue/, use: 'vue-loader' }, //处理 .vue的loader
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        alias: {  //修改 Vue 被导入时候的包的路径
            //"vue$": "vue/dist/vue.js"
        }
    },

}