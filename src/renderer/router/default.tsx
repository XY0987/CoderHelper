import { RouteObject } from 'react-router'
import NotAuth from '../components/auth/NotAuth'
import React from 'react'
import Login from '../pages/noAuth/login'
import Register from '../pages/noAuth/register'

const defaultRoutes: RouteObject[] = [
  {
    path: '/',
    element: <NotAuth title="登录" Element={Login}></NotAuth>
  },
  {
    path: '/register',
    element: <NotAuth title="注册" Element={Register}></NotAuth>
  }
]

export default defaultRoutes
