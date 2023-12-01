import React, { ElementRef, memo, useEffect, useRef, useState } from 'react'
import { Layout, Menu } from 'antd'
import { InterfaceDirectory } from '../../../utils/InterManage/Math'
import TabBar from './C-child/TabBar/index'
import styles from './index.module.scss'
import { useAppSelector } from '../../../store'
import { useLocation, useNavigate } from 'react-router'
import MangeRouter from '../../../components/RouterPage/MangeRouter/MangeRouter'
import Dragbox from '../../../components/RouterPage/Dragbox'
import qs from 'qs'

const { Content, Footer, Sider } = Layout
//选项卡目录
const Home: React.FC = () => {
  const loaction = useLocation()
  const route = useNavigate()
  const Tabref = useRef<ElementRef<typeof TabBar>>(null)
  //侧边栏收起状态
  const [collapsed, setCollapsed] = useState(false)
  //当前管理接口
  //const [InterID, setID] = useState("");
  //接口列表数据
  const [Items, SetItems] = useState<any>([])
  const { InterCategorize } = useAppSelector((state) => {
    return {
      InterCategorize: state.Inter.InterCategorize
    }
  })
  const requireProjectID = () => {
    return qs.parse(loaction.search.slice(1)).projectId || ''
  }
  //处理接口点击事件
  const handlerSelect = function (params: any) {
    route(`/user/intermanage?projectId=${requireProjectID()}&id=${params.key}`, {
      state: {}
    })
  }
  //设置接口目录
  useEffect(() => {
    SetItems(InterfaceDirectory(InterCategorize))
  }, [InterCategorize])
  //监听URL query 的变化  生成新的TabBar，并且切换到新的页签
  useEffect(() => {
    const paramsobj = new URLSearchParams(loaction.search)
    const Interid = paramsobj.get('id') as string
    if (!Interid) return
    if (Tabref.current?.test(Interid).ishas) {
      return
    }
    Tabref.current?.addTab(
      Interid,
      <>
        <MangeRouter id={Interid}></MangeRouter>
      </>
    )
  }, [loaction])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={250}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          fontSize: '12px'
        }}
      >
        <Menu
          className={styles.root}
          style={{ width: 'auto', fontSize: '12px' }}
          theme="light"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={Items}
          onSelect={handlerSelect}
        />
      </Sider>
      <Layout style={{ height: '100vh' }}>
        <Content style={{ margin: '10px 10px', flex: 1, overflow: 'auto' }}>
          {/* 路由管理页面展示区域 */}
          <TabBar ref={Tabref} key={'2'} />
        </Content>
        {/* 可拖拽 内容区*/}
        <Dragbox></Dragbox>
        <Footer style={{ textAlign: 'center', height: 50 }}>接口管理</Footer>
      </Layout>
    </Layout>
  )
}

export default memo(Home)
