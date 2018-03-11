/* 搜索木偶组件 
props接口：
> filterFunc
    - type: function
    - description: 接收子组件参数，并进行相应操作；在这里按钮click事件触发后调用并传入参数（搜索组件this.state）
    - 目的：该组件将从每个控件组件中获取到相应的搜索词条并存储到搜索组件的this.state中，
      执行父组件的filterFunc函数并将this.state传过去（就是将搜索词条作为参数传递进去）
      至于函数怎么执行，怎么处理数据就不关我搜索组件的事了，父组件（智能组件）要怎么处理就怎么处理；反正数据已经通过函数传给父组件了；
      父组件甚至可以将数据之间存储到自己的state中；
      
> modelData
    - type: array-object
    - description: 数据模型，根据给定模型渲染出搜索组件；
    - 模型格式如下：数组对象数组中每个对象都将渲染出一个组件
    - 数组中每个对象属性详解：
        - type: 控件类型，根据type的不同将渲染出不同的控件；
            - 文本输入控件：TextInput 
            - 数值范围控件：NumberRangeInput  
            - 时间范围控件：TimeRangeInput 
            - 选  择  控件：SelectInput
        - data: 数据，每个控件所需要的数据参数设置等；
            - label：label就是label
            - size: 控件宽度
            - inputKey: 最终返回的搜索词条数据对象中相应控件的key值
            - timeInputSelectData：选择控件中选择项所需要的参数；一个数组对象，每个对象具有两个属性value和showText分别表示选择项的value值和显示文本
        [
            {
                type: 'TextInput', 
                data: {
                    label: '商品ID',
                    size: '200px',
                    inputKey: 'com_id',
                }
            },
            {
                type: 'NumberRangeInput', 
                data: {
                    label: '商品ID',
                    size: '200px',
                    inputKey: 'com_id',
                }
            },
            {
                type: 'TimeRangeInput',
                data: {
                    label: '商品ID',
                    size: '200px',
                    inputKey: 'com_id',
                }
            },
            { 
                type: 'SelectInput', 
                data: {
                    label: '商品ID',
                    size: '200px',
                    inputKey: 'com_id',
                    timeInputSelectData: [{value: 111, showText: 1}], //可选，如果类型是 selectInout则需要
                }
            }
        ];
*/
import React from 'react';
import moment from 'moment';
import './style.less';
import { Input, InputNumber, DatePicker, Button, Select } from 'antd';

//出口组件：
class SearchComponent extends React.Component{
    state={};
    render(){
        const { filterFunc, modelData } = this.props;
        return (
            <div id='search-component' className='learfix'>
                {modelData.map((item, index, arr) => {
                    return selectInpue(index, item, this.setState.bind(this));
                })}
                <div className='float-right search-item'>
                    <Button type="primary"
                        onClick={() => {
                            filterFunc(this.state);
                        }}
                    >
                        筛选
                    </Button>
                </div>
            </div>
        );
    }
}
export default SearchComponent;


/**筛选控件：根据参数type返回指定控件
 * 
 * @param {index} key 数组遍历时，需要添加的key
 * @param {object} data 渲染控件所需要的数据{type, data{label, size, inputKey, timeInputSelectData(可选)}}
 * @param {*} func 父组件窃取子组件数据函数，其实就是父组件的this.state,暴露接口使得子组件允许设置父组件的状态（this.state）
 */
function selectInpue(key, itemData, func) {
    switch(itemData.type){
        case 'TextInput' : 
        return <TextInputComponent key={key} data={itemData.data} setState={func} />;
        case 'NumberRangeInput' :
        return <NumberRangeInputComponent key={key} data={itemData.data} setState={func} />;
        case 'TimeRangeInput':
        return <TimeRangeInputComponent key={key} data={itemData.data} setState={func} />;
        case 'SelectInput':
        return <SelectInputComponent key={key} data={itemData.data} setState={func} />;
    }
}
/**文本输入控件 ==> type: TextInput
 * 暴露的props接口: 
 * data对象: 对象包含以下属性；其实就是将多个props接口用一个对象包起来
 *      -- label:       label值（string 例："商品ID"）
 *      -- size:        控件宽度（string 例："100px"）
 *      -- inputKey     控件输入的值存储在state中的key （string 例："time"）
 * setState: 父组件的this.setState方法，窃取控件的数据更新带父组件的state中
 * 控件输入值变化=>父组件this.state应该存储的数据格式:
 * [inputKet] : value
 */
class TextInputComponent extends React.Component{
    render(){
        const { data, setState } = this.props;
        return(
            <div className='float-left search-item'>
                <div className='float-left label'>{data.label} : </div>
                <div className='float-left'>
                    <Input 
                        placeholder={data.label} 
                        style={{width: data.size}}
                        onChange={(e)=>{
                            let state = {};
                            state[data.inputKey] = e.target.value;
                            setState(state);
                        }}
                    />
                </div>
            </div>
        );
    }
}

/**数值范围输入控件 ==> type: NumberRangeInput
 * 暴露的props接口：
 * data对象，对象包含以下属性；其实就是将多个props接口用一个对象包起来
 *      -- label:       label值（string 例："商品ID"）
 *      -- size:        控件宽度（string 例："100px"）
 *      -- inputKey     控件输入的值存储在state中的key （string 例："time"）
 * setState: 父组件的this.setState方法，窃取控件的数据更新带父组件的state中
 * 控件输入值变化=>父组件this.state应该存储的数据格式:
 * [inputKet] : {start: value, end: value}
 */
class NumberRangeInputComponent extends React.Component{
    state = {
        start: null,
        end: null
    }
    render(){
        const {data, setState} = this.props;
        return (
            <div className='float-left search-item'>
                <div className='float-left label'>{data.label} : </div>
                <div className='float-left'>
                    <InputNumber 
                        placeholder='0'
                        min={0}
                        style={{width: data.size}} 
                        onChange={(value)=>{
                            this.setState({start: value}, ()=>{
                                let stateStart = {};
                                stateStart[data.inputKey] = this.state;
                                setState(stateStart);
                            });
                        }}

                    />
                    <span> ~ </span>
                    <InputNumber
                        placeholder='0'
                        min={0}
                        style={{width: data.size}}
                        onChange={(value)=>{
                            this.setState({end: value}, ()=>{
                                let stateEnd = {};
                                stateEnd[data.inputKey] = this.state;
                                setState(stateEnd);
                            });
                        }}
                    />
                </div>
            </div>
        );
    }
}

/**日期范围输入控件 ==> type: TimeRangeInput
 * 暴露的props接口：
 * data对象，对象包含以下属性；其实就是将多个props接口用一个对象包起来
 *      -- label:       label值（string 例："商品ID"）
 *      -- size:        控件宽度（string 例："100px"）
 *      -- inputKey     控件输入的值存储在state中的key （string 例："time"）
 * setState     父组件的this.setState方法，窃取控件的数据更新带父组件的state中
 * 控件输入值变化=>父组件this.state应该存储的数据格式:
 * [inputKet] : {start: value, end: value}
  */
class TimeRangeInputComponent extends React.Component{
    state={
        start: null,
        end: null
    }
    render(){
        const {data, setState} = this.props;
        const { RangePicker } = DatePicker;
        return (
            <div className='float-left search-item'>
                <div className='float-left label'>{data.label} : </div>
                <div className='float-left'>
                    <DatePicker 
                        style={{width: data.size}}
                        placeholder="开始时间"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        onChange={(value, dateString)=>{
                            this.setState({start: value}, ()=>{
                                let stateStart = {};
                                stateStart[data.inputKey] = this.state;
                                setState(stateStart);
                            });
                        }}
                    />
                    <span> ~ </span>
                    <DatePicker 
                        style={{width: data.size}}
                        placeholder="结束时间"
                        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        onChange={(value, dateString)=>{
                            this.setState({end: value}, ()=>{
                                let endTime = {};
                                endTime[data.inputKey] = this.state;
                                setState(endTime);
                            });
                        }}
                    />
                </div>
            </div>
        );
    }
}

/**选择控件 ==> type: SelectInput
 * 暴露的props接口：data对象，对象包含以下属性；其实就是将多个props接口用一个对象包起来
 *      -- label:       label值（string 例："商品ID"）
 *      -- size:        控件宽度（string 例："100px"）
 *      -- inputKey     控件输入的值存储在state中的key （string 例："time"）
 *      -- values       选择项数据（对象数组 例[ {value: '1', showText: '11'} ...] ）
 * setState     父组件的this.setState方法，窃取控件的数据更新带父组件的state中
 * 控件输入值变化=>父组件this.state应该存储的数据格式:
 * [inputKet] : value
 */
class SelectInputComponent extends React.Component{
    render(){
        const { data,setState } = this.props;
        const Option = Select.Option;
        let optionDom = data.timeInputSelectData.map((item, index, arr) => {
            return <Option value={item.value} key={index}>{item.showText}</Option>;
        });
        return (
            <div className='float-left search-item'>
                <div className='float-left label'>{data.label} : </div>
                <Select
                    allowClear
                    style={{ width: data.size }}
                    placeholder={data.label}
                    onChange={(value)=>{
                        let state = {};
                        state[data.inputKey] = value;
                        setState(state);
                    }}
                >
                    {optionDom}
                </Select>
            </div>
        );
    }
}
