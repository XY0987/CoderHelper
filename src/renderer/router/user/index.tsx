import AuthUser from '@renderer/components/auth/AuthUser'
import Home from '@renderer/pages/home'
import { RouteObject } from 'react-router'

const userRoutes: RouteObject[] = [
  {
    path: '/home',
    element: <AuthUser title="首页" Element={Home}></AuthUser>
  }
]

export default userRoutes
