import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/historyLine.less'
import { Select, List,Typography,Table} from 'antd';
import SearchList from './searchList'

class Demo extends React.Component {
  render() {
  const columns=[ 
    {title: '序号'},
    {title: '时间'},
    {title: '出口压力'},
    {title: '进口压力'},
    {title: '润滑油温度'},
    {title: '润滑油液位'},
    {title: '电机温度'},
    {title: '电机A相电流'},
    {title: '电机B相电流'},
    {title: '电机C相电流'},
    {title: '电机A相电压'},
    {title: '电机B相电压'},
    {title: '电机C相电压'},
    {title: '泵头1#缸噪声'},
    {title: '泵头2#缸噪声'},
    {title: '泵头3#缸噪声'},
    {title: '泵头4#缸噪声'},
    {title: '泵头5#缸噪声'},
  ];
  const data=[];
    return (
      <div className="historyLine">
          <BreadcrumbCustom first="注水泵实时数据" second="历史数据" />
          <SearchList type="1" />
          <Table bordered columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default Demo