/**
 * Created by hao.cheng on 2017/4/16.
 */
import axios from 'axios';
import { GET, POST } from './tools';
import * as config from './config';

export const getBbcNews = () => GET(config.NEWS_BBC).then(res=>res);

// export const npmDependencies = () =>
//     axios
//         .get('./npm.json')
//         .then(res => res.data)
//         .catch(err => console.log(err));
//
// export const weibo = () =>
//     axios
//         .get('./weibo.json')
//         .then(res => res.data)
//         .catch(err => console.log(err));
//
// export const gitOauthLogin = () =>
//     GET({
//         url: `${
//             config.GIT_OAUTH
//         }/authorize?client_id=792cdcd244e98dcd2dee&redirect_uri=http://localhost:3006/&scope=user&state=reactAdmin`,
//     }).then(res=>res)
// export const gitOauthToken = code =>
//     POST(
//         `https://cors-anywhere.herokuapp.com/${config.GIT_OAUTH}/access_token`,
//         {
//             client_id: '792cdcd244e98dcd2dee',
//             client_secret: '81c4ff9df390d482b7c8b214a55cf24bf1f53059',
//             redirect_uri: 'http://localhost:3006/',
//             state: 'reactAdmin',
//             code,
//         }).then(res=>res)
// // {headers: {Accept: 'application/json'}}
// export const gitOauthInfo = access_token =>
//     GET(`${config.GIT_USER}access_token=${access_token}`).then(res=>res)

// easy-mock数据交互
// 管理员权限获取
export const login = (param = {}) => GET(config.MOCK_AUTH_ADMIN,param ).then(res=>{
  return res
}).catch(err=>err)

export const getOperateOverviewList = (param = {}) => GET(config.OPERATE_OVERVIEW_LIST,param ).then(res=>{
  return res
}).catch(err=>err)

// UV 趋势图
export const getOperateOverviewUvTrend = (param = {}) => GET(config.OPERATE_OVERVIEW_UV_TREND,param ).then(res=>{
  return res
}).catch(err=>err)
//转化分析-转化分析列表
    export const getOperateConverList = (param = {}) => GET(config.OPERATE_CONVER_LIST,param ).then(res=>{
      return res
    }).catch(err=>err)
    // 转化分析-转化分析下钻列表
    export const getOperateConverDrillList = (param = {}) => GET(config.OPERATE_CONVER_DRILL_LIST,param ).then(res=>{
      return res
    }).catch(err=>err)


    //资源类型分布
    export const getOperateConverResurceDiagramList = (param = {}) => GET(config.OPERATE_RESOURCEDIAGRAM_LIST,param ).then(res=>{
      return res
    }).catch(err=>err)
    //指标趋势图
    export const getOperateIndexTrend = (param = {}) => GET(config.OPERATE_INDEX_TREND,param ).then(res=>{
      return res
    }).catch(err=>err)
    //资源位TOP
    export const getOperateResourceTop = (param = {}) => GET(config.OPERATE_RESOURCETOP_LIST,param ).then(res=>{
      return res
    }).catch(err=>err)
//流量分析
    //用户列表
    export const getOperateFlowGetUser = (param = {}) => GET(config.OPERATE_FLOW_GETUSEER_LIST,param ).then(res=>{
      return res
    }).catch(err=>err)
    //柱状趋势图
    export const getOperateGetUserUvTrend = (param = {}) => GET(config.OPERATE_FLOW_GETUSEERUV_TREND,param ).then(res=>{
      return res
    }).catch(err=>err)
