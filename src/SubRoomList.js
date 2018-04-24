import React from "react";
import _ from "lodash";

export default React.createClass({
    getInitialState() {
        return {};
    },

    roomPolicy(roomPolicies) {
        roomPolicies = _.find(roomPolicies, item => {
            return item.Type === 2;
        });
        return <span className="icon">{roomPolicies.Title}</span>;
    },

    render() {
        let {
            rooms,
            isDP,
            chooseBtn,
            baseIndex,
            showRoomDetail,
            showModifyRoomCount,
            chooseAddCart,
            closeOperation,
            pageId,
            hotelId
        } = this.props;

        const isChoose = (
            selected,
            count,
            isChooseFlag,
            index,
            shoppingUpdateParams,
            roomId,
            pageId,
            hotelId,
            balanceType
        ) => {
            let choiceTxt = "",
                chooseBtnClass = "",
                storePayTag = true;
                storePayTag = (balanceType === "FG" ? storePayTag : !storePayTag);
            if (selected && selected.count > 0) {
                if (!isChooseFlag || count.selectCount !== count.defaultCount) {
                    choiceTxt = "选择";
                    chooseBtnClass = "";
                } else {
                    choiceTxt = "已选择";
                    chooseBtnClass = "cur";
                }
            } else if (count.maxCount >= count.minCount) {
                choiceTxt = "选择";
            } else if (
                count.restCount === 0 ||
                count.maxCount < count.minCount
            ) {
                choiceTxt = "已订完";
                chooseBtnClass = "disable";
            }
            return (
                <div
                    className={"htl_btn_book " + chooseBtnClass}
                    id={`diy-${pageId}-list-addcar-${roomId}-${hotelId}`}
                    onClick={() => chooseAddCart(shoppingUpdateParams)}
                >
                    {choiceTxt}
                    {storePayTag && <i>到店付</i>}
                </div>
            );
        };

        return (
            <div>
                {_.flatMap(rooms, (subRoomItem, index) => {
                    const {
                        base = {},
                        price = {},
                        gift = {},
                        lowestPrice = {},
                        roomToken,
                        hotelToken,
                        count = {},
                        selected = {},
                        freeTag,
                        freeWifi,
                        firstBreakfast = "",
                        roomName = "",
                        roomPolicies = [],
                        tags = [],
                        isFilter,
                        roomId,
                        showTopFive,
                        isChooseFlag,
                        lastArriveLocalTime,
                        balanceType, //支付方式
                        counponTypeName
                        //isShowOperation //控制选择旁边的弹层是否显示和隐藏
                    } = subRoomItem;

                    if (!isFilter) {
                        return null;
                    }
                    //点击间数的参数
                    let priceParams = {
                        minCount: count.minCount,
                        maxCount: count.maxCount,
                        totalPrice: price.totalPrice,
                        roomToken: roomToken,
                        count: count
                    };
                    //点击选择加入购物车的参数(之前的逻辑先注释掉:点击直接预订和加入待支付的参数)
                    let shoppingUpdateParams = {
                        hotelToken: hotelToken,
                        roomToken: roomToken,
                        count: count.selectCount,
                        countChanged: count.selectCount === count.defaultCount
                    };
                    // let book = true, //点击直接预订的标志
                    // addCart = true; //点击加入待支付的标志

                    return (
                        showTopFive && (
                            <div key={index} className="detail_htl_box">
                                <div
                                    className="con_box flex_1"
                                    onClick={() => {
                                        showRoomDetail(baseIndex, index);
                                    }}
                                >
                                    <h4 className="arrow_r_s">{roomName}</h4>
                                    <a
                                        href="javascript:;"
                                        className="room_chose"
                                        onClick={e => {
                                            if (count.canModified) {
                                                showModifyRoomCount(
                                                    priceParams,
                                                    e,
                                                    baseIndex,
                                                    index
                                                );
                                            } else {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }
                                        }}
                                    >
                                        {count.selectCount}间<i className={count.canModified ? "s_down" : "grey"} />
                                    </a>
                                    {count.restCount > 0 &&
                                    count.restCount <= 5 && (
                                        <span className="room_surplus">
                                            剩{count.restCount}间
                                        </span>
                                    )}

                                    <p className="s_label_col">
                                        {lowestPrice && (
                                            <span className="icon icon_red">
                                                {lowestPrice.Name}
                                            </span>
                                        )}
                                        {freeTag && (
                                            <span className="s_label_vip">
                                                自由行专享
                                            </span>
                                        )}
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
                                            firstBreakfast &&
                                            <span className="icon icon_imp">
                                                {firstBreakfast}
                                            </span>
                                        }
                                        {
                                            base.maxPerson &&
                                            <span className="icon">
                                                {base.maxPerson}
                                            </span>
                                        }
                                        {this.roomPolicy(roomPolicies)}
                                        {freeWifi && (
                                            <span className="icon">免费wifi</span>
                                        )}
                                        {lastArriveLocalTime && (
                                            <span className="icon">{lastArriveLocalTime}前到店付</span>
                                        )}
                                    </p>
                                    {base.expedia && (
                                        <p className="room_sertxt">
                                            <span className="icon">
                                                {base.expedia}
                                            </span>
                                        </p>
                                    )}
                                </div>
                                <div className="price_box">
                                    {
                                        !_.isEmpty(counponTypeName) &&
                                        <p className="price_back">{counponTypeName}</p>
                                    }

                                    <p className="f_price">
                                        <b>均</b>
                                        <dfn>¥</dfn>
                                        <strong>
                                            {isDP ? price.averagePrice : 0}
                                        </strong>
                                    </p>
                                    <p className="f_grey">
                                        <b>总价</b>
                                        <dfn>¥</dfn>
                                        {isDP ? price.totalPrice : 0}
                                    </p>
                                    <div className="htl_btn_box">
                                        {isChoose(
                                            selected,
                                            count,
                                            isChooseFlag,
                                            index,
                                            shoppingUpdateParams,
                                            roomId,
                                            pageId,
                                            hotelId,
                                            balanceType
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    );
                })}
            </div>
        );
    }
});
