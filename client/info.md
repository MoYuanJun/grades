####项目初始化
####创建目录：app  和 server
  ==>app     前端代码
  ==>server  后端代码
####编写webpack配置 和 pactcss.config.js

####下载webpack配置中对应的依赖插件 + react + react-dom

####构建基本页面 实现基本的页面 输出：Hello world

####搭建基本的路由  暂时就弄登录页面、Home页面、NotFound页面
    ##创建components目录用来盛放木偶组件
    ##创建contrainers目录用来盛放智能组件
    ##在目录contrainers目录下创建Home Login NotFound 目录分别表示一个页面一个路由指向
    ##在contrainers目录下创建App.jsx文件，为所有文件的父组件(模板组件)
    ##在App目录下创建router目录，并在里面创建RouterMap.jsx这里编写我们的路由；
    ##然后在入口文件那导入我们的路由组件；
    ##入口组件引用 路由组件 路由管理我们的所有页面
    ##安装依赖包：router react-router-dom 这里使用的是4.X版本，并且实际上我们只需要安装react-router-dom即可
    ##react-router-dom封装了所有我们需要的组件了
####redux的初始搭建
    ##创建reducer  action  store  constants目录
    ##reducer统一管理reducer  action统一管理action函数  store封装创建store方法  constants存储action类型
    ##在constans中先设计并创建userInfo相关的action.type
    ##在reducers中设计并创建userInfo相关的根据action.type进行 || 一个reducer对应一个state.XX状态  || reducer的输出将更新当前的状态；
    ##在reducers中对独立的reducer进行合并   || 一个reducer对应一个state.XX状态
    ##在store中通过合并的reducer进行创建store  封装一次生成多个地方使用
    ##设计并创建saction函数，这次将数据的获取更新全部在这里实现
    ##在最外层入口文件包装 路由组件使得所有页面都能够连接到redux
    ##在父模板组件内连接到redux并进行测试



