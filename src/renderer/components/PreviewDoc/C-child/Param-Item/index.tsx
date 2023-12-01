import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import { Space, Tag } from 'antd'
interface Props {
  children?: ReactNode
  info?: { name: string; type: string; desc: string; isSelect: boolean }
}
const ParamItem: FC<Props> = (props) => {
  const { info } = props
  return (
    <div className={styles.root}>
      <Space>
        <Tag bordered={false} color="processing">
          {info?.name || ' '}
        </Tag>
        <span>{info?.type || ''}</span>
        <span>{info?.desc || ''}</span>
        {info?.isSelect ? <Tag color="red">必选</Tag> : <Tag color="geekblue">可选</Tag>}
      </Space>
    </div>
  )
}
export default memo(ParamItem)
