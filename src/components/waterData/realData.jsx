import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import pumpinfor from '@/style/imgs/泵信息.png'
import { Button,Tabs,List,Typography} from 'antd';
import '../../style/waterData/realData.less'

const { TabPane } = Tabs;
const header123=[
  {
    title:'1#注水泵'
  },
  {
    title:'2#注水泵'
  },
  {
    title:'3#注水泵'
  },
]
const header456=[
  {
    title:'3#注水泵'
    
  },
  {
    title:'4#注水泵'
  },
  {
    title:'5#注水泵'
  },
]
const header78=[
  {
    title:'7#注水泵'
  },
  {
    title:'8#注水泵'
  },
]
const bar=[
  {
    val: "出口压力:22.75MPa",
    r:"泵头1缸噪声:87.50"
  },
  {
    val: "进口压力:0.35MPa",
    r:"泵头2缸噪声:87.69"

  },
  {
    val: "电机温度:103℃",
    r:"泵头3缸噪声:91.68"

  },
  {
    val: "润滑油温度:65℃",
    r:"泵头4缸噪声:84.32"
  },
  {
    val: "润滑油液位:4.8CM",
    r:"泵头5缸噪声:84.91"
  },
  {
    val: "电机A相电流:234.81A",
    r:"电机A相电压:424.60V"
  },
  {
    val: "电机B相电流:238.60A",
    r:"电机B相电压:424.00V"
  },
  {
    val: "电机C相电流:237.10A",
    r:"电机C相电压:424.00V"
  },
]



const data = [
  {
    title:"出口压力",
    value:"EXPORT_PRESSURE",
    ut:'MPa',
    arr:[
      " 出口压力:22.75MPa",
     "进口压力:0.35MPa",
     "电机温度:103℃",
     "润滑油温度:65℃",
     "润滑油液位:4.8CM",
     "电机A相电流:234.81A",
     "电机B相电流:238.60A",
     "电机C相电流:237.10A"
     ]
  },
  {
   title:"进口压力",
   value:"EXPORT_PRESSURE",
   ut:'MPa'
 },
 {
   title:"电机温度",
   value:"MOTOR_TEMPERATURE",
   ut:'℃'

 },
 {
   title:"润滑油温度",
   value:"MOTOR_TEMPERATURE",
   ut:'℃'

 },
 {
   title:"润滑油液位",
   value:"MOTOR_TEMPERATURE",
   ut:'CM'

 },
 {
   title:"电机A相电流",
   value:"MOTOR_TEMPERATURE",
   ut:'A'

 },
 {
   title:"电机B相电流",
   value:"MOTOR_B_PHASE_CURRENT",
   ut:'A'

 },
 {
   title:"电机B相电流",
   value:"MOTOR_B_PHASE_CURRENT",
   ut:'A'

 }
 ];
class Demo extends React.Component {
  ontabChange(){

  }
  render() {
    return (
        <div className="realData">
          <BreadcrumbCustom first="数据总览" second="实时数据" />
          <div className="realData_t">
            <div className="t_l" style={{textAlign:'center'}}>
              <img src={pumpinfor} alt="" />
            </div>
            <div className="t_r">
              <Tabs defaultActiveKey="1" onChange={this.ontabChange.bind(this)}>
                <TabPane tab="注水泵123" key="1">
                  <div className="allData_t">
                    <ul>

                      
                    {
                      header123.map((v,index)=>(
                        <li
                        key={index}
                        
                        className="list">
                          {
                          index===0||index===2?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>
                          }
                        
                      <List
                        header={<strong className="headers" >{v.title}</strong>}
                        bordered
                          dataSource={bar}
                          renderItem={(item) => {
                          return(<List.Item>
                            <Typography.Text mark></Typography.Text>
                            <div className="content">
                                  <div className="content_l">{item.val}</div>
                                  <div className="content_r">{item.r}</div>

                            </div>
                           
                          </List.Item>)
  
                      }}

                      />
                        </li>
                 
                      ))
                    }
     


                    </ul>

                  </div>


                </TabPane>
                <TabPane tab="注水泵456" key="2">
                <div className="allData_t">
                    <ul>
                    {
                      header456.map((v,index)=>(
                        <li
                        key={index}
                        
                        className="list">
                                  {
                          index===0?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>
                          }
                      <List
                        header={<strong className="headers" >{v.title}</strong>}
                        bordered
                          dataSource={bar}
                          renderItem={(item) => {
                          return(<List.Item>
                            <Typography.Text mark></Typography.Text>
                            <div className="content">
                                  <div className="content_l">{item.val}</div>

                                  <div className="content_r">{item.r}</div>

                            </div>
                           
                          </List.Item>)
  
                      }}

                      />
                        </li>
                 
                      ))
                    }
     


                    </ul>

                  </div>
                </TabPane>
                <TabPane tab="注水泵78" key="3">
                <div className="allData_t">
                    <ul>

                      
                    {
                      header78.map((v,index)=>(
                        <li
                        key={index}
                        
                        className="list">
                         <Button type="danger">停止</Button>
                      <List
                        header={<strong className="headers" >{v.title}</strong>}
                        bordered
                          dataSource={bar}
                          renderItem={(item) => {
                          return(<List.Item>
                            <Typography.Text mark></Typography.Text>
                            <div className="content">
                                  <div className="content_l">{item.val}</div>

                                  <div className="content_r">{item.r}</div>

                            </div>
                           
                          </List.Item>)
  
                      }}

                      />
                        </li>
                 
                      ))
                    }
     


                    </ul>

                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
          <div className="realData_b" />
        </div>
    )
  }
}

export default Demo
