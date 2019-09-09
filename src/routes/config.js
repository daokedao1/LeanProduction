export default {
    menus: [
        // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Main' },
        { key: '/app/operate', title: '数据总揽',icon: 'area-chart',
          subs: [
              { key: '/app/operate/overview1', title: '总揽数据', component: 'DataOverView' },
            { key: '/app/operate/overview', title: '实时数据', component: 'realLine' },
            // { key: '/app/operate/conversionanalysis', title: '历史数据', component: 'ConversionAnalysis' },
            // { key: '/app/operate/flowanalysis', title: '拆解培训教程', component: 'FlowAnalysis' },
            { key: '/app/operate/alertSet', title: '报警值设置', component: 'alertSet' },
            { key: '/app/operate/alertRecord', title: '报警记录', component: 'alertRecord' },
            // { key: '/app/operate/flowanalysis', title: '操作记录', component: 'FlowAnalysis' },
            // { key: '/app/waterData/allData', title: '总览数据', component: 'allData' },
            // { key: '/app/waterData/realData', title: '实时数据', component: 'realData' },
            // { key: '/app/waterData/realLine', title: '实时数据', component: 'realLine' },
            { key: '/app/waterData/historyLine', title: '历史曲线', component: 'historyLine' },
            { key: '/app/waterData/historyData', title: '历史数据', component: 'historyData' },
            { key: '/app/waterData/course', title: '拆解培训教程', component: 'course' },
            // { key: '/app/operate/demo', title: 'demo.jsx', component: 'Demo' },
          ]},
        { key: '/app/other', title: '平台管理',icon: 'scan',
          subs:[
              { key: '/app/operate/main', title: '用户管理', component: 'Main' },
              { key: '/app/operate/overview1', title: '角色管理', component: 'DataOverView' },
              { key: '/app/operate/overview2', title: '单位管理', component: 'OverView' },
          ]
        },
        // { key: '/app/ui3', title: '增长分析', icon: 'rocket',component: 'Dashboard' },
        // { key: '/app/ui2', title: '搜索推荐',icon: 'bars', component: 'Dashboard' },
        // { key: '/app/dashboard/index1s', title: '帮助中心', icon: 'copy',component: 'Dashboard' },


    ],
    others: [], // 非菜单相关路由
};
