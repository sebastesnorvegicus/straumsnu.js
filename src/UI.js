    function renderNav(header) {
        header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="margin-bottom:15px;">
        <button id="btnHome" type="button" class="btn" style="border: 0; focus{outline: 0}"><h3>Når snur Saltstraumen?</h3></button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item"><a href="index" class="nav-link">I dag</a></li>
                <li class="nav-item"><a href="about" class="nav-link">Om</a></li>
                <li class="nav-item"><a href="contact" class="nav-link">Kontakt</a></li>
            </ul>
        </div>
    </nav>`;
    }

function renderHome(container) {
    renderControls(container);
    renderDayTable(container);
}

function renderControls(container) {
    container.innerHTML = `
    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="margin-bottom:15px;">
            <div class="btn-group mr-2" role="group" aria-label="First group">
                <button button="" id="previousSaturday" type="button" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top"
                    title="Sist lørdag">
                    &lt;
                </button>
            </div>
            <div class="input-group mr-2">
                <div class="input-group">
                    <input id="dpicker" type="date" class="form-control form-control-sm" >
                </div>
            </div>
            <div class="btn-group mr-2" role="group" aria-label="Second group">
                <button button="" id="nextSaturday" type="button" class="btn btn-light btn-sm" data-toggle="tooltip" data-placement="top"
                    title="Kommende lørdag" >
                    &gt;
                </button>
            </div>
        </div>
`;
}

function renderDayTable(container) {
    container.innerHTML += `
        <div>
            <table class="table w-auto">
                <thead>
                    <tr>
                        <th style="background-color: aliceblue;">Dato</th>
                        <th style="background-color: aliceblue;">Bodø</th>
                        <th style="background-color: aliceblue;"></th>
                        <th style="background-color: aliceblue;">Till</th>
                        <th style="background-color: aliceblue;">Snur</th>
                        <th style="background-color: aliceblue; text-align: right;">Nivå</th>
                        <th style="background-color: aliceblue; text-align: right;">Diff</th>
                    </tr>
                </thead>
                <tbody id="renderElement">
                </tbody>
                <tfoot>
                    <tr><td colspan="7"><p><center>Alle klokkeslett er angitt i lokal tid for Saltstraumen</center></p></td></tr>
                </tfoot>
            </table>
        </div>`;
}

function renderAbout(container) {
    
    renderDayTable(container);

    container.innerHTML +=
        `<p>
            <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Detaljer
            </a>
        </p>
        <div class="collapse" id="collapseExample">
            <div class="card card-body">
                <p>Saltstraumen snur på flo og fjære, ca 1 time og 41 minutter etter flo og fjære i Bodø. Straumsnu skjer 4 eller 3 ganger i døgnet.</p>
                <p>Tabellens første kolonner <strong>Dato</strong> og <strong>Bodø</strong> viser beregnet dato og tidspunkt for flo og fjære i Bodø.</p>
                <p>Neste kolonne <strong>Till</strong> viser tillegget på 1 time og 41 minutter. </p>
                <p>Kolonnen <strong>Snur</strong> viser beregnet tidspunkt for straumsnu. <i>NB! Beregnet tidspunkt er ikke nøyaktig.</i> Det vil påvirkes av bl.a. trykk og vindforhold. Selv om dette er beste gjetning, kan Saltstraumen snu oppmot en halv time før eller etter dette tidspunktet.</p>
                <p>Kolonnen <strong>Nivå</strong> viser beregnet nivå ved flo/fjære i Bodø. Nivået er i cm over sjøkartnull.</p>
                <p>Kolonnen <strong>Diff</strong> viser forskjellen fra forrige beregnet nivå. Differansen er en god indikator på strømmens styrke. Jo større absoluttverdi, jo sterkere strøm.</p>
                <p>Løsningen benytter data som hentes fra <a href="https://www.kartverket.no/api-og-data/tidevann-og-vannstandsdata" target="_blank">Kartverket</a>.</p>
            </div>
        </div>`;
}

function clearDays(daysTBodyElement) {
    const trs = daysTBodyElement.getElementsByTagName('tr');
    const trList = Array.prototype.slice.call(trs);
    trList.forEach(element => {
        if (element.parentNode.name != 'template') {
            daysTBodyElement.removeChild(element);
        }
    });
}

function renderDays(daysTableBodyElement, days) {
    days.forEach(day => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<tr rowspan="5">
                            <td rowspan="${day.levels.length + 1}" class="table-highlighted-column" style="vertical-align: top;background-color: aliceblue;">${day.dayDisplayText}${getMoonPhaseHTML(day.moonPhase)}</td>
                        </tr>`;
        daysTableBodyElement.appendChild(tr);

        day.levels.forEach(level => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<tr>
                                <td>${level.flag}</td>
                                <td>${level.timeDisplayText}</td>
                                <td>${level.add}</td>
                                <td class="table-highlighted-column" style="background-color: aliceblue;">${level.shiftedTimeDisplayText}</td>
                                <td class="rightadjust">${level.level}</td>
                                <td class="rightadjust table-highlighted-column" style="background-color: aliceblue;">${level.diff}</td>
                            </tr>`;
            daysTableBodyElement.appendChild(tr);
        });
        const tr3 = document.createElement('tr');
        tr3.innerHTML = `<td colspan="7"></td>`;
        daysTableBodyElement.appendChild(tr3);
    });
}

function renderContact(daysTableBodyElement) {
    daysTableBodyElement.innerHTML =
        `<p style="font-size:larger">
    Straumsnu.no er utviklet av Dag Pedersen.<br />
    <br />
    Har du spørsmål eller innspill? <br />
    Ta gjerne kontakt på e-post <a href="mailto:pedersendag@gmail.com">pedersendag@gmail.com</a>.<br />
</p>`;
}

function renderAboutDay(daysTableBodyElement, days, state) {
    var allLevels = days[0].levels.concat(days[1].levels);
    var upcoming = allLevels.filter(a => a.shiftedTime > state.now);
    var next = upcoming[0];
    
    let newNode = document.createElement("div");
    newNode.innerHTML =
        `<div>
            <h5>Om tabellen</h5>
            <p style="font-size:larger">
                Det er ${state.now.format("dddd D. MMMM")}, og klokka er ${state.now.format("HH:mm")}.<br />
            </p>
            <p style="font-size:larger">
                Tabellen viser at neste straumsnu er ved <strong>${next.flag === "high" ? "flo" : "fjære"}</strong> sjø
                ${next.shiftedTime.startOf('day').isSame(state.now.startOf('day')) ? "" : "i morgen"} 
                klokka <strong>${next.shiftedTimeDisplayText}</strong>.<br/>
                Nivået vil da være ${next.level} cm, <strong>${Math.abs(next.diff)} </strong> ${next.diff > 0 ? "høyere" : "lavere"} enn ved ${next.flag === "high" ? "fjære" : "flo"}.
            </p>
        </div>`;
    var tbl = daysTableBodyElement.parentNode;
    var tblprnt = tbl.parentNode;
    tblprnt.insertBefore(newNode, tbl);
    
    days.forEach((day, index) => {

        if (index === 0 || day.levels[index].shiftedTime.startOf('day').isSame(next.shiftedTime.startOf('day'))) {
            var tr = document.createElement('tr');
            tr.innerHTML = `<tr rowspan="5">
                            <td rowspan="${day.levels.length + 1}" class="table-highlighted-column" style="vertical-align: top;background-color: aliceblue;">${day.dayDisplayText}${getMoonPhaseHTML(day.moonPhase)}</td>
                        </tr>`;
            daysTableBodyElement.appendChild(tr);

            day.levels.forEach(level => {
                tr = document.createElement('tr');
                tr.innerHTML = `<tr>
                                <td class="${level == next ? 'rowHighlight-left' : ''}">${level.flag}</td>
                                <td class="${level == next ? 'rowHighlight-middle' : ''}">${level.timeDisplayText}</td>
                                <td class="${level == next ? 'rowHighlight-middle' : ''}">${level.add}</td>
                                <td class="table-highlighted-column ${level == next ? 'rowHighlight-middle' : ''}" style="background-color: aliceblue;">${level.shiftedTimeDisplayText}</td>
                                <td class="rightadjust ${level == next ? 'rowHighlight-middle' : ''}">${level.level}</td>
                                <td class="rightadjust table-highlighted-column ${level == next ? 'rowHighlight-right' : ''}" style="background-color: aliceblue;">${level.diff}</td>
                            </tr>`;
                daysTableBodyElement.appendChild(tr);
            });
            const tr3 = document.createElement('tr');
            tr3.innerHTML = `<td colspan="7"></td>`;
            daysTableBodyElement.appendChild(tr3);
        }
    });
}

function getMoonPhaseHTML(moonPhase) {
    if (!moonPhase) {
        return '';
    } else {
        let displayText = "";
        switch (moonPhase) {
            case "FirstQuarter": displayText = "Voksende halvveis til fullmåne";
                break;
            case "LastQuarter": displayText = "Minkende halvveis til nymåne";
                break;
            case "FullMoon": displayText = "Fullmåne";
                break;
            case "NewMoon": displayText = "Nymåne";
                break;

            default: displayText = "Invalid moonphase " + moonPhase;
                break;
        }
        return `<center><br /><br /><img width="12" height="12" Title="${displayText}" src="images/${moonPhase}.svg" alt="Månefase ${moonPhase}" /></center>`
    }
}

function cap1stLetter(s) {
    return s[0].toUpperCase() + s.substr(1)
}

function renderFooter(container, state) {
    const div = document.createElement('div');
    div.innerHTML = `<footer style="padding-bottom: 15px;">
        Data: <a href="https://www.kartverket.no/api-og-data/tidevann-og-vannstandsdata" target="_blank">Kartverket</a>
        <br>
        Med forbehold om feil.<br>
        <a href="mailto:pedersendag@gmail.com">Dag Pedersen</a> © 2009 - 2022
    </footer>`;
    container.appendChild(div);
}

export { renderNav, renderHome, renderAbout, renderDays, renderAboutDay, clearDays, renderContact, renderFooter };