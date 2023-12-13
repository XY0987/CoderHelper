import AuthUser from '@renderer/components/auth/AuthUser'
import InterfaceDemo from '@renderer/pages/demo/interface'
import Home from '@renderer/pages/home'
import Tool from '@renderer/pages/tool'
import ProjectCollect from '@renderer/pages/user/collect'
import ProjectManage from '@renderer/pages/user/project'
import PublicProject from '@renderer/pages/user/publicProject'
import { Navigate, RouteObject } from 'react-router'

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
      {
        path: 'tool',
        element: <AuthUser title="工具" Element={Tool}></AuthUser>
      },
      ...demoRouter,
      {
        path: '*',
        element: <Navigate to="/home/project" replace></Navigate>
      }
    ]
  }
]

export default userRoutes
