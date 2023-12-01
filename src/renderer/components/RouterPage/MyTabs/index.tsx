import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Params from './c-child/Params'
import Body from './c-child/Body'
import Cookie from './c-child/Cookie'
import HeaderC from './c-child/HeaderC'
import AuthC from './c-child/AuthC'
interface Iroot {
  tranform: (date: any) => void
}
//定制内容
const MyTabs: React.FC<Iroot> = (props) => {
  const { tranform } = props
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Params',
      children: <Params />
    },
    {
      key: '2',
      label: 'Body',
      children: <Body />
    },
    {
      key: '3',
      label: 'Cookie',
      children: <Cookie />
    },
    {
      key: '4',
      label: 'Header',
      children: <HeaderC />
    },
    {
      key: '5',
      label: 'Auth',
      children: <AuthC />
    }
  ]
  const onChange = (key: string) => {
    tranform('传递的信息' + key)
    console.log(key)
  }
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
}

export default MyTabs
