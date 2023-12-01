import React, { useContext, useEffect, useRef, useState } from 'react'
import type { InputRef } from 'antd'
import * as _ from 'lodash'
import { Button, Form, Input, Popconfirm, Select, Switch, Table } from 'antd'
import type { FormInstance } from 'antd/es/form'
import {
  ColumnTypes,
  DataType,
  EditableCellProps,
  EditableRowProps
} from '../../../types/InterTypes' // 导入所需的类型定义;
const EditableContext = React.createContext<FormInstance<any> | null>(null)
const options = [
  {
    value: 'integer',
    label: <span style={{ color: 'red' }}>integer</span>
  },
  {
    value: 'number',
    label: <span style={{ color: 'rgb(235,47,150)' }}>number</span>
  },
  {
    value: 'string',
    label: <span style={{ color: 'green' }}>string</span>
  },
  {
    value: 'array',
    label: <span style={{ color: 'green' }}>array</span>
  }
]
// 可编辑的表格行组件
const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm() // 创建表单实例
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

// 可编辑的表格单元格组件
const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false) // 状态用于标识单元格是否处于编辑状态
  const inputRef = useRef<InputRef>(null)
  const form = useContext(EditableContext)!
  useEffect(() => {
    if (editing) {
      inputRef.current!.focus()
    }
  }, [editing])

  // 切换编辑状态
  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  // 保存编辑后的内容
  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.log('Save failed:', errInfo)
    }
  }

  let childNode = children
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: false,
            message: `${title} 是必须的`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}
// 主应用组件
const App: React.FC = () => {
  const [ParamsObj, setParams] = useState<any>({})
  const [showIcon, setShowIcon] = useState<any>({})
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: (
        <Select
          defaultValue="integer"
          options={options}
          onChange={(value, option) => saveType(value, '0')}
        />
      ),
      isRequire: (
        <Switch
          checkedChildren="必须"
          defaultChecked
          unCheckedChildren="不必须"
          onChange={(value) => saveRequire('0', value)}
        />
      )
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: (
        <Select
          defaultValue="integer"
          onChange={(value, option) => saveType(value, '1')}
          options={options}
        />
      ),
      isRequire: (
        <Switch
          checkedChildren="必须"
          defaultChecked
          unCheckedChildren="不必须"
          onChange={(value) => saveRequire('1', value)}
        />
      )
    }
  ])
  //存储新的参数类型
  const saveType = (value: string, key: any) => {
    const oldParams = ParamsObj
    const newObj = Object.assign(oldParams, { [key]: value })
    //ParamsObj[key] = value;
    setParams(newObj)
  }
  //储存新的require
  const saveRequire = (key: string, value: boolean) => {
    const oldobj = showIcon
    const newobj = Object.assign(oldobj, { [key]: value })
    setShowIcon(newobj)
  }
  const [count, setCount] = useState(2)
  // 删除数据行
  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key)
    setDataSource(newData)
  }

  // 默认的表格列定义，其中可编辑的列设置了editable: true
  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean
    dataIndex: any
  })[] = [
    {
      title: '参数',
      dataIndex: 'name',
      width: '30%',
      editable: true
    },
    {
      title: '值',
      dataIndex: 'age',
      editable: true
    },
    {
      title: '类型',
      dataIndex: 'address'
    },
    {
      title: '是否必须',
      dataIndex: 'isRequire'
    },
    {
      title: '更多操作',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="确定删除" onConfirm={() => handleDelete(record.key)}>
            <span style={{ cursor: 'pointer' }}>删除</span>
          </Popconfirm>
        ) : null
    }
  ]
  // 添加新数据行
  const handleAdd = () => {
    const newData: DataType = {
      key: `${count}`,
      name: '',
      age: '',
      isRequire: (
        <Switch
          defaultChecked
          checkedChildren="必须"
          unCheckedChildren="不必须"
          onChange={(value) => saveRequire(count + '', value)}
        />
      ),
      address: (
        <Select
          defaultValue="integer"
          options={options}
          onChange={(value) => saveType(value, count + '')}
        />
      )
    }
    setDataSource([...dataSource, newData])
    setCount(count + 1)
  }
  //读取Params数据,获取所有添加的参数
  const requireParams = () => {
    //深拷贝一下，防止影响内部组件正常使用
    const copyobj = _.cloneDeep(dataSource)
    const newarr = copyobj.map((item) => {
      if (ParamsObj[item.key]) {
        return Object.assign(item, {
          address: ParamsObj[item.key] || 'integer'
        })
      } else {
        return Object.assign(item, { address: 'integer' })
      }
    })
    const newarr2 = newarr.map((item) => {
      if (showIcon[item.key] !== undefined) {
        return Object.assign(item, { isRequire: showIcon[item.key] })
      } else {
        return Object.assign(item, { isRequire: true })
      }
    })
    //获得的结果
    console.log(newarr2)
  }
  // 保存编辑后的数据
  const handleSave = (row: DataType) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row
    })
    setDataSource(newData)
  }
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  // 为每一列设置可编辑属性
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })
  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        添加参数
      </Button>
      <Table
        size="small"
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={false}
      />
    </div>
  )
}
export default App
