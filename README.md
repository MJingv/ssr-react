# ssr-react

### attention
> 1.npm install --save-dev babel-loader@^7

---

#### note
> 1. react-dom/server API renderToString 将组件转化为字符串做最基础的服务器端渲染
> 1. vDOM是真实dom的js对象映射
> 1.

---

### webpack配置

**热更新**
> 1. 自动打包 webpack --config webpack.server.js --watch
> 1. 自动重启服务器 nodemon --watch --exec
> 1. 打包&&重启服务器 npm-run-all 

**优化**

> 1.webpack-merge 复用相同的配置

---


### 路由
> 1. dd 

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
