import { UploadOutlined } from '@ant-design/icons'
import type { EditableFormInstance, ProColumns, ProFormInstance } from '@ant-design/pro-components'
import { EditableProTable, ProForm } from '@ant-design/pro-components'
import { Button, Input, Upload } from 'antd'
import React, { FC, useRef, useState } from 'react'
type DataSourceType = {
  id: React.Key
  params?: string
  paramsvalue?: any
  type?: 'integer' | 'file' | 'array' | 'number' | 'string'
  desc?: string
  isRequire?: string
  created_at?: number
  update_at?: number
  children?: DataSourceType[]
}
/**
 * children:子元素
 * requireFile：是否需要file文件类型
 */
interface Iprops {
  children?: any
  requireFile?: boolean
}
//初始数据
const defaultData: DataSourceType[] = [
  {
    id: '624748504',
    params: '',
    paramsvalue: '',
    type: 'integer',
    desc: '',
    isRequire: '必须',
    created_at: 1590486176000,
    update_at: 1590486176000
  }
]
const AdvanceForm: FC<Iprops> = (props) => {
  const { requireFile = false } = props
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => [])
  const [controlled, setControlled] = useState<boolean>(false)
  const formRef = useRef<ProFormInstance<any>>()
  const editorFormRef = useRef<EditableFormInstance<DataSourceType>>()
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '参数名',
      dataIndex: 'title',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }]
        }
      },
      width: '30%'
    },
    {
      title: '参数值',
      key: 'paramsvalue',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }]
        }
      },
      dataIndex: 'paramsvalue',
      renderFormItem: (text, record, _, action) => {
        const isFileUpload = record.record?.type === 'file'
        if (isFileUpload) {
          return (
            <CustomUpload
              onChange={(fileList) =>
                formRef.current?.setFieldsValue({
                  table: { ...record.record, paramsvalue: fileList }
                })
              }
            />
          )
        } else {
          return <Input />
        }
      },
      renderText(text, record, index, action) {
        const isfile = record.type === 'file'
        if (isfile) {
          const filearr = Array.isArray(record.paramsvalue) ? record.paramsvalue : []
          return (
            <div>
              {filearr.map((item: any, index: number) => {
                return <p key={index}>{item.name}</p>
              })}
            </div>
          )
        } else {
          return <span>{text}</span>
        }
      }
    },
    {
      title: '类型',
      dataIndex: 'type',
      formItemProps: () => {
        return {
          rules: [{ required: true, message: '此项为必填项' }]
        }
      },
      valueEnum: {
        integer: {
          text: <span style={{ color: 'red' }}>integer</span>
        },
        string: {
          text: <span style={{ color: 'rgb(82,152,102)' }}>string</span>
        },
        array: {
          text: <span style={{ color: 'rgb(82,152,102)' }}>array</span>
        },
        number: {
          text: <span style={{ color: 'rgb(231,45,159)' }}>number</span>
        },
        file: {
          disabled: !requireFile,
          text: <span style={{ color: 'rgb(231,45,159)', width: '100%' }}>file</span>
        }
      }
    },
    {
      title: '是否必须',
      dataIndex: 'isRequire',
      valueType: 'select',
      valueEnum: {
        必须: { text: '必须', status: 'Error' },
        不必须: { text: '不必须', status: 'Success' }
      }
    },
    {
      title: '说明',
      dataIndex: 'desc',
      valueType: 'text'
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id)
          }}
        >
          编辑
        </a>,

        <a
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue('table') as DataSourceType[]
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== record.id)
            })
          }}
        >
          删除
        </a>
      ]
    }
  ]
  //获取整个table 的方法
  const requireDate = () => {
    const raw = editorFormRef.current?.getRowsData?.()
    console.log(raw)
  }
  return (
    <ProForm<{
      table: DataSourceType[]
    }>
      formRef={formRef}
      initialValues={{
        table: defaultData
      }}
      validateTrigger="onBlur"
      submitter={false}
    >
      <button
        onClick={() => {
          console.log(formRef.current?.getFieldsValue().table)
        }}
      >
        获取数据
      </button>
      <EditableProTable<DataSourceType>
        rowKey="id"
        scroll={{
          x: 960
        }}
        editableFormRef={editorFormRef}
        // headerTitle="key-value"
        /* maxLength={5} */
        name="table"
        controlled={controlled}
        recordCreatorProps={{
          position: 'bottom',
          record: () => ({ id: (Math.random() * 1000000).toFixed(0) })
        }}
        columns={columns}
        editable={{
          type: 'multiple',
          editableKeys,
          onChange: setEditableRowKeys
        }}
        bordered /* 添加边框 */
      />
    </ProForm>
  )
}
const CustomUpload: React.FC<{
  onChange?: (fileList: any[]) => void
}> = ({ onChange }) => {
  const [fileList, setFileList] = useState<any[]>([])
  const handleUpload = (info: any) => {
    console.log(info)
    let fileList = [...info.fileList]
    fileList = fileList.slice(-5) // 限制最多上传5个文件
    setFileList(fileList)
    //文件传给外部函数
    onChange?.(fileList)
  }

  return (
    <Upload
      fileList={fileList}
      onChange={handleUpload}
      showUploadList={{
        showRemoveIcon: true
      }}
      multiple // 允许上传多个文件
    >
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  )
}
export default AdvanceForm
