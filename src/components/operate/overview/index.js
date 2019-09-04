import React, {Component} from 'react';
import {Col, DatePicker, Layout, message,Radio, Row, Select,Spin,ConfigProvider} from 'antd';
import moment from 'moment';
import TrendViews from "./TrendViews";
import UvTrend from "./UvTrend";
import $ from 'jquery';
import {getOperateOverviewList, getOperateOverviewUvTrend} from '../../../axios'
import screenfull from 'screenfull';
import zhCN from 'antd/es/locale/zh_CN';
import './jsmind.less'
import './index.less'


moment.locale('zh-cn');
const { Header, Content } = Layout;
const { MonthPicker } = DatePicker;
const { Option } = Select;

const DropList=[
  {key:'virtual_dept_cd',value:'部门'},
  {key:'is_new_user',value:'新/老用户'},
  {key:'user_lvl_cd',value:'用户身份'},
  {key:'clnt_type_cd',value:'客户端来源'},
  {key:'rqs_type_cd',value:'唤起方式'},

  {key:'rsc_type_desc',value:'资源类型'},
  {key:'first_rsc_loc_desc',value:'一级资源位'},
  {key:'third_rsc_loc_desc',value:'一级品类'},
]

class OverView extends Component {
    constructor(props) {

      super(props);
      this.state = {
        mindDataList:{},
        jsMind:{},
        curdate:moment(),
        fullscreen:false,
        jsboxHeight:window.screen.height-360,
        breadcrumb:'',
        chartDataClumName:'',
        loading:true,
        offsetX:0,
        offsetY:0,

        dropBoxShow:false,
        dropBoxList:[],
        selectdParam:[],

        startTime:moment().format('YYYY-MM-DD 00:00:00'),
        endTime:moment().format('YYYY-MM-DD HH:00:00'),
        dataLevel:1,
        dateType:'day',

        virtualDeptCd:'',
        newUser:'',
        userLvlCd:'',
        clntTypeCd:'',
        rqsTypeCd:'',
        nodeList:{},
        chartData: [],
        uvTrendData: []
      }
    }
    componentDidUpdate(){
      let _this = this;
      if(this.state.loading){
        if(this.state.chartData.length === 0){
          let param = {
            startTime:this.state.startTime,
            endTime:this.state.endTime,
            dateType:this.state.dateType,
          }


          getOperateOverviewList(param).then((data)=>{
            if(data.success){
              var mind = {
                   "meta": {
                       "name": "zzy",
                       "author": "zzy@missfresh.com",
                       "version": "0.1",
                   },
                   "format": "node_array",
                   "data": _this.buildNode(data.data.data,true)
               };

              if(mind.data.length>0){
                this.state.jsMind.show(mind);
              }

              this.setState({
                chartData:data.data.data,
                chartDataClumName:data.data.data[0].groupTypeDesc,
                breadcrumb:data.data.data[0].groupTypeDesc,
                loading:false,
              })
              // 获取UV趋势图
              getOperateOverviewUvTrend(param).then((data)=>{
                  if(data){
                      this.setState({uvTrendData:data.data.dataList})
                  }
              })
            }else{
              message.info('暂无数据！');
              _this.setState({
                loading:false
              })
            }

          })

      }

      }
    }

    componentDidMount() {
      let param = {
        startTime:this.state.startTime,
        endTime:this.state.endTime,
        dateType:this.state.dateType,
      }
      let _this = this;
      var options = {
         container:'jsmind_container',
         editable:true,
         theme:'primary',
         mode:'side',
         view:{
           line_color:'#999'
         }
      };
      var jm = new window.jsMind(options);
      $(document).on('mousedown',function(e){
        let target = $(e.target);

        if(target.parents('.nodebox').length===0&&target.parents('.drownbox').length===0){
          _this.setState({
            dropBoxShow:false,
          })
        }

      })
      $("#jsmind_container").on("click",'jmnode', function (e) {
          // _this.getNode(e);

          let parent_nodeid = $(e.currentTarget).attr('nodeid');
          _this.state.jsMind.select_node(parent_nodeid);
          let node = _this.state.jsMind.get_selected_node();

          let selectdParam = node.data.selectdParam;
          let $this=$(this);
          let top = $this.position().top;
          let left = $this.position().left;
          let width = $this.outerWidth();
          let height = $this.outerHeight();
          let scollLeft = $('.jsmind-inner').scrollLeft();
          let scollTop = $('.jsmind-inner').scrollTop();

          const filteredOptions = DropList.filter(o => !selectdParam.includes(o.key));

          if(filteredOptions.length === 0 ){
              message.info('无下一级展示内容!');
          }
          let offtopsub = (filteredOptions.length*32+8)/2-60;
          _this.setState({
            offsetY:top-scollTop-offtopsub,
            offsetX:left+width-scollLeft+10,
            dropBoxShow:true,
            dropBoxList:filteredOptions,
          })

      })
      $(".droplist").on("click",'.dropitem', function (e) {

          let groupTypeParam = $(e.currentTarget).attr('id');
          _this.getNode(groupTypeParam)

      })
      this.setState({
        jsMind:jm,
        chartData:[],
      })

    }
    buildDropDownBox(parm){
        return DropList;
    }
    getNode(groupTypeParam){
      let _this = this;

      let node = _this.state.jsMind.get_selected_node();
      let parent_nodeid = node.id;
      let parentValue = node.data.value.totalPrice;
      let parentPathStr = node.data.data;
      let isCreate = node.children.length === 0;
      let parentParam = node.data.param;
      let selectdParam1 = node.data.selectdParam;
      let parentPayPrice = node.data.value.payPrice;
      if(!!node ){
          _this.setState({
            loading:true,
          })
          let param = {
            startTime:this.state.startTime,
            endTime:this.state.endTime,
            dateType:this.state.dateType,
            groupType:groupTypeParam,
            ...parentParam
          }
          if(!isCreate){
            while(node.children.length !== 0){
              node.children.map((v,i)=>{
                  _this.state.jsMind.remove_node(v)
              })
            }
          }

          let selectdParam = [groupTypeParam,...selectdParam1]
          getOperateOverviewList(param).then((res)=>{
              if(!res.success || res.data.data.length === 0){
                message.info('无下一级展示内容!');
                _this.setState({
                  loading:false,
                  dropBoxShow:false,
                })
              }else{

                  res.data.data.forEach((v,i)=>{
                    let obj = {...parentParam};
                    obj[v.columnType]=v.groupType
                    if(isCreate){

                      _this.state.jsMind.add_node(parent_nodeid, parent_nodeid+'_'+v.groupType, _this.buildTopic(v,parentValue,parentPayPrice),{selectdParam:selectdParam,param:obj,value:v,data:parentPathStr+'>'+v.groupTypeDesc});

                    }else{

                      _this.state.jsMind.add_node(parent_nodeid, parent_nodeid+'_'+v.groupType, _this.buildTopic(v,parentValue,parentPayPrice),{selectdParam:selectdParam,param:obj,value:v,data:parentPathStr+'>'+v.groupTypeDesc});

                      // _this.state.jsMind.expand_node(parent_nodeid)
                    //  _this.state.jsMind.update_node(dataLevel+'__'+parent_nodepath+'_'+v.groupType, _this.buildTopic(v),{data:parentPathStr+'>'+v.groupTypeDesc});
                    }
                  })
                  this.setState({
                    chartData:res.data.data,
                    breadcrumb:parentPathStr,
                    loading:false,
                    selectdParam:selectdParam,
                    dropBoxShow:false,
                  })
                  // 获取UV趋势图
                  getOperateOverviewUvTrend(param).then((data)=>{
                      if(data){
                          this.setState({uvTrendData:data.data.dataList})
                      }
                  })
              }
          })


      }else{
        message.info('无下一级展示内容!');
      }
    }
    buildTopic(v,parentValue,parentPayPrice){
        let uv = (v.uv||0) > 1000 ? ((v.uv||0)/10000).toFixed(2)+'万':(v.uv||0);

        let uvDayOnDay = ((v.uvDayOnDay||0)*100).toFixed(0)+'%';
        let uvWeekOnWeek = ((v.uvWeekOnWeek||0)*100).toFixed(0)+'%';

        let converRate = ((v.converRate||0)*100).toFixed(2)+'%';
        let converRateDayOnDay = ((v.converRateDayOnDay||0)*100).toFixed(0)+'%';
        let converRateWeekOnWeek = ((v.converRateWeekOnWeek||0)*100).toFixed(0)+'%';

        let GMV = (v.totalPrice||0) > 1000 ? ((v.totalPrice||0)/10000).toFixed(2)+'万':(v.totalPrice||0).toFixed(2);
        let userPrice = (v.userPrice || 0).toFixed(2)+'元';
        let userPriceDayOnDay = ((v.userPriceDayOnDay||0)*100).toFixed(0)+'%';
        let userPriceWeekOnWeek = ((v.userPriceWeekOnWeek||0)*100).toFixed(0)+'%';

        let payPrice = (v.payPrice||0) > 1000 ? ((v.payPrice||0)/10000).toFixed(2)+'万':(v.payPrice||0).toFixed(2);
        let title = v.groupTypeDesc||'';
        let orderFrequency = (v.orderFrequency||0).toFixed(2);
        let orderPrice = (v.orderPrice||0).toFixed(2);

        let hper = parentValue ?(((v.totalPrice||0)/parentValue)*100).toFixed(0)+'%':'100%';
        console.log()
        let payPriceHper  = parentPayPrice ?(((v.payPrice||0)/parentPayPrice)*100).toFixed(0)+'%':'100%';

        return ' <div class="nodebox" >\n' +
            '                <div class="nodehead">\n' +
            '                    <div class="htitle">' + title + '</div><div class="htitleright"><span class="htitle2">GMV:</span><span class="hvalue">'+ GMV +'</span><span class="hper">'+hper+'</span><br/><span class="htitle2">实收金额:</span><span class="hvalue">'+ payPrice +'</span><span class="hper">'+payPriceHper+'</span></div>' +
            '                </div>\n' +
            '                <div class="nodecont">\n' +
            '                    <table>\n' +
            '                        <tr><td class="stitle">UV：   </td><td class="svalue">'+uv+'            </td><td class="stitle">同比：</td><td class="svalue '+(v.uvWeekOnWeek>0?'green':'red')+'">'+uvWeekOnWeek+'</td><td class="stitle">环比:</td><td class="svalue '+(v.uvDayOnDay>0?'green':'red')+'">'+uvDayOnDay+'</td></tr>\n' +
            '                        <tr><td class="stitle">转化率：</td><td class="svalue">'+converRate+'    </td><td class="stitle">同比：</td><td class="svalue '+(v.converRateWeekOnWeek>0?'green':'red')+'">'+converRateWeekOnWeek+'</td><td class="stitle">环比:</td><td class="svalue '+(v.converRateDayOnDay>0?'green':'red')+'">'+converRateDayOnDay+'</td></tr>\n' +
            '                        <tr><td class="stitle">客单价：</td><td class="svalue">'+userPrice+'     </td><td class="stitle">同比：</td><td class="svalue '+(v.userPriceWeekOnWeek>0?'green':'red')+'">'+userPriceWeekOnWeek+'</td><td class="stitle">环比:</td><td class="svalue '+(v.userPriceDayOnDay>0?'green':'red')+'">'+userPriceDayOnDay+'</td></tr>\n' +
            '                        <tr><td class="stitle" colspan="6">(频次：'+orderFrequency+' * 单均价：'+orderPrice+')</td></tr>\n' +
            '                    </table>\n' +
            '                </div>\n' +
            '            </div>'
    }
    buildNode(data,isRoot){
      let _this = this;
      let nodeitems = [];
        if(data){
            data.map((v,i)=>{

              let node = {
                id:'node_all_'+v.groupType,
                isroot:isRoot||false,
                value:v,
                data:v.groupTypeDesc,
                param:{},
                selectdParam:[],
                topic:_this.buildTopic(v)
              }
              nodeitems.push(node)
            })
        }

        return nodeitems;
    }
    onDateTypeChange(value){
      let curdate = ''
      let startTime = ''
      let endTime = ''
      if(value === 'day'){
        curdate = moment();
        startTime = moment().format('YYYY-MM-DD 00:00:00');
        endTime = moment().format('YYYY-MM-DD HH:00:00');
      }else if(value === 'month'){
        curdate = moment();
        startTime = moment().format('YYYY-MM-01 00:00:00');
        endTime = moment().format('YYYY-MM-DD 23:59:59');
      }else if(value === 'quarter'){
        curdate = 'Q'+moment().format('Q');
        startTime = moment(moment().format('YYYY'),'YYYY').quarter(moment().format('Q')).format('YYYY-MM-DD 00:00:00');
        endTime = moment().format('YYYY-MM-DD 23:59:59');
      }else if(value === 'year'){
        curdate = moment().format('YYYY');
        startTime = moment().format('YYYY-01-01 00:00:00');
        endTime = moment().format('YYYY-MM-DD 23:59:59');
      }
      this.setState({
          dateType:value,
          startTime:startTime,
          endTime:endTime,
          curdate:curdate,
          chartData:[],
          loading:true
      })
    }
    onDateChange(date, dateString){
      let startTime = date.format('YYYY-MM-DD 00:00:00');
      let endTime = date.format('YYYY-MM-DD 23:59:59');
      this.setState({
          startTime:startTime,
          endTime:endTime,
          chartData:[],
          loading:true
      })
    }
    onDateMonthChange(date, dateString){
      let startTime = date.format('YYYY-MM-01 00:00:00');
      let endTime = moment([date.format('YYYY'), 0, 31]).month(parseInt(date.format('M'))-1).format("YYYY-MM-DD 23:59:59");
      this.setState({
          startTime:startTime,
          endTime:endTime,
          chartData:[],
          loading:true
        })
      }
      onDateQuarterChange(value){

        let startTime = moment(moment().format('YYYY'),'YYYY').quarter(value).format('YYYY-MM-DD 00:00:00');
        let endTime = moment(moment().format('YYYY'),'YYYY').quarter(parseInt(value)+1).subtract(1, 'days').format('YYYY-MM-DD 23:59:59')

        this.setState({
            startTime:startTime,
            endTime:endTime,
            chartData:[],
            loading:true
          })

      }
    onDateYearChange(value){
      let startTime = moment(value,'YYYY').format('YYYY-01-01 00:00:00');
      let endTime = moment(value,'YYYY').format('YYYY-12-31 23:59:59');
      this.setState({
          startTime:startTime,
          endTime:endTime,
          chartData:[],
          loading:true
        })

    }
    fullscreenClick(){
      let height = 0;
      if (screenfull.enabled) {
        if(this.state.fullscreen){
          screenfull.exit();
          height=window.screen.height-360
        }else{
          screenfull.request();
          height = window.screen.height-175
        }
        this.setState({
          fullscreen:!this.state.fullscreen,
          jsboxHeight:height
        })
      }
    }
    render(){
      const fullscreenSvg = <svg viewBox="64 64 896 896" focusable="false" data-icon="fullscreen" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M290 236.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L169 160c-5.1-.6-9.5 3.7-8.9 8.9L179 329.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L370 423.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L290 236.4zm352.7 187.3c3.1 3.1 8.2 3.1 11.3 0l133.7-133.6 43.7 43.7a8.01 8.01 0 0 0 13.6-4.7L863.9 169c.6-5.1-3.7-9.5-8.9-8.9L694.8 179c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L600.3 370a8.03 8.03 0 0 0 0 11.3l42.4 42.4zM845 694.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L654 600.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L734 787.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L855 864c5.1.6 9.5-3.7 8.9-8.9L845 694.9zm-463.7-94.6a8.03 8.03 0 0 0-11.3 0L236.3 733.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L160.1 855c-.6 5.1 3.7 9.5 8.9 8.9L329.2 845c6.6-.8 9.4-8.9 4.7-13.6L290 787.6 423.7 654c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.4z"></path></svg>
      const fullscreenExitSvg = <svg viewBox="64 64 896 896" focusable="false"  data-icon="fullscreen-exit" width="1.5em" height="1.5em" fill="currentColor" aria-hidden="true"><path d="M391 240.9c-.8-6.6-8.9-9.4-13.6-4.7l-43.7 43.7L200 146.3a8.03 8.03 0 0 0-11.3 0l-42.4 42.3a8.03 8.03 0 0 0 0 11.3L280 333.6l-43.9 43.9a8.01 8.01 0 0 0 4.7 13.6L401 410c5.1.6 9.5-3.7 8.9-8.9L391 240.9zm10.1 373.2L240.8 633c-6.6.8-9.4 8.9-4.7 13.6l43.9 43.9L146.3 824a8.03 8.03 0 0 0 0 11.3l42.4 42.3c3.1 3.1 8.2 3.1 11.3 0L333.7 744l43.7 43.7A8.01 8.01 0 0 0 391 783l18.9-160.1c.6-5.1-3.7-9.4-8.8-8.8zm221.8-204.2L783.2 391c6.6-.8 9.4-8.9 4.7-13.6L744 333.6 877.7 200c3.1-3.1 3.1-8.2 0-11.3l-42.4-42.3a8.03 8.03 0 0 0-11.3 0L690.3 279.9l-43.7-43.7a8.01 8.01 0 0 0-13.6 4.7L614.1 401c-.6 5.2 3.7 9.5 8.8 8.9zM744 690.4l43.9-43.9a8.01 8.01 0 0 0-4.7-13.6L623 614c-5.1-.6-9.5 3.7-8.9 8.9L633 783.1c.8 6.6 8.9 9.4 13.6 4.7l43.7-43.7L824 877.7c3.1 3.1 8.2 3.1 11.3 0l42.4-42.3c3.1-3.1 3.1-8.2 0-11.3L744 690.4z"></path></svg>

        const PartOptionBox = (
            <Radio.Group

               value={this.state.dotPosition}
               style={{ marginBottom: 8 }}
             >
               <Radio.Button value="uv">部门拆解</Radio.Button>
               <Radio.Button value="price">资源拆解</Radio.Button>
             </Radio.Group>
        )
      return (
        <ConfigProvider locale={zhCN}>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 , marginTop: 10}} >
              <Row>
                <Col span={15}>
                    <div className="h_title" ><h3>概览</h3></div>
                </Col>
                <Col span={9}>
                    <div className="h_right">统计日期：
                      <span className="dateText">
                        <DatePicker defaultValue={moment()} allowClear={false} format={'YYYY年MM月DD日'} style={this.state.dateType==='day'?{cursor: 'pointer'}:{display:'none'}} onChange={this.onDateChange.bind(this)} />
                        <MonthPicker allowClear={false} onChange={this.onDateChange.bind(this)} defaultValue={moment()} format={'YYYY年MM月'} style={this.state.dateType==='month'?'':{display:'none'}}  onChange={this.onDateMonthChange.bind(this)}/>
                        <Select defaultValue={moment().format('Q')} style={this.state.dateType==='quarter'?{}:{display:'none'}} onChange={this.onDateQuarterChange.bind(this)}>
                          <Option value="1">第一季度Q1(1月,2月,3月)</Option>
                          <Option value="2">第二季度Q2(4月,5月,6月)</Option>
                          <Option value="3">第三季度Q3(7月,8月,9月)</Option>
                          <Option value="4">第四季度Q4(10月,11月,12月)</Option>
                        </Select>
                        <Select defaultValue='2019' style={this.state.dateType==='year'?{width:'172px'}:{display:'none'}} onChange={this.onDateYearChange.bind(this)}>
                          <Option value="2018">2018</Option>
                          <Option value="2019">2019</Option>
                        </Select>
                      </span>
                      <Select defaultValue="日" style={{ width: 60 ,cursor: 'pointer'}} onChange={this.onDateTypeChange.bind(this)}>
                        <Option value="day">日</Option>
                        <Option value="month">月</Option>
                        <Option value='quarter'>季</Option>
                        <Option value="year">年</Option>
                      </Select>
                    </div>
                </Col>
              </Row>



          </Header>
          <Header style={{ background: '#fff', marginTop: 15, padding: 0 ,borderBottom:'1px solid #eee'}} >
              <div className="pb-m">
                  <h3 style={{display:'inline-block'}}>指标拆解：</h3>
              </div>
          </Header>
          <Content style={{position:'relative', padding: '0',background: '#fff' }}>
            <Spin spinning={this.state.loading} tip="Loading..." size="large" >
              <div id="jsmind_container" style={{height:this.state.jsboxHeight+'px'}}>
                <i onClick={this.fullscreenClick.bind(this)} style={{zIndex: 999,cursor:'pointer',right: '10px',top:'10px',position: 'absolute'}} className='icon'>{this.state.fullscreen === false?fullscreenSvg:fullscreenExitSvg}</i>
                <div className="ant-dropdown drownbox ant-dropdown-placement-bottomLeft " style={{left:this.state.offsetX+'px',top:this.state.offsetY+'px',display:this.state.dropBoxShow === true?'':'none'}}>
                  <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical droplist" role="menu" >
                    <div className="drownbox-arrow"></div>
                    {
                      this.state.dropBoxList.map((v,i)=>{
                          return (
                            <li key={i} id={v.key} className="ant-dropdown-menu-item dropitem" role="menuitem">
                              {v.value}
                            </li>
                          )
                      })
                    }
                  </ul>
                </div>
              </div>
            </Spin>
          </Content>
          <Header style={{ background: '#fff', padding: 0 ,borderBottom:'1px solid #eee', marginTop: 10}} >
              <div className="pb-m">
                  <h3 style={{display:'inline-block'}}>指标拆解路径：</h3><h5 style={{display:'inline-block'}}>{this.state.breadcrumb}</h5>
              </div>
          </Header>
          <Content style={{ padding: '0', background: '#fff' }}>
              <Row>
                  <Col md={24}><TrendViews data={this.state.chartData} /></Col>
              </Row>
              <Row>
                  <Col md={24}><UvTrend title='UV趋势图' data={this.state.uvTrendData} /></Col>
              </Row>
          </Content>
        </Layout>
        </ConfigProvider>
      )
    }

}
export default OverView;
