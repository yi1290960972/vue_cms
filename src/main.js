// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入 MUI 样式
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

// 全局导入 Mint-UI
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

// 1.3 导入自己的 router.js 路由对象
import router from './router.js'

// 导入 App 根组件
import App from './App.vue'

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://api.cms.liulongbin.top'

Vue.prototype.$http = axios



var vm = new Vue({
    el: '#app',
    render: c => c(App),
    router // 1.4 挂载路由对象到 vm 实例上
})
