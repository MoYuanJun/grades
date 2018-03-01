/* redux 商品数据 reducer */
import * as actionType from '../constants/commodityData';

export default function commodityData (state = {}, action){
    switch(action.type){
        case actionType.COMMODITYDATA_GET : return action.data;
        case actionType.COMMODITYDATA_UPDATA : return action.data;
        default : return state;
    }
}


