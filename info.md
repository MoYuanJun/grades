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
####fetch封装  ==> 实现数据的获取处理方法 ==> 跨域测试
    ##在app目录下创建fetch目录进行管理
    ##安装插件：whatwg-fetch  和  promise-polyfill ==> 为兼容那些不支持promise的浏览器
    ##分别封装两个函数，一个通过get获取数据、一个通过post进行获取数据
    ##测试  可行性 || 是否可跨域
    ##注意这里两个函数返回的是promise的对象，他是异步的需要通过then进行获取
####【搭建登录注册页面】
    ##首先搭建数据库用户信息：
    ##字段暂定：
    ##编写PHP
    ##编写登录界面 ==> 并实现简单的登录注册
####编写客户端首页  ==> 基本页面先搭建起来
    ##编写Header
    ##编写轮播和用户信息
    ##编写商品展示列表



###############################分割线####################################
######遇到的问题
1、react路由问题：
    ==> BrowserRouter好像会发生一堆 BUG 最后改用HashRouter
    ==> 路由嵌套问题
        /* 嵌套路由设置 */
        const ProspectsRouter = ({ match }) => (
        <div>
            {/* 嵌套路由：路由 /prospects/home 将跳转到 Home组件 */}
            <Route path={`${match.url}/home`} component={Home}/>
        </div>
        ) 
        /* 开始编写 路由配置 */
        class RouterMap extends React.Component{
        render(){
            return (
            <HashRouter>
                <App>{/* 自定义父组件  作为主模板 */}
                <Switch>{/* 设置  限制每次路由有且只能加载匹配到的第一个路由 
                            *否则最后一个路由配置将被一直匹配到（会同时匹配到2个路由） */}
                    {/* 正常路由配置 */}
                    <Route exact path='/' component={Home} />{/* exact 表示严格匹配  只有完全匹配到根 才加载Home组件  如果不加根路由会永远被匹配带 */}
                    <Route path='/detail/:id' component={Detail} /> {/* 可以通过路由给组件设置参数 通过 id进行匹配接收 */}
                    <Route path='/list/aaaa' component={List} />
                    <Route path='/prospects' component={ProspectsRouter} />
                    <Route path='/*' component={NotFound} />
                </Switch>
                </App>
            </HashRouter>
            )
        }
        }
        export default RouterMap;  /* 导出路由 */

2、IE11下报错：不支持 startsWith 方法或属性
    ==> 按照提示：引入兼容代码
    ==> 检测浏览器是否支持该方法不支持则手动设置自定义函数，同时补充endsWith方法
    ==> 具体代码如下：
        if (typeof String.prototype.startsWith != 'function') {  
            String.prototype.startsWith = function (prefix){  
            return this.slice(0, prefix.length) === prefix;  
            };  
        }

        if (typeof String.prototype.endsWith != 'function') {  
            String.prototype.endsWith = function(suffix) {  
            return this.indexOf(suffix, this.length - suffix.length) !== -1;  
            };  
        }  
3、Safari下提示  MAP对象未定义：


4、IE11不支持assign不支持    
    ==> npm install --save babel-polyfill
    ==> 使用 babel-polyfill 的三种方法：
        ==> require("babel-polyfill");
        ==> import "babel-polyfill";
        ==> module.exports = {
                entry: ["babel-polyfill", "./app/js"]
            };
    ==> 补充：polyfill解决了上面的所有兼容问题
        ==> 已知能够解决：IE11下报错：不支持 startsWith 方法或属性
        ==> Map未定义问题
        ==> assign未定义问题










