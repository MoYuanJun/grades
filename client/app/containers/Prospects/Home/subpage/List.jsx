/* 客户端：智能组件List */
import React from 'react';

import ListComponent from '../../../../components/Prospects/Home/List';
import { getCommodityList } from '.././../../../fetch/index';


class List extends React.Component{
  constructor(){
    super();
    this.state = {
      data : null
    }
  }
  render(){
    return (
      <div id='List'>
        <div className='content'>
        <ListComponent data = {this.state.data} />
        </div>
      </div>
    );
  }
  componentDidMount(){
    getCommodityList().then(res=>res.json()).then((json)=>{
      this.setState({data:json});
    });
  }
}
export default List;