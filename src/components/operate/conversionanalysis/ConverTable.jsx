import React from 'react';
import {Button, Card, Checkbox, Col, Modal, Popover, Row, Select, Table} from 'antd';
import {getOperateConverDrillList, getOperateConverList} from '../../../axios'

const CheckboxGroup = Checkbox.Group;

const RESOURCE_CLASS_OPTIONS = [
    {name: '搜索', value: 5},
    {name: '推荐', value: 6},
    {name: '首页资源位', value: 1},
    {name: '频道', value: 3},
    {name: '分类页', value: 7},
    {name: '分享回流', value: 4},
    {name: '其他', value: 8},

];


// 指标
const KPI_1 = [
    {label: 'UV', value: 'uv'},
    {label: '加车UV', value: 'addCartNum'},
    {label: '购买用户数', value: 'payUserNum'},
    {label: '实付金额', value: 'payPrice'},
    {label: '实收金额', value: 'netPrice'},
    {label: '实付客单价', value: 'netUserPrice'},
    {label: '实收客单价', value: 'userPrice'},
    {label: '转化率', value: 'converRate'}
]


// 指标
const KPI_2 = [
    {label: 'UV对比', value: 'uvCompareRate'},
    {label: '加车UV对比', value: 'addCartNumCompareRate'},
    {label: '购买用户数对比', value: 'payUserNumCompareRate'},
    {label: '实付金额对比', value: 'payPriceCompareRate'},
    {label: '实收金额对比', value: 'netPriceCompareRate'},
    {label: '实付客单价对比', value: 'netUserPriceCompareRate'},
    {label: '实收客单价对比', value: 'userPriceCompareRate'},
    {label: '转化率对比', value: 'converRateCompareRate'}
]

function numSorter(a, b, key) {
    return a[key] - b[key];
}

function strSorter(a, b, key) {
    return a[key].length - b[key].length;
}

function numFormat(v) {
    return (v || 0) > 1000 ? ((v || 0) / 10000).toFixed(2) + 'w' : (v || 0)
}


// 表格公共列
const DEF_COLUMNS = [

    {
        title: 'UV',
        dataIndex: 'uv',
        key: 'uv',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'uv')
    }, {
        title: '加车UV',
        dataIndex: 'addCartNum',
        key: 'addCartNum',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'addCartNum')
    },
    {
        title: '购买用户数',
        dataIndex: 'payUserNum',
        key: 'payUserNum',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'payUserNum')
    },
    {
        title: '实付金额',
        dataIndex: 'payPrice',
        key: 'payPrice',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'payPrice')
    },
    {
        title: '实收金额',
        dataIndex: 'netPrice',
        key: 'netPrice',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'netPrice')
    },
    {
        title: '实付客单价',
        dataIndex: 'netUserPrice',
        key: 'netUserPrice',
        render: v => (v || 0).toFixed(2),
        sorter: (a, b) => numSorter(a, b, 'netUserPrice')
    },
    {
        title: '实收客单价',
        dataIndex: 'userPrice',
        key: 'userPrice',
        render: v => (v || 0).toFixed(2),
        sorter: (a, b) => numSorter(a, b, 'userPrice')
    },
    {
        title: '转化率',
        dataIndex: 'converRate',
        key: 'converRate',
        render: v => ((v || 0) * 100).toFixed(2) + '%',
        sorter: (a, b) => numSorter(a, b, 'converRate')
    }, {
        title: 'UV对比',
        dataIndex: 'uvCompareRate',
        key: 'uvCompareRate',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'uvCompareRate')
    }, {
        title: '加车UV对比',
        dataIndex: 'addCartNumCompareRate',
        key: 'addCartNumCompareRate',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'addCartNumCompareRate')
    },
    {
        title: '购买用户数对比',
        dataIndex: 'payUserNumCompareRate',
        key: 'payUserNumCompareRate',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'payUserNumCompareRate')
    },
    {
        title: '实付金额对比',
        dataIndex: 'payPriceCompareRate',
        key: 'payPriceCompareRate',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'payPriceCompareRate')
    },
    {
        title: '实收金额对比',
        dataIndex: 'netPriceCompareRate',
        key: 'netPriceCompareRate',
        render: numFormat,
        sorter: (a, b) => numSorter(a, b, 'netPriceCompareRate')
    },
    {
        title: '实付客单价对比',
        dataIndex: 'netUserPriceCompareRate',
        key: 'netUserPriceCompareRate',
        render: v => (v || 0).toFixed(2),
        sorter: (a, b) => numSorter(a, b, 'netUserPriceCompareRate')
    },
    {
        title: '实收客单价对比',
        dataIndex: 'userPriceCompareRate',
        key: 'userPriceCompareRate',
        render: v => (v || 0).toFixed(2),
        sorter: (a, b) => numSorter(a, b, 'userPriceCompareRate')
    },
    {
        title: '转化率对比',
        dataIndex: 'converRateCompareRate',
        key: 'converRateCompareRate',
        render: v => ((v || 0) * 100).toFixed(2) + '%',
        sorter: (a, b) => numSorter(a, b, 'converRateCompareRate')
    }
];


class ConverTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            drillColumns: [],
            rscTypeCdList: '',
            resourcesClassSelectItem: [],
            dataList: [],
            loading: true,

            isUpdate: false,
            startTime: this.props.startTime,
            endTime: this.props.endTime,


            isShowDrillModal: false,//是否显示下钻弹出层
            drillDataList: [], // 下钻数据
            drillTitle: '', // 下钻数据
            drillLoading: false,
        }
    }


    componentDidMount() {
        this.setState({columns: this.getTableCols(), drillColumns: this.getDrillTableCols()})
        this.buildList();
    }

    componentDidUpdate() {

        if (this.props.startTime != this.state.startTime || this.props.endTime != this.state.endTime) {
            this.buildList();
        }

    }

    /**
     * 获取表格列配置信息
     * @returns {{sorter: (function(*=, *=): *), dataIndex: string, title: string, render(*, *=): *, key: string}[]|*}
     */
    getTableCols() {
        const $this = this
        // 默认表格列

        let tableCols = [
            {
                title: '资源类型',
                dataIndex: 'rscTypeDesc',
                key: 'rscTypeDesc',
                render(text, record) {
                    return <span onClick={$this.drillRow.bind($this, record)}
                                 style={{color: "blue", cursor: "pointer"}}>{text}</span>;
                },
                sorter: (a, b) => strSorter(a, b, 'rscTypeDesc')
            }
        ]
        let kpiValues = KPI_1.map(x => x.value)
        DEF_COLUMNS.forEach((item) => {
            if (kpiValues.indexOf(item.dataIndex) >= 0) {
                tableCols.push(item)
            }
        })

        return tableCols
    }

    /**
     * 获取下钻表格列配置信息
     * @returns {{sorter: (function(*=, *=): *), dataIndex: string, title: string, key: string}[]}
     */
    getDrillTableCols() {
        // 下钻表格列
        let tableCols = [
            {
                title: '运营位名称',
                dataIndex: 'oplocDesc',
                key: 'oplocDesc',
                sorter: (a, b) => strSorter(a, b, 'oplocDesc')
            }
        ]

        let kpiValues = KPI_1.map(x => x.value)

        DEF_COLUMNS.forEach((item) => {
            if (kpiValues.indexOf(item.dataIndex) >= 0) {
                tableCols.push(item)
            }
        })

        return tableCols
    }


    /**
     * 获取表格数据
     */
    buildList() {
        let {startTime = '', endTime = '', compareStartTime = '', compareEndTime = ''} = this.props;
        let param = {
            startTime: startTime,
            endTime: endTime,
            compareStartTime: compareStartTime,
            compareEndTime: compareEndTime,
            rscTypeCdList: this.state.rscTypeCdList
        }
        this.setState({loading: true, startTime: this.props.startTime, endTime: this.props.endTime})
        getOperateConverList(param).then((res) => {
            if (res.success) {

                let data = [];
                res.data.dataList.forEach((v, i) => {
                    data.push({
                        key: i, ...v
                    })
                })
                this.setState({
                    dataList: data,

                    loading: false,
                })
            }
            this.setState({
                startTime: this.props.startTime,
                loading: false,
            })
        })
    }

    /**
     * 获取下钻数据
     * @param rscTypeCd
     */
    buildDrillList(rscTypeCd) {
        let {startTime = '', endTime = ''} = this.props;
        let param = {
            startTime: startTime,
            endTime: endTime,
            rscTypeCd: rscTypeCd
        }
        getOperateConverDrillList(param).then((res) => {
            if (res.success) {

                let data = [];
                res.data.dataList.forEach((v, i) => {
                    data.push({
                        key: i, ...v
                    })
                })
                this.setState({
                    drillDataList: data,
                    drillLoading: false,
                })
            }

        })
    }

    /**
     * 下钻
     * @param num
     */
    drillRow(record) {
        this.setState({drillLoading: true, isShowDrillModal: true, drillTitle: record.rscTypeDesc})
        this.buildDrillList(record.rscTypeCd)
    }


    /**
     * 关闭下钻表格弹出层
     */
    closeDrillModal() {
        this.setState({isShowDrillModal: false})
    }


    resourcesClassSelectItemClick(selectedItems) {
        this.setState({resourcesClassSelectItem: selectedItems, rscTypeCdList: selectedItems.join(',')});
    }


    render() {

        let $this = this

        const {resourcesClassSelectItem} = this.state;
        const filteredOptions = RESOURCE_CLASS_OPTIONS.filter(o => !resourcesClassSelectItem.includes(o));


        /**
         * 选择指标
         * @param kpis
         * @returns {*}
         */
        function onCheckKpi(e) {
            let data = $this.state.columns
            let drillData = $this.state.drillColumns

            let value = e.target.value
            // 选中
            if (e.target.checked) {

                DEF_COLUMNS.forEach((r, index) => {
                    if (r.dataIndex === value) {
                        data.push(r);
                        drillData.push(r);
                    }
                });
                // 未选中
            } else {
                data = data.filter((r) => {
                    return r.dataIndex !== value
                })
                drillData = drillData.filter((r) => {
                    return r.dataIndex !== value
                })
            }
            $this.setState({columns: data, drillColumns: drillData});
        }

        const moreKpiContent = (
            <div style={{width: "150px"}}>
                <Row>
                    <Col md={22}>
                        {
                            KPI_1.map((item) => {
                                return <label key={item.label} style={{display: "block"}}><Checkbox
                                    defaultChecked={true}
                                    value={item.value}
                                    onChange={onCheckKpi}/>{item.label}
                                </label>
                            })
                        }
                    </Col>
                    <Col md={2}/>
                    <Col md={1}>
                        {
                            // KPI_2.map((item) => {
                            //     return <label key={item.label} style={{display: "block"}}><Checkbox
                            //         defaultChecked={false}
                            //         value={item.value}
                            //         onChange={onCheckKpi}/>{item.label}
                            //     </label>
                            // })
                        }
                    </Col>
                </Row>
            </div>
        );


        const converTableOpt = (
            <Row>
                <Col md={20}>
                    <span>资源类型：</span>
                    <div className="selectOpt">
                        <Select
                            mode="multiple"
                            placeholder="默认查找全部"
                            value={resourcesClassSelectItem}
                            onChange={this.resourcesClassSelectItemClick.bind(this)}
                            style={{width: '100%'}}
                        >
                            {filteredOptions.map((item, i) => (
                                <Select.Option key={i} value={item.value}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <Button type="primary" style={{marginLeft: '30px'}} onClick={this.buildList.bind(this)}>查询</Button>
                    <Button style={{display: 'none'}}>导出</Button>
                </Col>
                <Col md={4} style={{textAlign: "right"}}>
                    <Popover placement="leftTop" title='选择指标' content={moreKpiContent} trigger="click">
                        <Button size={"small"}>更多指标</Button>
                    </Popover>
                </Col>
            </Row>
        )
        return (
            <Card
                title={converTableOpt}
                bordered={false}

            >

                <Table loading={this.state.loading} columns={this.state.columns}
                       size={"middle"}
                       dataSource={this.state.dataList}
                />


                <Modal
                    width={1000}
                    bodyStyle={{overflowY:"scroll"}}
                    title={this.state.drillTitle}
                    visible={this.state.isShowDrillModal}
                    onCancel={this.closeDrillModal.bind(this)}
                    footer={
                        [] // 设置footer为空，去掉 取消 确定默认按钮
                    }

                >
                    <Table
                        bordered={false}
                        size="small"

                        loading={this.state.drillLoading}
                        columns={this.state.drillColumns}
                        dataSource={this.state.drillDataList}
                          destroyOnClose={true}/>

                </Modal>


            </Card>

        )
    }
}

export default ConverTable;
