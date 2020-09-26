// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 注册 Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，
// 把 购物车的数据读出来，放到 store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

const store = new Vuex.Store({
    state: { // this.$store.state.***
        car: car // 将购物车中的商品的数据，用一个数组存储起来
        // {id:商品的id，count:购买的数量，price:商品单价，selected:false 是否选中}
    },
    mutations: {  // this.$store.commit('方法名称'，'按需传递唯一的参数')
        addToCar (state, goodsinfo) { //将商品信息 保存到 store中的car 上
            var flag = false

            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })
            // 如果最终循环完毕，得到的flag还是false，则把商品push到car中
            if (!flag) {
                state.car.push(goodsinfo)
            }
            // 实现购物车商品本地持久保存
            // 当 更新 car 之后，把car 数组，存储到 本地的 localStorage 中
            localStorage.setItem('car', JSON.stringify(state.car))

        },
        updateGoodsInfo (state, goodsinfo) {
            // 修改购物车中商品的数量值
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        removeFormCar (id) {
            // 根据Id，从 store中的购物车中删除对应的哪条商品数据
            state.car.some((item, i) => {
                if (item.id === id) {
                    state.car.splice(i, 1)
                    return true
                }
            })
            // 将删除完毕后的，最新的购物车数据，同步到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsSelected (state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            // 把最新的 所有购物车商品的状态保存到  store 中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.***
        getAllCount (state) {  // 实现徽标数量更新
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount (state) {  //从购物车中获取商品的数量
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected (state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount (state) {
            var o = {
                count: 0, //勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

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
    router, // 1.4 挂载路由对象到 vm 实例上
    store  // 挂载 store
})
