/* redux 商品数据 reducer */
import * as actionType from '../constants/commodityData';

export default function commodityData (state = [], action){
    switch(action.type){
        case actionType.COMMODITYDATA_GET : return action.data;

        //更新单个商品数据对象，遍历redux中的数组对象 通过匹配com_id,进行对状态的更新 替换 ；
        //如果没匹配到相同的com_id表示商品是新增的商品 则执行push操作
        case actionType.COMMODITYDATA_UPDATA : 
        console.log('-------------------', action);
            let updateState = JSON.parse(JSON.stringify(state));
            for(let i = 0; i < updateState.length; i++){
                if(updateState[i].com_id === action.data.com_id){
                    updateState[i] = action.data;
                } else if(action.data){
                    state.push(action.data);
                }
            }
            action.callback && action.callback();
            return updateState;
        default : 
            return state;
    }
}


