import moment from "moment";

function toLevelModel(level) {
    const shiftMinutes = moment.duration(level.shiftedTime.diff(level.time)).asMinutes();
    return ({
        flag: level.flag == 'low' ? 'Fjære' : 'Flo',
        time: level.time,
        timeDisplayText: level.time.format("HH:mm"),
        add: '' + Math.floor(shiftMinutes / 60) + ':' + shiftMinutes % 60,
        shiftedTime: level.shiftedTime,
        shiftedTimeDisplayText: level.shiftedTime.format("HH:mm"),
        level: Math.round(level.value),
        diff: Math.round(level.diff)
    });
}

function cap1stLetter(s) {
    return s[0].toUpperCase() + s.substr(1)
}

function getDayDisplayText(day, now) {
    var prefix = cap1stLetter(day.format("dddd "));
    var postFix = "";

    if (now.isSame(day, 'day')) {
        prefix = "I dag ";
    }
    if (new moment(now).add(1, 'days').isSame(day, 'day')) {
        prefix = "I morgen ";
    }
    if (!now.isSame(day, 'year')) {
        postFix = day.format(" yyyy");
    }
    return prefix + day.format("D. MMMM") + postFix;

}

function toDayModels(shiftedLevels, now) {
    let dayLevel = null;
    let daylevels = [];
    let day = null;
    for (let i = 0; i < shiftedLevels.length; i++) {
        const time = shiftedLevels[i].shiftedTime;
        if (!moment(time).startOf('day').isSame(day)) {
            day = moment(time).startOf('day');
            dayLevel = {
                day: day,
                dayDisplayText: getDayDisplayText(day, now),
                levels: [toLevelModel(shiftedLevels[i])]
            }
            daylevels.push(dayLevel);
        } else {
            dayLevel.levels.push(toLevelModel(shiftedLevels[i], shiftedLevels[i - 1]));
        }
    }
    return daylevels;
}

export default toDayModels;