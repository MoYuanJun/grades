/* 封装 ==> 创建store */
import {createStore} from 'redux';
/* 导入合并的reducers */
import Reducers from '../reducers/index';
/* 通过reducer创建stoe */
const store = createStore(Reducers);
/* 导出  其实也只是在最外层调用 在这里单独写 主要还是为了封装使代码优雅 */
export default store;


 
