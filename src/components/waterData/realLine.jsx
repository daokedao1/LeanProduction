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
        {
        stroke:'#0fd59d',
        dataKey:'出口压力',
        arr:[
          {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
          {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
          {name: 'Page C', uv: 200, pv: 9800, amt: 2290},
          {name: 'Page D', uv: 280, pv: 3908, amt: 2000},
          {name: 'Page E', uv: 180, pv: 4800, amt: 2181},
          {name: 'Page F', uv: 2390, pv: 300, amt: 2500},
          {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
          ],
        show:true
      },
      {
        stroke:'#1BAAE4',
        dataKey:'进口压力',
        arr:[
          {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
          {name: 'Page B', uv: 300, pv: 1398, amt: 2210},
          {name: 'Page C', uv: 2001, pv: 9800, amt: 2290},
          {name: 'Page D', uv: 2820, pv: 3908, amt: 2000},
          {name: 'Page E', uv: 1840, pv: 4800, amt: 2181},
          {name: 'Page F', uv: 20, pv: 300, amt: 2500},
          {name: 'Page G', uv: 190, pv: 4300, amt: 2100},
          ],
        show:true
      },
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
          <BreadcrumbCustom first="注水泵实时数据" second="实时曲线" />
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
          <Row gutter={16}>
                    <Col className="gutter-row" md={20}>
                        <div className="gutter-box">
                            <Card title={this.state.currentLineName} bordered={false}>
                                <RechartsSimpleLineChart change={this.change} data={this.state.mapData} />
                            </Card>
                        </div>
                    </Col>
                </Row>
          </div>
        </div>
    )
  }
}

export default RealLine