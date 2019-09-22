import React from 'react'

import { Table, Input, InputNumber, Popconfirm, Form,Select } from 'antd';
const EditableContext = React.createContext();

export let dataList =[
  {
    title:'1#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"IMPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"LUBRICATING_OIL_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"LUBRICATING_OIL_LEVEL",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_A_PHASE_CURRENT",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机C相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_C_PHASE_CURRENT",

  },

  ],
  columns:[
    {
      title: '模拟量名称',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: '报警设置',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '20%',
      editable: false,
      render: ()=>sel
    },
    {
      title: '单位',
      dataIndex: 'ut',
      width: '20%',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    },
  ]
  },
  {
    title:'2#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"EXPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机B相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",

  },

    ],
    columns:[
      {
        title: '模拟量名称',
        dataIndex: 'name',
        width: '25%',
        editable: false,
      },
      {
        title: '报警设置',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: '20%',
        editable: false,
        render: ()=>sel
      },
      {
        title: '单位',
        dataIndex: 'ut',
        width: '20%',
        editable: false,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    保存
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              编辑
            </a>
          );
        },
      },
    ]
  },
  {
    title:'3#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"EXPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机B相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",

  },

  ],
  columns:[
    {
      title: '模拟量名称',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: '报警设置',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '20%',
      editable: false,
      render: ()=>sel
    },
    {
      title: '单位',
      dataIndex: 'ut',
      width: '20%',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    },
  ]
  },
  {
    title:'4#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"EXPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机B相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",

  },

  ],
  columns:[
    {
      title: '模拟量名称',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: '报警设置',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '20%',
      editable: false,
      render: ()=>sel
    },
    {
      title: '单位',
      dataIndex: 'ut',
      width: '20%',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    },
  ]
  },
  {
    title:'5#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"EXPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机B相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",

  },

  ],
  columns:[
    {
      title: '模拟量名称',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: '报警设置',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '20%',
      editable: false,
      render: ()=>sel
    },
    {
      title: '单位',
      dataIndex: 'ut',
      width: '20%',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    },
  ]
  },
  {
    title:'6#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"EXPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机B相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",

  },

  ],
  columns:[
    {
      title: '模拟量名称',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: '报警设置',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '20%',
      editable: false,
      render: ()=>sel
    },
    {
      title: '单位',
      dataIndex: 'ut',
      width: '20%',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    },
  ]
  },
  {
    title:'7#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"EXPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机B相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",

  },

  ],
  columns:[
    {
      title: '模拟量名称',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: '报警设置',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '20%',
      editable: false,
      render: ()=>sel
    },
    {
      title: '单位',
      dataIndex: 'ut',
      width: '20%',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    },
  ]
  },
  {
    title:'8#注水泵',
    arr:[
    {
      name:"出口压力",
      key:"1",
      ut:'MPa',
      age: 0,
      state: '',
      util: `db`,
      value:"EXPORT_PRESSURE",

    },
   {
     name:"进口压力",
     key:"2",
    ut:'MPa',
    age: 0,
    state: '',
    util: `db`,
    value:"EXPORT_PRESSURE",

  },
  {
   name:"电机温度",
   key:"3",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油温度",
   key:"4",
    ut:'℃',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"润滑油液位",
   key:"5",
    ut:'CM',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机A相电流",
   key:"6",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_TEMPERATURE",

  },
  {
   name:"电机B相电流",
   key:"7",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",


  },
  {
   name:"电机B相电流",
   key:"8",
    ut:'A',
    age: 0,
    state: '',
    util: `db`,
    value:"MOTOR_B_PHASE_CURRENT",

  },

  ],
  columns:[
    {
      title: '模拟量名称',
      dataIndex: 'name',
      width: '25%',
      editable: false,
    },
    {
      title: '报警设置',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: '20%',
      editable: false,
      render: ()=>sel
    },
    {
      title: '单位',
      dataIndex: 'ut',
      width: '20%',
      editable: false,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editingKey } = this.state;
        const editable = this.isEditing(record);
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => this.save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  保存
                </a>
              )}
            </EditableContext.Consumer>
            <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <a style={{color:'#1890ff'}} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
            编辑
          </a>
        );
      },
    },
  ]
  },

];
