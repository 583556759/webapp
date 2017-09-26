/**
 * Updated by zhangjie on 16/11/26.
 */
import React from 'react';
import Nav from './Nav.jsx';
import {urlPath} from '../../core/config';
import jumpPage from '../../core/jumpPage';
import './nav.css';
import '../../../lib/iconfont.css';
import '../../views/css/main.css';
/* exported variableName */
export default class NavBottom extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <div className="navStyle">
                    <div className="row">
                        <div className="col-xs-4 text-center">
                            <Nav
                                handleClick = {()=>{
                                    event.preventDefault();
                                    jumpPage('index');
                                }}
                                className={
                                    window.location.href.indexOf('index')>0 ? "active" : "disActive"}
                                icon="&#xe60e;"
                                name="借款">
                            </Nav>
                        </div>
                        <div className="col-xs-4 text-center ">
                            <Nav
                                handleClick = {()=>{
                                    event.preventDefault();
                                    jumpPage('middle');
                                }}
                                className={window.location.href.indexOf('middle')>0 ? "active" :"disActive"}
                                icon="&#xe6c2;"
                                name="钱包">
                            </Nav>
                        </div>
                        <div className="col-xs-4 text-center">
                            <Nav
                                handleClick = {()=>{
                                    event.preventDefault();
                                    jumpPage('me');
                                }}
                                className={window.location.href.indexOf('me')>0 ? "active" :"disActive"}
                                href="/order"
                                icon="&#xe618;"
                                name="我">
                            </Nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
