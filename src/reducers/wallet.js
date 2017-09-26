/**
 * Created by HuangJinYu on 2017/6/12.
 */
import {
    BALANCEQUERY
} from '../actions/wallet';

export function balanceQuery(state={},action){
    switch (action.type){
        case BALANCEQUERY:
            return Object.assign({},state,{balance:action.data.balance.amount});
        default:
            return state;
    }
}

