/**
 * Created by hao.cheng on 2017/5/5.
 */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';


class UvTrend extends Component {

    constructor(props) {
        super(props);
    }


    componentDidUpdate() {


    }


    render() {

        let {title,data} = this.props;

        var seriesUV = {
            name: 'UV',
            type: 'line',
            yAxisIndex: 0,
            smooth:true,
            data: []
        };
        var seriesHB = {
            name: '环比',
            type: 'line',
            yAxisIndex: 1,
            smooth:true,
            data: []
        };
        var seriesTB = {
            name: '同比',
            type: 'line',
            yAxisIndex: 1,
            smooth:true,
            data: []
        };

        var xAxis=[]

        for (var i in data) {

            if(data[i].groupTypeDesc !== ''){

                xAxis.push(data[i].dateTime)

                seriesUV.data.push(data[i].uv || 0)
                seriesHB.data.push(((data[i].uvDayOnDay || 0) * 100).toFixed(2))
                seriesTB.data.push(((data[i].uvWeekOnWeek || 0) * 100).toFixed(2))
            }

        }

        const option = {
            title:{
                text:title
            },
            color: ["#37A2DA", "#FFF", "#FFF", "#FFF"],
            tooltip: {
                trigger: 'axis',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox:{
                show: true,
                feature: {
                    magicType: {
                        type: ['line', 'bar']
                    },  //切换为折线图，切换为柱状图
                    saveAsImage: {}   //保存为图片
                }
            },
            legend: {
                data:['UV'],
            },
            xAxis: {
                type: 'category',
                boundaryGap : false,
                splitLine:{show:false},
                data: xAxis,

            },
            yAxis: [
                {
                    type: "value",
                    splitLine: {show: false},
                },
                {
                    type: "value",
                    max:50,
                    splitLine: {show: false},
                    axisLabel : {
                        formatter: '{value} %'
                    }
                }
            ],
            series: [seriesUV,seriesHB,seriesTB]
        };

        return (
            <ReactEcharts
                option={option}
                style={{height: '250px', width: '100%'}}
                className={'react_for_echarts'}
            />)
    }

}

export default UvTrend;
