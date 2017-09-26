/**
 * Created by HuangJinYu on 2017/6/12.
 */
import {serverUrl,constructorParam} from '../core/config';
import Xuser from 'xuser';
const xuser = new Xuser(constructorParam);

export const SIGNUP              = 'SIGNUP';
export const LOGIN               = 'LOGIN';
export const GETLOCALUSER        = 'GETLOCALUSER';
export const SMSCODESEND         = 'SMSCODESEND';
export const BINDTHIRDACCOUNT    = 'BINDTHIRDACCOUNT';
export const SYNUSERDATA         = 'SYNUSERDATA';
export const UPDATEUSER          = 'UPDATEUSER';

export function xuser_login(param){
    return {
        type          : LOGIN,
        urlpath       : serverUrl+'mily/user/login',
        core          : xuser,
        interfaceName : 'login',
        params        : param
    }
}
export function getLocalUser(){
    return {
        type          : GETLOCALUSER
    }
}
export function xuser_signup(param){
    return {
        type          : SIGNUP,
        urlpath       : serverUrl+'mily/user/signup',
        core          : xuser,
        interfaceName : 'signup',
        params        : param
    }
}

export function xuser_sendSmscode(param){
    return{
        type          : SMSCODESEND,
        urlpath       : serverUrl+'mily/user/smscode/send',
        core          : xuser,
        interfaceName : 'sendSmscode',
        params        : param
    }
}
export function xuser_bindThirdAccount(param){
    return{
        type          : BINDTHIRDACCOUNT,
        urlpath       : serverUrl+'mily/user/thirdaccount/bind',
        core          : xuser,
        interfaceName : 'bindThirdAccount',
        params        : param
    }
}

export function xuser_synUserData(){
    return{
        type          : SYNUSERDATA,
        urlpath       : serverUrl+'mily/user/query',
        core          : xuser,
        interfaceName : 'synUserData',
        params        : null
    }
}
export function xuser_updateUser(param){
    return{
        type          : UPDATEUSER,
        urlpath       : serverUrl+'mily/user/update',
        core          : xuser,
        interfaceName : 'updateUser',
        params        : param
    }
}