/* 入口文件 */
import './static/js/common';
import React from 'react';
import {render} from 'react-dom';

/* 引入封装生成的store文件 */
import store from './store/index';
/* 引入可以将组件包装为redux的组件 */
import {Provider} from 'react-redux';

/* 引入自定义组件路由组件 */
import RouterMap  from './router/RouterMap';


const dom = <Provider store={store}><RouterMap /></Provider>;
render(dom,document.getElementById('root'));
