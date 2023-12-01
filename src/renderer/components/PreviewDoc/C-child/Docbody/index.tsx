import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import { Collapse, CollapseProps, Space } from 'antd'
import { Statusinfo } from '../../../../types/InterTypes'
import { Editor, loader } from '@monaco-editor/react'
loader.config({
  paths: {
    vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.43.0/min/vs'
  }
})
interface Props {
  children?: ReactNode
  info: Statusinfo & { type: string }
}
const Docbody: FC<Props> = (props) => {
  const { info } = props
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '数据结构',
      children: (
        <Editor
          height="30vh"
          defaultLanguage={'json'}
          className={styles.rootjson}
          defaultValue="{}"
          options={{ readOnly: true }}
        />
      )
    }
  ]
  return (
    <div className={styles.root}>
      <Space>
        <span className={styles.font_cut}>
          HTTP状态码: <span>{info.code}</span>
        </span>
        <span className={styles.font_cut}>
          内容格式: <span> {info.type}</span>
        </span>
      </Space>
      <div className={styles.Datastruct}>
        <Collapse size="small" items={items} defaultActiveKey={['1']} />
      </div>
    </div>
  )
}
export default memo(Docbody)
