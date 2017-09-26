/**
 * Created by HuangJinYu on 2017/6/12.
 */

import {
    LOGIN,
    SIGNUP,
    GETLOCALUSER,
    SYNUSERDATA,
} from '../actions/user';

export function saveUser (state = {},action){
    switch (action.type){
        case LOGIN:
        case SIGNUP:
            localStorage.uid   = action.data.user.uid;
            localStorage.token = action.data.token;
            localStorage.user  = JSON.stringify(action.data);
            sessionStorage.updated = true;
            return state;
        case SYNUSERDATA:
            localStorage.user  = JSON.stringify(action.data);
            return state;
        default:
            return state;
    }
}

export function getLocalUser (state={},action){
    switch (action.type){
        case GETLOCALUSER:
            return Object.assign({},state,JSON.parse(localStorage.user),{isReady:true});
        default:
            return state;
    }
}