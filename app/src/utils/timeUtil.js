import moment from 'moment'
import log2   from './log2'
const log = log2("timeUtil.js->");
export const timeDiff=(startTime, endTime) => {
    //log(startTime,endTime);
    startTime = moment(startTime);
    endTime = moment(endTime);
    var duration=moment.duration(startTime.diff(endTime));
    var difference={
        year: duration.asYears(),
        month: duration.asMonths(),
        day: duration.asDays(),
        hours: duration.asHours(),
        minute: duration.asMinutes(),
        second: duration.asSeconds()
    };
    //log(difference)
    return difference;
};