import React from 'react';
import ReactQMap from 'react-qmap';
import {Link,withRouter} from "react-router-dom";

const getContianer = dom => {

    const middleControl = document.createElement('div');
    middleControl.style.cssText =
        'width: 123px;height: 30px;position: absolute;left: 50%;top: 50%;z-index: 999;margin-left: -23px;margin-top: -23px;';
    middleControl.innerHTML = `<Link to="/login"><img  id="lx"   src="${require('../../style/imgs/spot_location.png')}" style="width: 22px;height: 100%"/><p style="color:red">华北油田采油三厂楚一联合注水站</p></Link>`;
    dom.appendChild(middleControl);
    let lx=document.getElementById('lx')
    lx.onclick=function(){

        window.document.location.href="#/app/waterData/allData"
    }
};
let height = document.body.clientHeight-90;

class Tencent extends React.Component {
    render(){
      return (
        <ReactQMap
            center={{ latitude: 38.235167, longitude: 115.732240 }}
            initialOptions={{ zoomControl: true, mapTypeControl: true,maxZoom:9,minZoom:0,zoom:4 }}
            apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
            style={{ height: height,cursor: "pointer" }}
          
            getContainer={getContianer}
        />
      )
    }
}

export default withRouter(Tencent)
