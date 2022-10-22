# straumsnu.js
Display turning times of the tidal current in Saltstraumen, Norway

## Description

Straumsnu.no is a web app for displaying predicted turning times of the tidal current of Saltstraumen. 

The app fetches tidal info from Norwegian authorities Kartverket and displays it in a suitable way.
The app currently running on Straumsnu.no is written in asp.net. It is not available on Github. 

This repo holds a new Straumsnu app being developed. It will be written in javascript without frameworks.

## Specifications
Kartverket API supplies tidal data for Norway. One of the datasets is Predicted amplitudes for locations i Norway. 

The predicted amplitudes dataset is on XML format, and contains times and levels of high and low tide:  

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

The waterlevel elements are the interesting data for this app: 
* The predicted time of high/low tide in Bodø
* The predicted water level at these times

What does the app do with this information?
* Scuba dive planners need to know when the tide in Saltsraumen will turn. This occurs 1 hour 41 minutes after high/low tide in Bodø. So we need to add 101 minutes to the predicted times. 
* We also need to calculate the difference between previous and current amplitude. This difference is a good measure on how strong the current will be.
* Because we are using Javascript, we need to convert kartverket's XML data to json to operate on it.
* Since prediction data rarely changes, we want to cache data to improve performance
* We also want to show moon phases to the user

## Code files ##
* straumsnu.js:       Set up event handlers and calling tidetimeshifter for 7 days
* tidetimeshifter.js: Set up url, call code that fetches data and converts to JSON. Then it adds 1:41 to fetched times.
* cache.js:           Get and cache data
* xmlText2json:       Convert from XML to json
* moonphases.js:      100 years of hard coded moon phases
* models.js:          Converting given data to viewmodel objects handy for UI rendering
* UI.js:              Functions rendering HTML
