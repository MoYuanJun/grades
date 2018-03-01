import * as actionType from '../constants/orderData';

//判断检测action.type进行不同处理 => 返回
export default function orderData(state = {}, action){
    switch (action.type) {
        case actionType.USERORDERDATA_GET : return action.data ;
        case actionType.ADMINORDERDATA_GET : return action.data ;
        case actionType.ORDERDATA_UPDATA : return action.data ;
        default :return state;
    }
}
