
import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Row, Col, Card,Select,DatePicker,Button} from 'antd';
import SearchList from './searchList'
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';

import RechartsSimpleLineChart from '../charts/RechartsSimpleLineChart';
import {POST} from '../../axios/tools'
import {getCookie,setCookie} from '../../utils/index'
import '../../style/waterData/realLine.less'
const Authorization=getCookie("Authorization");
const { Option } = Select;

class HistoryLine extends React.Component {
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    this.state={
      pumpList:[],
      dropList:[],
      dataList:[],
      id:'',
      startDate:'',
      endDate:'',
      mapData : [
        [
          {
            stroke:'#0fd59d',
            dataKey:'EXPORT_PRESSURE',
            show:true,
            name:"进口压力",
            arr:[
              {name: '22:32:57', 进口压力: 3, 出口压力: 23, amt: 87},
              {name: '22:55:33', 进口压力: 3.7, 出口压力: 25, amt: 87},
              {name: '00:16:23', 进口压力: 4, 出口压力: 24.8, amt: 87},
              {name: '23:16:55', 进口压力: 5, 出口压力: 23, amt: 87},
              {name: '23:17:43', 进口压力: 3, 出口压力: 23, amt: 87},
              {name: '23:18:28', 进口压力: 2.9, 出口压力: 23, amt: 87},
              {name: '23:18:35', 进口压力: 2.3, 出口压力: 23, amt: 87},
          ]
          },
          {
            stroke:'#1BAAE4',
            dataKey:'IMPORT_PRESSURE',
            show:true,
            name:"出口压力",

          },
        ],
        [
          {
            stroke:'#0fd59d',
            dataKey:'LUBRICATING_OIL_TEMPERATURE',
            name:'润滑油温度',
            show:true,
            arr:[
              {name: '22:32:57', 润滑油温度: 3, 润滑油液位: 23, 电机温度: 87},
              {name: '22:55:33', 润滑油温度: 3.7, 润滑油液位: 25, 电机温度: 87},
              {name: '00:16:23', 润滑油温度: 4, 润滑油液位: 24.8, 电机温度: 87},
              {name: '23:16:55', 润滑油温度: 5, 润滑油液位: 23, 电机温度: 87},
              {name: '23:17:43', 润滑油温度: 3, 润滑油液位: 23, 电机温度: 87},
              {name: '23:18:28', 润滑油温度: 2.9, 润滑油液位: 23, 电机温度: 87},
              {name: '23:18:35', 润滑油温度: 2.3, 润滑油液位: 23, 电机温度: 87},
          ]
          },
          {
            stroke:'#1BAAE4',
            dataKey:'LUBRICATING_OIL_LEVEL',
            name:"润滑油液位",
            show:true
          },
          {
            stroke:'#ec7259',
            dataKey:'MOTOR_TEMPERATURE',
            name:'电机温度',
            show:true
          },
        ],
        [
          {
            stroke:'#0fd59d',
            name:'电机A相电流',
            dataKey:'MOTOR_A_PHASE_CURRENT',
            show:true,
            arr:[
              {name: '22:32:57', 电机A相电流: 3, 电机B相电流: 23, amt: 87},
              {name: '22:55:33', 电机A相电流: 3.7, 电机B相电流: 25, amt: 87},
              {name: '00:16:23', 电机A相电流: 4, 电机B相电流: 24.8, amt: 87},
              {name: '23:16:55', 电机A相电流: 5, 电机B相电流: 23, amt: 87},
              {name: '23:17:43', 电机A相电流: 3, 电机B相电流: 23, amt: 87},
              {name: '23:18:28', 电机A相电流: 2.9, 电机B相电流: 23, amt: 87},
              {name: '23:18:35', 电机A相电流: 2.3, 电机B相电流: 23, amt: 87},
            ]
          },
          {
            stroke:'#1BAAE4',
            name:'电机B相电流',
            dataKey:'MOTOR_B_PHASE_CURRENT',
            show:true
          },
          {
            stroke:'#ec7259',
            name:'电机C相电流',
            dataKey:'MOTOR_C_PHASE_CURRENT',
            show:true
          },
        ]
  
    ],  

        
    }
    // React.axios('/wTimeData/listForEach','post1',{})
    this.init();
  }
  handleChange(value) {
    this.setState({
      id:value
    })
  
  }
  componentDidMount() {
    POST('/wInfo/pumpList',{},Authorization).then((res)=>{
        if(res.code == 200 && res.data.pumpList){
            this.setState({
              dropList:res.data.pumpList
            })
        }
    })
  }
  onSearchBtnClick(){
    if(!this.state.id){
      message.warning('请选择水泵！');
      return false
    }
    if(!this.state.startDate){
      message.warning('请选择查询时间！');
      return false
    }
    let param = {
      id:this.state.id,
      pageNumber:1,
      pageSize:500,
      startDate:this.state.startDate,
      endDate:this.state.endDate,
    }
    this.setState({
      loading:true
    })
    POST('/wHistoryData/oneHistory',param,Authorization).then((res)=>{
        let data = [];
        if(res.code == 200 && res.data.tableData){
            data = res.data.tableData
        }
        this.setState({
          pumpList:data,
          loading:false,
        })
    })
  }
  async init(){
  //   const data= await POST('/wHistoryData/oneHistory',{
  //     id:1,
  //     startDate: "2019-08-01",
  //     endDate: "2019-08-02",
  //     pageNumber: "1",
  //     pageSize: "1000"	
  //   },Authorization);
  //   let sliceArr=[];
  //   let arr=data.data.tableData
  // //   let i=0;
  // //   while (i < arr.length) {
  // //    sliceArr.push(arr[i])
  // //    i+=3;
  // //  }
  //   this.setState({pumpList:arr})
  }
  change(item){
    item.show=!item.show;
    this.setState({mapData:this.state.mapData});
}
onDateChange(date, dateString){
  this.setState({
    startDate:dateString,
    endDate:dateString,
  })
}
  render() {
    const data=[{"address":"2","name":"1#注水泵","id":2, uv: 4000, pv: 2400, amt: 2400},{"address":"1","name":"2#注水泵","id":1, uv: 4000, pv: 2400, amt: 2400},{"address":"3","name":"3#注水泵","id":3, uv: 4000, pv: 2400, amt: 2400},{"address":"4","name":"4#注水泵","id":4, uv: 4000, pv: 2400, amt: 2400},{"address":"5","name":"5#注水泵","id":5, uv: 4000, pv: 2400, amt: 2400},{"address":"6","name":"6#注水泵","id":6},{"address":"7","name":"7#注水泵","id":7},{"address":"8","name":"8#注水泵","id":8}];
 
    return (
        <div className="realLine">
        <BreadcrumbCustom first="数据总览" second="历史数据" />
        <Select placeholder="请选择水泵" style={{ width: 140 ,marginLeft:'10px'}} onChange={this.handleChange.bind(this)}>
              {this.state.dropList.map((item,index)=>(
                <Option key={index} value={item.id}>{item.name}</Option>
              ))}
        </Select>
            <DatePicker locale={locale} style={{ marginLeft:'10px'}} className="middel" format="YYYY-MM-DD" placeholder="请选择时间" onChange={this.onDateChange.bind(this)} />
            <Button type="primary" style={{marginLeft:'10px'}} onClick={this.onSearchBtnClick.bind(this)}>查询</Button>
          <div className="realLine_b" >
          <h2>历史曲线</h2>
          {this.state.mapData.map((item,index)=>(
          <Row key={index} gutter={16}>
                    <Col className="gutter-row" md={20}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <RechartsSimpleLineChart type="1" pumpList={this.state.pumpList} change={this.change} data={item} />
                            </Card>
                        </div>
                    </Col>
                </Row>
            ))}

          </div>
        </div>
    )
  }
}

export default HistoryLine