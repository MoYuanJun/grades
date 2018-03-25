/* commodityData action创建函数 */
import * as actionType from '../constants/commodityData';

/* 生成 获取商品action函数 */
export function getCommodityData (data){
    return {
        type: actionType.COMMODITYDATA_GET,
        data
    }
}
/**更新商品数据
 * 
 * @param {object} data 商品数据对象
 * 详解：
 * 1、传入一个商品数据对象，通过遍历商品id(com_id)进行更新 替换 redux中的状态
 * 2、如果遍历后没有找到匹配的状态 则说明传入的商品数据对象是新增的 ，则进行push操作 
 */
export function reduxUpdataCommodity (data, callback){
    return {
        type: actionType.COMMODITYDATA_UPDATA,
        data,
        callback
    }
}












