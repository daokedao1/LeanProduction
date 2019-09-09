import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import { Button,Row, Col, Car, Card} from 'antd';
import RechartsSimpleLineChart from '../charts/RechartsSimpleLineChart';

import '../../style/waterData/realLine.less'
class RealLine extends React.Component {
  constructor(props){
    super(props);
    this.change = this.change.bind(this);
    this.state={
      currentLineName:'1#注水泵',
      mapData : [
        [
          {
            stroke:'#0fd59d',
            dataKey:'出口压力',
            show:true,
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
            dataKey:'进口压力',
            show:true,

          },
        ],
        [
          {
            stroke:'#0fd59d',
            dataKey:'润滑油温度',
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
            dataKey:'润滑油液位',
            show:true
          },
          {
            stroke:'#1BAAE4',
            dataKey:'电机温度',
            show:true
          },
        ],
        [
          {
            stroke:'#0fd59d',
            dataKey:'电机A相电流',
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
            dataKey:'电机B相电流',
            show:true
          },
        ]
  
    ],  
  
    }
    // React.axios('/wTimeData/listForEach','post1',{})
  }
  tab(item){
    this.setState({currentLineName:item.name});
    this.setState({data:item});
  }
  change(item){
    item.show=!item.show;
    this.setState({mapData:this.state.mapData});
}
  render() {
    const data=[{"address":"2","name":"1#注水泵","id":2, uv: 4000, pv: 2400, amt: 2400},{"address":"1","name":"2#注水泵","id":1, uv: 4000, pv: 2400, amt: 2400},{"address":"3","name":"3#注水泵","id":3, uv: 4000, pv: 2400, amt: 2400},{"address":"4","name":"4#注水泵","id":4, uv: 4000, pv: 2400, amt: 2400},{"address":"5","name":"5#注水泵","id":5, uv: 4000, pv: 2400, amt: 2400},{"address":"6","name":"6#注水泵","id":6},{"address":"7","name":"7#注水泵","id":7},{"address":"8","name":"8#注水泵","id":8}];
 
    return (
        <div className="realLine">
          <BreadcrumbCustom first="数据总览" second="实时曲线" />
          <div className="realLine_t">
            <div className="t_l">
           { data.map((item,index)=>(
             <Button onClick={()=>this.tab(item)} key={index} type="primary" >
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
                                <RechartsSimpleLineChart key={index} change={this.change} data={item} />
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