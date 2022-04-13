# straumsnu.js
Display turning times of the tidal current in Saltstraumen, Norway

## Description

Straumsnu.no is a web app for planning scuba dives in Saltstraumen. 
The app fetches tidal info from Norwegian authorities Kartverket and displays it in a suitable way. 
The app currently running on Straumsnu.no is written in asp.net. It is not available on Github. 

This repo holds a new Straumsnu app being developed. It will be written in javascript without frameworks.
[Parcel](https://parceljs.org/) is used to build. 

## Getting Started

### Dependencies

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


## Author

Dag Pedersen pedersendag@gmail.com

## Version History

* 0.0
    * initial commits only
