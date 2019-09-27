import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import {POST} from '../../axios/tools'
import {getCookie,setCookie,clone} from '../../utils/index'
import pumpinfor from '@/style/imgs/泵信息.png'
import { Button,Tabs,List,Typography} from 'antd';
import '../../style/waterData/realData.less'
import moment from 'moment';

const Authorization  = getCookie("Authorization");
const { TabPane } = Tabs;




class Demo extends React.Component {
  constructor(props){
    super(props);
  }


  getLastData(){
    console.log(Authorization);
    POST('/wTimeData/listForEach',{},Authorization).then((res)=>{
        if(res.code == 200 && res.data.timeDataList){
          let dataList = res.data.timeDataList;
            this.setState({
              datalist1:dataList.slice(0,3),
              dataList2:dataList.slice(3,6),
              dataList3:[],
              dataList:''
            })
        }
    })
  }
  ontabChange(){

  }
  render() {

    return (
        <div className="realData">
          <BreadcrumbCustom first="注水泵实时数据" second="拆解培训教程" />

        </div>
    )
  }
}

export default Demo
