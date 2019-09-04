import React from 'react';
import { Card,Radio,Table ,Col} from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import {getOperateConverResurceDiagramList} from '../../../axios'
import {strSorter,numSorter,numFormat} from '../../../utils'
const nameMapping = {
  payPrice:'实收金额',
  netPrice:'实付金额',
  payUserNum:'购买用户数',
}

class ResourceDistribution extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          resourceDisOptionPosition:'payPrice',
            dataList:[],
            tableData:[],
            pieData:[],
            loading:true,
            startTime:this.props.startTime,
            endTime:this.props.endTime,

      }
    }
    resourceDisOptionBoxChange({target: { value: dotPosition } }){
      this.setState({
        resourceDisOptionPosition:dotPosition,
        loading:true,
      })
    }
    componentDidMount(){
      this.buildData();
    }
    componentDidUpdate(){
      // if(this.state.tableData.length === 0){
      //     // this.buildData();
      //     console.log(2);
      // }else
      if(this.props.startTime != this.state.startTime || this.props.endTime != this.state.endTime){

          this.buildData();
      }else if(this.state.loading){
           this.buildData();
      }
    }
    buildData(){
      let _this = this;
      getOperateConverResurceDiagramList({
        fieldName:this.state.resourceDisOptionPosition,
        startTime:_this.props.startTime,
        endTime: _this.props.endTime,
      }).then((res)=>{
        this.setState({  loading:false,startTime:this.props.startTime,endTime:this.props.endTime})
        if(res.success){

              this.setState({
                tableData:_this.buildTableData(res.data.dataList),
                pieData:_this.buildPieData(res.data.dataList),

              })

        }
      })
    }
    buildPieData(dataList){
      let data = [];
      if(dataList.length === 0){
          data.push({name:"暂无数据",value:100})
      }
      dataList.forEach((v,i)=>{
        data.push({name:v.resTypeName,value:(v.dataValue||0)})
      })
      return data;
    }
    buildTableData(dataList){
      let data = [];
      let countValue = 0;
       dataList.forEach((v,i)=>{
         countValue+=v.dataValue;
       })
       dataList.forEach((v,i)=>{
          data.push({
              key: i+1,
              id: i+1,
              resTypeName: v.resTypeName,
              dataValue:(v.dataValue ||0),
              zb:(((v.dataValue||0)/countValue)*100).toFixed(2),
              converRate:((v.converRate||0)*100).toFixed(2),
          })
       })
       return data;
    }
    render() {
        const resourcedistributionHeader = (
          <div className="title">
              <span className="title_icon"></span>
              <span>资源类型分布</span>
          </div>
        )
        const resourceDisOptionBox = (
            <Radio.Group
               onChange={this.resourceDisOptionBoxChange.bind(this)}

               value={this.state.resourceDisOptionPosition}
               style={{ marginBottom: 8 }}
             >
               <Radio.Button value="payPrice">实收金额</Radio.Button>
               <Radio.Button value="netPrice">实付金额</Radio.Button>
               <Radio.Button value="payUserNum">购买用户数</Radio.Button>

             </Radio.Group>
        )
        var columns = [{
                  title: '排名',
                  dataIndex: 'id',
                  key: 'id',
                  render: text => <span>{text}</span>,
                  sorter: (a, b) => numSorter(a, b, 'id'),
              }, {
                  title: '资源类型',
                  dataIndex: 'resTypeName',
                  key: 'resTypeName',
                  sorter: (a, b) => strSorter(a, b, 'dataValue'),
              }, {
                  title: nameMapping[this.state.resourceDisOptionPosition],
                  dataIndex: 'dataValue',
                  key: 'dataValue',
                  render: v => numFormat(v),
                  sorter: (a, b) => numSorter(a, b, 'dataValue'),
              },
              {
                  title: '占比',
                  dataIndex: 'zb',
                  key: 'zb',
                  render: v => v+'%',
                  sorter: (a, b) => numSorter(a, b, 'zb'),
              },
              {
                  title: '转化率',
                  dataIndex: 'converRate',
                  key: 'converRate',
                  render: v => v+'%',
                  sorter: (a, b) => numSorter(a, b, 'converRate'),
              },
            ];
            let legendData = []
            this.state.pieData.forEach((v,i)=>{
                legendData.push(v.name)
            })
        var option = {
              backgroundColor: "#ffffff",
              color: ["#ff7c7c","#37A2DA", "#5bc49f", "#feb64d", "#91F2DE", "#32d3eb", "#6084E0","#E062AE",  "#e7bcf3", "#9d96f5", "#8378EA"],
              legend: {
                  orient : 'vertical',
                  x : 'left',
                  data:legendData,

              },
              tooltip : {
                  trigger: 'item',
                  formatter: (v)=>{
                    return v.name+':'+numFormat(v.data.value)+' ('+v.percent+'%)'
                  }
              },
              series: [{
                  label: {
                      normal: {
                          fontSize: 14
                      }
                  },
                  type: 'pie',
                  center: ['50%', '50%'],
                    radius : '50%',
                  data: this.state.pieData,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 2, 2, 0.3)'
                      }
                  }
              }]
            };
        return (
          <Card title={resourcedistributionHeader} bordered={false} extra={resourceDisOptionBox}>
            <Col  md={12}>
              <ReactEcharts
                  option={option}
                  className={'react_for_echarts'}
                  style={{minHeight:'300px',marginTop:'90px'}}
              />
            </Col>
            <Col  md={12}>
              <Table
                loading={this.state.loading}
                columns={columns}
                dataSource={this.state.tableData}
                pagination={false}
                size={"middle"}
                style={{minHeight:'300px'}}/></Col>
          </Card>
        )
    }
}

export default ResourceDistribution;
