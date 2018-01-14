/* 客户端：单独木偶组件List */
import React from 'react';
import './style.less'
import ItemComponent from '../../Item';
class ListComponentSubpage extends React.Component{
  render(){
    const data = this.props.data;
    return (
      data ?
          <div id='ListComponentSubpage' className='clearfix'>
            {
              data.title ? 
                <div className='hea clearfix'>
                <svg className='icon float-left svg' aria-hidden='true'>
                  <use xlinkHref={  data.title === '最新上架' ? '#icon-zuixin' 
                                  : data.title === '热销'     ? '#icon-rexiaochanpin' 
                                  : '#icon-haoping' }>
                  </use>
                </svg>
                <h2 className='float-left'>{data.title}</h2>
              </div>
              : ''
            }
            
            {
              data.content.length ?
                data.content.map((value, key, arr)=>{
                  return <div key={key} className='item float-left'>
                          <ItemComponent data = {data.content[key]}  />
                        </div>
                })
                : ''
            }
          </div> : ''
    );
  }
}
export default ListComponentSubpage;

