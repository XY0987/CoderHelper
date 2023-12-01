import { DeleteOutlined, EditOutlined, NodeExpandOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space } from 'antd'
import React, { memo } from 'react'
import { FC, ReactNode } from 'react'
interface Props {
  children?: ReactNode
  itemname: string
  type: 'Inter' | 'Interinner' | ''
}
const items: MenuProps['items'] = [
  {
    key: '1',
    label: <span>添加接口</span>,
    icon: <NodeExpandOutlined />
  },
  {
    key: '2',
    label: <span>重命名</span>,
    icon: <EditOutlined />
  },
  {
    key: '3',
    label: <span>删除</span>,
    icon: <DeleteOutlined />
  }
]
const InterProps: MenuProps['items'] = [
  {
    key: '1',
    label: <span>删除</span>,
    icon: <DeleteOutlined />
  },
  {
    key: '2',
    label: <span>重命名</span>,
    icon: <EditOutlined />
  }
]
const PullDown: FC<Props> = (props) => {
  const { itemname, type } = props
  return (
    <Dropdown
      trigger={['contextMenu']}
      menu={type === 'Inter' ? { items: items } : { items: InterProps }}
    >
      <Space>{itemname}</Space>
    </Dropdown>
  )
}
export default memo(PullDown)
