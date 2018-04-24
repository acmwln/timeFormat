import React,{Component} from "react";

class BaseRoom extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {

    }
    render() {
        const {averagePrice,baseRoomName,gift,spic,baseRoomId,toggleSubRooms} = this.props
        return (
            <div className="detail_htl_box choose_box_top box_sticky">
                <div className="pic">
                    <img
                        src={spic}
                        alt=""
                    />
                </div>
                <div className="flex_1 flexbox" onClick = {()=>{toggleSubRooms(baseRoomId)}}>
                    <div className="con_box flex_1">
                        <h4>
                            {baseRoomName}
                        </h4>
                        <p className="txt">20m²</p>
                        {
                            gift ? 
                            <p className="s_label_col">
                                <span className="s_label_red">礼</span>
                            </p> : null
                        }
                        
                    </div>
                    <div className="price_box">
                        <p className="f_price">
                            <dfn>¥</dfn>{averagePrice}<ins>起</ins>
                            <span className="hotel_up" />
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}
export default BaseRoom