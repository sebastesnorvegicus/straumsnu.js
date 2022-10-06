# straumsnu.js
Display turning times of the tidal current in Saltstraumen, Norway

## Description

Straumsnu.no is a web app for displaying predicted turning times of the tidel current of Saltstraumen. 

The app fetches tidal info from Norwegian authorities Kartverket and displays it in a suitable way.
The app currently running on Straumsnu.no is written in asp.net. It is not available on Github. 

This repo holds a new Straumsnu app being developed. It will be written in javascript without frameworks.

## Specifications
Kartverket API supplies tidal data for Norway. One of the data sets is predicted amplitudes: Times and levels of future high and low tide.  

The data set is on XML format

```
<tide>
<locationdata>
<location name="Bodø" code="BOO" latitude="67.288290" longitude="14.390813" delay="0" factor="1.00" obsname="Bodø" obscode="BOO" descr="Tidevann fra Bodø"/>
<reflevelcode>CD</reflevelcode>
<data type="prediction" unit="cm">
<waterlevel value="107.0" time="2022-09-22T05:26:00+02:00" flag="low"/>
<waterlevel value="231.9" time="2022-09-22T11:37:00+02:00" flag="high"/>
<waterlevel value="113.0" time="2022-09-22T17:36:00+02:00" flag="low"/>
<waterlevel value="252.8" time="2022-09-22T23:45:00+02:00" flag="high"/>
</data>
</locationdata>
</tide>
```

The waterlevel elements here is what we are looking for: 
* The predicted time of high/low tide in Bodø
* The predicted water level at this times

* Scuba dive planners need to know when the tide in Saltsraumen will turn. This occurs 1 hour 41 minutes after high/low tide in Bodø.
So we need to add 101 min to the predicted times. 
* Scuba dive planners also need to know the difference between previous and current amplitude. This is a good measure on how strong the current will be.
* Because we are using Javascript, we need to convert data to json to operate on it.
* Since prediction data hardly changes at all, we want to cache data.
* We also want to show moon phases to the user

## Code files ##
* straumsnu.js:       Set up event handlers and calling tidetimeshifter for 7 days
* tidetimeshifter.js: Set up url, fetch data, convert til JSON and add 1:41 to times
* cache.js:           Get and cache data
* xmlText2json:       Convert from XML to json
* moonphases.js:      100 years of hard coded moon phases
* models.js:          Converting given data to viewmodel objects handy for UI rendering
* UI.js:              Functions rendering HTML


