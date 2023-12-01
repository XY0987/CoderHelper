import React, { memo, useEffect } from 'react'
import { FC, ReactNode } from 'react'
import styles from './index.module.scss'
import { Button, Input, Select, Tabs, TabsProps, Tag } from 'antd'
import MyTabs from '../MyTabs'
import { debounce } from '../../../utils/InterManage/Math'
import ResponeTabs from '../ResponeTabs'
import { useAppSelector } from '../../../store'
import { SaveOutlined, SendOutlined } from '@ant-design/icons'
import InterSpec from '../InterSpec'
import PreviewDoc from '../../PreviewDoc'
interface Props {
  children?: ReactNode
  id: string
}
//接口类型
const options = [
  {
    value: 'GET',
    label: <span style={{ color: 'green', fontWeight: 600 }}>GET</span>
  },
  {
    value: 'POST',
    label: <span style={{ color: 'rgb(250,140,22)', fontWeight: 600 }}>POST</span>
  },
  {
    value: 'DELETE',
    label: <span style={{ color: 'RGB(250,84,28)', fontWeight: 600 }}>DELETE</span>
  },
  {
    value: 'PUT',
    label: <span style={{ color: 'RGB(24,144,255)', fontWeight: 600 }}>PUT</span>
  },
  {
    value: 'OPTIONS',
    label: <span style={{ color: 'RGB(24,144,255)', fontWeight: 600 }}>OPTIONS</span>
  }
]
const ManageRouter: FC<Props> = (props) => {
  const { interDate } = useAppSelector((state) => {
    return {
      interDate: state.Inter.InterCategorize
    }
  })
  const keys: string[] = Object.keys(interDate)
  //子组件函数，回调传数据
  const requireinfo = (date: any) => {
    console.log(date)
  }
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <Tag bordered={false}>请求</Tag>,
      children: <MyTabs tranform={requireinfo} />
    },
    {
      key: '2',
      label: <Tag bordered={false}>响应定义</Tag>,
      children: <ResponeTabs inter={interDate[keys[0]][0]} />
    },
    {
      key: '3',
      label: <Tag bordered={false}>接口说明</Tag>,
      children: <InterSpec />
    },
    {
      key: '4',
      label: <Tag bordered={false}>预览文档</Tag>,
      children: <PreviewDoc inter={interDate[keys[0]][0]} />
    },
    {
      key: '5',
      label: <Tag bordered={false}> Mock</Tag>,
      children: 'Content of Tab Pane 3'
    }
  ]
  const onChange = (key: string) => {
    console.log(key)
  }
  //发送请求
  const sendRequest = debounce(() => {
    console.log('发送请求')
  }, 300)
  const save = () => {}
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Select defaultValue="GET" style={{ width: '100px' }} options={options} />
        <Input
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          defaultValue="WWW.baidu.com"
        />
        <Button icon={<SaveOutlined />} style={{ marginInline: 10 }} type="default" onClick={save}>
          保存
        </Button>
        <Button
          icon={<SendOutlined />}
          style={{ marginRight: 10 }}
          type="primary"
          onClick={sendRequest}
        >
          发送
        </Button>
      </header>
      <main className={styles.main}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </main>
    </div>
  )
}
export default memo(ManageRouter)
