import { Empty, Tabs, TabsProps } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { FC, ReactNode } from 'react'
import AdvanceForm from '../../../AdvancedForms'
import JsonInput from '../../../JsonInput'
import { debounce } from 'lodash'
interface Props {
  children?: ReactNode
}
const Body: FC<Props> = () => {
  //xml  json  raw  三者数据公用
  const [jsonandXmlangRaw, setDate] = useState<string>('')
  //数据保存防抖
  const jsonrequire = debounce((value: string = '') => {
    setDate(value)
  }, 300)
  useEffect(() => {
    console.log(jsonandXmlangRaw)
  }, [jsonandXmlangRaw])
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'none',
      children: <Empty />
    },
    {
      key: '2',
      label: 'form-data-urlencoded',
      children: <AdvanceForm requireFile={true} />
    },
    {
      key: '3',
      label: 'json',
      children: <JsonInput value={jsonandXmlangRaw} onchange={jsonrequire} />
    },
    {
      key: '4',
      label: 'xml',
      children: <JsonInput valuetype="xml" value={jsonandXmlangRaw} onchange={jsonrequire} />
    },
    {
      key: '5',
      label: 'raw',
      children: <JsonInput valuetype="swift" value={jsonandXmlangRaw} onchange={jsonrequire} />
    }
  ]

  const onChange = (key: any) => {
    console.log(key)
  }
  return (
    <Tabs style={{ fontSize: '12px' }} defaultActiveKey="1" items={items} onChange={onChange} />
  )
}
export default memo(Body)
