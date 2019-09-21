import React from 'react';
import ReactQMap from 'react-qmap';
import {Link} from 'react-router-dom'
const getContianer = dom => {
    const middleControl = document.createElement('div');
    middleControl.style.cssText =
        'width: 22px;height: 30px;position: absolute;left: 50%;top: 50%;z-index: 999;margin-left: -23px;margin-top: -23px;';
    middleControl.innerHTML = `<img id="lx"   src="${require('../../style/imgs/spot_location.png')}" style="width: 100%;height: 100%"/>`;
    dom.appendChild(middleControl);
    let lx=document.getElementById('lx')
    lx.onclick=function(){
        window.history.push('/allData')
    }
};
let height = document.body.clientHeight-150;

export default () => {
    
    return(

    <ReactQMap
        center={{ latitude: 34.344570, longitude: 108.932190 }}
        initialOptions={{ zoomControl: true, mapTypeControl: true,maxZoom:9,minZoom:0,zoom:4 }}
        apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
        style={{ height: height,cursor: "pointer" }}
        mySpot={{ latitude: 38.235167, longitude: 115.732240 }}
        getContainer={getContianer}
    />
)};
