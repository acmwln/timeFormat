/**
 *
 * @author wang_ln
 *
 */
import _ from 'lodash'
import moment from 'moment'
/*
只转化引擎返回的date类型
将将对象转化成TimeSpan
返回结果：
合法   返回Number
不合法 返回null
*/
export const getResTime = obj => {      //转换成时间戳
    let temp = null;
    if (_.isString(obj)) {
        if (new RegExp("^/Date[(][-]?[0-9]+[+-]?[0-9]{4}[)]/$").test(obj)) {
            temp = Number(obj.match(/[-]?\d+/g)[0]);
        }
    }
    return temp
};

//转换引擎返回的时间   北京时间 = UTC时间 + 8h
export const getFormatDateObj = (date) => {
    const timeSpan = getResTime(date);
    //日期类型不合法
    if (_.isNull(timeSpan)) {
        return null;
    }
    let dateObj = new Date(timeSpan + 8 * 3600 * 1000);
    let year = dateObj.getUTCFullYear();
    let month = dateObj.getUTCMonth();
    let day = dateObj.getUTCDate();
    let hour = dateObj.getUTCHours();
    let minute = dateObj.getUTCMinutes();
    let second = dateObj.getUTCSeconds();

    return new Date(year, month, day, hour, minute, second);
};

export const getResFormatYMD = (data)=>{
    return moment(getFormatDateObj(data)).format('YYYY-MM-DD')
}

// 计算两个日期之间的月份数，包括time1和time2所在的两个月（日期格式为YYYY-MM-DD）
export const getMonthDiff = (time1, time2) => {
    if(moment(time1).valueOf() < moment(time2).valueOf()) {
        [time1, time2] = [time2, time1];
    }
    const dateArr1 = time1.split("-"),
        year1 = +dateArr1[0],
        month1 = +dateArr1[1];
    const dateArr2 = time2.split("-"),
        year2 = +dateArr2[0],
        month2 = +dateArr2[1];
    const monthCount = Math.abs((year1-year2) * 12 + month1 - month2 + 1)
    return monthCount
}



