// 入口文件
import Vue from 'vue'

// 导入 MUI 样式
import '../lib/mui/css/mui.min.css'

// 按需导入 Mint-UI 中的组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

// 全局导入 Mint-UI
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

// 导入 App 根组件
import App from './App.vue'


var vm = new Vue({
    el: '#app',
    render: c => c(App)
})
