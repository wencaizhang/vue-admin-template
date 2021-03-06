# 基于 Vue.js 和 Ant Desing Vue 的后台管理模板

## 项目启动程序

**安装 npm 依赖包**

```
npm install
```

**进入开发模式：编译和热加载**

```
npm run serve
```

**生产模式：编译和压缩**
```
npm run build
```

## 项目结构

```bash
|-- babel.config.js         #
|-- Dockerfile              # Docker 镜像构建文件
|-- Jenkinsfile             # Jenkins 自动部署文件
|-- nginx.conf              # 项目部署 nginx 配置文件
|-- package.json            # 管理项目依赖和 npm 命令
|-- package-lock.json       # npm 依赖版本锁定文件
|-- postcss.config.js       #
|-- public                  #
|   |-- favicon.ico         #
|   `-- index.html          #
|-- README.md               #
|-- src
|   |-- api                 # 后台接口统一管理
|   |-- App.vue             # 项目根组件
|   |-- assets              # 本地静态资源
|   |-- components          # 业务通用组件和通用布局
|   |-- main.js             # 项目入口文件
|   |-- mock                # 本地模拟数据
|   |-- permission.js       # 权限
|   |-- router              # 路由配置
|   |-- settings.js         # 一些项目配置，包含 vue-ls 的本地存储位置（localStorage)
|   |-- store               # vuex 状态管理
|   |-- utils               # 工具库
|   |-- mixins              # mixins 文件
|   |-- i18n                # 一些字段（状态）的中英文翻译
|   `-- views               # 业务页面入口
|-- vue.config.js           # vue-cli 配置文件
`-- yarn.lock               #
```


## 环境变量

可以替换项目根目录中的下列文件来指定环境变量：

```sh
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.development         # 只在开发环境被载入
.env.development.local   # 只在开发环境被载入，但会被 git 忽略
.env.production          # 只在生产环境中被载入
.env.production.local    # 只在生产环境中被载入，但会被 git 忽略
```


详细文档：[环境变量和模式](https://cli.vuejs.org/zh/guide/mode-and-env.html)