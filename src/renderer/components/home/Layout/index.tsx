import React from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu, message } from 'antd'
import { Outlet, useNavigate } from 'react-router'
import ApplyHeader from '../Header'

import style from './index.module.scss'
import { menuItem } from './menuOptions'

const { Sider, Content } = Layout

export default function HomeLayout() {
  const navigate = useNavigate()

  const items: MenuProps['items'] = menuItem.map((item) => ({
    key: item.path,
    icon: React.createElement(item.icon),
    label: item.label
  }))

  const onClick = (e: any) => {
    message.destroy()
    navigate(e.key)
  }

  return (
    <Layout style={{ backgroundColor: 'white' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={items}
          onClick={onClick}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200, backgroundColor: 'white' }}>
        <Content style={{ overflow: 'initial' }}>
          <div className={style.headerContainer}>
            <ApplyHeader></ApplyHeader>
          </div>
          <div>
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
