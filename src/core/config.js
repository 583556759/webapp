/**
 * Created by henry on 17/3/20.
 */
import {Url} from 'buddy-util';
import jumpPage from './jumpPage';
//配置服务器地址
export let serverUrl = (()=>{
        if(location.origin.indexOf('localhost')>0 ||location.origin.indexOf('br.mily.buddydc.com')>0){
            return "http://123.56.66.31:8080/";
        }else {
            return 'http://buddydc.com:8080/';
        }
    })();
export let appid = (()=>{
        if(location.origin.indexOf('localhost')>0 || location.origin.indexOf('br.mily.buddydc.com')>0){
            return 'wx8d8ff7bbd1da06b5';   //米丽超市
        }else {
            return 'wxf3bd3131b17c9a70';   //米丽金融
        }
    })();

let skey = (()=>{
    if(location.origin.indexOf('localhost')>0 || location.origin.indexOf('br.mily.buddydc.com')>0){
        return 'xdockdefaulttestsignaturekeys123';
    }else {
        return '273140e61139f4eae89eb8a425388805';
    }
})();
export let constructorParam = {
    sig_kv   : 1,
    skey     : skey,
    appid    : '21',
    appName  : 'mily',
    version  : '0.2.0',
    platform : 'webapp'
};
export let urlPath = (()=>{
    return location.origin+'/';
})();

export function getCurrentUser(actions){
    if(location.href.indexOf('localhost')<0){
        localStorage.path = location.href.split('com')[1].split('/')[1]
    }
    if(localStorage.uid){
        if(!sessionStorage.updated) {
            actions.xuser_synUserData().then(() => {
                sessionStorage.updated = true;
            });
        }
        return;
    } else {
        let redirectUrl = location.origin+ '/?codefor=login';
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize' +
            '?appid=' + appid +
            '&redirect_uri=' + Url.urlEncode(redirectUrl) +
            '&response_type=code' +
            '&scope=snsapi_userinfo' +
            '&state=123#wechat_redirect';
    }
}
