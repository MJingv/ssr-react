# ssr-react


### 准备工作

#### 概念先行

-  CSR 客户端渲染 
> 页面初始加载的 HTML 页面中无网页展示内容，需要加载执行JavaScript 文件中的 React 代码，通过 JavaScript 渲染生成页面，同时，JavaScript 代码会完成页面交互事件的绑定
-  SSR 服务器端渲染
> 用户请求服务器，服务器上直接生成 HTML 内容并返回给浏览器。服务器端渲染来，页面的内容是由 Server 端生成的。一般来说，服务器端渲染的页面交互能力有限，如果要实现复杂交互，还是要通过引入 JavaScript 文件来辅助实现。
- 同构 
> 我们把页面的展示内容和交互写在一起，让代码执行两次。在服务器端执行一次，用于实现服务器端渲染，在客户端再执行一次，用于接管页面交互，

#### 为什么要ssr？
- 加快TTFP(Time To First Page)
- 增加SEO

#### 实现原理 

![ssr](https://github.com/MJingv/ssr-react/blob/master/ssr.png)

- 虚拟dom
> 1. 虚拟 DOM 是真实 DOM 的一个 JavaScript 对象映射
> 1. 在服务器，我可以操作 JavaScript 对象，判断环境是服务器环境，我们把虚拟 DOM 映射成字符串输出；
> 1. 在客户端，我也可以操作 JavaScript 对象，判断环境是客户端环境，我就直接将虚拟 DOM 映射成真实 DOM，完成页面挂载。

- ssr差异 (C vs S)
> 1. 代码：只有【组件】代码可以共用，路由不同【服务器用StaticRouter】【客户端用BrowserRouter】
> 3. 异步获取数据：在服务器端，页面一旦确定内容，就没有办法 Rerender。判断路由，用promise队列获取所有数据ready再渲染
> 3. 跨域：客户端有同源限制，可用【 express-http-proxy 】做代理，服务器端无限制
> 1. 打包：

     1. 入口不同
     2. server 用 target: node 
     3. server 用【webpack-node-externals】排除打包node已有的包
     4. css不同：客户端用 css-loader 和 style-loader，css-loader 不但会在 DOM 上生成 class 类名，解析好的 CSS 代码，还会通过 style-loader 把代码挂载到页面上。
     5. 服务器端 css 用【 isomorphic-style-loader】拿到返回的样式代码，然后以字符串的形式添加到服务器端渲染的 HTML 之中

#### React-ssr关键api

将React Component转化为HTML的字符串 都接受一个React Component参数，返回一个String

- renderToString
> 将React Component转化为HTML字符串，生成的HTML的DOM会带有额外属性：各个DOM会有data-react-id属性，第一个DOM会有data-checksum属性。
- renderToStaticMarkup
> 同样是将React Component转化为HTML字符串，但是生成HTML的DOM不会有额外属性，从而节省HTML字符串的大小。
- ps
> 1. 如果使用renderToString渲染组件，会在组件的第一个DOM带有data-react-checksum属性，这个属性是通过adler32算法算出来：如果两个组件有相同的props和DOM结构时，adler32算法算出的checksum值会一样，有点类似于哈希算法。
> 2. 当客户端渲染React组件时，首先计算出组件的checksum值，然后检索HTML DOM看看是否存在数值相同的data-react-checksum属性，如果存在，则组件只会渲染一次，如果不存在，则会抛出一个warning异常。也就是说，当服务器端和客户端渲染具有相同的props和相同DOM结构的组件时，该React组件只会渲染一次。

---
---
---

### attention
> 1.npm install --save-dev babel-loader@^7

---

### note
> 1. react-dom/server API renderToString 将组件转化为字符串做最基础的服务器端渲染
> 1. vDOM是真实dom的js对象映射
> 1. 用到jsx记得引入react
> 1. ssr路由只发生在第一次

---


### node代理服务器

> 1. express-http-proxy

---


### 加载css

**服务器端渲染**
> 1. webpack利用isomorphic-style-loader


**客户端端渲染**
> 1. webpack利用style-loader及css-loader


---

### redux数据管理
**服务器端渲染**

> 问题：不会运行componentDidMount,store一直为空，不会获取数据

> 1. loadData:在server渲染之前，把数据加载好
> 1. 路由 match 动态加载loadData
> 1. 模拟路由匹配行为: map some push
> 1. react-router-config  match-routers 进行多级路由匹配
> 1. 利用promise异步加载数据

> 最终解决方案流程：

> 1. 创建空store
> 2. matchRouters循环匹配并查看是否有loadData
> 3. 执行loadData，放入promise
> 4. promise.all成功后，获取全部数据成功
> 5. 结合路由、请求、数据生产html返回给用户

**客户端渲染**
> 1. store更新
> 1. 页面重新渲染出数据


脱水&&注水

> 1. 注水:将数据存入windows.context
> 2. 脱水:从windows.context拿数据
---

### webpack配置

**热更新**
> 1. 自动打包 webpack --config webpack.server.js --watch
> 1. 自动重启服务器 nodemon --watch --exec
> 1. 打包&&重启服务器 npm-run-all 

**优化**

> 1. webpack-merge 复用相同的配置

**注意**
> 1. 配置执行顺序：从下到上，从右到左

---


### 路由
> 1. 客户端路由渲染用BrowserRouter
> 1. 服务器端路由渲染用StaticRouter，通过req.path动态获取路由路径
> 1. 利用react-router 的link切换路由

---

### 中间层
浏览器=》node-server=》c++/java-server
> 1. node服务器只负责拼装并返回页面，java/c++服务器负责底层数据处理
 
---

#### 问题：ssr无法正常render绑定事件

**同构：一套react代码先在server执行，再在client执行**

> 1. 用script加载文件
> 1. 静态资源文件用static中间件 app.use(express.static('public')) 
> 1. 将在客户端运行的代码也用webpack打包后放到public的index下
> 1. 用hydrate来做client渲染
> 1. 流程：
   > - 服务器运行react代码渲染出html
   > - 发送html给浏览器
   > - 浏览器接受内容并展示
   > - 浏览器加载js文件
   > - js中的react代码在浏览器中重新执行
   > - js的react代码接管页面操作


### SEO

> 1. 搜索引擎只认识html，客户端渲染js无法拿到数据，全能搜索引擎会根据全部数据来分析。
> 1. 优化 title description 提升吸引力、转化率
> 1. 提升seo：网站组成：文字【增加原创性】 链接【提升外部链接、增强内部链接】 多媒体
> 1. react-helmet 定制化 title description
> 1. 加nginx分析是否为蜘蛛，蜘蛛则走预渲染prerender
