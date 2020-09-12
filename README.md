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

## 改造九宫格区域的样式

## 改造 新闻资讯 路由链接

1. 绘制界面,使用 MUI 中的 media-list.html
2. 使用 vue-resource/axios 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情

1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的 Id 标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和组件页面对应起来

## 实现 新闻详情 的 页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件

1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，导入 comment 组件

- `import comment from './comment.vue'`

3. 在父组件中，使用 'components'属性，将刚才导入的 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的 注册名称，以 标签形式 在页面中 引入即可

## 获取所有的评论数据显示到页面中

## 实现点击 加载更多 评论的功能

1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++,然后重新调用 this.getComment() 方法重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的情况，我们在 点击加载更多的时候，每当获取到新数据，应该让 老数据 调用 数组的 concat 方法，拼接上新数组
