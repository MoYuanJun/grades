/* 广告位商品数据  action创建函数 */
import * as actionType from '../constants/advertisingcommodity';
//获取
export function getAdvComDataAction(data){
    return {
        type: actionType.ADVERTISINGCOMMODITY_GETA,
        data
    }
}
//更新
export function updataAdvCommDataAction(data){
    type: actionType.ADVERTISINGCOMMODITY_UPDATA,
    data
}