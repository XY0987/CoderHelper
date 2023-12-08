import AuthUser from '@renderer/components/auth/AuthUser'
import interFacepageLayout from '@renderer/components/interFacepageLayout'
import AutomatedTesting from '@renderer/pages/interFacepage/AutomatedTesting'
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
        path: 'automatedtesting', //自动化测试
        element: <AuthUser title="" Element={AutomatedTesting}></AuthUser>
      },
      {
        path: 'itemseting', //项目设置
        element: <AuthUser title="" Element={ItemSetting}></AuthUser>
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
