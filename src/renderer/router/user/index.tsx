import AuthUser from '@renderer/components/auth/AuthUser'
import InterfaceDemo from '@renderer/pages/demo/interface'
import interFacepageLayout from '@renderer/components/interFacepageLayout'
import Home from '@renderer/pages/home'
import ProjectCollect from '@renderer/pages/user/collect'
import ProjectManage from '@renderer/pages/user/project'
import PublicProject from '@renderer/pages/user/publicProject'
import { Navigate, RouteObject } from 'react-router'
import InterManagement from '@renderer/pages/interFacepage/InterManagement'
import AutomatedTesting from '@renderer/pages/interFacepage/AutomatedTesting'
import ItemSetting from '@renderer/pages/interFacepage/ItemSetting'
import InterHistory from '@renderer/pages/interFacepage/InterHistory'

const demoRouter: RouteObject[] = [
  {
    path: 'interfaceDemo',
    element: <AuthUser title="接口进程通信Demo" Element={InterfaceDemo}></AuthUser>
  }
]

const userRoutes: RouteObject[] = [
  {
    path: '/home',
    element: <AuthUser title="首页" Element={Home}></AuthUser>,
    children: [
      {
        path: 'project',
        element: <AuthUser title="项目管理" Element={ProjectManage}></AuthUser>
      },
      {
        path: 'collect',
        element: <AuthUser title="我的收藏" Element={ProjectCollect}></AuthUser>
      },
      {
        path: 'publicProject',
        element: <AuthUser title="公开项目" Element={PublicProject}></AuthUser>
      },
      ...demoRouter,
      {
        path: '*',
        element: <Navigate to="/home/project" replace></Navigate>
      }
    ]
  },
  {
    path: '/user',
    element: <AuthUser title="首页" Element={interFacepageLayout}></AuthUser>,
    children: [
      {
        path: 'intermanage', //接口管理
        element: <InterManagement />
      },
      {
        path: 'automatedtesting', //自动化测试
        element: <AutomatedTesting />
      },
      {
        path: 'itemseting', //项目设置
        element: <ItemSetting />
      },
      {
        //接口历史
        path: 'interhistory',
        element: <InterHistory />
      }
    ]
  }
]

export default userRoutes
