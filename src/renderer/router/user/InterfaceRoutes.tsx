import AuthUser from '@renderer/components/auth/AuthUser'
import interFacepageLayout from '@renderer/components/interFacepageLayout'
import Meeting from '@renderer/pages/user/meeting'
import Demand from '@renderer/pages/user/demand'
import InterHistory from '@renderer/pages/interFacepage/InterHistory'
import InterManagement from '@renderer/pages/interFacepage/InterManagement'
import ItemSetting from '@renderer/pages/interFacepage/ItemSetting'
import { RouteObject } from 'react-router'

const userChildren: RouteObject[] = [
  {
    path: '/user',
    element: <AuthUser title="首页" Element={interFacepageLayout}></AuthUser>,
    children: [
      {
        path: 'intermanage', //接口管理
        element: <AuthUser title="接口管理" Element={InterManagement}></AuthUser>
      },
      {
        path: 'demand', //需求管理
        element: <AuthUser title="需求管理" Element={Demand}></AuthUser>
      },
      {
        path: 'itemseting', //项目设置
        element: <AuthUser title="项目设置" Element={ItemSetting}></AuthUser>
      },
      {
        path: 'meeting',
        element: <AuthUser title="会议" Element={Meeting}></AuthUser>
      },
      {
        //接口历史
        path: 'interhistory',
        element: <AuthUser title="" Element={InterHistory}></AuthUser>
      }
    ]
  }
]

export default userChildren
