import { RouteObject } from 'react-router'
import ForgetPassword from '@renderer/pages/noAuth/forgetPassword'
import Login from '@renderer/pages/noAuth/login'
import NotAuth from '@renderer/components/auth/NotAuth'
import Register from '@renderer/pages/noAuth/register'

const defaultRoutes: RouteObject[] = [
  {
    path: '/',
    element: <NotAuth title="登录" Element={Login}></NotAuth>
  },
  {
    path: '/register',
    element: <NotAuth title="注册" Element={Register}></NotAuth>
  },
  {
    path: '/forgetPassword',
    element: <NotAuth title="忘记密码" Element={ForgetPassword}></NotAuth>
  }
]

export default defaultRoutes
