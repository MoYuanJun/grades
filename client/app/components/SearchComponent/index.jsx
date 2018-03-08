/* 搜索木偶组件 */
import React from 'react';
import './style.less';

import { Input, InputNumber, DatePicker, Button, Select } from 'antd';

class SearchComponent extends React.Component{
    state={

    }
    render(){
        return (
            <div id='search-component' className='learfix'>
                <TextInputComponent 
                    label="商品编号" 
                    size="200px" 
                    inputKey="com_id"
                    setState={this.setState.bind(this)}/>
                <NumberInputComponent 
                    label="商品库存" 
                    size="70px"
                    inputKey="com_number"
                    setState={this.setState.bind(this)}
                />
                <TimeInputComponent 
                    label="修改时间" 
                    size="120px" 
                    inputKey="com_time"
                    setState={this.setState.bind(this)}
                />
                <SelectInputComponent 
                    label="选择框"
                    size="120px"
                    inputKey="select"
                    value={[1,2,3,4,5]}
                />
                
                <div className='float-left search-item'>
                    <Button type="primary"
                        onClick={() => {

                        }}
                    >
                        筛选
                    </Button>
                </div>
                {console.log('%c监听搜索组件this.state', 'background:green', this.state)}
            </div>
        );
    }
}
export default SearchComponent;

//文本输入框
class TextInputComponent extends React.Component{
    render(){
        const { label, size, inputKey, setState } = this.props;
        return(
            <div className='float-left search-item'>
                <div className='float-left label'>{label} : </div>
                <div className='float-left'>
                    <Input 
                        placeholder={label} 
                        style={{width: size}}
                        onChange={(e)=>{
                            let state = {};
                            state[inputKey] = e.target.value;
                            setState(state);
                        }}
                    />
                </div>
            </div>
        );
    }
}

//数字范围输入框
class NumberInputComponent extends React.Component{
    state = {
        start: null,
        end: null
    }
    render(){
        const {label, size, inputKey, setState} = this.props;
        return (
            <div className='float-left search-item'>
                <div className='float-left label'>{label} : </div>
                <div className='float-left'>
                    <InputNumber 
                        placeholder='0'
                        min={0}
                        style={{width: size}} 
                        onChange={(value)=>{
                            this.setState({start: value}, ()=>{
                                let stateStart = {};
                                stateStart[inputKey] = this.state;
                                setState(stateStart);
                            });
                        }}

                    />
                    <span> ~ </span>
                    <InputNumber
                        placeholder='0'
                        min={0}
                        style={{width: size}}
                        onChange={(value)=>{
                            this.setState({end: value}, ()=>{
                                let stateEnd = {};
                                stateEnd[inputKey] = this.state;
                                setState(stateEnd);
                            });
                        }}
                    />
                </div>
            </div>
        );
    }
}
//时间房屋选择输入框
class TimeInputComponent extends React.Component{
    state={
        start: null,
        end: null
    }
    render(){
        const {label, size, setState, inputKey} = this.props;
        const { RangePicker } = DatePicker;
        return (
            <div className='float-left search-item'>
                <div className='float-left label'>{label} : </div>
                <div className='float-left'>
                    <DatePicker 
                        style={{width: size}}
                        placeholder="开始时间"
                        onChange={(value, dateString)=>{
                            this.setState({start: value}, ()=>{
                                let stateStart = {};
                                stateStart[inputKey] = this.state;
                                setState(stateStart);
                            });
                        }}
                    />
                    <span> ~ </span>
                    <DatePicker 
                        style={{width: size}}
                        placeholder="结束时间"
                        onChange={(value, dateString)=>{
                            this.setState({end: value});
                            let endTime = {};
                            endTime[inputKey] = this.state;
                            setState(endTime);
                        }}
                    />
                </div>
            </div>
        );
    }
}
//选择框
class SelectInputComponent extends React.Component{
    render(){
        const {label, size, inputKey, value} = this.props;
        const Option = Select.Option;
        return (
            <div className='float-left search-item'>
                <div className='float-left label'>{label} : </div>
                <Select
                    allowClear
                    style={{ width: 200 }}
                    placeholder={label}
                    onChange={()=>{}}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
            </div>
        );
    }
}