import React from 'react'
import { Button, List,Typography,Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/allData.less'
import pump from '@/style/imgs/pump.png'
import {getCookie,setCookie} from '../../utils/index'
import {POST} from '../../axios/tools'
import Cookies from 'js-cookie'

const Authorization=getCookie("Authorization");

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pumpList:[],
      visible: false,
      allData:[]
    };
    this.init()
   
  }
  async init(){
    const data= await POST('/wTimeData/listForEach',{
    },Authorization)
    this.setState({pumpList:data.data.timeDataList})
   const allData= Cookies.get('allData')
   this.setState({allData:JSON.parse(allData)})
   console.log()
  }
  popBlock(item){
    this.setState({visible:true})
    setCookie('infor',[])
  }
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  render() {
     const data = [
       {
         title:"出口压力",
         value:"EXPORT_PRESSURE",
         ut:'MPa'
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
      // pumpList=[{content:data},{content:data},{content:data},{content:data},{content:data},{content:data},{content:data}];
     const pop_b=<Modal
     title="报警提示"
     visible={this.state.visible}
     onOk={this.handleOk}
     onCancel={this.handleCancel}
     okText="确认"
     cancelText="取消"
   >
     <div>
     <p>{`注水磊出现异常需要维修`}</p>
     <p>{`1、`}</p>
     <p>{`2、`}</p>
     <p>{`3、`}</p>
     </div>
 
   </Modal>
    return (

        <div className="allData">
          <BreadcrumbCustom first="数据总览" second="总览数据" />
          <div className="allData_m">
            <h3>华北油田采油三厂楚一联合注水站监控中心</h3>
            <div className="allData_t">
              <ul>
              {
                this.state.pumpList.map((itemm,i)=>(
                  <li className="list" key={i}>
                    {itemm.RUNNING_STATE==0?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>}
                  
                  <img src={pump} alt="" />
                  <List
                    header={<div onClick={()=>this.popBlock(itemm)} className={i>2?'':"headerList"}>{itemm.name}</div>}
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                      <List.Item>
                        <Typography.Text mark></Typography.Text> 
                        {item.title}:{itemm[item.value]}{item.ut}
                      </List.Item>
                    )}
                  />
                </li>
                ))
              }
              </ul>

            </div>
          </div>
          {pop_b}
        </div>
    )
  }
}

export default Demo