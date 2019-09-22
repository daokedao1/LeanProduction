import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import pumpinfor from '@/style/imgs/泵信息.png'
import { Button,Tabs,List} from 'antd';
const { TabPane } = Tabs;
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

                        <li className="list">
                          <Button type="primary">运行</Button>

                          <List
                            header={"222"}
                            bordered
                          

                          />
                      </li>


                    </ul>

                  </div>


                </TabPane>
                <TabPane tab="注水泵456" key="2">
                  Content of Tab Pane 2
                </TabPane>
                <TabPane tab="注水泵78" key="3">
                  Content of Tab Pane 3
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
