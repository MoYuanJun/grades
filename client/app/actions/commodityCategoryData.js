/* 商品分类 */
import * as actionType from '../constants/commodityCategoryData';

export function categoryDataGet(data){
    return {
        type: actionType.CATEGORYDATE_GET,
        data
    }
} 

export function categoryDataUpdata(data){
    return {
        type: actionType.CATEGORYDATE_UPDATA,
        data
    }
}


export function categoryDataClear(data){
    return {
        type: actionType.CATEGORYDATE_CLEAR,
        data
    }
}