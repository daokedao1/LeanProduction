import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import pumpinfor from '@/style/imgs/泵信息.png'
import { Button} from 'antd';

class Demo extends React.Component {
  render() {
    return (
        <div className="realData">
          <BreadcrumbCustom first="数据总览" second="实时数据" />
          <div className="realData_t">
            <div className="t_l">
              <img src={pumpinfor} alt="" />
            </div>
            <div className="t_r">
              
                <Button type="primary">注水泵123</Button>
             
            </div>
          </div>
          <div className="realData_b" />
        </div>
    )
  }
}

export default Demo