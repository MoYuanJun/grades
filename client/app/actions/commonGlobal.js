/* 导入 action type */
import * as actionType from '../constants/commonGlobal';


//更新切换spin
export function switchSpinState(data){
    return {
        type:actionType.COMMONGLOBAL_SPIN,
        data
    }
}
