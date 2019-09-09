import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/historyLine.less'
import { Select, List,Typography,Table} from 'antd';
import SearchList from './searchList'

class Demo extends React.Component {
  render() {
  const columns=[ 
    {title: '报警场景'},
    {title: '报警时间'},
    {title: '单位时间'},
    {title: '变量'},
    {title: '位置'},
  ];
  const data=[];
    return (
      <div className="historyLine">
          <BreadcrumbCustom first="数据总览" second="报警记录" />
          <SearchList />
          <Table bordered columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default Demo