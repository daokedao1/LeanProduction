
import React from 'react';
import {  Card,Radio,Table} from 'antd';
import {getThousandNum} from '../../../utils/'
import {getOperateFlowGetUser} from '../../../axios'
import {strSorter,numSorter,numFormat} from '../../../utils'
const color = ["#92CEFF","#9FE6B8","#37A2DA","#9d96f5", "#32C5E9","#E690D1", "#67E0E3", "#FFDB5C", "#ff9f7f", "#fb7293", "#E062AE",  "#e7bcf3", "#9d96f5", "#8378EA", "#96BFFF"]

const disMaping={

}
const columns = [
  // {
  //         title: '用户身份',
  //         dataIndex: 'user_level_cd_desc',
  //         key: 'user_level_cd_desc',
  //         render: text => <span>{text}</span>,
  //     }, {
  //         title: '来源',
  //         dataIndex: 'apl_type_cd_desc',
  //         key: 'apl_type_cd_desc',
  //
  //     },
  //     {
  //         title: '访问方式',
  //         dataIndex: 'rqs_type_cd_desc',
  //         key: 'rqs_type_cd_desc',
  //
  //     },
  //     {
  //         title: '分享类型',
  //         dataIndex: 'share_type_cd_desc',
  //         key: 'share_type_cd_desc',
  //
  //     },
      {
          title: 'UV',
          dataIndex: 'uv',
          key: 'uv',
          render: v => numFormat(v),
          sorter(a, b) {
           return a.uv - b.uv;
         }
      },
      {
          title: '对比时间UV',
          dataIndex: 'compare_uv',
          key: 'compare_uv',

      },
      {
          title: '对比率',
          dataIndex: 'compare_uv_rate',
          key: 'compare_uv_rate',

      },
    ];

class FlowTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          dataList:[],
          loading:true,
          isUpdata:true,
          startTime:this.props.startTime,
          endTime:this.props.endTime,

          userLevel:this.props.userLevel,
          rqsType:this.props.rqsType,
          aplType:this.props.aplType,
          shareType:this.props.shareType,

          groupByList:'',

          dimensionArr:[{
                  name:'用户身份',
                  istap:true,
                  key:'user_level_cd'
                },{
                  name:'客户端来源',
                  istap:false,
                  key:'apl_type_cd'
                },{
                  name:'唤起方式',
                  istap:false,
                  key:'rqs_type_cd',
                },{
                  name:'分享类型',
                  istap:false,
                  key:'share_type_cd'
                }],
      }
    }

    componentDidMount(){
      this.buildList();
    }
    componentDidUpdate(){

      if(this.props.startTime != this.state.startTime || this.props.endTime != this.state.endTime||this.props.userLevel != this.state.userLevel||this.props.rqsType != this.state.rqsType||this.props.aplType != this.state.aplType||this.props.shareType != this.state.shareType){
          this.buildList();
      }else if(this.state.isUpdata){
           this.buildList();
      }
    }
    buildList(){
      let _this = this;
      let groupByList = [];

      this.state.dimensionArr.forEach((v,i)=>{

         if(v.istap){

           groupByList.push(v.key);
         }
      })

          // this.setState({loading:true})
        getOperateFlowGetUser({
          startTime:_this.props.startTime,
          endTime: _this.props.endTime,
          userLevel:this.props.userLevel,
          rqsType:this.props.rqsType,
          aplType:this.props.aplType,
          shareType:this.props.shareType,
          groupByList:groupByList.join(','),
        }).then((res)=>{
            this.setState({
              loading:false,
              isUpdata:false,
              startTime:this.props.startTime,
              endTime:this.props.endTime,
              userLevel:this.props.userLevel,
              rqsType:this.props.rqsType,
              aplType:this.props.aplType,
              shareType:this.props.shareType,
            })
            if(res.success){
                let data = [];
                res.data.dataList.forEach((v,i)=>{
                  data.push({id:i+1,key:i+1,...v})
                })
                this.setState({
                  dataList:data
                })
            }
        })
    }
    handleChange(v){
      this.setState({
        rscTypeCd:v
      })
    }
    onDimensionChange(targetName,istab,key){

      let dimensionArr = this.state.dimensionArr;
      dimensionArr.forEach((v,i)=>{
         if(v.name ===targetName ){
           dimensionArr.splice(i, 1);
         }
      })
      if(!istab){
          let index = 0;
          for(var k=0;k<dimensionArr.length;k++){
            if(!dimensionArr[k].istap){
              index = k;
              break;
            }else if(k === dimensionArr.length-1){
              index = k+1;
            }
          }

        dimensionArr.splice(index,0,{name:targetName,istap:true,key:key})
      }else{
        dimensionArr.push({name:targetName,istap:false,key:key})
      }

      this.setState({
        dimensionArr:dimensionArr,
        isUpdata:true
      })

    }
    render() {
        const flowTitleBox = (
          <div className="toolHeader">
              <span>选择维度:</span>
              {
                  this.state.dimensionArr.map((v,i)=>{
                      return <span key={i} title={v.name} className={v.istap === true?'dimension active':'dimension'} onClick={this.onDimensionChange.bind(this,v.name,v.istap,v.key)}>{v.name}</span>
                  })
              }
          </div>
        )
        let colArr = []
        this.state.dimensionArr.forEach((v,i)=>{
          if(v.istap){
            colArr.push({
              title: v.name,
              dataIndex: v.key+'_desc',
              key: v.key+'_desc',
              sorter(a, b) {
               return a[v.key].charCodeAt() - b[v.key].charCodeAt(0);
             }
            })
          }

        })
        let column = [...colArr,...columns];
        return (
            <Card title={flowTitleBox} bordered={false} >
                <Table loading={this.state.loading} size={"middle"} columns={column} dataSource={this.state.dataList} />
            </Card>

        )
    }
}

export default FlowTable;
