/**
 * Created by 叶子 on 2017/7/30.
 * 接口地址配置文件
 */

//easy-mock模拟数据接口地址
const EASY_MOCK = 'https://www.easy-mock.com/mock';
const MOCK_AUTH = EASY_MOCK + '/597b5ed9a1d30433d8411456/auth'; // 权限接口地址
export const MOCK_AUTH_ADMIN = MOCK_AUTH + '/admin'; // 管理员权限接口
export const MOCK_AUTH_VISITOR = MOCK_AUTH + '/visitor'; // 访问权限接口

// github授权
export const GIT_OAUTH = 'https://github.com/login/oauth';
// github用户
export const GIT_USER = 'https://api.github.com/user';

// bbc top news
export const NEWS_BBC ='https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070';

const domain = 'http://bidev.mryitao.cn';//'http://venusapi.mryitao.cn'
// 运营操盘
export const OPERATE_OVERVIEW_LIST = domain+'/api/polestar/operate/overview/list';//-概览

export const OPERATE_OVERVIEW_UV_TREND = domain+'/api/polestar/operate/overview/uv/trend';  // UV 趋势图

//转化分析
export const OPERATE_CONVER_LIST = domain+'/api/polestar/operate/change/list';//转化分析列表
export const OPERATE_CONVER_DRILL_LIST = domain+'/api/polestar/operate/change/list/operation';//转化分析下钻列表

export const OPERATE_RESOURCEDIAGRAM_LIST = domain+'/api/polestar/operate/change/list/resource/diagram';//资源类型分布
export const OPERATE_INDEX_TREND = domain+'/api/polestar/operate/change/list/index/trend';//指标趋势图
export const OPERATE_RESOURCETOP_LIST = domain+'/api/polestar/operate/change/list/resource/top';//资源位TOP
//流量分析
export const OPERATE_FLOW_GETUSEER_LIST = domain+'/api/polestar/userInfo/getUserUV';//用户列表
export const OPERATE_FLOW_GETUSEERUV_TREND = domain+'/api/polestar/userInfo/getUserUVTrend';//柱状趋势图
