import React from 'react';
import { Tabs,Table,Tag,Divider} from 'antd';
import Tencent from './Tencent';

const { TabPane } = Tabs;



class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      }
    }
    callback(key) {
      console.log(key);
    }
    render() {
      const columns = [
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '设备数量',
          dataIndex: 'num',
          key: 'num',
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: '状态',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 2 ? 'geekblue' : 'green';
                if (tag === 'loser') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <a>进入</a>
              <Divider type="vertical" />
              <a>删除</a>
            </span>
          ),
        },
      ];

      const data = [
        {
          key: '1',
          name: '华北油田采油三厂楚一联合注水站监控中心',
          num: 32,
          address: '辽宁省大连市开发新区',
          tags: ['运行中', 'developer'],
        },
        {
          key: '2',
          name: '华北油田采油三厂楚一联合注水站监控中心1',
          num: 42,
          address: '辽宁省大连市开发新区',
          tags: ['关闭'],
        },
        {
          key: '3',
          name: '华北油田采油三厂楚一联合注水站监控中心2',
          num: 32,
          address: '河北省唐山市',
          tags: ['运行中', '警告'],
        },
      ];
        return (
            <div className="gutter-example">
            <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
               <TabPane tab="地图" key="1">
                 <Tencent />
               </TabPane>
               <TabPane tab="列表" key="2">
                  <Table columns={columns} dataSource={data} />
               </TabPane>

             </Tabs>
            </div>
        )
    }
}

export default Main;
