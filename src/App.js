import React, { Component } from "react";
import logo from "./logo.svg";
import "./css/App.css";
import "./css/index.css";
import "./css/dp_n.css";

class App extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="detail_htl_mod cur">
                    <div className="detail_htl_box choose_box_top box_sticky">
                        <div className="pic">
                            <img
                                src="http://pic.c-ctrip.com/h5/taocan/flt_htl/zzz_pic_1.jpg"
                                alt=""
                            />
                        </div>
                        <div className="flex_1 flexbox">
                            <div className="con_box flex_1">
                                <h4>高级家庭房</h4>
                                <p className="txt">20m²</p>
                                <p className="s_label_col">
                                    <span className="s_label_red">礼</span>
                                </p>
                            </div>
                            <div className="price_box">
                                <p className="f_price">
                                    <dfn>¥</dfn>8250<ins>起</ins>
                                    <span className="hotel_up" />
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="detail_htl_sub">
                        <div className="detail_htl_box">
                            <div className="con_box flex_1">
                                <h4 className="arrow_r_s">高级家庭房</h4>
                                <a href="#" className="room_chose">
                                    1间<i className="s_down" />
                                </a>
                                <p className="s_label_col">
                                    <span className="s_label_vip">自由行专享</span>
                                    <span className="s_label_red">礼</span>
                                    <span className="s_label_grey">立即确认</span>
                                </p>
                                <p className="room_sertxt">
                                    <span className="icon icon_imp">双早</span>
                                    <span className="icon">可住4人</span>
                                    <span className="icon">不可取消</span>
                                    <span className="icon">18:00前到店付</span>
                                </p>
                            </div>

                            <div className="price_box">
                                <p className="f_price">
                                    <b>均</b>
                                    <dfn>¥</dfn>
                                    <strong>8250</strong>
                                </p>
                                <p className="f_grey">
                                    <b>总价</b>
                                    <dfn>¥</dfn>25000
                                </p>
                                <div className="htl_btn_box">
                                    <div className="htl_btn_book">
                                        选择<i>到店付</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
