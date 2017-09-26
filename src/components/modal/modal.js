/**
 * Created by henry on 16/7/14.
 * 模态框,
 */
import React from 'react';
import './modal.css';
const Modal = React.createClass({
    prevent:function(e){
        e.preventDefault();
    },
    render(){
        if(this.props.display == 'block'){
            //弹出框显示时禁止上下滚动
            document.body.addEventListener( "touchmove",this.prevent);
        }else {
            //弹出框消失时恢复页面滚动
            document.body.removeEventListener("touchmove",this.prevent);
        }
        return(
            <div style={{display:this.props.display}}>
                <div className="mask" onClick = {this.props.handleMaskClick}></div>
                <div className="modalContent" style={{padding:'0px 0',borderRadius:3}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
export default Modal;