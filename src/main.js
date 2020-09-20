// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)   //format 格式化函数
})

// 导入 MUI 样式
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

// 全局导入 Mint-UI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 安装 图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 1.3 导入自己的 router.js 路由对象
import router from './router.js'

// 导入 App 根组件
import App from './App.vue'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://api.cms.liulongbin.top'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


Vue.prototype.$http = axios



var vm = new Vue({
    el: '#app',
    render: c => c(App),
    router // 1.4 挂载路由对象到 vm 实例上
})
