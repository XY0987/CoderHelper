import React, { memo, useEffect, useState } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import { Statusinfo } from '../../../../../types/InterTypes'
import { Form, Input, Select } from 'antd'
import Editor, { loader } from '@monaco-editor/react'
//配置CDN加速
loader.config({
  paths: {
    vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.43.0/min/vs'
  }
})
interface Props {
  children?: ReactNode
  //返回响应状态信息
  Statusinfo: Statusinfo & { type?: string }
}
const Status: FC<Props> = (props) => {
  const { Statusinfo } = props
  const [info, Setinfo] = useState({ ...Statusinfo, type: 'JSON' })
  const [Responsedate, SetResponese] = useState<string>('')
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  type FieldType = {
    username?: string
    password?: string
    remember?: string
  }
  const changeinfo = (e: React.ChangeEvent<HTMLInputElement> | string, code: string) => {
    if (code === 'code') {
      const newObj = structuredClone(info)
      newObj.code = (e as React.ChangeEvent<HTMLInputElement>).target.value
      Setinfo(newObj)
    } else if (code === 'name') {
      const newObj = structuredClone(info)
      newObj.name = (e as React.ChangeEvent<HTMLInputElement>).target.value
      Setinfo(newObj)
    } else {
      const newObj = structuredClone(info)
      newObj.type = e as string
      Setinfo(newObj)
    }
  }
  return (
    <div className={styles.root}>
      <Form
        name="basic"
        layout="inline"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="HTTP状态码" name="status">
          <Input defaultValue={info.code} onChange={(e) => changeinfo(e, 'code')} />
        </Form.Item>
        <Form.Item<FieldType> label="名称" name="title">
          <Input defaultValue={info.name} onChange={(e) => changeinfo(e, 'name')} />
        </Form.Item>
        <Form.Item<FieldType> label="内容格式" name="type">
          <Select
            defaultValue={'JSON'}
            style={{ width: 200 }}
            onChange={(values) => changeinfo(values, 'type')}
            options={[
              { value: 'JSON', label: 'JSON' },
              { value: 'HTML', label: 'HTML' },
              { value: 'XML', label: 'XML' },
              { value: 'Raw', label: 'Raw' }
            ]}
          />
        </Form.Item>
      </Form>
      <Editor
        height="30vh"
        value=""
        defaultLanguage={'json'}
        language={info.type.toLocaleLowerCase()}
        className={styles.rootjson}
        onChange={(e = '') => SetResponese(e)}
        defaultValue={Responsedate}
      />
    </div>
  )
}
export default memo(Status)
