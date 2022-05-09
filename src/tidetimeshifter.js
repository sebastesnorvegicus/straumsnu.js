import moment from "moment";
import getData from "./cache";
import xmlText2json from "./xml2json";

/** Get astronomically predicted low / high tide level objects from kartverket.no for a period
 * @returns an array of objects with properties
 *      { @property {number} value         - sea level at high/low tide
 *        @property {moment} time          - time of high/low tide
 *        @property {string} flag          - "high" or "low"
 *        @property {moment} shiftedTime   - time + parameter shiftMinutes
 *        @property {number} diff          - value difference from previous level
 *        @property {number} utcOffsetDiff - utcOffset difference from previous level (60 or -60)
 *       }
 * @param {moment} fromTime Period of interest's start time
 * @param {number} days Period length in days 
 * @param {number} shiftMinutes minutes to add to get shifted time
 */
async function getShiftedLevels(from, days, shiftMinutes) {

    // period of interest
    const to = from.clone().add(days, 'd');
    // minimum period to get is one day earlier (for diff on first level)
    const getMinimumFrom = from.clone().add(-1, 'd');
    const getMinimumTo = to.clone().add(1, 'd');
    // period to get/cache: Rounded to month 
    const getFrom = getMinimumFrom.clone().startOf('month');
    const getTo = getMinimumTo.clone().endOf('month');

    const url = `https://api.sehavniva.no/tideapi.php?lat=67.288290&lon=14.390813&fromtime=${getFrom.format()}&totime=${getTo.format()}&datatype=tab&refcode=cd&place=&file=&lang=nb&interval=10&dst=1&tzone=&tide_request=locationdata`;

    console.log("Period of interest : ", from.format(), to.format());
    console.log("Period to get/cache: ", getFrom.format(), getTo.format());
    
    const data = await getData(url)
        .then(xmlText => xmlText2json(xmlText))
        .then(json => extractLevelsFromJsonObject(json))
        .then(levels => shiftLevels(levels, shiftMinutes))
        .then(shiftedLevels => shiftedLevels
            .filter(lev =>
                lev.shiftedTime.isAfter(from)
                && lev.shiftedTime.isBefore(to)
            ));
    return data;
};

function extractLevelsFromJsonObject(json) {
    if (!json) {
        throw "no JSON data";
    }
    return JSON.parse(json).tide.locationdata.data.waterlevel;        
}

function shiftLevels(levels, shiftMinutes) {
    return levels.map((level, index, array) => {
        const _shiftedTime = moment(level.time).add(shiftMinutes, 'm');
        const _utcOffsetDiff = index > 0
            ? _shiftedTime.utcOffset() - moment(array[index - 1].time).add(shiftMinutes, 'm').utcOffset()
            : 0;
        return {
            value: level.value,
            time: moment(level.time),
            shiftedTime: _shiftedTime,
            flag: level.flag,
            diff: index > 0 ? level.value - array[index - 1].value : null,
            utcOffsetDiff: _utcOffsetDiff
        }
    });
}

export default getShiftedLevels;