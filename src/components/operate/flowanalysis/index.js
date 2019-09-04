
import React from 'react';
import { Row, Col, Card ,DatePicker,Table,Select} from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';
import FlowTrend from './FlowTrend';
import FlowTable from './FlowTable';
import 'moment/locale/zh-cn';
import './index.less';
const { Option, OptGroup } = Select;
moment.locale('zh-cn');
const { RangePicker } = DatePicker;


class FlowAnalysis extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

          startTime:moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          compareStartTime:'',
          compareEndTime:'',

          userLevel:'',
          rqsType:'',
          aplType:'',
          shareType:'',

          loading:true,
      }
    }
    componentDidMount(){

    }
    componentDidUpdate(){
        console.log(this)
    }
    onDateChange(dates){

      this.setState({
        startTime:dates[0].format('YYYY-MM-DD HH:mm:ss'),
        endTime:dates[1].format('YYYY-MM-DD HH:mm:ss'),
        loading:true,
      })
    }
    onSelctParamChange(v){
      console.log(v);
      let selectItem = {}
      v.forEach((v,i)=>{
          let arr = v.split('__');
          if(selectItem[arr[0]]){
            selectItem[arr[0]].push(arr[1])
          }else{
            selectItem[arr[0]]=[arr[1]]
          }
      });
      for(let key in selectItem){
        selectItem[key] = selectItem[key].join(',')
      }
        console.log(selectItem);

      this.setState({
        loading:true,
        userLevel:selectItem.userLevel||'',
        rqsType:selectItem.rqsType||'',
        aplType:selectItem.aplType||'',
        shareType:selectItem.shareType||'',
      })

    }
    render() {

        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                          <div className="header_title">
                              <div className="title">流量分析</div>

                              <div className="extra">
                                筛选条件：
                                <Select  mode={'multiple'} placeholder="筛选条件" style={{ width: 300,marginRight:'10px' }} onChange={this.onSelctParamChange.bind(this)}>
                                     <OptGroup label="用户来源">
                                        <Option value="userLevel__1">粉丝</Option>
                                        <Option value="userLevel__0">游客</Option>
                                        <Option value="userLevel__2">会员</Option>
                                        <Option value="userLevel__3">顾问</Option>
                                        <Option value="userLevel__4">高级顾问</Option>
                                     </OptGroup>
                                     <OptGroup label="来源">
                                        <Option value="aplType__MRYTIOS">APP-IOS</Option>
                                        <Option value="aplType__MRYTAND">APP-安卓</Option>
                                        <Option value="aplType__MRYTXCX">小程序</Option>
                                     </OptGroup>
                                     <OptGroup label="访问方式">
                                        <Option value="rqsType__1">自主</Option>
                                        <Option value="rqsType__2">分享</Option>
                                        <Option value="rqsType__3">唤起</Option>
                                     </OptGroup>
                                     <OptGroup label="分享类型">
                                        <Option value="shareType__4">分享订单红包助力</Option>
                                        <Option value="shareType__3">推广商品</Option>
                                        <Option value="shareType__6">分享活动</Option>
                                        <Option value="shareType__1">分享邀请海报</Option>
                                        <Option value="shareType__9">邀新拼团</Option>
                                        <Option value="shareType__7">分享店铺</Option>
                                        <Option value="shareType__15">体验会员分享</Option>
                                        <Option value="shareType__2">分享邀新商品</Option>
                                        <Option value="shareType__11">分享自提团购</Option>
                                        <Option value="shareType__16">分享优惠券助力</Option>
                                        <Option value="shareType__12">分享商学院课程</Option>
                                     </OptGroup>
                                </Select>


                                  统计日期：
                                  <RangePicker
                                    locale={locale}
                                    defaultValue={[moment().startOf('day'), moment()]}
                                    ranges={{
                                      '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                      '今日': [moment().startOf('day'), moment()],
                                      '上周': [moment().weekday(-6), moment().weekday(0)],
                                      '本周': [moment().weekday(1).format('YYYY-MM-DD'), moment()],
                                      '上月': [moment().subtract('months', 1).startOf('month'), moment().subtract('months', 1).endOf('month')],
                                      '本月': [moment().subtract('days', 1).startOf('month'), moment()],
                                      '去年': [moment().subtract('years', 1).startOf('year'), moment().subtract('years', 1).endOf('year')],
                                      '本年': [moment().startOf('year'), moment()],
                                      '过去7天': [moment().subtract('days', 6), moment()],
                                      '过去30天': [moment().subtract('days', 29), moment()]
                                    }}
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    onOk={this.onDateChange.bind(this)}
                                  />
                            </div>
                          </div>
                      </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box ">
                            <FlowTable
                              startTime={this.state.startTime}
                              endTime={this.state.endTime}
                              userLevel={this.state.userLevel}
                              rqsType={this.state.rqsType}
                              aplType={this.state.aplType}
                              shareType={this.state.shareType}
                            />
                        </div>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box flowtable">
                            <FlowTrend
                              startTime={this.state.startTime}
                              endTime={this.state.endTime}
                              userLevel={this.state.userLevel}
                              rqsType={this.state.rqsType}
                              aplType={this.state.aplType}
                              shareType={this.state.shareType}
                              />
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default FlowAnalysis;
