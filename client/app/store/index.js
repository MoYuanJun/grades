/* 封装 ==> 创建store */
import {createStore, compose} from 'redux';
/* 导入合并的reducers */
import Reducers from '../reducers/index';
/* 通过reducer创建stoe */

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);
/**创建 store
 * 参数：reducer reducer根
 * 参数：{} 默认state
 * 参数：enhancers 为了使用 redux-dev-tools 插件需要配置第三参数
 * 替代：其实可以直接在 入口文件或根文件内 连接redux并在控制台输入 state时时进行监控 
 *      ==> 该项目也使用了该方法，在所有页面的父模板文件App上连接redux并在控制台上输出 state
 */
const store = createStore(Reducers);
/* 导出  其实也只是在最外层调用 在这里单独写 主要还是为了封装使代码优雅 */
export default store;


 
