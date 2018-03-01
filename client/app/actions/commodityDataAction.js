/* commodityData action创建函数 */
import * as actionType from '../constants/commodityData';

/* 生成 获取商品action函数 */
export function getCommodityData (data){
    return {
        type: actionType.COMMODITYDATA_GET,
        data
    }
}
/* 生成 更新商品action函数 */
export function updataCommodity (data){
    return {
        type: actionType.COMMODITYDATA_UPDATA,
        data
    }
}












