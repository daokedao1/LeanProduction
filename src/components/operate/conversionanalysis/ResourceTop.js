
import React from 'react';
import {  Card ,Select,Table,Input,message} from 'antd';
import {getOperateResourceTop} from '../../../axios';
import {strSorter,numSorter,numFormat} from '../../../utils'
const { Option } = Select;


class ResourceTop extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          indexTrendDotPosition:'uv',
          maxCount:'10',
          fieldName:'uv',
          dataList:[],
          loading:true,
          startTime:this.props.startTime,
          endTime:this.props.endTime,
      }
    }
    componentDidMount(){
      this.buildList();
    }
    componentDidUpdate(){

      if(this.props.startTime != this.state.startTime || this.props.endTime != this.state.endTime){
          this.buildList();
      }else if(this.state.loading){
           this.buildList();
      }

    }
    buildList(){
      let _this = this;
        getOperateResourceTop({
          fieldName:this.state.fieldName,
          maxCount:this.state.maxCount,
          startTime:_this.props.startTime,
          endTime: _this.props.endTime,
        }).then((res)=>{
            this.setState({  loading:false,startTime:this.props.startTime,endTime:this.props.endTime})
            if(res.success){
                    let data = [];
                    res.data.dataList.forEach((v,i)=>{
                        data.push({
                          key:i+1,
                          id:i+1,
                          ...v
                        })
                    })
                    this.setState({
                      dataList:data
                    })

            }
        })
    }

    render() {

        let data = [];
        var columns = [{
                  title: '排名',
                  dataIndex: 'id',
                  key: 'id',
                  render: text => <span>{text}</span>,
                  sorter: (a, b) => numSorter(a, b, 'id'),
              }, {
                  title: '资源位名称',
                  dataIndex: 'oplocDesc',
                  key: 'oplocDesc',
                  sorter: (a, b) => strSorter(a, b, 'oplocDesc'),
              }, {
                  title: '实收金额',
                  dataIndex: 'payPrice',
                  key: 'payPrice',
                  render: v => {
                    return this.state.fieldName === 'payPrice'?<span className="tablecolumnsSeleted">{numFormat(v)}</span>:numFormat(v)
                  },
                  sorter: (a, b) => numSorter(a, b, 'payPrice'),
              },

              {
                  title: '转化率',
                  dataIndex: 'converRate',
                  key: 'converRate',
                  render: v => {
                    let data = ((v||0)*100).toFixed(2)+'%';
                    return this.state.fieldName === 'converRate'?<span className="tablecolumnsSeleted">{data}</span>:data
                  },

                  sorter: (a, b) => numSorter(a, b, 'converRate'),
              },
              {
                  title: '实付金额',
                  dataIndex: 'netPrice',
                  key: 'netPrice',
                  render: v => {
                    let data = numFormat(v);
                    return this.state.fieldName === 'netPrice'?<span className="tablecolumnsSeleted">{data}</span>:data
                  },

                  sorter: (a, b) => numSorter(a, b, 'netPrice'),
              },
              {
                  title: '实付客单价',
                  dataIndex: 'netUserPrice',
                  key: 'netUserPrice',
                  render: v => {
                    let data = (v||0).toFixed(2)
                    return this.state.fieldName === 'netUserPrice'?<span className="tablecolumnsSeleted">{data}</span>:data
                  },
                  sorter: (a, b) => numSorter(a, b, 'netUserPrice'),
              },
              {
                  title: '实收客单价',
                  dataIndex: 'userPrice',
                  key: 'userPrice',
                  render: v => {
                    let data = (v||0).toFixed(2)
                    return this.state.fieldName === 'userPrice'?<span className="tablecolumnsSeleted">{data}</span>:data
                  },
                  sorter: (a, b) => numSorter(a, b, 'userPrice'),
              },
              {
                  title: '购买用户数',
                  dataIndex: 'payUserNum',
                  key: 'payUserNum',
                  render: v => {
                    let data = numFormat(v)
                    return this.state.fieldName === 'payUserNum'?<span className="tablecolumnsSeleted">{data}</span>:data
                  },
                  sorter: (a, b) => numSorter(a, b, 'payUserNum'),
              },
              {
                  title: 'UV',
                  dataIndex: 'uv',
                  key: 'uv',
                  render: v => {
                    let data = numFormat(v)
                    return this.state.fieldName === 'uv'?<span className="tablecolumnsSeleted">{data}</span>:data
                  },

                  sorter: (a, b) => numSorter(a, b, 'uv'),
              },
              {
                  title: '加车UV',
                  dataIndex: 'addCartNum',
                  key: 'addCartNum',
                  render: v => {
                    let data = numFormat(v)
                    return this.state.fieldName === 'addCartNum'?<span className="tablecolumnsSeleted">{data}</span>:data
                  },

                  sorter: (a, b) => numSorter(a, b, 'addCartNum'),
              },
              ];

              const resourceTopHeader = (
                <div className="title">
                    <span className="title_icon"></span>
                    <span>资源位TOP</span>
                    <div className="opt">
                      <span>指标：</span>
                        <Select defaultValue={this.state.fieldName} style={{ width: 120 }} onChange={(fieldName)=>{this.setState({fieldName:fieldName,loading:true,  dataList:[]})}}>
                          <Option value="uv">UV</Option>
                          <Option value="addCartNum">加车UV</Option>
                          <Option value="payUserNum">购买用户数</Option>
                          <Option value="payPrice">实收金额</Option>
                          <Option value="netPrice">实付金额</Option>
                          <Option value="userPrice">实收客单价</Option>
                          <Option value="netUserPrice">实付客单价</Option>
                          <Option value="converRate">转化率</Option>
                        </Select>
                      <span>  TOP：</span>
                        <Input value={this.state.maxCount} title="排名输入数字，最大支持100" ref="maxCount" onChange={(event)=>{
                              if(event && event.target ){
                                   let value = event.target.value;
                                   if(value>100){
                                     value = 100;
                                     message.info('TOP 数值限制100');
                                   }
                                   if(value){
                                     this.setState({maxCount:value,  dataList:[],loading:true})
                                   }else{
                                     this.setState({maxCount:value,})
                                   }
                              }
                          }} style={{width:"100px"}}/>

                    </div>
                </div>
              )
        return (
          <Card title={resourceTopHeader} bordered={false}>
              <Table loading={this.state.loading} style={{padding:'0px'}} size={"middle"} columns={columns} dataSource={this.state.dataList} pagination={true}/>
          </Card>
        )
    }
}

export default ResourceTop;
