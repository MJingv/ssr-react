# ssr-react


### 原理

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

#### 实现原理 -- 虚拟dom


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
> 1. 
> 1. 
> 1. 
> 1. 
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
