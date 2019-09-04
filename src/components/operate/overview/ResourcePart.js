
import React from 'react';
import {Spin} from 'antd';
import screenfull from 'screenfull';

class FlowTrend extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          dataList:[],
          loading:true,
          startTime:this.props.startTime,
          endTime:this.props.endTime,
      }
    }

    componentDidMount(){
        let param = {
          startTime:this.state.startTime,
          endTime:this.state.endTime,
          dataLevel:this.state.dataLevel||1,
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

        $("#jsmind_container").on("click",'jmnode', function (e) {
            // _this.getNode(e);
            let $this = $(this);
            let top  = $this.position().top;
            let left  = $this.position().left;
            let width = $this.outerWidth();
            let height = $this.outerHeight();
            _this.setState({
              offsetY:top,
              offsetX:left+width
            })
            console.log(top,left,width,height);
            _this.getNode(e)

        })
        this.setState({
          jsMind:jm,
          chartData:[],
        })

    }
    componentDidUpdate(){
      if(this.props.startTime != this.state.startTime || this.props.endTime != this.state.endTime){
          this.buildList();
      }else if(this.state.loading){
           this.buildList();
      }
    }
    getNode(e){
      let _this = this;
      let parent_nodeid = $(e.currentTarget).attr('nodeid');
      let dataLevel= parseInt(parent_nodeid.split('_')[0])+1;
      let parent_nodepath = parent_nodeid.split('__')[1];

      _this.state.jsMind.select_node(parent_nodeid);

      let node = _this.state.jsMind.get_selected_node();
      let parentValue = node.data.value.totalPrice;
      let parentPathStr = node.data.data;

      let isCreate = node.children.length === 0;
      if(!!node ){
        if(dataLevel<7){
          _this.setState({
            loading:true,
          })
          let param = {
            startTime:this.state.startTime,
            endTime:this.state.endTime,
            dataLevel:dataLevel,
            dateType:this.state.dateType
          }
          if(dataLevel>2){
            let treePath = parent_nodepath.split('_');

            for(let i = 2;i<=treePath.length;i++){
              if(i===2){
                param['virtualDeptCd'] = treePath[i-1]
              }else if(i===3){
                  param['newUser'] = treePath[i-1]
              }else if(i == 4){
                param['userLvlCd'] = treePath[i-1]
              }
              else if(i === 5){
                param['clntTypeCd'] = treePath[i-1]
              }else if(i === 6){
                param['rqsTypeCd'] = treePath[i-1]
              }
            }
          }
          getOperateOverviewList(param).then((res)=>{
              if(!res.success || res.data.data.length === 0){
                message.info('暂无数据！');
                _this.setState({
                  loading:false
                })
              }else{
                  res.data.data.forEach((v,i)=>{
                    if(isCreate){
                      _this.state.jsMind.add_node(parent_nodeid, dataLevel+'__'+parent_nodepath+'_'+v.groupType, _this.buildTopic(v,parentValue),{value:v,data:parentPathStr+'>'+v.groupTypeDesc});

                    }else{
                      _this.state.jsMind.expand_node(parent_nodeid)
                    //  _this.state.jsMind.update_node(dataLevel+'__'+parent_nodepath+'_'+v.groupType, _this.buildTopic(v),{data:parentPathStr+'>'+v.groupTypeDesc});
                    }
                  })
                  this.setState({
                    chartData:res.data.data,
                    breadcrumb:parentPathStr,
                    loading:false
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

          message.info('您已到达最低端！');
        }
      }else{
        message.info('获取节点失败');
      }
    }

    buildTopic(v,parentValue){
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


        let title = v.groupTypeDesc||'';
        let orderFrequency = (v.orderFrequency||0).toFixed(2);
        let orderPrice = (v.orderPrice||0).toFixed(2);

        let hper = parentValue ?(((v.totalPrice||0)/parentValue)*100).toFixed(0)+'%':'100%'


        return ' <div class="nodebox" >\n' +
            '                <div class="nodehead">\n' +
            '                    <span class="htitle">' + title + '</span><span class="htitle2">GMV:</span><span class="hvalue">'+ GMV +'</span><span class="hper">'+hper+'</span>' +
            '                </div>\n' +
            '                <div class="nodecont">\n' +
            '                    <table>\n' +
            '                        <tr><td class="stitle">UV：   </td><td class="svalue">'+uv+'            </td><td class="stitle">同比：</td><td class="svalue '+(v.uvWeekOnWeek>0?'green':'red')+'">'+uvWeekOnWeek+'</td><td class="stitle">环比:</td><td class="svalue '+(v.uvDayOnDay>0?'green':'red')+'">'+uvDayOnDay+'</td></tr>\n' +
            '                        <tr><td class="stitle">转化率：</td><td class="svalue">'+converRate+'    </td><td class="stitle">同比：</td><td class="svalue '+(v.converRateWeekOnWeek>0?'green':'red')+'">'+converRateWeekOnWeek+'</td><td class="stitle">环比:</td><td class="svalue '+(v.converRateDayOnDay>0?'green':'red')+'">'+converRateDayOnDay+'</td></tr>\n' +
            '                        <tr><td class="stitle">客单价：</td><td class="svalue">'+userPrice+'     </td><td class="stitle">同比：</td><td class="svalue '+(v.userPriceWeekOnWeek>0?'green':'red')+'">'+userPriceWeekOnWeek+'</td><td class="stitle">环比:</td><td class="svalue '+(v.userPriceDayOnDay>0?'green':'red')+'">'+userPriceDayOnDay+'</td></tr>\n' +
            '                        <tr><td class="stitle" colspan="6">(频次：'+orderFrequency+' * 单均价'+orderPrice+')</td></tr>\n' +
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
                id:'1'+'__'+v.groupType,
                isroot:isRoot||false,
                value:v,
                data:v.groupType,
                topic:_this.buildTopic(v)
              }
              nodeitems.push(node)
            })
        }

        return nodeitems;
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
    render() {

        return (
          <Spin spinning={this.state.loading} tip="Loading..." size="large" >
            <div id="jsmind_container" style={{height:this.state.jsboxHeight+'px'}}>
              <i onClick={this.fullscreenClick.bind(this)} style={{zIndex: 999,cursor:'pointer',right: '10px',top:'10px',position: 'absolute'}} className='icon'>{this.state.fullscreen ==  false?fullscreenSvg:fullscreenExitSvg}</i>
              <div class="ant-dropdown  ant-dropdown-placement-bottomLeft " style={{left:this.state.offsetX+'px',top:this.state.offsetY+'px'}}>
                <ul className="ant-dropdown-menu ant-dropdown-menu-light ant-dropdown-menu-root ant-dropdown-menu-vertical" role="menu" tabindex="0">
                  <li className="ant-dropdown-menu-item" role="menuitem">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                  </li>
                  <li className="ant-dropdown-menu-item" role="menuitem">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                  </li>
                  <li className="ant-dropdown-menu-item" role="menuitem">
                    <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
                  </li>
                </ul>
              </div>
            </div>
          </Spin>

        )
    }
}

export default FlowTrend;
