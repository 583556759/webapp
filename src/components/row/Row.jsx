/**
 * Created by 123 on 2017/7/27.
 */
import React from 'react';
import './Row.less';
export default class Row extends React.Component{
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