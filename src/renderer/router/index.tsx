import { RouteObject } from 'react-router'
import NotAuth from '../components/auth/NotAuth'
import NotFound from '../pages/error/NotFound'
import NotHasPower from '../pages/error/NotHasPower'
import defaultRoutes from './default'
import MeetingRoutes from './user/MeetingRoutes'
import InterfaceRoutes from './user/InterfaceRoutes'
import WorkRoutes from './user/WorkRoutes'
import userRoutes from './user'

const routes: RouteObject[] = [
  ...defaultRoutes,
  ...userRoutes,
  ...MeetingRoutes,
  ...InterfaceRoutes,
  ...WorkRoutes,
  {
    path: '/NotHasPower',
    element: <NotAuth title="403" Element={NotHasPower}></NotAuth>
  },
  {
    path: '*',
    element: <NotAuth title="404" Element={NotFound}></NotAuth>
  }
]

export default routes
