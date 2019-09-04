import React from 'react'
import { Button, List,Typography} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/allData.less'
import pump from '@/style/imgs/pump.png'
class Demo extends React.Component {
  render() {
     const data = [
        '出口压力:22.62MPa',
        '进口压力:0.35MPa',
        '出口压力:22.62MPa',
        '进口压力:0.35MPa',
        '出口压力:22.62MPa',
        '进口压力:0.35MPa',
        '出口压力:22.62MPa',
        '进口压力:0.35MPa'

      ],
      pumpList=[{content:data},{content:data},{content:data}];
      
    return (

        <div className="allData">
          <BreadcrumbCustom first="注水泵实时数据" second="总览数据" />
          <div className="allData_m">
            <h3>华北油田采油三厂楚一联合注水站监控中心</h3>
            <div className="allData_t">
              <ul>
              {
                pumpList.map((item,i)=>(
                  <li className="list" key={i}>
                  <Button type="primary">运行</Button>
                  <img src={pump} alt="" />
                  <List
                    header={<div className="headerList">1#注水泵</div>}
                    bordered
                    dataSource={item.content}
                    renderItem={item => (
                      <List.Item>
                        <Typography.Text mark></Typography.Text> {item}
                      </List.Item>
                    )}
                  />
                </li>
                ))
              }
              </ul>

            </div>
          </div>
        </div>
    )
  }
}

export default Demo