/* 商品分类 */
import * as actionType from '../constants/commodityCategoryData';

export default function commodityCategoryData (state = [], action){
    switch (action.type){
        case actionType.CATEGORYDATE_GET : 
            return action.data;
        case actionType.CATEGORYDATE_UPDATA:
            return action.data;
        case actionType.CATEGORYDATE_CLEAR : 
            return [];
        default : 
            return state;
    }
}

