# straumsnu.js
Display turning times of the tidal current in Saltstraumen, Norway

## Description

Straumsnu.no is a web app for planning scuba dives in Saltstraumen. 
The app fetches tidal info from Norwegian authorities Kartverket and displays it in a suitable way. 
The app currently running on Straumsnu.no is written in asp.net. It is not available on Github. 

This repo holds a new Straumsnu app being developed. It will be written in javascript without frameworks.

## Getting Started

### Dependencies

*  [NPM](https://www.npmjs.com/)
*  [Parcel](https://parceljs.org/)
*  [Bootstrap 5.1](https://getbootstrap.com/docs/5.1)
*  [Moment](https://momentjs.com/)

### Installing / executing

* Clone/fork Github repo
* Install dependencies:
``` 
npx install
```
* Build and launch app on local development server:
``` 
npx parcel .\src\index.html
```
*  Open https://localhost:1234

## Author

Dag Pedersen pedersendag@gmail.com

## Version History

* 0.1
    * First running build
