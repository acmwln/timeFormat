import React, { Component } from "react";
import logo from "../logo.svg";
import _ from "lodash";
import "../css/App.css";
import "../css/index.css";
import "../css/dp_n.css";
import * as modelData from '../dataModels/formatData.js'
import BaseRoom from '../components/BaseRoom.js'
import SubRoomList from '../components/SubRoomList.js'
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //key: baseRoomId, value: isHide的值true/false
            baseRoomStatus: {} //判断子房型是否展开状态
        };
    }
    componentDidMount = () => {    
       
    };

    /**
     *
     * 隐藏与展示子房型以及让房型吸顶的交互
     * @memberof HotelDetail
     */
    toggleSubRooms = (baseRoomId) => {
        let newState = {};
        newState[baseRoomId] = !this.state.baseRoomStatus[baseRoomId];
        this.setState({
            baseRoomStatus: {
                ...this.state.baseRoomStatus,
                ...newState
            }
        });

    };

    render() {
        let roomModel = modelData.formateHotelRoom().roomModel;
        console.log('roomModel',roomModel)
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                {
                    _.map(roomModel,(roomObj,index)=>{
                        const {base = {},rooms = []} = roomObj;
                        const {baseRoomId} = base;
                        return(
                                <div className="detail_htl_mod cur" key = {[`baseRoom_${index}`]}>
                                    <BaseRoom 
                                    {...base}
                                    toggleSubRooms = {this.toggleSubRooms}
                                    />
                                    <div className={this.state.baseRoomStatus[baseRoomId] ? "detail_htl_sub slideInDown" : "hidden"}>
                                        <SubRoomList 
                                        rooms = {rooms}
                                        /> 
                                    </div>     
                            </div>)
                    })
                }
                
            </div>
        );
    }
}

export default App;

