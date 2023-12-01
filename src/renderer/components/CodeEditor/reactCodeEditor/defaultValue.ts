export const defaultValue = `import React, { useState } from 'react'
import antd from 'antd'

const { Button, Pagination, Badge, Space, Switch, Alert } = antd

export default function App() {
  const [show, setShow] = useState(true)
  return <>
    {/* 按钮组件 */}
    <Space>
      <Button type="primary">普通按钮</Button>
      <Button type="primary" loading>加载中</Button>
      <Button type="primary" danger>危险按钮</Button>
      <Button type="link">文字按钮</Button>
      <Button>默认按钮</Button>
    </Space>
    <Button type="primary" block>超长按钮</Button>
    {/* 徽章组件 */}
    <Space>
      <Switch checked={show} onChange={() => setShow(!show)} />
      <Badge count={show ? 25 : 0} />
      <Badge
        count={show ? 109 : 0}
        style={{ backgroundColor: '#52c41a' }}
      />
    </Space>
    {/* 分页组件 */}
    <div>
      <Pagination
        showSizeChanger
        defaultCurrent={3}
        total={500}
      />
    </div>
    {/* 警告提示 */}
    <Alert message="Success Tips" type="success" showIcon />
    <Alert message="Informational Notes" type="info" showIcon />
    <Alert message="Warning" type="warning" showIcon closable />
    <Alert message="Error" type="error" showIcon />
  </>
}`
