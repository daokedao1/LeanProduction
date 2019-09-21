import React from 'react'
import BreadcrumbCustom from '../BreadcrumbCustom';
import '../../style/waterData/historyLine.less'
import { Select, List,DatePicker,Typography,Table,Button,message} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import {POST} from '../../axios/tools'
import {getCookie,setCookie} from '../../utils/index'
import 'moment/locale/zh-cn';
const Authorization=getCookie("Authorization");
const { Option } = Select;
class Demo extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dataList:[],
      dropList:[],
      id:'',
      startDate:'',
      endDate:'',
    };

  }
  componentDidMount() {
    POST('/wInfo/pumpList',{},Authorization).then((res)=>{
        if(res.code == 200 && res.data.pumpList){
            this.setState({
              dropList:res.data.pumpList
            })
        }
    })
  }
  onSearchBtnClick(){
    // if(!this.state.id){
    //   message.warning('请选择水泵！');
    //   return false
    // }
    if(!this.state.startDate){
      message.warning('请选择查询时间！');
      return false
    }
      let warnlist= JSON.parse(localStorage.getItem('warnlist')||'[]') ;
      let dataList = warnlist.filter((v)=>{
        let time = v.time.split(' ')[0];
        let pre = v.title.substring(0,1);

        if(time === this.state.startDate ){
          return true
        }
      })
      console.log();
      console.log(dataList);
      this.setState({
        dataList:dataList
      })
    // let param = {
    //   id:this.state.id,
    //   pageNumber:1,
    //   pageSize:500,
    //   startDate:this.state.startDate,
    //   endDate:this.state.endDate,
    // }
    // this.setState({
    //   loading:true
    // })
    // POST('/wHistoryData/oneHistory',param,Authorization).then((res)=>{
    //     let data = [];
    //     if(res.code == 200 && res.data.tableData){
    //         data = res.data.tableData
    //     }
    //     this.setState({
    //       dataList:data,
    //       loading:false,
    //     })
    // })
  }
  handleChange(value) {
    this.setState({
      id:value
    })
  }
  onDateChange(date, dateString){
    this.setState({
      startDate:dateString,
      endDate:dateString,
    })
  }
  render() {
  const columns=[
    {
        title: '报警场景',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: '报警变量',
        dataIndex: 'targetname',
        key: 'targetname',
    },
    {
        title: '报警值',
        dataIndex: 'num',
        key: 'num',
    },
    {
        title: '报警时间',
        dataIndex: 'time',
        key: 'time',
    },

  ];
  const data=[];
    return (
      <div className="historyLine">
          <BreadcrumbCustom first="数据总览" second="报警记录" />

            <DatePicker locale={locale} style={{ marginLeft:'10px'}} className="middel" format="YYYY-MM-DD" placeholder="请选择时间" onChange={this.onDateChange.bind(this)} />
            <Button type="primary" style={{marginLeft:'10px'}} onClick={this.onSearchBtnClick.bind(this)}>查询</Button>
              <Table
                bordered
                style={{marginTop:'10px'}}
                columns={columns}
                dataSource={this.state.dataList}

                />
      </div>
    )
  }
}

export default Demo
