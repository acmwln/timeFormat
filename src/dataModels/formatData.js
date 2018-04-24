
import * as DiyCommon from "../utils/timeFormat.js";
import * as mockData from "./mockData.js";
import _ from "lodash";
import moment from "moment";


 //使用日期转换方法进行日期的转换
const regroupTime = (room) => {
    const {Shopping = {}} = room;
    const {
        LastArraiveBeijingDateTime,
        LastArraiveLocalDateTime
    } = Shopping;
    let lastArriveBeijingTime,lastArriveLocalTime;
    if(DiyCommon.getResTime(LastArraiveBeijingDateTime) < 0){
        lastArriveBeijingTime = ""
    }else {
        lastArriveBeijingTime = moment(DiyCommon.getFormatDateObj(LastArraiveBeijingDateTime)).format("HH:mm")
    }
    if(DiyCommon.getResTime(LastArraiveLocalDateTime) < 0){
        lastArriveLocalTime = ""
    }else {
        lastArriveLocalTime =  moment(DiyCommon.getFormatDateObj(LastArraiveLocalDateTime)).format("HH:mm")
    }

    return {
        lastArriveBeijingTime,
        lastArriveLocalTime,
    }
}
const regroupGift = hotelRoom => {
    const { Basic = {} } = hotelRoom;
    const { GiftDescription, GiftEffectDate, GiftExpireDate } = Basic;
    return {
        desc: GiftDescription || "",
        effectDate: moment(DiyCommon.getFormatDateObj(GiftEffectDate)).format("YYYY年MM月DD日"),
        expireDate: moment(DiyCommon.getFormatDateObj(GiftExpireDate)).format("YYYY年MM月DD日"),
    };
};
const regroupSubBaseInfo = hotelRoom => {
    const { Basic = {} } = hotelRoom;
    const { PicUrl, Person, AllPicUrls = [] } = Basic;
    let smallImg, largeImg,originImg;
    _.each(AllPicUrls, item => {
        smallImg = item.SmallImageUrl,
        largeImg = item.LargeImageUrl;
        originImg = item.OriginalImageUrl.replace(/\{0\}(?=\.)/,'_R_750_400'); //正向肯定查找
    });
    return {
        spic: PicUrl || smallImg,
        lpic: largeImg, 
        maxPerson: Person > 9 ? "N" : '最大可入住'+ Person + '人', //可入住人数
    };
};
const regroupPrice = (hotelRoom) => {
    const { Shopping = {} } = hotelRoom;
    const { DefaultCount, DailyAveragePrice} = Shopping;
    return {
        totalPrice: Math.ceil(DailyAveragePrice * DefaultCount) || 0, //总价  
        averagePrice: Math.ceil(DailyAveragePrice) || 0, //每日均价
    };
};

/**
 * 子房型数据信息
 * @param {*} hotelRoom
 * @param {*} HotelToken
 */
const regroupSubRoom = (hotelRoom) => {
    const {
        RoomName,
    } = hotelRoom;
    return {
        RoomName: RoomName,
        base: regroupSubBaseInfo(hotelRoom),
        gift: regroupGift(hotelRoom),
        price: regroupPrice(hotelRoom),
        lastArriveBeijingTime: regroupTime(hotelRoom).lastArriveBeijingTime,    //最晚到店北京时间
        lastArriveLocalTime: regroupTime(hotelRoom).lastArriveLocalTime,    //最晚到店当地时间
    };
};

/**
 * 重构酒店房型数据
 */
export const formateHotelRoom = () => {
    if(_.isEmpty(mockData.response)) return null;
    const { Rooms = [] } = mockData.response;
    let baseRoomObj = {}, //基础房型对象
        baseRoomIdArr = [], //基础房型id存储
        resultObj = {},
        roomModel = []; //存储所有有关房型数据
    //group same room
    baseRoomObj = _.groupBy(Rooms, function(item) {
        return item.BaseRoomId;
    });
    _.forEach(Rooms, item => {
        baseRoomIdArr.push(item.BaseRoomId);
    });
    baseRoomIdArr = _.uniq(baseRoomIdArr);
    
    _.forEach(baseRoomObj, function(baseItem, index) {
        //index是基础房型ID
        resultObj[index] = {};
        let arr = [],
            obj = null;
        _.forEach(baseRoomObj[index], function(item, i) {
            const { Basic = {}, Shopping = {}, BaseRoomName } = item;
            const { PicUrl, GiftDescription, AllPicUrls = [] } = Basic;
            const { DailyAveragePrice } = Shopping;
            let smallImg;
            _.each(AllPicUrls, item => {
                smallImg = item.SmallImageUrl;
            });
            if (i === 0) {
                baseRoomObj[index].base = {
                    spic: PicUrl, //基础房型图片
                    baseRoomId: +index,
                    baseRoomName: BaseRoomName || "",
                    averagePrice: Math.ceil(DailyAveragePrice | 0), //每日均价
                    gift: GiftDescription ? true : false, //礼品描述
                };
            }
             obj = regroupSubRoom(item);
            arr.push(obj);
        });
        resultObj[index].base = baseRoomObj[index].base;
        resultObj[index].rooms = arr;
    });
    _.forEach(baseRoomIdArr, function(item) {
        roomModel.push(resultObj[item]); //子房型赋给roomModel
    });
    return {roomModel};
};