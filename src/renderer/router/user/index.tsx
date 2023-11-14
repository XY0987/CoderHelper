import AuthUser from '@renderer/components/auth/AuthUser'
import Home from '@renderer/pages/home'
import ProjectCollect from '@renderer/pages/user/collect'
import ProjectManage from '@renderer/pages/user/project'
import { Navigate, RouteObject } from 'react-router'

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
        path: '*',
        element: <Navigate to="/home/project" replace></Navigate>
      }
    ]
  }
]

export default userRoutes
