# 这是一个 vue 的项目

## 一个移动端的项目

## 【主流开源协议之间有何异同？】

(https://www.zhihu.com/tardis/landing/360/ans/20907890?query=%E5%BC%80%E6%BA%90%E5%8D%8F%E8%AE%AE%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB&mid=68c83706c2a90255a5e35cd3cc89041a&guid=771388FB70C5357C86B8D917B4DB53CE.1571546878522
)

## 制作首页 App 组件

1. 完成 Header 区域，使用的是 Mint-UI 中的 Header 组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html

- 在制作 购物车 小图标的时候，操作会想对你多一些
- 先把 扩展图标的 css 样式，拷贝到项目中
- 拷贝 扩展字体库 ttf 文件，到项目中
- 为 购物车 小图标，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`

3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据

1. 获取数据，如何获取，使用 axios
2. 使用 axios 的 this.\$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项
