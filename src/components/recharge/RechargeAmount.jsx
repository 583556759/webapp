/**
 * Created by 123 on 2017/7/22.
 */
import React from 'react';
import './RechargeAmount.less';

export default class RechargeAmount extends React.Component{
    constructor(props){
        super(props);
        this.onHandleClick=this.onHandleClick.bind(this);
    }
    onHandleClick(amount,index){
        if(!this.props.selected){
            this.props.getAmount(amount,index);
        }
    }
    render(){
        const {amount,index}=this.props;
        //console.log(this.props);
        //let onHandleClick=this.onHandleClick;
        //console.log(this.props.selected);
        return(
            <div className='amount' style={this.props.selected=== true?{border:'1px solid red'}:{border: '0px'}}
                 onClick={()=>{
                    this.onHandleClick(amount,index)
                 }}>
                <p>{this.props.amount}元</p>
            </div>
        )
    }
}