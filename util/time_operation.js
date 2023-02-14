const moment = require("moment");

function toDBFormat(date) {
    return date.toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '');    // delete the dot and everything after
}

function toDate(year, month, day) {
    return new Date(`${year}/${month}/${day}`);
}
function toDateByWeek(year, week, firstDay) {
    if (!firstDay)
        firstDay = 0;
    let offset = new Date(year, 0, 1).getDay();
    return new Date(year, 0, 1 + firstDay - offset + (week - 1) * 7, 0, 0, 0, 0);
}

function fromDate(date) {
    let year = yearNumber(date);
    let month = monthNumber(date);
    let day = dayNumber(date);
    return { year, month, day };
}

function getLARange(date) {
    let start_date = hoursLater(8, date);
    let end_date = daysLater(1, start_date);
    return {
        start_date,
        end_date
    };
}

function diffInSecond(t1, t2, abs) {
    let ans = (parseInt((t1 - t2) / 1000));
    if (abs)
        ans = Math.abs(ans);
    return ans;
}
function diffInMinute(t1, t2, abs) {
    return parseInt(diffInSecond(t1, t2, abs) / 60);
}
//year
function yearNumber(date = null) {
    if (!date)
        date = new Date();
    return date.getUTCFullYear();
}
function beginningOfYear(date = null) {
    date = beginningOfMonth(date);
    date.setUTCMonth(0);
    return date;
}
//month
function monthNumber(date = null) {
    if (!date)
        date = new Date();
    return date.getUTCMonth() + 1;
}
function beginningOfMonth(date = null) {
    date = beginningOfDay(date);
    date.setUTCDate(1);
    return date;
}
function endOfMonth(date = null) {
    date = beginningOfMonth(date);
    date = monthsLater(1, date);
    date = secondsAgo(1, date);
    return date;
}
//week
function weekNumber(date = null) {
    if (!date)
        date = new Date();
    let first = beginningOfYear(date);
    let secs = diffInSecond(date, first, true);
    return parseInt(secs / 60 / 60 / 24 / 7) + 1;
}
function beginningOfWeek(date = null) {
    date = beginningOfDay(date);
    let day = (date.getDay() - 1) % 7;
    return daysAgo(day, date);
}
function endOfWeek(date = null) {
    date = beginningOfWeek(date);
    return secondsAgo(1, daysLater(7, date));
}
// day
function dayNumber(date = null) {
    if (!date)
        date = new Date();
    return date.getUTCDate();
}
function beginningOfDay(date = null) {
    date = beginningOfHour(date);
    date.setUTCHours(0);
    return date;
}
function endOfDay(date = null) {
    date = beginningOfDay(date);
    return daysLater(1, date);
}
function dayNumberInYear(date = null) {
    if (!date)
        date = new Date();
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = date - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}
function addedDaysInMonth(days, date) {
    date = beginningOfMonth(date);
    return daysLater(days, date);
}
//hour
function hourNumberInWeek(date = null) {
    if (!date)
        date = new Date();
    let first = beginningOfWeek(date);
    let secs = diffInSecond(date, first, true);
    return parseInt(secs / 3600);
}
function hourNumberInMonth(date = null) {
    if (!date)
        date = new Date();
    let first = beginningOfMonth(date);
    let secs = diffInSecond(date, first, true);
    return parseInt(secs / 3600);
}
function addedHoursInWeek(hours, date) {
    date = beginningOfWeek(date);
    return hoursLater(hours, date);
}
function beginningOfHour(date = null) {
    if (!date)
        date = new Date();
    else
        date = new Date(date);
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    return date;
}
// ago
function monthsAgo(num, date) {
    return monthsLater(num * -1, date);
}

function daysAgo(num, date) {
    return daysLater(num * -1, date);
}

function hoursAgo(num, date) {
    return hoursLater(num * -1, date);
}

function minutesAgo(num, date) {
    return minutesLater(num * -1, date);
}

function secondsAgo(num, date) {
    return secondsLater(num * -1, date);
}
// later
function later(num, type, date = null) {
    if (!date)
        date = new Date();
    else
        date = new Date(date);
    return moment(date).add(num, type).toDate();
}

function monthsLater(num, date) {
    return later(num, 'months', date);
}

function daysLater(num, date) {
    return later(num, 'days', date);
}

function hoursLater(num, date) {
    return later(num, 'hours', date);
}

function minutesLater(num, date) {
    return later(num, 'minutes', date);
}

function secondsLater(num, date) {
    return later(num, 'seconds', date);
}

function getDuration(startDate, endDate, zeroAllOnPassed = false) {
    if (!endDate)
        endDate = new Date();
    let s = moment(startDate);
    let e = moment(endDate);
    let passed = e < s;
    let year = e.diff(s, 'years', false);
    s.add(year, 'years');
    let month = e.diff(s, 'months', false);
    s.add(month, 'months');
    let day = e.diff(s, 'days', false);
    s.add(day, 'days');
    let hour = e.diff(s, 'hours', false);
    s.add(hour, 'hours');
    let minute = e.diff(s, 'minutes', false);
    s.add(minute, 'minutes');
    let second = e.diff(s, 'seconds', false);
    s.add(second, 'seconds');

    if (passed)
        if (zeroAllOnPassed)
            year = month = day = hour = minute = second = 0;
    let total = year * 12 + month;
    total = total * 30 + day;
    total = total * 24 + hour;
    total = total * 60 + minute;
    total += second;

    return {
        passed, year, month, day, hour, minute, second, total
    };
}

function calculateAge(date) {
    let birthday = new Date(date);
    let ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
    toDBFormat,
    toDate,
    toDateByWeek,
    fromDate,
    getLARange,

    diffInSecond,
    diffInMinute,

    yearNumber,
    beginningOfYear,

    monthNumber,
    beginningOfMonth,
    endOfMonth,

    weekNumber,
    beginningOfWeek,
    endOfWeek,

    dayNumber,
    beginningOfDay,
    endOfDay,
    dayNumberInYear,
    addedDaysInMonth,

    hourNumberInWeek,
    hourNumberInMonth,
    addedHoursInWeek,
    beginningOfHour,

    monthsAgo,
    daysAgo,
    hoursAgo,
    minutesAgo,
    secondsAgo,

    monthsLater,
    daysLater,
    hoursLater,
    minutesLater,
    secondsLater,
    getDuration,
    calculateAge
};