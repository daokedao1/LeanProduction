
import React from 'react';
import {  Card,Radio ,Select,Button} from 'antd';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import {getOperateIndexTrend} from '../../../axios'

const { Option } = Select;
const color = ["#92CEFF","#9FE6B8","#37A2DA","#9d96f5", "#32C5E9","#E690D1", "#67E0E3", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE",  "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"]
const paramMap={
  uv:['uv','addCartNum','payUserNum'],
  price:['payPrice','netPrice'],
  userpice:['userPrice','netUserPrice'],
  comverrate:['converRate'],
}
const fieldNameMaping = {
  uv:'UV',
  addCartNum:'加车UV',
  payUserNum:'购买用户数',
  payPrice:'实付金额',
  netPrice:'实收金额',
  userPrice:'实付客单价',
  netUserPrice:'实收客单价',
  converRate:'转化率'

}


class IndexTrend extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          dotPosition:'uv',
          rscTypeCd:'5',
          fieldName:paramMap.uv.join(','),
          dataList:[],
          loading:true,
          startTime:this.props.startTime,
          endTime:this.props.endTime,

      }
    }
    IndexTrendOptionBoxChange(  { target: { value: dotPosition } }){
      this.setState({
        dotPosition:dotPosition,
        fieldName:paramMap[dotPosition].join(','),
        loading:true,
      })
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
        getOperateIndexTrend({
          fieldName:this.state.fieldName,
          rscTypeCd:this.state.rscTypeCd,
          startTime:_this.props.startTime,
          endTime: _this.props.endTime,
        }).then((res)=>{
            this.setState({  loading:false,startTime:this.props.startTime,endTime:this.props.endTime})
            if(res.success){
                this.setState({
                  dataList:res.data.dataList
                })
            }
        })
    }
    handleChange(v){
      this.setState({
        rscTypeCd:v,
        loading:true
      })
    }
    render() {
        let xAxisData = [];
        let fieldNameArr = paramMap[this.state.dotPosition];
        let arr = {};
        let yAxisData = [];
        fieldNameArr.forEach((v,i)=>{
          arr[fieldNameMaping[v]]={
            name: fieldNameMaping[v],
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            symbolSize: 6,
            data: [],
            areaStyle: {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: color[i]
                  }, {
                      offset: 1,
                      color: color[i]
                  }], false)
              }
            },
            itemStyle: {
              normal: {
                  color: color[i]
              }
            },
            lineStyle: {
              normal: {
                  width: 3
              }
            }
          }
        })
        if(this.state.dataList.length>0){

            this.state.dataList.map((v,i)=>{
              xAxisData.push(v.dateTime)
                if(arr[v.dataName]){
                    arr[v.dataName].data.push(v.dataValue||0)
                }
              })

        }else{

        }

            Object.keys(arr).forEach(function(key){
                yAxisData.push(arr[key])
            });

            var option={
              title: {
                   text: '指标趋势图',
                   left: '50%',
                   show: false,
                   textAlign: 'center'
               },
               tooltip: {
                   trigger: 'axis',
                   axisPointer: {
                       lineStyle: {
                           color: '#ddd'
                       }
                   },
                   backgroundColor: 'rgba(255,255,255,1)',
                   padding: [5, 10],
                   textStyle: {
                       color: '#7588E4',
                   },
                   extraCssText: 'box-shadow: 0 0 5px rgba(0,0,0,0.3)'
               },
               legend: {
                   right: 20,
                   orient: 'horizontal',
                   x:'center'

               },
               xAxis: {
                   type: 'category',
                   data: [...new Set(xAxisData)],
                   boundaryGap: false,
                   splitLine: {
                       show: true,
                       interval: 'auto',
                       lineStyle: {
                           color: ['#D4DFF5']
                       }
                   },
                   axisTick: {
                       show: false
                   },
                   axisLine: {
                       lineStyle: {
                           color: '#609ee9'
                       }
                   },
                   axisLabel: {
                       margin: 10,
                       textStyle: {
                           fontSize: 10
                       }
                   }
               },
               yAxis: {
                   type: 'value',
                   splitLine: {
                       lineStyle: {
                           color: ['#D4DFF5']
                       }
                   },
                   axisTick: {
                       show: false
                   },
                   axisLine: {
                       lineStyle: {
                           color: '#609ee9'
                       }
                   },
                   axisLabel: {
                       margin: 0,
                       textStyle: {
                           fontSize: 8
                       }
                   }
               },
               series: yAxisData
            }

        const IndexTrendOptionBox = (
            <Radio.Group
               onChange={this.IndexTrendOptionBoxChange.bind(this)}
               value={this.state.dotPosition}
               style={{ marginBottom: 8 }}
             >
               <Radio.Button value="uv">UV</Radio.Button>
               <Radio.Button value="price">金额</Radio.Button>
               <Radio.Button value="userpice">客单价</Radio.Button>
               <Radio.Button value="comverrate">转化率</Radio.Button>
             </Radio.Group>
        )
        const indexTrendHeader = (
          <div className="title">
              <span className="title_icon"></span>
              <span>指标趋势图</span>
              <div className="opt"><span>资源类型：</span>
                <Select defaultValue={this.state.rscTypeCd} style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                  <Option value="5">搜索</Option>
                  <Option value="6">推荐</Option>
                  <Option value="1" >首页资源位</Option>
                  <Option value="3">频道</Option>
                  <Option value="7">分类页</Option>
                  <Option value="4">分享回流</Option>
                  <Option value="8">其他</Option>

                </Select>
              </div>
          </div>
        )
        return (
            <Card title={indexTrendHeader} bordered={false} extra={IndexTrendOptionBox}>
                <ReactEcharts
                    option={option}
                    style={{height: '350px', width: '100%'}}
                    className={'react_for_echarts'}
                    notMerge={true}
                />
            </Card>

        )
    }
}

export default IndexTrend;
