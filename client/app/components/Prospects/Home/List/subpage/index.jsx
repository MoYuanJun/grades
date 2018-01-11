/* 客户端：单独木偶组件List */
import React from 'react';
import './style.less'
import ItemComponent from '../../Item';
class ListComponentSubpage extends React.Component{
  render(){
    return (
      this.props.data ?
          <div id='ListComponentSubpage' className='clearfix'>
            <div className='item float-left'>
            <ItemComponent data = {this.props.data[0]} />
            </div>
            <div className='item float-left'>
            <ItemComponent data = {this.props.data[1]}  />
            </div>
            <div className='item float-left'>
            <ItemComponent data = {this.props.data[2]}  />
            </div>
            <div className='item float-left'>
            <ItemComponent data = {this.props.data[3]} />
            </div>
            <div className='item float-left'>
            <ItemComponent data = {this.props.data[4]} />
            </div>
          </div> : ''
    );
  }
}
export default ListComponentSubpage;