import { Space, Tag } from 'antd'
import { memo } from 'react'
import { FC, ReactNode } from 'react'
interface Props {
  children?: ReactNode
  method: 'get' | 'post' | 'delete' | 'put' | 'options'
  color?: string
}
//生成 图标
const MethodProps: FC<Props> = (props) => {
  const handler = () => {
    let color = 'red'
    switch (props.method) {
      case 'get':
        color = '#87d068'
        break
      case 'post':
        color = '#ff7b39'
        break
      case 'put':
        color = '#108ee9'
        break
      case 'options':
        color = 'rgb(24,144,255)'
    }
    if (props.color) {
      color = props.color
    }
    return <Tag color={color}>{props.method.toLocaleUpperCase()}</Tag>
  }
  return <Space>{handler()}</Space>
}
export default memo(MethodProps)
