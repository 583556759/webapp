/**
* Created by HuangJinYu on 2017/5/1.
*/
import React from 'react';
class SliceIcon extends React.Component{
    constructor(args){
        super(args)
    }
    render(){
        let {icon,iconColor} = this.props;
        return(
            <div style={{float:'left',fontSize:'24px',lineHeight:'20px',color:iconColor,width:'10%'}}>
                <icon  className="iconfont">{icon}</icon>
            </div>
        );
    }
}
class MultiSlice extends React.Component{
    constructor(args){
        super(args)
    }
    render(){
        return(
            <div style={{background:'#fff'}}>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
class SingleSlice extends React.Component{
    constructor(args){
        super(args)
    }
    render(){
        let sliceBody;
        let {text,borderBottom,iconColor,icon,title,value,href,key,display,handleClick} = this.props;
        if(!href){
            sliceBody = (
                <div style={{padding:"0 10px",borderBottom:text?'1px solid #eee':'none'}}>
                    <a style={{color:'#000',textDecoration:'none'}}>
                        <div style={{borderBottom:borderBottom?'1px solid #eee':'none',padding:"12px 0",height:45,fontSize:'0.15rem'}}>
                            <SliceIcon icon={icon} iconColor={iconColor}/>
                            <span>{title}</span>
                            <span className="Right">
                                {value}
                            </span>
                        </div>
                        <div style={{borderTop:text?'1px dashed #eee':'none',color:"#aaa",padding:text?'10px 0 10px 10%':0}}>
                            {text}
                        </div>
                    </a>
                </div>
            );
        }else{
            sliceBody =(
                <div style={{padding:"0 10px",borderBottom:text?'1px solid #eee':'none'}}>
                    <a style={{color:'#000',textDecoration:'none'}} href = {href}>
                        <div style={{borderBottom:borderBottom?'1px solid #eee':'none',padding:"10px 0",height:45,fontSize:'0.15rem'}}>
                            <SliceIcon icon={icon} iconColor={iconColor}/>
                            <span style={{display:'flex',alignItems:'center'}}>{title}</span>
                            <span className="Right">{value}</span>
                        </div>
                        <div style={{borderTop:text?'1px dashed #eee':'none',color:"#aaa",padding:text?'10px 0 10px 10%':0}}>
                            {text}
                        </div>
                    </a>
                </div>
            );
        }
        return(
            <div
                key     = {key}
                onClick = {handleClick}
                style   = {{backgroundColor:"#fff",display:display}}>
                {sliceBody}
            </div>
        );
    }
}

SingleSlice.propTypes = {
    handleClick : React.PropTypes.func,
    href        : React.PropTypes.string,
    title       : React.PropTypes.string,//暂时设为非必须,后面要改为必须
    display     : React.PropTypes.string //设置该项是否显示,可选
};
SingleSlice.defaultProps = {
    value  : '',   //父组件不传入value时默认为空
    display: 'block',//默认显示,
    text   : "",
    borderBottom : false //MultiSlice包含单个SingleSlice或者传入text属性时不用设置此属性,当传入多个SingleSlice且不包含text属性时,除了最后一个SingleSlice,其他的设置为true
};
export {MultiSlice,SingleSlice};
