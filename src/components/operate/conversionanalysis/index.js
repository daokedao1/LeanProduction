import React from 'react';
import { Row, Col,DatePicker} from 'antd';
import moment from 'moment';
import locale from 'antd/es/date-picker/locale/zh_CN';

import IndexTrend  from './IndexTrend';
import ConverTable  from './ConverTable';
import ResourceTop from './ResourceTop'
import ResourceDistribution from './ResourceDistribution'

import 'moment/locale/zh-cn';
import './index.less'

moment.locale('zh-cn');
const { RangePicker } = DatePicker;

class ConversionAnalysis extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          resourcesClassSelectItem:[],
          startTime:moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          compareStartTime:'',
          compareEndTime:'',
      }
    }
    onDateChange(dates){
      this.setState({
        startTime:dates[0].format('YYYY-MM-DD HH:mm:ss'),
        endTime:dates[1].format('YYYY-MM-DD HH:mm:ss'),
      })
    }

    render() {

        return (
            <div className="gutter-example">
              <Row gutter={16}>
                  <Col className="gutter-row" md={24}>
                      <div className="gutter-box">
                        <div className="header_title">
                            <div className="title">转化分析</div>
                            <div className="extra">
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
                        <div className="gutter-box">
                          <ConverTable startTime={this.state.startTime} endTime={this.state.endTime}/>
                        </div>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box resourcedistribution">
                            <ResourceDistribution startTime={this.state.startTime} endTime={this.state.endTime}/>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row resourceTop" md={24}>
                        <div className="gutter-box">
                            <ResourceTop startTime={this.state.startTime} endTime={this.state.endTime} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row indexTrend" md={24}>
                        <div className="gutter-box">
                            <IndexTrend startTime={this.state.startTime} endTime={this.state.endTime}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ConversionAnalysis;
