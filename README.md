# ssr-react

####attention
> 1.npm install --save-dev babel-loader@^7

webpack
> 1.webpack-merge 复用相同的配置

####note
> 1. react-dom/server API renderToString 将组件转化为字符串做最基础的服务器端渲染
> 1. vDOM是真实dom的js对象映射
> 1.


热更新
> 1. 自动打包 webpack --config webpack.server.js --watch
> 1. 自动重启服务器 nodemon --watch --exec
> 1. 打包&&重启服务器 npm-run-all 


问题：ssr无法正常render绑定事件

同构：一套react代码先在server执行，再在client执行
> 1. 用script加载文件
> 1. 静态资源文件用static中间件 app.use(express.static('public')) 
> 1. 将在客户端运行的代码也用webpack打包后放到public的index下
> 1. 用hydrate来做client渲染
