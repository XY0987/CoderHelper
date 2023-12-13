import {
  ApartmentOutlined,
  AppstoreOutlined,
  CheckSquareOutlined,
  ScissorOutlined,
  StarOutlined
} from '@ant-design/icons'

const demoMenuItem = [
  {
    path: '/home/interfaceDemo',
    icon: CheckSquareOutlined,
    label: '接口进程通信demo'
  }
]

export const menuItem = [
  {
    path: '/home/project',
    icon: AppstoreOutlined,
    label: '项目管理'
  },
  {
    path: '/home/collect',
    icon: StarOutlined,
    label: '我的收藏'
  },
  {
    path: '/home/publicProject',
    icon: ApartmentOutlined,
    label: '公开项目'
  },
  {
    path: '/home/tool',
    icon: ScissorOutlined,
    label: '代码工具'
  },
  ...demoMenuItem
]
