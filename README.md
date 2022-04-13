# straumsnu.js
Display turning times of the tidal current in Saltstraumen, Norway

## Description

Straumsnu.no is a web app designed for planning scuba dives in Saltstraumen. 
The app fetches tidal info from Norwegian authorities Kartverket and displays it in a suitable way. 

The app is written without javascript frameworks. [Parcel](https://parceljs.org/) is used in develop and deploy. 

## Getting Started

### Dependencies

*  tide-offset 
*  NPM
*  Parcel
*  Requires https because the current caching implementation does

### Installing

* Clone/fork Github repo
* Build
``` 
npx parcel build ./src/index.html
```

### Executing program

*  Launch parcel server 
``` 
npx parcel ./src/index.html

```
*  Open in https://localhost:1234


## Authors

Contributors names and contact info

Dag Pedersen pedersendag@gmail.com

## Version History

* 0.0
    * initial commits only
