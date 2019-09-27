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
    const course_r={
      opretion:[
        {
          title:"1、注水泵启动前准备",
          url:""
        },
        {
          title:"2、注水泵启动与运转",
          url:""
        },
        {
          title:"3、注水泵停运",
          url:""
        },
        {
          title:"4、注水泵启动注意事项",
          url:""
        }
      ],
      days:[
        {
          title:"1、例行日常保养",
          url:""
        },
        {
          title:"2、一级保养",
          url:""
        },
        {
          title:"3、二级保养",
          url:""
        },
        {
          title:"4、三级保养",
          url:""
        }
      ]
    }
    return (
        <div className="courseContent">
          <BreadcrumbCustom first="注水泵实时数据" second="拆解培训教程" />
          <div className="course">
            <div className="course_l">
            <Button type="primary">操作规范</Button>
            <div className="box">
            <div data-v-68781f9a="" class="subtitle">1、注水泵启动前准备</div> 
            <div data-v-68781f9a="" class="video-block">播放视频</div>
            </div>

            </div>
            <div className="course_r">
         
            </div>
          </div>
        </div>
    )
  }
}

export default Demo
