import moment from 'moment'

export const formatMinutesToString = minutes => {
    try {
        if (typeof minutes === 'string') {
            minutes = parseInt(minutes)
        }
    } catch(exception) {
        throw new Error('Parse string to integer error.')
    }


    const momentDuration = moment.duration(minutes, 'minutes')

    let day = 0
    let hour = ''
    let minute = ''

    if (momentDuration.days() || momentDuration.hours() > 0) {
        let tempHoursCount = momentDuration.days()*24 + momentDuration.hours()
        hour = `${tempHoursCount}h`
    }

    if (momentDuration.minutes() > 0) {
        minute = `${momentDuration.minutes()}m`
    }

    return `${hour}${minute}`
}

export const getTimestampFromServer = dateTimeString => {
    try {
        let timestamp = ''

        if (dateTimeString.indexOf("Date") > -1) {
            timestamp = dateTimeString.match(/(\d+)/)[0]
        }

        timestamp = parseInt(timestamp, 10)
        // moment().utcOffset(0)
        return timestamp
    } catch (error) {
        return null
    }
}

export const formatDateTimeFromServer = dateTimeString => {
    try {
        let timestamp = ''

        if (dateTimeString.indexOf("Date") > -1) {
            timestamp = dateTimeString.match(/(\d+)/)[0]
        }

        timestamp = parseInt(timestamp, 10)
        return moment.utc(timestamp).utcOffset(8)
    } catch (error) {
        return null
    }
}
