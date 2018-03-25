import * as actionType from '../constants/commonGlobal';
import { combineReducers } from 'redux';
//
function spin(state=false, action) {
    switch(action.type){
        case actionType.COMMONGLOBAL_SPIN :
            return !state;
        default:
            return state;
    }
}

const commonGlobal = combineReducers({
    spin,
});

export default commonGlobal;


