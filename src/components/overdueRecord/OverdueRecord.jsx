/**
 * Created by 123 on 17/4/23.
 */
import React from 'react';
import './OverdueRecord.less';
export class RepaymentCard extends React.Component{
    render(){
        return(
            <div className="investCard"
                 onClick = {this.props.onClick}
                /*onClick = {()=>{
                   window.location.href = this.props.detailUrl;
                }}*/
                >
                <p className="investName">
                    <span style={{fontSize:16}}>{this.props.contractid}</span>
                    <span className="Right">{this.props.productTitle}</span>
                </p>
                <div className="row" style={{marginBottom:'5px',zIndex:-100}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};
export class Row extends React.Component{
    render(){
        return(
            <div>
                <div className="col-xs-6 investRate">
                    <p>{this.props.itemLeftTitle}</p>
                    <p>{this.props.itemLeftValue}</p>
                </div>
                <div className="col-xs-6 investRate">
                    <p>{this.props.itemRightTitle}</p>
                    <p>{this.props.itemRightValue}</p>
                </div>
            </div>
        )
    }
}