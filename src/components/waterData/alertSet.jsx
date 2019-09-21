
import React from 'react';
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/alertSet.less'
import { Input, InputNumber, Popconfirm, Form,Select } from 'antd';
import {setCookie,getCookie} from './../../utils/index'
import Storage from './../../utils/localStorage'
import AlertSetCard from './alertSetCard'
const EditableContext = React.createContext();
class AlertSet extends React.Component {
  constructor(props) {
    super(props);
    console.log(localStorage.getItem('allData').length);
    let obj= JSON.parse(localStorage.getItem('allData'))
    this.state = {
      dataList:obj
    }
  }

  render() {

    return (
      <div>
        <BreadcrumbCustom first="数据总览" second="报警设置" />
        <div className="table_b">
          {
            this.state.dataList.map((v,i)=>{
              return  <AlertSetCard item={v} title={v.title} key={i} id={i} />
            })
          }

        </div>
      </div>

    );
  }
}
export default Form.create()(AlertSet);
