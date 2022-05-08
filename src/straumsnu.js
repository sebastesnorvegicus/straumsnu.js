import moment from "moment";
import toDayModels from "./model.js";
import GetMoonPhaseByDay from "./moonphases.js";
import getShiftedLevels from "./tidetimeshifter.js";
import { renderHome, renderNav, renderAbout, renderDays, renderAboutDay, clearDays } from "./UI.js";

function dateChangeHandler() {
    const value = this.value;
    state.date = moment(value);
    getAndRenderDays();
}

function setDatePickerValue(date) {
    const picker = document.getElementById("dpicker");
    picker.value = date;
}

function GotoToday() {
    state.date = new moment(state.now).startOf('day');
    setDatePickerValue(state.date.format("yyyy-MM-DD"));
    getAndRenderDays();
}

function GotoNextSaturday() {
    const dayINeed = 6; // for saturday
    const currentDay = state.date.isoWeekday();

    if (currentDay < dayINeed) {
        state.date = state.date.isoWeekday(dayINeed);
    } else {
        state.date = state.date.add(1, 'weeks').isoWeekday(dayINeed);
    }
    setDatePickerValue(state.date.format("yyyy-MM-DD"));
    getAndRenderDays();
}

function GotoPreviousSaturday() {
    const dayINeed = 6; // for saturday
    const currentDay = state.date.isoWeekday();

    if (currentDay > dayINeed) {
        state.date = state.date.isoWeekday(dayINeed);
    } else {
        state.date = state.date.add(-1, 'weeks').isoWeekday(dayINeed);
    }
    setDatePickerValue(state.date.format("yyyy-MM-DD"));
    getAndRenderDays();
}

function setInitialState() {
    state.now = moment();
    state.date = moment().startOf('day');

    const params = new URLSearchParams(window.location.search);
    const nowString = params.get('now');
    const queriedNow = moment(nowString);

    if (nowString !== null && queriedNow._isValid) {
        try {
            state.now = queriedNow;
            state.date = queriedNow.startOf('day');
        } catch {

        }
    }
}

var state = {};

function addControlsEventListeners() {
    document.getElementById("previousSaturday").addEventListener('click', GotoPreviousSaturday);
    document.getElementById("nextSaturday").addEventListener('click', GotoNextSaturday);
    document.getElementById("dpicker").addEventListener('change', dateChangeHandler);
    document.getElementById("btnHome").addEventListener('click', GotoToday);    
}

function addMoonPhase(dayModels) {
    let array = [];
    dayModels.forEach(function (dayModel) {
        dayModel.moonPhase = GetMoonPhaseByDay(dayModel.day);
        array.push(dayModel);
    });
    return array;
}

function getAndRenderDays(dayCount, renderer) {
    var daysTableBodyElement = document.getElementById("renderElement");
    clearDays(daysTableBodyElement);
    getShiftedLevels(state.date, dayCount, 101)
        .then(shiftedLevels => toDayModels(shiftedLevels, state.now))
        .then(dayModels => addMoonPhase(dayModels))
        .then(dayModelWithMoonPhase => renderer(daysTableBodyElement, dayModelWithMoonPhase, state))
        .catch (error => console.error('Failed fetching and rendering data: ' + error));
}

document.addEventListener('DOMContentLoaded', () => {
    require('moment/locale/nb');
    moment.locale('nb');
    
    renderNav(document.getElementById("header"));
    setInitialState();
    if (window.location.pathname === '/about') {
        renderAbout(document.getElementById("container"));
        getAndRenderDays(1, renderAboutDay);
    } else {
        renderHome(document.getElementById("container"));
        setDatePickerValue(state.date.format("yyyy-MM-DD"));
        addControlsEventListeners();
        getAndRenderDays(7, renderDays);
    }
});