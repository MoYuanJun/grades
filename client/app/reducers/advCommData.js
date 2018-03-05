/* 广告商品数据  reducer */
import * as  actionType from '../constants/advertisingcommodity';

export default function advCommData(state=[], action){
    switch(action.type){
        case actionType.ADVERTISINGCOMMODITY_GETA : return action.data;
        case actionType.ADVERTISINGCOMMODITY_UPDATA : return action.data; 
        default : return state;
    }
}

