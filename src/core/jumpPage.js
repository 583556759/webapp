/**
 * Created by HuangJinYu on 17/5/31
 * @使用browserHistory实现页面跳转，参数
 * @url:String,要跳转的url,支持相对路径
 * @options:Object
 */

import { browserHistory } from 'react-router';

export default function jumpPage(url='',options={reload:false,goback:false,replace:false}){
    if(options.goback){
        window.history.go(-1);
    }

    let _rk = Date.parse(new Date());
    if(url[0] != '/'){
        url = '/'+url;
    }
    if (url.indexOf('?')>0){
        url = url+'&_rk='+_rk;
    }else {
        url = url + '?_rk='+_rk;
    }

    localStorage.path = url;
    if(options.reload){
        window.location.href = location.origin +url;
    }
    if(options.replace){
        browserHistory.replace(url)
    }
    if(navigator.userAgent.indexOf('Android') > -1){
        browserHistory.push(url)
    }else{
        window.location.href = window.location.origin+url;
    }
}

