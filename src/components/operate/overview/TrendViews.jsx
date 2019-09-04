/**
 * Created by hao.cheng on 2017/5/5.
 */
import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from "echarts";


class TrendViews extends Component {

    constructor(props) {
        super(props);
    }


    componentDidUpdate() {


    }


    render() {

        function format(value)  {
            if(value > 10000) return (value / 10000).toFixed(1) + "W";
            if(value > 1000) return (value / 1000).toFixed(1) + "K";
            return (value | 0).toFixed(1)
        }

        let data = this.props.data;


        var seriesGMV = {
            name: 'GMV',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            smooth:true,
            data: []
        };
        var seriesUserPrice = {
            name: '客单价',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            smooth:true,
            data: []
        };
        var seriesUV = {
            name: 'UV',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            smooth:true,
            data: []
        };

        var seriesConverRae = {
            name: '转化率',
            type: 'line',
            xAxisIndex: 3,
            yAxisIndex: 3,
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            smooth:true,
            data: []
        };

        var xAxis = []

        for (var i in data) {

            if (data[i].groupTypeDesc !== '') {

                xAxis.push(data[i].groupTypeDesc)

                seriesUV.data.push(data[i].uv || 0)
                seriesGMV.data.push((data[i].totalPrice || 0).toFixed(2))
                seriesUserPrice.data.push((data[i].userPrice || 0).toFixed(2))
                seriesConverRae.data.push(((data[i].converRate || 0) * 100).toFixed(2))
            }

        }

        const option = {
            color:['#9fccee','#8edadb', '#80cdd5', '#d1c7e8', '#91c7ae','#749f83', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
            tooltip: {
                trigger: 'axis'
            },
            title: [
                {
                    top:'2%',
                    text: 'GMV'
                }, {
                    top:'2%',
                    left: '50%',
                    text: '客单价'
                }, {
                    top: '50%',
                    text: 'UV'
                }, {
                    top: '50%',
                    left:'50%',
                    text: '转化率'
                }],

            grid: [
                {
                    left:'5%',
                    bottom: '55%',
                    right:'55%'
                }, {
                    bottom: '55%',
                    left: '55%',
                }, {
                    left:'5%',
                    top: '60%',
                    right:'55%'
                }, {
                    top: '60%',
                    left: '55%',
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxis,
                }, {
                    type: 'category',
                    boundaryGap: false,
                    gridIndex: 1,
                    data: xAxis,
                }, {
                    type: 'category',
                    boundaryGap: false,
                    gridIndex: 2,
                    data: xAxis,
                }, {
                    type: 'category',
                    boundaryGap: false,
                    gridIndex: 3,
                    data: xAxis,
                }
            ],
            yAxis: [
                {
                    type: "value",
                    splitLine: {show: false},
                    axisLabel:{
                        formatter: format,
                    }
                },
                {
                    type: "value",
                    splitLine: {show: false},
                    gridIndex: 1,

                },
                {
                    type: "value",
                    splitLine: {show: false},
                    gridIndex: 2,
                    axisLabel:{
                        formatter: format,
                    }
                },
                {
                    type: "value",
                    splitLine: {show: false},
                    gridIndex: 3
                }
            ],
            series: [seriesGMV, seriesUserPrice, seriesUV, seriesConverRae]
        };

        return (
            <ReactEcharts
                option={option}
                style={{height: '350px', width: '100%'}}
                className={'react_for_echarts'}
            />)
    }

}

export default TrendViews;
