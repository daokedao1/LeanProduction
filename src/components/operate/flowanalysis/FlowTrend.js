
import React from 'react';
import {  Card,Radio} from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import {getOperateGetUserUvTrend} from '../../../axios'
import {getThousandNum,numFormat} from '../../../utils/'

const color = ["#92CEFF","#9FE6B8","#26cdec","#f8e1c7", "#32C5E9","#9d96f5", "#67E0E3", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE",  "#e7bcf3","#E690D1", "#8378EA", "#96BFFF"]

class FlowTrend extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          dataList:[],
          loading:true,
          startTime:this.props.startTime,
          endTime:this.props.endTime,
          userLevel:this.props.userLevel,
          rqsType:this.props.rqsType,
          aplType:this.props.aplType,
          shareType:this.props.shareType,

          dotPosition:'user_level_cd',
          statType:''

      }
    }

    componentDidMount(){
      this.buildList();
    }
    componentDidUpdate(){
      if(this.props.startTime != this.state.startTime || this.props.endTime != this.state.endTime||this.props.userLevel != this.state.userLevel||this.props.rqsType != this.state.rqsType||this.props.aplType != this.state.aplType||this.props.shareType != this.state.shareType){
          this.buildList();
      }else if(this.state.loading){
           this.buildList();
      }
    }
    buildList(){
      let _this = this;
        getOperateGetUserUvTrend({
          statType:this.state.dotPosition,
          startTime:_this.props.startTime,
          endTime: _this.props.endTime,
          userLevel:this.props.userLevel,
          rqsType:this.props.rqsType,
          aplType:this.props.aplType,
          shareType:this.props.shareType,
        }).then((res)=>{
            this.setState({
              loading:false,
              startTime:this.props.startTime,
              endTime:this.props.endTime,
              userLevel:this.props.userLevel,
              rqsType:this.props.rqsType,
              aplType:this.props.aplType,
              shareType:this.props.shareType,
            })
            if(res.success){
                this.setState({
                  dataList:res.data.dataList,

                })
            }
        })
    }

    OptionBoxChange({target: { value: dotPosition } }){
      this.setState({
        dotPosition:dotPosition,
        loading:true,
      })
    }
    buildTrendOption(dataList){
      let xAxisData = new Set();
      let legendData = new Set();
      let yAxisData = [];
      let arr = {}
      dataList.map((v,i)=>{
          xAxisData.add(v.date);
          legendData.add(v.name);
          arr[v.name]  =   {
                name: v.name,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        formatter:function(v){
                          return numFormat(v.value)
                        }
                    }
                },
                data: []
            }
        })
        if(dataList.length>0){
            dataList.map((v,i)=>{
                if(arr[v.name]){
                    arr[v.name].data.push(v.value||0)
                }
              })
        }
        Object.keys(arr).forEach(function(key){
            yAxisData.push(arr[key])
        });
        let option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params, ticket, callback) {
                     var res = "日期" + ' : ' + params[0].name + "";
                     for (var i = 0, l = params.length; i < l; i++) {
                         res += '<br/>'+params[i].marker + params[i].seriesName + ' : ' + numFormat(params[i].value);//鼠标悬浮显示的字符串内容
                     }
                    return res;
                }
           },
            color: color,
            legend: {
                data: Array.from(legendData)
            },
            grid: {
            },
            xAxis:  {
                type: 'category',
                data: Array.from(xAxisData)
            },
            yAxis: {
                type: 'value'
            },
            series: yAxisData
        };
        return option;
    }
    render() {
        let option = this.buildTrendOption(this.state.dataList);
        const OptionBox = (
            <Radio.Group
               onChange={this.OptionBoxChange.bind(this)}
               value={this.state.dotPosition}
               style={{ marginBottom: 8 }}
             >
               <Radio.Button value="user_level_cd">用户身份</Radio.Button>
               <Radio.Button value="apl_type_cd">来源</Radio.Button>
             </Radio.Group>
        )
        const indexTrendHeader = (
          <div className="title">
              <span className="title_icon"></span>
              <span>指标趋势图</span>
              <span className="subtitle">30天内趋势</span>
          </div>
        )

        return (
            <Card title={indexTrendHeader} bordered={false} extra={OptionBox}>
                <ReactEcharts
                    option={option}
                    style={{height: '350px', width: '100%'}}
                    className={'react_for_echarts'}
                />
            </Card>

        )
    }
}

export default FlowTrend;
