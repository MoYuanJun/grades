/* 导入orderData 相关的action.type */
import * as actionType from '../constants/orderData';

//获取用户订单信息：参数{uid:xxxx}
export function getUserOrderDataAction(data){
    return {
        type:actionType.USERORDERDATA_GET,
        data
    }
}

//获取管理员订单信息：参数{uid:xxxx}
export function getAdminOrderDataAction(data){
    return {
        type:actionType.ADMINORDERDATA_GET,
        data
    }
}
/* 清除订单数据 */
export function clearOrderDataAction(){
    return {
        type:actionType.ADMINORDERDATA_GET,
        data: []
    }
}
/**
 * 更新订单信息
 * @param {object} 格式：
 * {
 *  state: xx,   要修改后的状态  可选
 *  orderInfo: {key:value,key:value},  要修改的键值对//可选
 *  sal_id: [sal_id,sal_id,sal_id……]   //必选
 * 返回影响行数
 * }
 */
export function updataOrderDataAction(data){
        return {
            type:actionType.ORDERDATA_UPDATA,
            data
        }
}
