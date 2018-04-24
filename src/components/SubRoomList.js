import React,{Component} from "react";
import _ from "lodash";

export default class SubRoomList extends Component{
    
    render() {
        const {
            rooms,
        } = this.props;
        return (
            <div>
                {_.flatMap(rooms, (subRoomItem, index) => {
                    const {
                        base = {},
                        price = {},
                        gift = {},
                        RoomName = "",
                        tags = [],
                        lastArriveLocalTime,
                    } = subRoomItem;
                    return (
                            <div key={index} className="detail_htl_box">
                                <div className="con_box flex_1">
                                    <h4 className="arrow_r_s">{RoomName}</h4>
                                    <p className="s_label_col">
                                        {gift.desc && (
                                            <span className="s_label_red">
                                                礼
                                            </span>
                                        )}

                                        {_.flatMap(tags, (tagItem, index) => {
                                            if (
                                                tagItem.Type !== 4 &&
                                                tagItem.Name !== "礼" &&
                                                tagItem.Type !== 7
                                            ) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="s_label_grey"
                                                    >
                                                        {tagItem.Name}
                                                    </span>
                                                );
                                            }
                                        })}
                                    </p>
                                    <p className="room_sertxt">
                                        {
                                            base.maxPerson &&
                                            <span className="icon">
                                                {base.maxPerson}
                                            </span>
                                        }
                                        {lastArriveLocalTime && (
                                            <span className="icon">{lastArriveLocalTime}前到店付</span>
                                        )}
                                    </p>
                                </div>
                                <div className="price_box">
                                    <p className="f_price">
                                        <b>均</b>
                                        <dfn>¥</dfn>
                                        <strong>
                                            {price.averagePrice}
                                        </strong>
                                    </p>
                                    <p className="f_grey">
                                        <b>总价</b>
                                        <dfn>¥</dfn>
                                        {price.totalPrice}
                                    </p>
                                    <div className="htl_btn_box">
                                        <div className="htl_btn_book">选择</div>
                                    </div>
                                </div>
                            </div>
                    );
                })}
            </div>
        );
    }
}
