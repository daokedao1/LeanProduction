/**
 * Created by hao.cheng on 2017/4/21.
 */
import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Brush} from 'recharts';
import { Col,Checkbox} from 'antd';


const data = [
    {name: 'Page A', 进口压力: 4000, 出口压力: 2400, amt: 2400},
    {name: 'Page B', 进口压力: 3000, 出口压力: 1398, amt: 2210},
    {name: 'Page C', 进口压力: 2000, 出口压力: 9800, amt: 2290},
    {name: 'Page D', 进口压力: 2780, 出口压力: 3908, amt: 2000},
    {name: 'Page E', 进口压力: 1890, 出口压力: 4800, amt: 2181},
    {name: 'Page F', 进口压力: 2390, 出口压力: 3800, amt: 2500},
    {name: 'Page G', 进口压力: 3490, 出口压力: 4300, amt: 2100},
];
class RechartsSimpleLineChart extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.data)
    }

    render(){
        return(
         <div>
        <Col md={21}>
        <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={data}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                        >
                
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            {
                                this.props.data.map((item,index)=>(
                                    
                                    item.show?<Line key={index} type="monotone" dataKey={item.dataKey} stroke={item.stroke} activeDot={{r: 8}} />:''
                                ))
                            }
                          {
                              this.props.type=='1'? <Brush />:''
                          }
                        </LineChart>
                    </ResponsiveContainer>

        </Col>
        <Col md={3}>
            <div >
            { this.props.data.map((item,index)=>(
                <div>
                <Checkbox checked={item.show} key={index} onChange={()=>this.props.change(item)}>{item.dataKey}</Checkbox>

                </div>
            ))
            }
            </div>
        </Col>          
     </div>
      
        )
    }
}
// const RechartsSimpleLineChart = () => (

// );

export default RechartsSimpleLineChart;