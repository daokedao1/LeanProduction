import React from 'react'
import { Button, List,Typography,Modal} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/allData.less'
import pump from '@/style/imgs/pump.png'
import {getCookie,setCookie} from '../../utils/index'
import {POST} from '../../axios/tools'
import Cookies from 'js-cookie'
import moment from 'moment';

const Authorization=getCookie("Authorization");

class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pumpList:[],
      visible: false,
      block:false,
      dataList:[],
    };

  }
  componentDidMount() {
      let _this = this
      this.init();
      this.timer = setInterval(() => {
        _this.init();
      }, 10000)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  init(){

    const Authorization=getCookie("Authorization");
    let allData= JSON.parse(localStorage.getItem('allData')||'[]') ;
    let dataList = [];
    POST('/wTimeData/listForEach',{},Authorization).then((res)=>{

        if(res.code === 200){
          res.data.timeDataList.forEach((v,i)=>{

            let obj = allData[i];
            obj.RUNNING_STATE = v['RUNNING_STATE'];
            let warncount = [];
            obj.arr.forEach((item,i)=>{
              if(v[item.value] > obj.arr[i].age){
                obj.arr[i].block = true;
                let warnitem  = {title:obj.title,time:moment().format('YYYY-MM-DD hh:mm:ss'),targetname:obj.arr[i].name,num:v[item.value]}

                warncount.push(warnitem);
              }else{
                obj.arr[i].block = false;
              }
              obj.arr[i].num = v[item.value];
            })
            if(warncount.length>0){
              obj.block = true;
              let warnlist = JSON.parse(localStorage.getItem('warnlist') || '[]');
            
              localStorage.setItem("warnlist",JSON.stringify(warnlist.concat(warncount)))
            }
            dataList.push(obj);

          })
          console.log(dataList);
          this.setState({
            dataList:dataList
          })
        }

    })

  }

  popBlock(item){
    if(!item.block){
      return
    }
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
     <p>{`1、注水泵的排出压力传感器"`}</p>
     <p>{`2、注水泵的外输管线流程`}</p>
     <p>{`3、注水泵的外输管线闸门是否开启`}</p>
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
                this.state.dataList.map((itemm,i)=>(
                  <li className="list" key={i}>
                    {itemm.RUNNING_STATE==0?<Button type="primary">运行</Button>:<Button type="danger">停止</Button>}

                  <img src={pump} alt="" />
                  <List
                    header={<div onClick={this.popBlock.bind(this,itemm)} className={itemm.block?'headerList':""}>{itemm.title}</div>}
                    bordered
                    dataSource={itemm.arr}
                    renderItem={(item) => (
                      <List.Item>
                        <Typography.Text mark></Typography.Text>
                        {item.name}:{item.num}{item.ut}
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
