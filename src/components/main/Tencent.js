import React from 'react';
import ReactQMap from 'react-qmap';
import {Link,withRouter} from "react-router-dom";
import $ from  'jquery'
const getContianer = dom => {
    console.log(dom.childNodes)
    
    const middleControl = document.createElement('div');
    // csssprite.innerHTML = `<Link to="/login"><img  id="lx"   src="${require('../../style/imgs/spot_location.png')}" style="width: 22px;height: 100%"/><p style="color:red">华北油田采油三厂楚一联合注水站</p></Link>`;
    middleControl.style.cssText =
        'width: 123px;height: 30px;position: absolute;left: 50%;top: 50%;z-index: 999;margin-left: -23px;margin-top: -23px;';
    middleControl.innerHTML = `<Link to="/login"><img  id="lx"   src="${require('../../style/imgs/spot_location.png')}" style="width: 22px;height: 100%"/><p style="color:red">华北油田采油三厂楚一联合注水站</p></Link>`;
    dom.appendChild(middleControl);
    // let csssprite=dom.childNodes('.csssprite')
        // console.log(csssprite)
    let lx=document.getElementById('lx')

    lx.onclick=function(){

        window.document.location.href="#/app/waterData/allData"
    }
};
let height = document.body.clientHeight-90;
let classMap, windowMap;

class Tencent extends React.Component {
    render(){
      return (
        <ReactQMap
            getMap={(map, wMap) => this._getMap(map, wMap)}
            center={{ latitude: 32.1756124785, longitude: 92.0214843750 }}
            initialOptions={{ zoomControl: true, mapTypeControl: true,maxZoom:9,minZoom:0,zoom:4 }}
            apiKey="UN6BZ-MP2W6-XWCSX-M2ATU-QORGZ-OWFOE"
            style={{ height: height,cursor: "pointer" }}
            getContainer={getContianer}
            id="container"
        />
      )
    }
    componentDidMount(){

    }
    init(wMap){
        var center = wMap.LatLng(39.916527,116.397128);

    
        var anchor =new wMap.Point(6, 6),
        scaleSize=new wMap.Size(22,30),
        origin =new wMap.Point(0, 0),
        size =new wMap.Size(24, 30);
        var icon =new wMap.MarkerImage(require('../../style/imgs/spot_location.png'),size, origin, anchor,scaleSize);
        //文字描述
        var content = "<span style='color:red;width:100px;'>华北油田采油三厂楚一联合注水站</span>";
        var decoration = new wMap.MarkerDecoration(content, new qq.maps.Point(0, 30));
        var marker = new wMap.Marker({
            map: classMap,
            icon: icon,
            position: new windowMap.LatLng(30.53786, 104.07265),
            animation: windowMap.MarkerAnimation.DROP,
            decoration: decoration
                }
            );
    }
    _getMap = (map, wMap) => {
        classMap = map;
        windowMap = wMap;
        this.init(wMap);

      }

}

export default withRouter(Tencent)
