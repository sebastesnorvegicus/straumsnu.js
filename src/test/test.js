import xmlText2json from "../xml2json";

function init() {
    fetch("https://api.sehavniva.no/tideapi.php?lat=67.288290&lon=14.390813&fromtime=2022-04-06&totime=2022-04-07&datatype=tab&refcode=cd&place=&file=&lang=nb&interval=10&dst=1&tzone=&tide_request=locationdata")
        .then(res => res.text())
        .then(xml => xmlText2json(xml))
        .then(data => document.getElementById("root").innerText = data);
}

document.addEventListener('DOMContentLoaded', () => {
    init();
});
