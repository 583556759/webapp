/**
 * Created by henry on 2017/6/12.
 */
import {
    QUERYCONTRACT,
    CONTRACTDETAIL,
    REPAYMENTPLAN,
    OVERDUERECORD
} from '../actions/creditloan';
export function queryContract(state={contracts:[]},action){
    switch (action.type){
        case QUERYCONTRACT:
            return Object.assign({},state,
                {
                    contracts   : [...state.contracts,...action.data.contracts],
                    nextPage    : action.data.next_page,
                    totalAmount : action.data.statistics.total_amount*0.01
                });
        default:
            return state;
    }
}

export function contractDetail(state={},action){
    switch (action.type){
        case CONTRACTDETAIL:
            return Object.assign({},state,action.data.contract[0]);
        default:

            return state;
    }
}

export function repaymentPlan(state={plans:[]},action){
    //console.log(action.data);
    switch (action.type){
        case REPAYMENTPLAN:
            return Object.assign({},state,{
                plans:[...state.plans,...action.data.plans]
            });
        default:
            return state;
    }
}
export function overdueRecord(state={records:[]},action){
    switch (action.type){
        case OVERDUERECORD:
            return Object.assign({},state,{
                records:[...state.records,...action.data.records]
            });
        default:
            return state
    }

}