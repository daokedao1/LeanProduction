import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Button,Row, Col, Car, Card} from 'antd';
import RechartsSimpleLineChart from '../charts/RechartsSimpleLineChart';
import {POST} from '../../axios/tools'
import {getCookie,setCookie} from '../../utils/index'

import '../../style/waterData/realLine.less'
const Authorization=getCookie("Authorization");

class RealLine extends React.Component {
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    const Authorization=getCookie("Authorization");
    
    this.state={
      currentLineName:'1#注水泵',
      curtabid:1,
      pumpList:[],
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
   this.init(Authorization);
   setInterval(()=>{this.initData()},1000)

  }
  componentDidMount() {

  }
  async init(Authorization){
    this.initAllData(1)
  
  }
  async initAllData(id = 1){
    const data= await POST('/wTimeData/oneCurrent',
    {"id":id,
      "currentColumn":{
        "chart1":["EXPORT_PRESSURE","IMPORT_PRESSURE"],
        "chart2":["LUBRICATING_OIL_TEMPERATURE","LUBRICATING_OIL_LEVEL","MOTOR_TEMPERATURE"],
        "chart3":["MOTOR_A_PHASE_CURRENT","MOTOR_B_PHASE_CURRENT","MOTOR_C_PHASE_CURRENT","MOTOR_A_PHASE_VOLTAGE","MOTOR_B_PHASE_VOLTAGE","MOTOR_C_PHASE_VOLTAGE"],
        "chart4":["CYLINDER1_NOISE","CYLINDER2_NOISE","CYLINDER3_NOISE","CYLINDER4_NOISE","CYLINDER5_NOISE"]
      }
    }
    ,Authorization);
    const {mapData,pumpList}=this.state;
    const chart1=data.data.chartData.chart1;
    const chart2=data.data.chartData.chart2;
    const chart3=data.data.chartData.chart3;
    let arr=[];
    let obj={};
   let data1= this.handleData(chart1,chart2,chart3);
   let lx=data1.slice(35000,data1.length);
   console.log(data1)
    arr=[...pumpList,...lx];
    this.setState({pumpList:arr})
  }
  handleData(chart,chart1,chart2){
    let data=[chart,chart1,chart2]
    let obj={};
    let arr=[];
    for(let v of data){
      for(let key of v.rows){
        for(let item in key){
          for(let i in v.columns){
            if(item===i){
              if(item==='0'){
                obj[v.columns[i]]=key[item].substring(10);
              }else{
                obj[v.columns[i]]=key[item];
              }
              arr.push(obj)
           
            }
        }
      }
      }
    }

      return arr;
  }
  async initData(){
    const data= await POST('/wTimeData/listForEach',{
    },Authorization);
    const {pumpList}=this.state;
    pumpList.push(data.data.timeDataList)
    console.log(pumpList);
    this.setState({pumpList:pumpList})
  }
  tab(item){
    this.initAllData(item.id);
    this.setState({
      curtabid:item.id,
      currentLineName:item.name
    });
  }
  change(item){
    item.show=!item.show;
    this.setState({mapData:this.state.mapData});
}
  render() {
    const data=[
      {"name":"1#注水泵","id":1},
      {"name":"2#注水泵","id":2},
      {"name":"3#注水泵","id":3},
      {"name":"4#注水泵","id":4},
      {"name":"5#注水泵","id":5},
      {"name":"6#注水泵","id":6},
      {"name":"7#注水泵","id":7},
      {"name":"8#注水泵","id":8}
    ];
    return (
        <div className="realLine">
          <BreadcrumbCustom first="数据总览" second="实时曲线" />
          <div className="realLine_t">
            <div className="t_l">
           { data.map((item,index)=>(
             <Button onClick={()=>this.tab(item)} key={index} type={item.id === this.state.curtabid?'primary':'dashed'} >
               {item.name}
             </Button>
           )
            )}
            </div>
          </div>
          <div className="realLine_b" >
          {this.state.mapData.map((item,index)=>(
          <Row gutter={16}>
                    <Col className="gutter-row" md={20}>

                        <div className="gutter-box">
                            <Card title={this.state.currentLineName} bordered={false}>
                                <RechartsSimpleLineChart key={index} change={this.change} pumpList={this.state.pumpList} data={item} />
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

export default RealLine
